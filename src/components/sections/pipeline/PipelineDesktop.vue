<template>
  <div ref="rowRef" class="relative w-full py-12 lg:py-16">
    <!-- 6 domain icons row: alternating Y-axis layout -->
    <div class="relative z-10 flex w-full items-center justify-between px-4 lg:px-8">
      <div
        v-for="(domain, i) in pipelineDomains"
        :key="domain.id"
        :ref="(el) => (itemRefs[i] = el as HTMLElement)"
        class="flex flex-col items-center justify-center"
        :class="i % 2 === 1 ? 'translate-y-12 lg:translate-y-16' : '-translate-y-4 lg:-translate-y-6'"
        style="opacity: 0"
      >
        <PipelineIcon
          :domain="domain"
          mode="hover"
          :size="92"
          :tooltip-pos="i % 2 === 1 ? 'bottom' : 'top'"
        />
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
      gsap.set(items, { opacity: 1, scale: 1 });
      return;
    }

    // Pin the section while the icons pop up sequentially, then release.
    const pinTarget =
      (rowRef.value?.closest('.common-padding') as HTMLElement) ?? rowRef.value;

    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTarget,
          start: 'top top',
          end: '+=140%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          refreshPriority: 15,
        },
      });

      // Bouncy spring pop-up reveal left-to-right
      items.forEach((el, i) => {
        tl.fromTo(
          el,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(2)' },
          i * 0.4,
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
