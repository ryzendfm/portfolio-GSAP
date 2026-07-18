<template>
  <div ref="containerRef" class="relative size-full overflow-hidden select-none bg-[#b01010] rounded-xl">
    <!-- Canvas -->
    <canvas ref="canvasRef" class="block size-full cursor-grab active:cursor-grabbing"></canvas>

    <!-- Loading spinner -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-[#b01010] z-30 transition-opacity duration-300">
      <div class="flex flex-col items-center gap-3">
        <!-- Spinner -->
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
        <p class="text-xs font-bold uppercase tracking-wider text-white/70">Loading 3D Model... {{ progress }}%</p>
      </div>
    </div>

    <!-- Controls overlay -->
    <div class="absolute bottom-4 left-4 pointer-events-none bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 z-20">
      <p class="text-[10px] font-bold uppercase tracking-wider text-flax-smoke-200">
        🖱️ Drag to rotate | 📜 Scroll to zoom
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { gsap } from 'gsap';

  const props = defineProps<{
    modelUrl: string;
  }>();

  const containerRef = ref<HTMLDivElement | null>(null);
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const loading = ref(true);
  const progress = ref(0);

  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let controls: OrbitControls | null = null;
  let animationFrameId: number | null = null;
  let model: THREE.Group | null = null;

  onMounted(() => {
    if (!containerRef.value || !canvasRef.value) return;

    const width = containerRef.value.clientWidth;
    const height = containerRef.value.clientHeight;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4, 2, 4);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const initialPosition = new THREE.Vector3();
    const initialTarget = new THREE.Vector3();
    let returnTimeout: ReturnType<typeof setTimeout> | null = null;
    let transitionTween: gsap.core.Tween | null = null;
    let targetTween: gsap.core.Tween | null = null;

    const startReturnTransition = () => {
      if (transitionTween) transitionTween.kill();
      if (targetTween) targetTween.kill();

      transitionTween = gsap.to(camera!.position, {
        x: initialPosition.x,
        y: initialPosition.y,
        z: initialPosition.z,
        duration: 2.5,
        ease: 'power2.inOut',
      });

      targetTween = gsap.to(controls!.target, {
        x: initialTarget.x,
        y: initialTarget.y,
        z: initialTarget.z,
        duration: 2.5,
        ease: 'power2.inOut',
      });
    };

    const stopReturnTransition = () => {
      if (transitionTween) transitionTween.kill();
      if (targetTween) targetTween.kill();
    };

    // Controls
    controls = new OrbitControls(camera, canvasRef.value);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Ground clamping
    controls.minDistance = 1;
    controls.maxDistance = 12;

    controls.addEventListener('start', () => {
      stopReturnTransition();
      if (returnTimeout) clearTimeout(returnTimeout);
    });

    controls.addEventListener('end', () => {
      if (returnTimeout) clearTimeout(returnTimeout);
      returnTimeout = setTimeout(() => {
        startReturnTransition();
      }, 3000); // Return to camera POV after 3 seconds of inactivity
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(6, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-6, 3, -6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimLight.position.set(0, 5, -8);
    scene.add(rimLight);

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      props.modelUrl,
      (gltf) => {
        model = gltf.scene;

        // Bounding Box of ONLY meshes to exclude cameras/helpers
        const box = new THREE.Box3();
        let hasMesh = false;

        // Traverse model meshes for shadows/materials and box calculations
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Materials refinement
            if (child.material) {
              const mat = child.material as THREE.MeshStandardMaterial;
              if (mat.roughness !== undefined) {
                mat.roughness = Math.max(mat.roughness, 0.08);
              }
              if (mat.metalness !== undefined) {
                mat.metalness = Math.min(mat.metalness, 1.0);
              }
            }

            // Exclude helper meshes or ground floors if any from bounding box
            if (!hasMesh) {
              box.setFromObject(child);
              hasMesh = true;
            } else {
              box.expandByObject(child);
            }
          }
        });

        const size = new THREE.Vector3();
        const center = new THREE.Vector3();

        if (hasMesh) {
          box.getSize(size);
          box.getCenter(center);

          // Center the model relative to origin based on mesh data only
          model.position.x -= center.x;
          model.position.y -= center.y;
          model.position.z -= center.z;
        } else {
          size.set(2, 1, 4);
          center.set(0, 0, 0);
        }

        scene!.add(model);

        // Force matrix update to ensure shift propagates to child camera nodes
        model.updateMatrixWorld(true);

        // Ground Plane for contact shadows
        const floorGeo = new THREE.PlaneGeometry(25, 25);
        const floorMat = new THREE.ShadowMaterial({ opacity: 0.35 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -size.y / 2; // Put exactly under the car bottom
        floor.receiveShadow = true;
        scene!.add(floor);

        // Frame camera based on model dimensions or GLTF camera POV
        if (gltf.cameras && gltf.cameras.length > 0) {
          const gltfCam = gltf.cameras[0] as THREE.PerspectiveCamera;
          gltfCam.updateMatrixWorld(true);
          gltfCam.getWorldPosition(initialPosition);
          initialTarget.set(0, 0, 0);

          // Adopt field of view from blender
          if (gltfCam.fov) {
            camera!.fov = gltfCam.fov;
            camera!.updateProjectionMatrix();
          }
        } else {
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera!.fov * (Math.PI / 180);
          let cameraDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2));
          cameraDistance *= 0.5; // Fallback zoom offset

          initialPosition.set(-cameraDistance * 1.15, cameraDistance * 0.14, -cameraDistance * 0.7);
          initialTarget.set(0, 0, 0);
        }

        camera!.position.copy(initialPosition);
        controls!.target.copy(initialTarget);
        controls!.update();

        loading.value = false;
      },
      (xhr) => {
        if (xhr.total > 0) {
          progress.value = Math.round((xhr.loaded / xhr.total) * 100);
        }
      },
      (error) => {
        console.error('WebGL GLB loading error:', error);
        loading.value = false;
      }
    );

    // Resize Handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (renderer && camera) {
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
      }
    });
    resizeObserver.observe(containerRef.value);

    // Render Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (controls) controls.update();

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };
    animate();

    onBeforeUnmount(() => {
      resizeObserver.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (returnTimeout) clearTimeout(returnTimeout);
      stopReturnTransition();

      // Clean up WebGL resources
      if (scene) {
        scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.dispose();

          if (object.material.isMaterial) {
            cleanMaterial(object.material);
          } else {
            for (const mat of object.material) {
              cleanMaterial(mat);
            }
          }
        });
      }

      if (renderer) renderer.dispose();
    });
  });

  const cleanMaterial = (material: any) => {
    material.dispose();
    for (const key of Object.keys(material)) {
      const val = material[key];
      if (val && typeof val.dispose === 'function') {
        val.dispose();
      }
    }
  };
</script>
