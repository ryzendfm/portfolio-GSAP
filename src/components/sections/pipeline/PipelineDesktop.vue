<template>
  <div ref="rowRef" class="relative w-full">
    <div class="relative flex w-full items-start justify-between">
      <div
        v-for="(domain, i) in pipelineDomains"
        :key="domain.id"
        :ref="(el) => (itemRefs[i] = el as HTMLElement)"
        class="flex flex-col items-center"
        style="opacity: 0"
      >
        <PipelineIcon :domain="domain" mode="hover" :size="64" />
        <!-- Static index + label below, matching the editorial numbering. -->
        <span
          class="heading-6 font-title! mt-4 font-bold uppercase"
          :style="{ color: domain.color }"
          >{{ String(i + 1).padStart(2, '0') }}</span
        >
        <span class="heading-6 text-flax-smoke-200 font-semibold">{{
          domain.label
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { usePreferredReducedMotion } from '@vueuse/core';
  import PipelineIcon from './PipelineIcon.vue';
  import { pipelineDomains } from './domains';

  gsap.registerPlugin(ScrollTrigger);

  const rowRef = ref<HTMLElement | null>(null);
  const itemRefs = ref<HTMLElement[]>([]);
  const reduced = usePreferredReducedMotion();
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    const items = itemRefs.value.filter(Boolean);
    if (!items.length) return;

    // Reduced motion: reveal instantly, no pin / scroll animation.
    if (reduced.value === 'reduce') {
      gsap.set(items, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Pin the whole section (heading + row) while the icons reveal, so the
    // view is locked in place until all six are on screen, then releases.
    const pinTarget =
      (rowRef.value?.closest('.common-padding') as HTMLElement) ?? rowRef.value;

    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTarget,
          start: 'top top',
          // Scroll distance the reveal is scrubbed across before unpinning.
          end: '+=140%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
        },
      });

      // Reveal each icon left-to-right, one clearly after the previous, so
      // it reads as a sequential reveal rather than a single fade.
      items.forEach((el, i) => {
        tl.fromTo(
          el,
          { opacity: 0, y: 24, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.6)' },
          i * 0.5,
        );
      });
      // Hold on the fully-revealed row briefly before releasing the pin.
      tl.to({}, { duration: 0.6 });
    }, rowRef.value!);
  });

  onBeforeUnmount(() => {
    ctx?.revert();
  });
</script>
