<template>
  <!-- Interactive pipeline element below the intro copy. Layout swaps at 768px:
       scattered tap-dots on mobile, a revealed horizontal line on desktop. -->
  <div class="relative mt-[8%] w-full">
    <PipelineDesktop v-if="isDesktop" />
    <PipelineMobile v-else />
  </div>
</template>

<script setup lang="ts">
  import { useMediaQuery } from '@vueuse/core';
  import PipelineDesktop from './PipelineDesktop.vue';
  import PipelineMobile from './PipelineMobile.vue';

  const isDesktop = useMediaQuery('(min-width: 768px)');
</script>
