<template>
  <div
    ref="containerRef"
    class="bg-flax-smoke-900 relative overflow-clip select-none"
    :class="isDetail ? 'w-full h-auto' : 'size-full'"
  >
    <!-- Switcher pills for detail view (CategoryPage) -->
    <div
      v-if="isDetail && media.length > 1"
      class="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex gap-1.5 bg-[#0B0B0A]/60 backdrop-blur-md p-1 rounded-full border border-white/10"
    >
      <button
        v-for="(m, idx) in media"
        :key="idx"
        type="button"
        @click.stop="selectMedia(idx)"
        class="size-7 sm:size-auto sm:px-3.5 sm:py-1 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer text-flax-smoke-300 hover:text-flax-smoke-100 hover:bg-white/5 flex items-center justify-center"
        :style="getTabStyle(idx)"
        :title="m.label || `Clip ${idx + 1}`"
      >
        <!-- Mobile Play Icon -->
        <svg viewBox="0 0 24 24" class="block sm:hidden size-3 fill-current">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <!-- Desktop Text -->
        <span class="hidden sm:inline">{{ m.label || `Clip ${idx + 1}` }}</span>
      </button>
    </div>

    <!-- Media element with transition fade -->
    <div
      class="relative transition-opacity duration-300 ease-out"
      :class="[
        isTransitioning ? 'opacity-0' : 'opacity-100',
        isDetail ? 'w-full h-auto' : 'size-full'
      ]"
    >
      <video
        v-if="currentMedia && isVideoSrc(currentMedia.src)"
        ref="videoRef"
        :src="currentMedia.src"
        :muted="isMuted || !isVisible || isTransitioning"
        playsinline
        :loop="media.length === 1"
        @ended="handleVideoEnded"
        @timeupdate="handleTimeUpdate"
        @loadstart="initVideoVolume"
        :class="isDetail ? 'w-full h-auto block' : 'absolute inset-0 size-full object-cover'"
      ></video>
      <img
        v-else-if="currentMedia"
        :src="currentMedia.src"
        :alt="currentMedia.label || 'Work media'"
        loading="lazy"
        :class="isDetail ? 'w-full h-auto block' : 'absolute inset-0 size-full object-cover'"
      />
    </div>

    <!-- Instagram/Netflix style progress dashes for card view (CategorySection) -->
    <div
      v-if="!isDetail && media.length > 1"
      class="absolute bottom-3 left-0 right-0 z-20 flex gap-1.5 px-3"
    >
      <div
        v-for="(_, idx) in media"
        :key="idx"
        class="h-1 flex-1 bg-white/25 rounded-full overflow-hidden"
      >
        <div
          class="h-full origin-left"
          :style="getProgressStyle(idx)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
  import type { mediaItemType } from '@/data';
  import { isVideoSrc } from '@/composables/useWorkItems';
  import { useAudioState } from '@/composables/useAudioState';
  import gsap from 'gsap';

  const props = withDefaults(
    defineProps<{
      media: mediaItemType[];
      isDetail?: boolean;
      color?: string;
    }>(),
    {
      isDetail: false,
      color: '#ffffff',
    }
  );

  const { isMuted } = useAudioState();

  const containerRef = ref<HTMLElement | null>(null);
  const videoRef = ref<HTMLVideoElement | null>(null);

  const activeIndex = ref(0);
  const isTransitioning = ref(false);
  const isVisible = ref(false);

  const videoProgress = ref(0);
  const isImageAnimated = ref(false);

  const currentMedia = computed(() => props.media[activeIndex.value] || null);

  let observer: IntersectionObserver | null = null;
  let imageTimer: ReturnType<typeof setTimeout> | null = null;

  const targetVolume = computed(() => {
    if (isMuted.value) return 0;
    if (!isVisible.value) return 0;
    if (isTransitioning.value) return 0;
    return 1;
  });

  const initVideoVolume = () => {
    if (videoRef.value) {
      videoRef.value.volume = 0;
    }
  };

  watch(targetVolume, (newVolume) => {
    if (!videoRef.value) return;
    gsap.to(videoRef.value, {
      volume: newVolume,
      duration: newVolume > 0 ? 0.6 : 0.4,
      ease: newVolume > 0 ? 'power1.out' : 'power1.inOut',
      overwrite: 'auto',
    });
  });

  watch(videoRef, (el) => {
    if (el) {
      el.volume = 0;
      if (!isMuted.value && isVisible.value && !isTransitioning.value) {
        gsap.to(el, {
          volume: 1,
          duration: 0.6,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }
    }
  });

  const selectMedia = (idx: number) => {
    if (activeIndex.value === idx || isTransitioning.value) return;
    isTransitioning.value = true;
    setTimeout(() => {
      activeIndex.value = idx;
      isTransitioning.value = false;
    }, 250);
  };

  const advanceMedia = () => {
    if (props.media.length <= 1) return;
    isTransitioning.value = true;
    setTimeout(() => {
      activeIndex.value = (activeIndex.value + 1) % props.media.length;
      isTransitioning.value = false;
    }, 250);
  };

  const handleVideoEnded = () => {
    if (props.media.length > 1) {
      advanceMedia();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.value && videoRef.value.duration) {
      videoProgress.value = videoRef.value.currentTime / videoRef.value.duration;
    }
  };

  const startTimer = () => {
    stopTimer();
    if (props.media.length <= 1) return;

    const mediaItem = currentMedia.value;
    if (mediaItem && !isVideoSrc(mediaItem.src) && isVisible.value) {
      imageTimer = setTimeout(() => {
        advanceMedia();
      }, 5000);
    }
  };

  const stopTimer = () => {
    if (imageTimer) {
      clearTimeout(imageTimer);
      imageTimer = null;
    }
  };

  const playVideo = () => {
    if (isVisible.value && videoRef.value) {
      videoRef.value.play().catch(() => {});
    }
  };

  watch(currentMedia, async () => {
    videoProgress.value = 0;
    isImageAnimated.value = false;
    await nextTick();
    playVideo();
    startTimer();

    if (videoRef.value && isVideoSrc(currentMedia.value.src)) {
      videoRef.value.volume = 0;
      if (!isMuted.value && isVisible.value && !isTransitioning.value) {
        gsap.to(videoRef.value, {
          volume: 1,
          duration: 0.6,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }
    }

    if (currentMedia.value && !isVideoSrc(currentMedia.value.src)) {
      setTimeout(() => {
        isImageAnimated.value = isVisible.value;
      }, 50);
    }
  });

  watch(isVisible, (visible) => {
    if (visible) {
      playVideo();
      startTimer();
      if (currentMedia.value && !isVideoSrc(currentMedia.value.src)) {
        setTimeout(() => {
          isImageAnimated.value = true;
        }, 50);
      }
    } else {
      videoRef.value?.pause();
      stopTimer();
      isImageAnimated.value = false;
    }
  });

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible.value = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );

    if (containerRef.value) {
      observer.observe(containerRef.value);
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    stopTimer();
  });

  const getTabStyle = (idx: number) => {
    if (activeIndex.value === idx) {
      return {
        backgroundColor: props.color,
        color: '#0B0B0A',
      };
    }
    return {};
  };

  const getProgressStyle = (idx: number) => {
    if (idx < activeIndex.value) {
      return {
        transform: 'scaleX(1)',
        backgroundColor: props.color,
      };
    }
    if (idx > activeIndex.value) {
      return {
        transform: 'scaleX(0)',
        backgroundColor: props.color,
      };
    }
    // Active index
    const isVid = currentMedia.value && isVideoSrc(currentMedia.value.src);
    if (isVid) {
      return {
        transform: `scaleX(${videoProgress.value})`,
        backgroundColor: props.color,
      };
    } else {
      return {
        transform: isImageAnimated.value ? 'scaleX(1)' : 'scaleX(0)',
        transition: isImageAnimated.value ? 'transform 5000ms linear' : 'none',
        backgroundColor: props.color,
      };
    }
  };
</script>
