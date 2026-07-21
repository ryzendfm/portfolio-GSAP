<template>
  <section id="work" ref="sectionRef" class="relative">
    <!-- Pinned Intro + Featured Cards Screen -->
    <div
      ref="pinRef"
      class="common-padding flex min-h-svh w-full flex-col justify-center overflow-clip pt-[8vh] pb-[6vh]"
    >
      <!-- Intro -->
      <div>
        <h3
          id="work-heading"
          v-html="headingText"
          class="heading-1 text-start leading-none font-bold uppercase"
        ></h3>

        <div
          id="work-text"
          class="md:column-gap text-flax-smoke-300 section-gap flex flex-col gap-3 justify-end opacity-0 lg:grid lg:grid-cols-12 lg:gap-0 mt-4"
        >
          <p
            class="heading-6 text-flax-smoke-300/85 col-span-4 text-left text-nowrap lg:col-start-2 lg:text-center"
          >
            ( {{ domains.length }} DOMAINS )
          </p>
          <p
            class="heading-4 font-fancy w-full text-balance sm:font-semibold lg:col-span-7"
          >
            Six domains, one connected practice. Each one below is its own body of
            work — open any to see everything.
          </p>
        </div>
      </div>

      <!-- Featured project cards (reveal one-by-one on scroll while pinned) -->
      <FeaturedProjects class="mt-8 lg:mt-12" />
    </div>

    <!-- One full-height section per domain -->
    <CategorySection
      v-for="(domain, i) in domains"
      :key="domain.id"
      :domain="domain"
      :index="i"
    />
  </section>
</template>

<script setup lang="ts">
  import { nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { domains } from '@/data';
  import { textSplitterIntoChar } from '@/functions';
  import CategorySection from './CategorySection.vue';
  import FeaturedProjects from './FeaturedProjects.vue';

  gsap.registerPlugin(ScrollTrigger);

  const headingText = ref('Selected Work /');
  const sectionRef = ref<HTMLElement | null>(null);
  const pinRef = ref<HTMLElement | null>(null);

  let ctx: gsap.Context | null = null;

  onBeforeMount(() => {
    headingText.value = textSplitterIntoChar('Selected Work / ', true);
  });

  onMounted(() => {
    nextTick(() => {
      ctx = gsap.context(() => {
        const root = sectionRef.value;
        if (!root) return;

        const headingLetters = root.querySelectorAll('#work-heading .letters');
        const workText = root.querySelector('#work-text');
        const cards = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll('.feat-card'),
        );

        const mm = gsap.matchMedia();

        // Pin + scrub reveal on desktop (lg). Mobile uses non-pinned fluid reveal.
        mm.add('(min-width: 1024px)', () => {
          gsap.set(headingLetters, { y: '100%', autoAlpha: 0 });
          gsap.set(workText, { y: 30, autoAlpha: 0 });
          gsap.set(cards, { y: 60, autoAlpha: 0, scale: 0.96 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinRef.value,
              start: 'top top',
              end: '+=120%',
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
              refreshPriority: 10,
            },
          });

          tl.to(headingLetters, {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.012,
            ease: 'power3.out',
          })
            .to(
              workText,
              { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
              '<0.1',
            )
            .to(
              cards,
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.35,
                ease: 'power2.out',
              },
              '<0.2',
            );
        });

        mm.add('(max-width: 1023px)', () => {
          gsap.set(headingLetters, { y: '100%', autoAlpha: 0 });
          gsap.set(workText, { y: 20, autoAlpha: 0 });
          gsap.set(cards, { y: 40, autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinRef.value,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          });

          tl.to(headingLetters, {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.01,
            ease: 'power3.out',
          })
            .to(
              workText,
              { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
              '<0.1',
            )
            .to(
              cards,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
              },
              '<0.15',
            );
        });

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, sectionRef.value ?? undefined);
    });
  });

  onBeforeUnmount(() => {
    ctx?.revert();
  });
</script>
