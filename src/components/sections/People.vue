<template>
  <!-- common-padding  -->
  <section
    id="testimonials-section"
    class="common-padding relative mx-auto min-h-[auto] -translate-y-0 overflow-y-clip py-0 will-change-transform sm:min-h-svh"
  >
    <div
      class="border-flax-smoke-300 grid w-full grid-cols-12 border-b-[1px] pb-[clamp(2.25rem,2.1786rem_+_0.3571vi,2.5rem)]"
    >
      <h3
        class="heading-1 max-sm:heading-2 text-flax-smoke-950 col-span-full leading-none font-bold uppercase will-change-auto"
      >
        Don't take my <br />
        word for it /
      </h3>
      <div
        class="text-flax-smoke-800 section-gap col-span-full flex flex-col justify-end gap-3 sm:flex-row sm:justify-end sm:gap-20 lg:col-span-10"
      >
        <p class="heading-6 text-left text-nowrap uppercase sm:text-center">
          ( Testimonials )
        </p>
        <p class="heading-6 font-fancy w-full text-balance sm:max-w-[40ch]">
          A few words from the people I've built with — across AI systems,
          software, and creative work. Delivering work that lasts is always the
          priority.
        </p>
      </div>
    </div>

    <Slider />
  </section>
</template>

<script setup lang="ts">
  // import gsap from 'gsap';
  // import { ScrollTrigger } from 'gsap/all';
  // import { onMounted } from 'vue';
  import { Slider } from '../design';

  // gsap.registerPlugin(ScrollTrigger);

  // const animatePeopleSectionLeave = (id: string) => {
  //   gsap.to(id, {
  //     scrollTrigger: {
  //       trigger: id,
  //       markers: true,
  //       start: 'top 80%',
  //       end: '100% end',
  //     },
  //     duration: 0.7,
  //     y: '0',
  //   });
  // };
  // onMounted(() => {
  //   animatePeopleSectionLeave('#testimonials-section');
  // });
</script>
