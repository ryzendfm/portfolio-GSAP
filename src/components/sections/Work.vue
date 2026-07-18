<template>
  <section id="work">
    <!-- Intro -->
    <div class="common-padding flex flex-col">
      <h3
        id="work-heading"
        v-html="headingText"
        class="heading-1 text-start leading-none font-bold uppercase"
      ></h3>

      <div
        id="work-text"
        class="md:column-gap text-flax-smoke-300 section-gap flex flex-col gap-3 justify-end opacity-0 lg:grid lg:grid-cols-12 lg:gap-0"
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
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { domains } from '@/data';
  import { textSplitterIntoChar } from '@/functions';
  import { animateSplitText } from '@/animations';
  import CategorySection from './CategorySection.vue';

  const headingText = ref('Selected Work /');

  onBeforeMount(() => {
    headingText.value = textSplitterIntoChar('Selected Work / ', true);
  });

  onMounted(() => {
    animateSplitText('#work-heading .letters', '#work-text', 0.7, 0.01, 0);
  });
</script>
