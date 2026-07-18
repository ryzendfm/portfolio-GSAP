<template>
  <section :id="`category-${domain.id}`" ref="sectionRef" class="relative">
    <div
      ref="pinRef"
      class="common-padding flex min-h-svh w-full flex-col justify-center overflow-clip pt-[8vh] pb-[4%]"
    >
    <!-- Top row: title (left) + about & View All (right) -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-6">
        <p
          class="cat-index heading-6 font-title! mb-3 flex items-center gap-2 leading-none font-bold uppercase"
          :style="{ color: domain.color }"
        >
          <span
            class="inline-block size-2.5 rounded-full"
            :style="{ backgroundColor: domain.color }"
          ></span>
          ( {{ indexLabel }} )
        </p>
        <h3
          class="cat-title heading-1-alt leading-[0.95] font-extrabold uppercase"
        >
          {{ domain.label }}
        </h3>
      </div>

      <div class="cat-intro-right lg:col-span-6 lg:pl-[10%]">
        <p
          class="heading-5 font-fancy text-flax-smoke-300 max-w-[42ch] text-balance"
        >
          {{ domain.blurb }}
        </p>
        <LinkButton
          label="View All"
          :color="domain.color"
          class="mt-6"
          @click="viewAll"
        />
      </div>
    </div>

    <!-- Media cards: horizontal scroll on mobile, grid on desktop -->
    <div
      class="mt-[6%] flex flex-row overflow-x-auto gap-4 flex-nowrap lg:grid lg:grid-cols-4 lg:gap-4 lg:mt-[3%] scrollbar-none snap-x snap-mandatory px-5 sm:px-0 -mx-5 sm:mx-0 pb-4"
    >
      <a
        v-for="(item, i) in previewItems"
        :key="item.key"
        class="cat-card group block flex-shrink-0 w-[78vw] sm:w-[48vw] lg:w-auto snap-center lg:mt-0"
        :class="staggerClass(i)"
        :href="item.url"
        :target="item.url === '#' ? '_self' : '_blank'"
        @click="item.url === '#' && $event.preventDefault()"
      >
        <div
          class="bg-flax-smoke-900 relative aspect-square overflow-clip rounded-lg transition-transform duration-500 ease-out group-hover:-translate-y-2"
        >
          <WorkMedia
            :media="item.media"
            :is-detail="false"
            :color="item.color"
          />
          <span
            class="absolute top-3 left-3 z-20 size-3 rounded-full"
            :style="{ backgroundColor: item.color }"
          ></span>
        </div>
        <h4 class="heading-6 font-title! mt-3 font-bold uppercase">
          {{ item.name }}
        </h4>
        <p
          v-if="item.desc"
          class="text-flax-smoke-300/70 mt-1 max-w-[34ch] text-xs leading-snug"
        >
          {{ item.desc }}
        </p>
      </a>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import type { domainType } from '@/data';
  import { workItemsFor } from '@/composables/useWorkItems';
  import { LinkButton } from '@/components/common';
  import WorkMedia from './WorkMedia.vue';

  gsap.registerPlugin(ScrollTrigger);

  const props = defineProps<{ domain: domainType; index: number }>();

  const router = useRouter();
  const sectionRef = ref<HTMLElement | null>(null);
  const pinRef = ref<HTMLElement | null>(null);

  const indexLabel = computed(() => String(props.index + 1).padStart(2, '0'));

  const items = computed(() => workItemsFor(props.domain.id));
  // Show up to 4 as a preview; the rest live on the View All page.
  const previewItems = computed(() => items.value.slice(0, 4));

  // Vertical offset to echo the Moonstone staggered row.
  const staggerClass = (i: number) =>
    i % 2 === 1 ? 'lg:mt-[6%]' : 'lg:mt-0';

  const viewAll = () => {
    router.push({ name: 'category', params: { id: props.domain.id } });
  };

  let ctx: gsap.Context | null = null;

  onMounted(() => {
    ctx = gsap.context(() => {
      const root = sectionRef.value;
      if (!root) return;

      const index = root.querySelector('.cat-index');
      const title = root.querySelector('.cat-title');
      const intro = root.querySelector('.cat-intro-right');
      const cards = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll('.cat-card'),
      );

      // Pin + scrub reveal on desktop (lg). Mobile uses a lightweight,
      // non-pinned reveal to stay fluid and responsive.
      const mm = gsap.matchMedia();

      const buildDesktop = (end: string, stagger: number) => {
        gsap.set([index, title], { y: 60, autoAlpha: 0 });
        gsap.set(intro, { y: 40, autoAlpha: 0 });
        gsap.set(cards, { yPercent: 40, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.value,
            start: 'top top',
            end,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(index, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' })
          .to(
            title,
            { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' },
            '<0.05',
          )
          .to(
            intro,
            { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
            '<0.2',
          )
          .to(
            cards,
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger,
              ease: 'power2.out',
            },
            '<0.15',
          );
      };

      const buildMobile = (stagger: number) => {
        gsap.set([index, title], { y: 30, autoAlpha: 0 });
        gsap.set(intro, { y: 20, autoAlpha: 0 });
        gsap.set(cards, { x: 30, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.value,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.to(index, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' })
          .to(
            title,
            { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' },
            '<0.05',
          )
          .to(
            intro,
            { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
            '<0.15',
          )
          .to(
            cards,
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.5,
              stagger,
              ease: 'power2.out',
            },
            '<0.1',
          );
      };

      mm.add('(min-width: 1024px)', () => buildDesktop('+=140%', 0.12));
      mm.add('(max-width: 1023px)', () => buildMobile(0.06));
    }, sectionRef.value ?? undefined);
  });

  onBeforeUnmount(() => {
    ctx?.revert();
  });
</script>

<style scoped>
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
