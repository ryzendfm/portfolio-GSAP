<template>
  <main
    v-if="domain"
    class="text-flax-smoke-200 relative min-h-svh bg-[#0B0B0A] pt-[12vh] pb-[10vh]"
  >
    <div class="common-padding">
      <!-- Back -->
      <button
        type="button"
        class="group text-flax-smoke-400 hover:text-flax-smoke-100 mb-10 inline-flex items-center gap-2 transition-colors duration-300"
        @click="goBack"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          class="transition-transform duration-300 group-hover:-translate-x-1"
        >
          <path
            d="M10 3L5 8L10 13"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="font-fancy text-sm font-semibold uppercase">Back</span>
      </button>

      <!-- Header -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p
            class="heading-6 font-title! mb-3 flex items-center gap-2 leading-none font-bold uppercase"
            :style="{ color: domain.color }"
          >
            <span
              class="inline-block size-2.5 rounded-full"
              :style="{ backgroundColor: domain.color }"
            ></span>
            ( {{ items.length }} PROJECTS )
          </p>
          <h1 class="heading-1 leading-[0.95] font-extrabold uppercase">
            {{ domain.label }}
          </h1>
        </div>
        <div class="lg:col-span-4">
          <p
            class="heading-5 font-fancy text-flax-smoke-300 max-w-[46ch] text-balance"
          >
            {{ domain.blurb }}
          </p>
        </div>
        <div
          class="absolute top-[12vh] right-5 z-20 flex justify-end sm:right-[3%] lg:static lg:col-span-1 lg:col-start-12 lg:top-auto lg:right-auto"
        >
          <MagneticEffect divId="audio-toggle" textId="audio-toggle-icon">
            <div
              @click="toggleMute"
              id="audio-toggle"
              class="flex-center bg-flax-smoke-400 size-14 cursor-pointer flex-col rounded-full text-black hover:bg-white transition-colors duration-300 shadow-[0_8px_18px_rgba(0,0,0,0.3)] lg:size-20"
              :title="isMuted ? 'Unmute Dynamic Sounds' : 'Mute Dynamic Sounds'"
            >
              <svg
                v-if="isMuted"
                id="audio-toggle-icon"
                class="size-1/2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="22" y1="9" x2="16" y2="15"></line>
                <line x1="16" y1="9" x2="22" y2="15"></line>
              </svg>
              <svg
                v-else
                id="audio-toggle-icon"
                class="size-1/2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            </div>
          </MagneticEffect>
        </div>
      </div>

      <!-- Alternating project rows -->
      <div class="mt-[8%] flex flex-col gap-[10vh] lg:gap-[14vh]">
        <article
          v-for="(item, i) in items"
          :key="item.key"
          class="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"
        >
          <!-- Media Column -->
          <div
            class="group relative"
            :class="[
              isReversed(i) ? 'lg:order-2' : 'lg:order-1',
              item.name === 'Interactive WebGL Showroom' ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-6'
            ]"
          >
            <template v-if="domain.id === 'art' || domain.id === 'photo'">
              <ArtCollage
                :media="item.media"
                :color="item.color"
              />
            </template>
            <template v-else>
              <div
                class="relative overflow-clip rounded-xl transition-transform duration-500 ease-out group-hover:-translate-y-1"
                :class="item.name === 'Interactive WebGL Showroom' && activeShowroomMode === '3d' ? 'aspect-[2/1] bg-[#b01010]' : 'w-full h-auto bg-flax-smoke-900'"
              >
                <template v-if="item.name === 'Interactive WebGL Showroom'">
                  <ModelViewer v-if="activeShowroomMode === '3d'" :modelUrl="modelUrl" />
                  <WorkMedia
                    v-else
                    :media="[{ src: videoUrl }]"
                    :is-detail="true"
                    :color="item.color"
                  />
                </template>
                <template v-else>
                  <WorkMedia
                    :media="item.media"
                    :is-detail="true"
                    :color="item.color"
                  />
                </template>
                <span
                  class="absolute top-4 left-4 z-20 size-3 rounded-full"
                  :style="{ backgroundColor: item.color }"
                ></span>

                <!-- Switcher for Interactive 3D / Site Recording -->
                <div
                  v-if="item.name === 'Interactive WebGL Showroom'"
                  class="absolute top-4 right-4 z-30 flex gap-1.5 bg-[#0B0B0A]/60 backdrop-blur-md p-1 rounded-full border border-white/10"
                >
                  <!-- Site Recording (Webpage) Button -->
                  <button
                    type="button"
                    @click.stop="activeShowroomMode = 'video'"
                    class="flex items-center justify-center size-8 rounded-full transition-all duration-300 cursor-pointer"
                    :style="activeShowroomMode === 'video' ? { backgroundColor: item.color, color: '#0B0B0A' } : { color: '#E4E4E0' }"
                    title="Site Recording"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="M10 4v4"></path>
                      <path d="M2 8h20"></path>
                      <path d="M6 4v4"></path>
                    </svg>
                  </button>

                  <!-- Interactive 3D (Cube) Button -->
                  <button
                    type="button"
                    @click.stop="activeShowroomMode = '3d'"
                    class="flex items-center justify-center size-8 rounded-full transition-all duration-300 cursor-pointer"
                    :style="activeShowroomMode === '3d' ? { backgroundColor: item.color, color: '#0B0B0A' } : { color: '#E4E4E0' }"
                    title="Interactive 3D"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5">
                      <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"></path>
                      <path d="M12 21v-9"></path>
                      <path d="M21 8.5 12 13.5 3 8.5"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </template>
          </div>

          <!-- Description + links Column -->
          <div
            :class="[
              isReversed(i) ? 'lg:order-1' : 'lg:order-2',
              item.name === 'Interactive WebGL Showroom' ? 'lg:col-span-5 xl:col-span-4' : 'lg:col-span-6'
            ]"
          >
            <p
              class="heading-6 font-title! mb-2 flex items-center gap-2 leading-none font-bold"
              :style="{ color: item.color }"
            >
              <span class="opacity-60">
                {{ String(i + 1).padStart(2, '0') }} /
                {{ String(items.length).padStart(2, '0') }}
              </span>
            </p>
            <h3 class="heading-2 font-title! font-extrabold uppercase">
              {{ item.name }}
            </h3>
            <p
              v-if="item.desc"
              class="heading-5 font-fancy text-flax-smoke-300 mt-4 max-w-[48ch] text-balance"
            >
              {{ item.desc }}
            </p>

            <!-- Link buttons -->
            <div
              v-if="linkList(item.links).length"
              class="mt-8 flex flex-wrap gap-3"
            >
              <LinkButton
                v-for="link in linkList(item.links)"
                :key="link.label"
                :label="link.label"
                :url="link.url"
                :color="item.color"
              />
            </div>
          </div>
        </article>
      </div>

      <!-- Follow Me CTA -->
      <FollowMe :color="domain.color" />
    </div>
  </main>
