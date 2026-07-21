<template>
  <section
    id="identity"
    class="text-flax-smoke-200 relative bg-[#0B0B0A]"
  >
    <div
      ref="pinRef"
      class="flex-center common-padding min-h-svh w-full flex-col overflow-clip"
    >
      <p
        class="heading-6 text-flax-smoke-400 mb-6 font-bold tracking-[0.3em] uppercase"
      >
        ( I am a )
      </p>

      <div
        class="heading-1 relative flex h-[1.3em] w-full items-center justify-center overflow-clip leading-none"
      >
        <h2
          v-for="(role, i) in roles"
          :key="role"
          :ref="(el) => (wordRefs[i] = el as HTMLElement)"
          class="heading-1 font-title! absolute translate-y-full text-center leading-none font-extrabold uppercase"
          :class="i === roles.length - 1 ? 'text-flax-smoke-50' : ''"
        >
          {{ role }}
        </h2>
      </div>

      <p
        id="positioning-line"
        class="heading-4 font-fancy text-flax-smoke-300 mt-12 max-w-[30ch] text-center text-balance opacity-0"
      >
        "{{ identity.positioning }}"
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { identity } from '@/data';

  gsap.registerPlugin(ScrollTrigger);

  const roles = identity.roles;
  const pinRef = ref<HTMLElement | null>(null);
  const wordRefs = ref<HTMLElement[]>([]);

  let mm: gsap.MatchMedia | null = null;

  onMounted(() => {
    const words = wordRefs.value.filter(Boolean);
    if (!words.length) return;

    // The same pinned word-morph on all sizes; only the scroll distance is
    // tuned per breakpoint. matchMedia re-runs (and cleans up) on resize /
    // orientation change, so this no longer reads width once at mount.
    mm = gsap.matchMedia();

    const build = (endScale: number) => {
      // First role visible, the rest queued below.
      gsap.set(words, { y: '100%' });
      gsap.set(words[0], { y: '0%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.value,
          start: 'top top',
          end: `+=${words.length * endScale}%`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          refreshPriority: 20,
        },
      });

      for (let i = 1; i < words.length; i++) {
        tl.to(words[i - 1], {
          y: '-100%',
          duration: 1,
          ease: 'power2.inOut',
        }).to(
          words[i],
          { y: '0%', duration: 1, ease: 'power2.inOut' },
          '<',
        );
      }

      tl.to('#positioning-line', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    mm.add('(min-width: 768px)', () => build(100));
    mm.add('(max-width: 767px)', () => build(70));
  });

  onBeforeUnmount(() => {
    mm?.revert();
  });
</script>
