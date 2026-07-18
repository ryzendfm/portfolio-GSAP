<template>
  <section id="behind-the-work" class="common-padding mb-20">
    <div class="md:column-gap grid grid-cols-12 items-center">
      <div
        class="pointer-events-none col-span-full mb-8 rounded-lg select-none md:col-span-4 md:mb-0"
      >
        <img
          :src="profile2"
          class="aspect-square w-full rounded-lg object-cover object-top brightness-95 grayscale"
          alt="Sooriyaa TN"
        />
      </div>

      <div class="col-span-full md:col-span-8">
        <p class="heading-6 text-flax-smoke-500 mb-4 font-bold tracking-widest uppercase">
          ( Behind the work )
        </p>
        <h3
          id="behind-heading"
          v-html="headingText"
          class="heading-2 leading-tight font-extrabold uppercase"
        ></h3>
        <p
          id="behind-text"
          class="heading-5 text-flax-smoke-600 mt-6 max-w-[46ch] leading-snug opacity-0"
        >
          {{ identity.name }} — CS student and creative technologist at
          {{ identity.school }}. Always exploring how tech and creativity
          combine.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { profile2 } from '@/assets/images';
  import { identity } from '@/data';
  import { textSplitterIntoChar } from '@/functions';
  import { animateSplitText } from '@/animations';

  const headingText = ref('A human behind the projects /');

  onBeforeMount(() => {
    headingText.value = textSplitterIntoChar(
      'A human behind the projects /',
      true,
      true,
    );
  });

  onMounted(() => {
    animateSplitText('#behind-heading .letters', '#behind-text', 0.7, 0.01, 0);
  });
</script>
