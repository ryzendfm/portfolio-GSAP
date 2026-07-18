<template>
  <div
    class="pipeline-icon relative inline-flex flex-none items-center justify-center"
  >
    <button
      type="button"
      class="flex-center relative rounded-full transition-all duration-200 hover:scale-108 focus:scale-108 active:scale-95"
      :class="{ 'scale-108': active }"
      :style="tileStyle"
      :aria-label="domain.label"
      :aria-pressed="mode === 'tap' ? active : undefined"
      @click="onClick"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @focus="onEnter"
      @blur="onLeave"
    >
      <!-- Circular tile: solid sage-green background, no colored border. -->
      <span
        class="absolute inset-0 rounded-full"
        :style="{
          backgroundColor: '#b6b79f',
        }"
      />
      <!-- Dark icon on top -->
      <span class="relative block" :style="[iconStyle, { color: '#1c1d16' }]">
        <component :is="domain.icon" />
      </span>
    </button>

    <!-- Label — absolutely positioned so it never shifts surrounding layout.
         `tap` renders a pill below the tile; `hover` a tooltip above it. -->
    <span
      ref="labelRef"
      class="heading-6 text-flax-smoke-100 pointer-events-none absolute left-1/2 z-10 rounded-full px-3 py-1 font-semibold whitespace-nowrap opacity-0"
      :class="mode === 'tap' ? 'top-full mt-2' : 'bottom-full mb-2'"
      :style="{
        backgroundColor: '#1c1d16',
        border: `1px solid ${domain.color}66`,
      }"
      role="tooltip"
    >
      {{ domain.label }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import gsap from 'gsap';
  import { usePreferredReducedMotion } from '@vueuse/core';
  import type { pipelineDomainType } from './domains';

  const props = withDefaults(
    defineProps<{
      domain: pipelineDomainType;
      // Whether the icon has entered (desktop reveal). Mobile dots are always
      // revealed, so this stays true there.
      revealed?: boolean;
      // Whether this icon's label is currently shown (parent-controlled in tap
      // mode so only one is visible at a time).
      active?: boolean;
      mode?: 'tap' | 'hover';
      // Tile diameter in px. Kept >= 44 so the tap target meets a11y minimums.
      size?: number;
    }>(),
    { revealed: true, active: false, mode: 'hover', size: 56 },
  );

  const emit = defineEmits<{ (e: 'toggle', id: string): void }>();

  const reduced = usePreferredReducedMotion();
  const labelRef = ref<HTMLElement | null>(null);
  const hovered = ref(false);

  const tileSize = computed(() => Math.max(44, props.size));
  const tileStyle = computed(() => ({
    width: `${tileSize.value}px`,
    height: `${tileSize.value}px`,
  }));
  // Sketch sits at ~58% of the tile so the accent ring stays visible.
  const iconStyle = computed(() => {
    const s = Math.round(tileSize.value * 0.58);
    return { width: `${s}px`, height: `${s}px` };
  });

  // The label is shown by `active` in tap mode and by hover/focus in hover mode.
  const showLabel = computed(() =>
    props.mode === 'tap' ? props.active : hovered.value,
  );

  const onClick = () => {
    if (props.mode === 'tap') emit('toggle', props.domain.id);
  };
  const onEnter = () => {
    if (props.mode === 'hover') hovered.value = true;
  };
  const onLeave = () => {
    if (props.mode === 'hover') hovered.value = false;
  };

  // Animate the label in/out with GSAP. Reduced motion → instant show/hide.
  watch(showLabel, (show) => {
    const el = labelRef.value;
    if (!el) return;
    gsap.killTweensOf(el);

    if (reduced.value === 'reduce') {
      gsap.set(el, { opacity: show ? 1 : 0, scale: 1, y: 0 });
      return;
    }

    if (show) {
      const from = props.mode === 'hover' ? 4 : 0;
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.9, y: from },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: props.mode === 'hover' ? 0.12 : 0.18,
          ease: 'power2.out',
        },
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        scale: 0.9,
        duration: props.mode === 'hover' ? 0.12 : 0.15,
        ease: 'power2.in',
      });
    }
  });
</script>
