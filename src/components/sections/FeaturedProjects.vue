<template>
  <div class="w-full">
    <!-- Desktop View (≥1024px): 3-column grid -->
    <div class="hidden lg:grid grid-cols-3 gap-8">
      <div
        v-for="p in projects"
        :key="p.num"
        class="feat-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-flax-smoke-700/40 bg-[#141511]/90 p-7 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-flax-smoke-500/60 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
      >
        <!-- Background faint watermark number -->
        <span
          class="pointer-events-none absolute -bottom-6 -right-2 font-title text-[9rem] leading-none font-extrabold select-none opacity-[0.035] transition-opacity duration-500 group-hover:opacity-[0.08]"
          :style="{ color: p.color }"
        >
          {{ p.num }}
        </span>

        <!-- Top section: Domain indicator, tag & description -->
        <div>
          <!-- Indicator & Header Tag -->
          <div class="flex items-center justify-between">
            <span
              class="heading-6 font-title! flex items-center gap-2 text-xs font-bold tracking-wider uppercase"
              :style="{ color: p.color }"
            >
              <span
                class="inline-block size-2 rounded-full"
                :style="{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }"
              ></span>
              ( {{ p.num }} / {{ p.tag }} )
            </span>

            <span class="text-flax-smoke-400/60 font-mono text-[11px] font-medium tracking-widest uppercase">
              FEATURED
            </span>
          </div>

          <!-- Project Title -->
          <h4
            class="heading-4 font-title! mt-4 font-extrabold uppercase tracking-tight text-flax-smoke-100 transition-colors duration-300 group-hover:text-white"
          >
            {{ p.title }}
          </h4>

          <!-- Project Summary -->
          <p
            class="text-flax-smoke-300/85 mt-3 text-sm leading-relaxed font-fancy"
          >
            {{ p.desc }}
          </p>
        </div>

        <!-- Bottom section: Tech Stack Tag Pills -->
        <div class="relative z-10 mt-6 pt-5 border-t border-flax-smoke-800/60 flex flex-wrap gap-1.5">
          <span
            v-for="tech in p.tags"
            :key="tech"
            class="rounded-full border border-flax-smoke-700/50 bg-flax-smoke-900/60 px-2.5 py-1 text-[11px] font-semibold text-flax-smoke-300 transition-colors duration-300 group-hover:border-flax-smoke-600/70"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>

    <!-- Mobile View (<1024px): Interactive Stacked Card Deck with Video & Staggered Rotations -->
    <div class="block lg:hidden w-full relative pt-2 pb-2">
      <div class="relative w-full max-w-[290px] sm:max-w-[320px] mx-auto h-[330px] flex items-center justify-center">
        <div
          v-for="(p, index) in projects"
          :key="p.num"
          class="feat-card absolute top-0 w-full rounded-[20px] bg-[#141414] p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] border border-flax-smoke-700/40 overflow-hidden transition-all duration-500 ease-out touch-none select-none cursor-grab active:cursor-grabbing"
          :style="getDeckStyle(index)"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          @mousedown="handleMouseDown"
        >
          <!-- Top Section: Embedded Project Video Preview with notched skewed corner -->
          <div
            class="relative h-[175px] rounded-[15px] p-3 flex flex-col justify-between overflow-hidden shadow-inner bg-flax-smoke-950"
          >
            <!-- Autoplay Looping Video Preview -->
            <video
              :src="p.video"
              autoplay
              loop
              muted
              playsinline
              class="absolute inset-0 size-full object-cover rounded-[15px] opacity-80"
            />

            <!-- Dark Overlay Gradient for Top Icons Readability -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/50 z-0 pointer-events-none" />

            <!-- Skewed Notch Cutout -->
            <div class="notch-border absolute top-0 left-0 h-[30px] w-[125px] bg-[#141414] rounded-br-[10px] transform -skew-x-[40deg] origin-top-left shadow-[-10px_-10px_0_0_#141414] pointer-events-none z-10" />

            <!-- Header icons: Initials logo (left) + Action SVG links (right) -->
            <div class="relative z-20 flex items-center justify-between w-full h-[28px]">
              <!-- Initials Logo Tile -->
              <span class="flex items-center gap-1.5 text-xs font-extrabold text-white font-title uppercase tracking-wider pl-1">
                <span class="size-6 rounded-full bg-[#141414] flex-center text-flax-smoke-100 text-[10px]">
                  {{ p.initials }}
                </span>
                <span class="font-mono text-[10px] opacity-80 text-flax-smoke-300">{{ p.num }}</span>
              </span>

              <!-- Action Links -->
              <div class="flex items-center gap-2.5 pr-1">
                <a
                  v-if="p.links?.github"
                  :href="p.links.github"
                  target="_blank"
                  class="text-white hover:text-flax-smoke-300 transition-colors duration-200"
                  title="GitHub Repository"
                  @click.stop
                >
                  <svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a
                  v-if="p.links?.live"
                  :href="p.links.live"
                  target="_blank"
                  class="text-white hover:text-flax-smoke-300 transition-colors duration-200"
                  title="Live Demo"
                  @click.stop
                >
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <a
                  v-if="p.links?.huggingface"
                  :href="p.links.huggingface"
                  target="_blank"
                  class="text-white hover:text-flax-smoke-300 transition-colors duration-200 text-xs font-extrabold"
                  title="HuggingFace"
                  @click.stop
                >
                  🤗
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom Section: Title + 3-Column Stack Metrics -->
          <div class="mt-3.5 px-2 pb-2">
            <span class="block text-center font-title text-base font-extrabold uppercase tracking-widest text-white">
              {{ p.title }}
            </span>

            <div class="mt-3 flex justify-between items-center text-center">
              <div class="flex-1 px-1">
                <span class="block text-xs font-bold text-flax-smoke-100 font-title">{{ p.metrics[0].big }}</span>
                <span class="block text-[9px] text-flax-smoke-400 uppercase font-fancy mt-0.5">{{ p.metrics[0].label }}</span>
              </div>
              <div class="flex-1 px-1 border-x border-white/15">
                <span class="block text-xs font-bold text-flax-smoke-100 font-title">{{ p.metrics[1].big }}</span>
                <span class="block text-[9px] text-flax-smoke-400 uppercase font-fancy mt-0.5">{{ p.metrics[1].label }}</span>
              </div>
              <div class="flex-1 px-1">
                <span class="block text-xs font-bold text-flax-smoke-100 font-title">{{ p.metrics[2].big }}</span>
                <span class="block text-[9px] text-flax-smoke-400 uppercase font-fancy mt-0.5">{{ p.metrics[2].label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeUnmount } from 'vue';
  import { amadeusClip1 } from '@/assets/videos';

  const projects = [
    {
      num: '01',
      initials: 'AM',
      tag: 'AI AGENT SYSTEM',
      title: 'Amadeus',
      color: '#00D4FF',
      gradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.85) 0%, rgba(0, 114, 255, 0.85) 100%)',
      video: amadeusClip1,
      desc: 'Electron/React/FastAPI desktop assistant with ReAct autonomous reasoning loops for automated browsing, document handling, and system tasks.',
      tags: ['Electron', 'React', 'FastAPI', 'ReAct Loop', 'Python'],
      metrics: [
        { big: 'ReAct', label: 'Loop' },
        { big: 'FastAPI', label: 'Backend' },
        { big: 'Electron', label: 'Desktop' },
      ],
      links: {
        github: 'https://github.com/ryzendfm',
        huggingface: 'https://huggingface.co/ryzdfm/qwen2.5-coder-3b-claude_opus_4.6-distilled',
      },
    },
    {
      num: '02',
      initials: 'PW',
      tag: 'REAL-TIME 3D',
      title: 'Porsche WebGL',
      color: '#FFB84C',
      gradient: 'linear-gradient(135deg, rgba(255, 184, 76, 0.85) 0%, rgba(255, 94, 54, 0.85) 100%)',
      video: `${import.meta.env.BASE_URL}media/porsche_site_recording.mp4`,
      desc: 'Real-time interactive 3D product showroom with custom WebGL shaders, OrbitControls camera choreography, and dynamic lighting presets.',
      tags: ['Three.js', 'WebGL', 'Vue 3', 'OrbitControls', 'GSAP'],
      metrics: [
        { big: 'Three.js', label: 'Engine' },
        { big: '60 FPS', label: '3D Render' },
        { big: 'Orbit', label: 'Controls' },
      ],
      links: {
        live: 'https://porsche-web-gl-landing-page.vercel.app/',
        github: 'https://github.com/ryzendfm/Porsche-WebGL-landing-page',
      },
    },
    {
      num: '03',
      initials: 'QO',
      tag: 'FINE-TUNED LLM',
      title: 'QwOpus 4.6 3B',
      color: '#7C3AED',
      gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.85) 0%, rgba(192, 132, 252, 0.85) 100%)',
      video: `${import.meta.env.BASE_URL}media/Slider AI video.mp4`,
      desc: 'Qwen 2.5 Coder 3B model distilled on Claude Opus 4.6 reasoning datasets — fine-tuned for code generation, running locally at 70–90 t/s on RTX 3050.',
      tags: ['Qwen 2.5', 'Claude Distill', 'Unsloth', 'PyTorch', '70-90 t/s'],
      metrics: [
        { big: '70-90', label: 'Tokens/Sec' },
        { big: '3B', label: 'Params' },
        { big: 'Opus 4.6', label: 'Distill' },
      ],
      links: {
        huggingface: 'https://huggingface.co/ryzdfm/qwen2.5-coder-3b-claude_opus_4.6-distilled',
      },
    },
  ];

  const activeDeckIndex = ref(0);
  const dragX = ref(0);
  const isDragging = ref(false);
  let startX = 0;

  const getDeckStyle = (index: number) => {
    const total = projects.length;
    const offset = (index - activeDeckIndex.value + total) % total;

    if (offset === 0) {
      // Active top card: straight, scale 1.0, z-index 30
      const rotation = dragX.value * 0.05;
      return {
        zIndex: 30,
        transform: `translateX(${dragX.value}px) rotate(${rotation}deg) scale(1)`,
        opacity: 1,
        transition: isDragging.value ? 'none' : 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.45s ease-out',
      };
    } else if (offset === 1) {
      // Middle card underneath: rotated -5deg, offset left so edge peeks out on left!
      return {
        zIndex: 20,
        transform: 'translateX(-14px) translateY(12px) rotate(-5deg) scale(0.95)',
        opacity: 0.85,
        transition: 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.45s ease-out',
      };
    } else {
      // Back card underneath: rotated +5deg, offset right so edge peeks out on right!
      return {
        zIndex: 10,
        transform: 'translateX(14px) translateY(24px) rotate(5deg) scale(0.90)',
        opacity: 0.65,
        transition: 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.45s ease-out',
      };
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    isDragging.value = true;
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.value) return;
    dragX.value = e.touches[0].clientX - startX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.value) return;
    isDragging.value = false;
    if (Math.abs(dragX.value) > 50) {
      activeDeckIndex.value = (activeDeckIndex.value + 1) % projects.length;
    }
    dragX.value = 0;
  };

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.value = true;
    startX = e.clientX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return;
    dragX.value = e.clientX - startX;
  };

  const handleMouseUp = () => {
    if (!isDragging.value) return;
    isDragging.value = false;
    if (Math.abs(dragX.value) > 50) {
      activeDeckIndex.value = (activeDeckIndex.value + 1) % projects.length;
    }
    dragX.value = 0;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  });
</script>
