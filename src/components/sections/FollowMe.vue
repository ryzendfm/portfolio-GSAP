<template>
  <section class="border-t border-white/10 mt-24 pt-20 pb-12">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
      <!-- Info Column -->
      <div class="lg:col-span-5">
        <h4
          class="heading-6 font-title! mb-3 flex items-center gap-2 leading-none font-bold uppercase"
          :style="{ color: color }"
        >
          <span
            class="inline-block size-2.5 rounded-full"
            :style="{ backgroundColor: color }"
          ></span>
          STAY UPDATED
        </h4>
        <h2 class="heading-2 font-title! font-extrabold uppercase leading-[0.95] tracking-tight">
          Follow the<br />Process
        </h2>
        <p class="heading-5 font-fancy text-flax-smoke-300 mt-4 max-w-[36ch] text-balance">
          Behind-the-scenes content, motion design workflows, and creative tutorials. Join the journey on social media.
        </p>
      </div>

      <!-- Interactive Cards Column. Side-by-side thin buttons. -->
      <div class="lg:col-span-7 flex flex-row gap-3 sm:gap-4 sm:justify-end w-full">
        <!-- GitHub Card -->
        <a
          href="https://github.com/ryzendfm"
          target="_blank"
          class="group relative flex flex-1 sm:flex-initial items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 sm:w-auto min-w-[145px] sm:min-w-[170px] rounded-xl bg-[#0F0F0E]/80 border border-white/10 hover:border-[#238636]/40 hover:shadow-[0_0_30px_rgba(35,134,54,0.08)] transition-all duration-300 ease-out overflow-clip select-none"
        >
          <!-- Hover brand accent background glow -->
          <div
            class="absolute -right-10 -top-10 size-20 bg-[#238636] opacity-0 group-hover:opacity-[0.06] blur-[40px] transition-opacity duration-700 pointer-events-none"
          ></div>

          <!-- Logo on the Left -->
          <svg viewBox="0 0 24 24" class="size-6 text-white fill-current flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>

          <!-- Text on the Right -->
          <div class="flex flex-col text-left">
            <span class="text-[9px] font-bold uppercase tracking-wider text-flax-smoke-400">Follow me on</span>
            <span class="text-xs sm:text-sm font-black text-white leading-tight mt-0.5">GitHub</span>
          </div>
        </a>

        <!-- HuggingFace Card -->
        <a
          href="https://huggingface.co/ryzdfm"
          target="_blank"
          class="group relative flex flex-1 sm:flex-initial items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 sm:w-auto min-w-[145px] sm:min-w-[170px] rounded-xl bg-[#0F0F0E]/80 border border-white/10 hover:border-[#FFD21E]/40 hover:shadow-[0_0_30px_rgba(255,210,30,0.08)] transition-all duration-300 ease-out overflow-clip select-none"
        >
          <!-- Hover brand accent background glow -->
          <div
            class="absolute -right-10 -top-10 size-20 bg-[#FFD21E] opacity-0 group-hover:opacity-[0.05] blur-[40px] transition-opacity duration-700 pointer-events-none"
          ></div>

          <!-- Logo on the Left -->
          <img
            src="/media/hf-logo.svg"
            alt=""
            class="size-6 object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
          />

          <!-- Text on the Right -->
          <div class="flex flex-col text-left">
            <span class="text-[9px] font-bold uppercase tracking-wider text-flax-smoke-400">Follow me on</span>
            <span class="text-xs sm:text-sm font-black text-white leading-tight mt-0.5">Hugging Face</span>
          </div>
        </a>
      </div>
    </div>
  </section>

</template>

<script setup lang="ts">

  defineProps<{
    color?: string;
  }>();
</script>