</template>

<script setup lang="ts">
  import {
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
    watch,
  } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { domains } from '@/data';
  import type { projectLinksType } from '@/data';
  import { workItemsFor } from '@/composables/useWorkItems';
  import { lenis } from '@/main';
  import { LinkButton } from '@/components/common';
  import WorkMedia from '@/components/sections/WorkMedia.vue';
  import FollowMe from '@/components/sections/FollowMe.vue';
  import ArtCollage from '@/components/sections/ArtCollage.vue';
  import ModelViewer from '@/components/sections/ModelViewer.vue';
  import { MagneticEffect } from '@/components';
  import { useAudioState } from '@/composables/useAudioState';

  const route = useRoute();
  const router = useRouter();

  const { isMuted, toggleMute } = useAudioState();

  // Audio state is a shared singleton, so an unmute here would leak to other
  // pages. Force it back to muted when leaving (and on entry, defensively) so
  // returning to a category / home always starts silent.
  const forceMuted = () => {
    if (!isMuted.value) toggleMute();
  };

  const activeShowroomMode = ref<'3d' | 'video'>('video');

  const modelUrl = `${import.meta.env.BASE_URL}media/porsche_with_cam.glb`;
  const videoUrl = `${import.meta.env.BASE_URL}media/porsche_site_recording.mp4`;

  const domainId = computed(() => String(route.params.id));
  const domain = computed(() => domains.find((d) => d.id === domainId.value));
  const items = computed(() => workItemsFor(domainId.value));

  // Alternate media/description sides every other row.
  const isReversed = (i: number) => i % 2 === 1;

  // Turn the links object into an ordered, label+url list of present links.
  const LINK_LABELS: Record<keyof projectLinksType, string> = {
    live: 'Live',
    github: 'GitHub',
    huggingface: 'Hugging Face',
    youtube: 'YouTube',
    instagram: 'Instagram',
    download: 'Download',
  };
  const linkList = (links: projectLinksType) =>
    (Object.keys(LINK_LABELS) as (keyof projectLinksType)[])
      .filter((k) => links[k])
      .map((k) => ({ label: LINK_LABELS[k], url: links[k] as string }));

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push({ name: 'home' });
  };

  // Reset scroll when navigating between categories.
  watch(domainId, async () => {
    lenis.scrollTo(0, { immediate: true });
  });

  onMounted(() => {
    // Ensure the category page starts at the top.
    lenis.scrollTo(0, { immediate: true });
    forceMuted();
  });

  // Reset audio when navigating away so an unmute doesn't persist elsewhere.
  onBeforeUnmount(forceMuted);
</script>
