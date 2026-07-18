<template>
  <div class="relative w-full aspect-4/3 overflow-visible select-none">
    <!-- Cards loop -->
    <div
      v-for="(item, idx) in normalizedMedia"
      :key="idx"
      class="absolute transition-all duration-500 ease-out"
      :class="[
        cardClasses[idx].layout,
        isHovered === idx ? 'z-40' : cardClasses[idx].z
      ]"
      :style="getCardStyle(idx)"
      @mouseenter="isHovered = idx"
      @mouseleave="isHovered = null"
    >
      <!-- Tape (torn paper tape) -->
      <div
        v-if="cardClasses[idx].tape"
        class="absolute torn-tape z-30"
        :class="cardClasses[idx].tape.class"
        :style="cardClasses[idx].tape.style"
      ></div>

      <!-- Card container with equal borders -->
      <div
        class="bg-[#F4F4F1] p-[6px] sm:p-2.5 shadow-[0_8px_18px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] rounded-sm border border-[#D2D3C3]/40 w-full transition-shadow duration-500"
      >
        <!-- Photo frame / Video container -->
        <div class="relative w-full bg-[#1C1D16] overflow-hidden rounded-[1px]">
          <video
            v-if="isVideoSrc(item.src)"
            :src="item.src"
            autoplay
            loop
            muted
            playsinline
            class="block w-full h-auto object-cover transition-all duration-700 hover:scale-105"
          ></video>
          <img
            v-else
            :src="item.src"
            :alt="item.label || 'Art work'"
            loading="lazy"
            class="block w-full h-auto transition-all duration-700 hover:scale-105"
          />
          <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/15 to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { mediaItemType } from '@/data';
  import { isVideoSrc } from '@/composables/useWorkItems';

  const props = defineProps<{
    media: mediaItemType[];
    color?: string;
  }>();

  const isHovered = ref<number | null>(null);

  // Make sure we have exactly 3 items. If not, repeat or pad.
  const normalizedMedia = computed(() => {
    const list = [...props.media];
    while (list.length < 3) {
      list.push({ src: list[0]?.src || '' });
    }
    return list.slice(0, 3);
  });

  // Card configuration matching the Envato template layout
  // Left Card, Right Top Card, Right Bottom Card
  const cardClasses = [
    {
      layout: 'left-[12%] bottom-[4%] w-[32%]',
      z: 'z-20',
      rotation: -7,
      tape: {
        class: 'top-[-8px] left-[15%] w-14 h-4.5 rotate-[-12deg]',
        style: {
          backgroundColor: 'rgba(235, 235, 230, 0.55)',
          backdropFilter: 'blur(1px)',
        },
      },
    },
    {
      layout: 'left-[35.5%] top-[4%] w-[29%]',
      z: 'z-10',
      rotation: 6,
      tape: {
        class: 'top-[-8px] right-[8%] w-14 h-4.5 rotate-[20deg]',
        style: {
          backgroundColor: 'rgba(235, 235, 230, 0.45)',
          backdropFilter: 'blur(1px)',
        },
      },
    },
    {
      layout: 'right-[12%] bottom-[6%] w-[32%]',
      z: 'z-30',
      rotation: 3,
      tape: {
        class: 'top-[-8px] left-[20%] w-12 h-4 rotate-[-30deg]',
        style: {
          backgroundColor: 'rgba(230, 230, 225, 0.5)',
          backdropFilter: 'blur(1px)',
        },
      },
    },
  ];

  const getCardStyle = (idx: number) => {
    const rot = cardClasses[idx].rotation;
    const hoverScale = isHovered.value === idx ? 1.06 : 1.0;
    const hoverOffset = isHovered.value === idx ? -10 : 0;
    return {
      transform: `rotate(${rot}deg) translateY(${hoverOffset}px) scale(${hoverScale})`,
    };
  };
</script>

<style scoped>
  .torn-tape {
    /* Jagged edges for masking tape using CSS clip-path */
    clip-path: polygon(
      0% 12%,
      4% 0%,
      96% 0%,
      100% 10%,
      98% 30%,
      100% 48%,
      97% 65%,
      100% 82%,
      98% 93%,
      100% 100%,
      96% 96%,
      4% 96%,
      0% 100%,
      3% 88%,
      0% 72%,
      2% 56%,
      0% 40%,
      3% 24%
    );
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }
</style>
