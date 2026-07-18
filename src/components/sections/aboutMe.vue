<template>
  <section
    id="about-me-section"
    class="common-padding text-flax-smoke-200 relative z-10 flex min-h-svh flex-col justify-center overflow-y-clip rounded-t-3xl bg-[#0B0B0A] will-change-auto"
  >
    <div class="md:column-gap grid grid-cols-12 items-center gap-y-8">
      <!-- ─── Left: portrait ─────────────────────────────────────────── -->
      <div
        class="pointer-events-none order-1 col-span-full select-none -mx-5 sm:-mx-[3%] md:mx-0 -mt-10 sm:-mt-[2%] md:mt-0 md:order-1 md:col-span-5 lg:col-span-4"
      >
        <!-- Wrapper constrains height so image never overflows a single viewport -->
        <div class="relative mx-auto max-h-[58svh] w-full overflow-hidden rounded-t-3xl rounded-b-xl md:rounded-lg">
          <img
            :src="profile2"
            class="h-full w-full object-cover object-top mix-blend-screen brightness-90 grayscale"
            style="max-height: 58svh"
            alt="Headshot of Sooriyaa TN"
            @load="onImageLoad"
          />
          <!-- Subtle bottom gradient so image fades cleanly into section bg -->
          <span
            class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B0B0A] to-transparent"
          />
        </div>
      </div>

      <!-- ─── Right: copy ────────────────────────────────────────────── -->
      <div
        class="order-2 col-span-full flex flex-col md:order-2 md:col-span-7 lg:col-span-8"
      >
        <!-- Down-arrow: desktop only, small & aligned to left edge of text block -->
        <div class="hide-on-mobile mb-2 overflow-hidden">
          <svg
            id="down-arrow-2"
            stroke="currentColor"
            fill="none"
            stroke-width="1.25"
            viewBox="6 6 12 12"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-8 -translate-x-full opacity-0"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line x1="7" y1="7" x2="17" y2="17" />
            <polyline points="17 7 17 17 7 17" />
          </svg>
        </div>

        <!-- Kinetic animated heading -->
        <h3
          id="little-bit-about-me"
          v-html="aboutMe"
          class="heading-1-alt font-title! leading-[0.92] font-extrabold uppercase"
        />

        <!-- One-liner positioning tagline -->
        <p
          class="heading-5 mt-5 w-full max-w-[40ch] text-balance font-medium leading-snug text-flax-smoke-300"
        >
          I don't just learn tools. I combine them — AI, engineering, motion,
          3D, and art all feed into one connected creative process.
        </p>

        <!-- Label + bio -->
        <div
          class="mt-7 flex flex-col justify-start gap-3 sm:flex-row sm:gap-12"
        >
          <p class="heading-6 text-nowrap text-flax-smoke-300/75 sm:pt-1">
            ( ABOUT ME )
          </p>
          <p class="heading-6 font-fancy w-full text-balance sm:max-w-[46ch]">
            CS student and creative technologist. I build agentic AI systems and
            full-stack software, and I edit motion, sculpt in Blender, paint
            digital art, and shoot photography.<br /><br />
            Always exploring how technology and creativity combine — usually
            somewhere between a fine-tuned model and a sky study.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import {
    animateSplitText,
    animateAboutMeSectionLeave,
  } from '@/animations';
  import { profile2 } from '@/assets/images';
  import { textSplitterIntoChar } from '@/functions';
  import { onBeforeMount, onMounted, ref } from 'vue';

  gsap.registerPlugin(ScrollTrigger);

  const aboutMe = ref('');

  const onImageLoad = () => {
    ScrollTrigger.refresh();
  };

  onBeforeMount(() => {
    aboutMe.value = textSplitterIntoChar(
      'AI, Engineer, Artist, Maker/',
      true,
      true,
    );
  });

  onMounted(() => {
    animateSplitText(
      '#little-bit-about-me .letters',
      '#little-bit-about-me',
      1,
      0.01,
      0,
      () => {
        // Slide the arrow in from the left and fade it in
        gsap.to('#down-arrow-2', {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#down-arrow-2',
            toggleActions: 'play none none reverse',
          },
        });
      },
    );

    animateAboutMeSectionLeave('#about-me-section');

    // Repeatedly refresh ScrollTrigger offsets at intervals as layouts settle
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);
  });
</script>
