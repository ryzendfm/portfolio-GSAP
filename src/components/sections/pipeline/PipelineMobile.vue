<template>
  <!-- Scatter canvas. `topInset` reserves the upper band so the cluster stays
       clear of the heading/intro text that sits above this element. -->
  <div
    ref="canvasRef"
    class="relative w-full"
    style="height: 56vh; min-height: 380px"
    @click.self="dismiss"
  >
    <div
      v-for="(pos, i) in positions"
      :key="pipelineDomains[i].id"
      class="absolute"
      :style="{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }"
    >
      <!-- Reveal wrapper: ScrollTrigger pops each icon in. A separate inner
           element owns the idle-float transform so the two don't collide. -->
      <div :ref="(el) => (revealRefs[i] = el as HTMLElement)" style="opacity: 0">
        <div :ref="(el) => (floatRefs[i] = el as HTMLElement)">
          <PipelineIcon
            :domain="pipelineDomains[i]"
            mode="tap"
            :active="activeId === pipelineDomains[i].id"
            :size="pos.size"
            @toggle="onToggle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref, nextTick } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { usePreferredReducedMotion, useResizeObserver } from '@vueuse/core';
  import PipelineIcon from './PipelineIcon.vue';
  import { pipelineDomains } from './domains';
  import { useScatteredPositions } from '@/composables/useScatteredPositions';

  gsap.registerPlugin(ScrollTrigger);

  // Varied dot diameters so the cluster reads like the reference (a few big,
  // a few small). Deterministic per index — no reshuffle on re-render.
  const dotSizes = [72, 88, 60, 80, 64, 84];

  const canvasRef = ref<HTMLElement | null>(null);
  const revealRefs = ref<HTMLElement[]>([]);
  const floatRefs = ref<HTMLElement[]>([]);
  const activeId = ref<string | null>(null);
  const reduced = usePreferredReducedMotion();

  const { positions, regenerate } = useScatteredPositions(
    pipelineDomains.length,
    { sizes: dotSizes, gap: 20, padding: 14, topInset: 8, spread: 0.7 },
  );

  const onToggle = (id: string) => {
    activeId.value = activeId.value === id ? null : id;
  };
  const dismiss = () => {
    activeId.value = null;
  };

  const floatTweens: gsap.core.Tween[] = [];
  let revealCtx: gsap.Context | null = null;

  // Subtle, desynchronised idle float — each dot drifts a few px on its own
  // duration so they never move in lockstep.
  const startFloat = () => {
    floatTweens.forEach((t) => t.kill());
    floatTweens.length = 0;
    if (reduced.value === 'reduce') return;

    floatRefs.value.filter(Boolean).forEach((el, i) => {
      const drift = 4 + ((i * 37) % 3); // 4–6px
      const dur = 2.5 + ((i * 53) % 15) / 10; // 2.5–4.0s
      floatTweens.push(
        gsap.to(el, {
          y: `-=${drift}`,
          duration: dur,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.35,
        }),
      );
    });
  };

  // Pop each icon in on scroll (one after another), then start the idle float.
  const startReveal = () => {
    revealCtx?.revert();
    const items = revealRefs.value.filter(Boolean);
    if (!items.length) return;

    if (reduced.value === 'reduce') {
      gsap.set(items, { opacity: 1, scale: 1 });
      startFloat();
      return;
    }

    revealCtx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'back.out(1.7)',
          stagger: 0.14,
          scrollTrigger: {
            trigger: canvasRef.value,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onComplete: startFloat,
        },
      );
    }, canvasRef.value!);
  };

  const layout = async () => {
    const el = canvasRef.value;
    if (!el) return;
    regenerate(el.clientWidth, el.clientHeight);
    await nextTick();
    startReveal();
  };

  onMounted(layout);
  useResizeObserver(canvasRef, () => layout());

  onBeforeUnmount(() => {
    floatTweens.forEach((t) => t.kill());
    revealCtx?.revert();
  });
</script>
