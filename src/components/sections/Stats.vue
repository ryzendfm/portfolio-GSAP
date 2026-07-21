<template>
  <section id="stats" class="common-padding mb-20">
    <div class="border-flax-smoke-300 grid grid-cols-1 gap-8 border-t pt-12 sm:grid-cols-2">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        :ref="(el) => (statRefs[i] = el as HTMLElement)"
        class="stat-item flex flex-col"
      >
        <span
          :ref="(el) => (valueRefs[i] = el as HTMLElement)"
          class="heading-display font-title! leading-none font-extrabold -tracking-wider"
        >
          {{ stat.value }}
        </span>
        <span
          class="heading-5 text-flax-smoke-600 mt-2 font-medium uppercase"
          >{{ stat.label }}</span
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { stats } from '@/data';

  gsap.registerPlugin(ScrollTrigger);

  const statRefs = ref<HTMLElement[]>([]);
  const valueRefs = ref<HTMLElement[]>([]);

  // Animate the leading integer in a stat value ("150+" -> counts to 150).
  const animateCounter = (el: HTMLElement, raw: string) => {
    const match = raw.match(/\d[\d.,]*/);
    if (!match) return;
    const numStr = match[0].replace(/,/g, '');
    const target = parseFloat(numStr);
    if (Number.isNaN(target)) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        const current = Number.isInteger(target)
          ? Math.round(obj.val).toString()
          : obj.val.toFixed(1);
        el.textContent = raw.replace(match[0], current);
      },
      onComplete: () => {
        el.textContent = raw;
      },
    });
  };

  onMounted(() => {
    statRefs.value.filter(Boolean).forEach((item, i) => {
      const valueEl = valueRefs.value[i];
      const raw = stats[i].value;

      gsap.from(item, {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          onEnter: () => valueEl && animateCounter(valueEl, raw),
        },
      });
    });
  });
</script>
