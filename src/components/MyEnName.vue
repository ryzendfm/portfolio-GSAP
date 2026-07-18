<template>
  <h1
    id="svg-my-en-name"
    :class="$attrs.class"
    class="text-flax-smoke-900 flex w-full leading-[0.8] font-extrabold uppercase"
    aria-label="Sooriyaa TN"
  >
    <span
      v-for="(char, i) in letters"
      :key="i"
      aria-hidden="true"
      class="name-letter font-title! inline-block translate-y-full -tracking-wider will-change-transform"
      >{{ char }}</span
    >
  </h1>
</template>

<script setup lang="ts">
  const letters = 'SOORIYAA'.split('');
</script>

<style scoped>
  h1 {
    font-size: clamp(4rem, 1.203rem + 10.0714vw, 10.25rem);
  }
</style>
