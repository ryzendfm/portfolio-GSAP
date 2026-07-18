<template>
  <section
    id="pipeline"
    class="text-flax-smoke-200 relative bg-[#0B0B0A]"
  >
    <div class="common-padding min-h-svh w-full overflow-clip">
      <div class="flex flex-col">
        <h3
          id="pipeline-heading"
          v-html="headingText"
          class="heading-1 leading-none font-extrabold uppercase"
        ></h3>
        <div
          id="pipeline-text"
          class="text-flax-smoke-300 section-gap flex flex-col gap-3 justify-end opacity-0 lg:grid lg:grid-cols-12 lg:gap-0"
        >
          <p
            class="heading-6 text-flax-smoke-300/85 col-span-4 text-left text-nowrap lg:col-start-2 lg:text-center"
          >
            ( THE THREAD )
          </p>
          <p
            class="heading-4 font-fancy w-full text-balance sm:font-semibold lg:col-span-7"
          >
            Six domains, one process. Each feeds the next — a photograph becomes
            a painting, a painting becomes motion, motion becomes a system.
          </p>
        </div>
      </div>

      <!-- Interactive pipeline: scattered tap-dots (mobile) / revealed
           horizontal line (desktop). Replaces the old scroll-scrubbed timeline. -->
      <PipelineSection />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { textSplitterIntoChar } from '@/functions';
  import PipelineSection from './pipeline/PipelineSection.vue';

  gsap.registerPlugin(ScrollTrigger);

  const headingText = ref('Creative Pipeline /');

  onBeforeMount(() => {
    headingText.value = textSplitterIntoChar('Creative Pipeline /', true);
  });

  onMounted(() => {
    gsap.to('#pipeline-heading .letters', {
      onStart: () => {
        gsap.to('#pipeline-text', { opacity: 1, duration: 1.2 });
      },
      scrollTrigger: {
        trigger: '#pipeline-heading',
        start: 'top bottom',
        toggleActions: 'play none none reverse',
      },
      y: 0,
      autoAlpha: 1,
      duration: 0.7,
      stagger: 0.01,
      ease: 'power4.inOut',
    });
  });
</script>
