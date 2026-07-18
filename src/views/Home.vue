<template>
  <main class="relative min-h-full">
    <Hero />
    <aboutMe />
    <div class="text-flax-smoke-200 relative bg-[#0B0B0A] py-[5%]">
      <IdentityMorph />
      <CreativePipeline />
      <Work />
      <Marquee />
    </div>

    <Timeline />
    <Stats />
    <Contact />
  </main>
</template>

<script setup lang="ts">
  import {
    Hero,
    aboutMe,
    Contact,
    IdentityMorph,
    CreativePipeline,
    Work,
    Timeline,
    Stats,
  } from '@/components/sections';
  import { Marquee } from '@/components/design';
</script>
