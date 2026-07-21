<template>
  <section id="timeline" class="common-padding mb-20">
    <div class="flex flex-col">
      <h3
        id="timeline-heading"
        v-html="headingText"
        class="heading-1 leading-none font-bold uppercase"
      ></h3>
      <div
        id="timeline-text"
        class="text-flax-smoke-300 section-gap flex flex-col gap-3 justify-end opacity-0 lg:grid lg:grid-cols-12 lg:gap-0"
      >
        <p
          class="heading-6 text-flax-smoke-300/85 col-span-4 text-left text-nowrap lg:col-start-2 lg:text-center"
        >
          ( THE PATH )
        </p>
        <p
          class="heading-4 font-fancy text-flax-smoke-600 w-full text-balance sm:font-semibold lg:col-span-7"
        >
          From first render to fine-tuned models — the years that built the
          practice.
        </p>
      </div>
    </div>

    <div class="border-flax-smoke-300 mt-16 border-t">
      <div
        v-for="(entry, i) in timeline"
        :key="entry.year"
        :ref="(el) => (rowRefs[i] = el as HTMLElement)"
        class="timeline-row border-flax-smoke-300 grid grid-cols-12 gap-4 border-b py-8"
      >
        <div class="col-span-12 md:col-span-3">
          <span
            class="heading-2 font-title! leading-none font-extrabold -tracking-wider"
            >{{ entry.year }}</span
          >
        </div>
        <div class="col-span-12 flex flex-wrap gap-3 md:col-span-9">
          <span
            v-for="item in entry.items"
            :key="item"
            class="border-flax-smoke-500/60 text-flax-smoke-700 rounded-full border px-3 py-1 text-xs font-semibold sm:px-3.5 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base md:font-medium"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { timeline } from '@/data';
  import { textSplitterIntoChar } from '@/functions';
  import { animateSplitText } from '@/animations';

  gsap.registerPlugin(ScrollTrigger);

  const headingText = ref('Timeline /');
  const rowRefs = ref<HTMLElement[]>([]);

  onBeforeMount(() => {
    headingText.value = textSplitterIntoChar('Timeline /', true);
  });

  onMounted(() => {
    animateSplitText(
      '#timeline-heading .letters',
      '#timeline-text',
      0.7,
      0.01,
      0,
    );

    rowRefs.value.filter(Boolean).forEach((row) => {
      gsap.from(row, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  });
</script>
