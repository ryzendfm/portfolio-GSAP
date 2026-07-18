<template>
  <BurgerMenuBtn
    @click="toggleBtnClickAnimation"
    class="z-9999 scale-0 drop-shadow-lg"
    id="burger"
  />

  <div
    @click="toggleBtnClickAnimation"
    class="fixed inset-0 z-9998 size-full bg-black opacity-50 select-none"
    :class="{ hidden: !isNavbarOpen }"
  ></div>

  <div
    tabindex="0"
    id="navbar"
    @keydown.esc="toggleBtnClickAnimation()"
    class="bg-flax-smoke-950 fixed top-[1dvh] right-0 z-9998 h-[98dvh] w-full translate-x-full rounded-s-lg p-5 will-change-auto select-none focus:outline-hidden max-md:w-[98%] sm:p-10 md:w-3/5 md:px-20 lg:w-2/5"
  >
    <Circles id="circles" class="absolute top-0 right-0 opacity-25" />
    <div class="flex h-full flex-col items-center justify-between">
      <div class="relative z-19 w-full">
        <ul
          class="heading-2 text-flax-smoke-50 mt-12 font-bold md:mt-24"
          id="navLinks"
        >
          <li
            class="overflow-y-clip"
            v-for="l in navbarLinks"
            :key="l.label"
            :id="l.label"
          >
            <a
              :href="l.url"
              @click="gotoSection(l.url)"
              class="group my-2 flex h-full w-fit translate-y-full cursor-pointer items-center justify-start leading-none will-change-auto"
            >
              <span
                class="bg-flax-smoke-50 h-4 w-4 scale-0 rounded-full opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100"
              ></span>
              <p
                class="font-fancy -translate-x-5 transition-all duration-300 ease-in-out group-hover:translate-x-5"
              >
                {{ l.label }}
              </p>
            </a>
          </li>
        </ul>
      </div>

      <div class="w-full">
        <div class="text-flax-smoke-50 mt-2 h-full font-normal">
          <p class="text-left text-sm font-bold uppercase">Email address</p>
          <Link
            class="font-medium tracking-wider"
            tag="p"
            :label="identity.email"
            :url="`mailto:${identity.email}`"
          />
          <div class="mt-6 flex flex-row flex-wrap justify-start gap-2.5">
            <a
              v-for="social in socialIconLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="contact flex-center size-10 rounded-full bg-flax-smoke-300 text-flax-smoke-950 opacity-0 transition-all duration-300 hover:scale-110 hover:bg-flax-smoke-200 active:scale-95 cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
              :title="social.name"
            >
              <!-- GitHub Icon -->
              <svg v-if="social.type === 'github'" viewBox="0 0 24 24" class="size-5 fill-current">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <!-- LinkedIn Icon -->
              <svg v-else-if="social.type === 'linkedin'" viewBox="0 0 24 24" class="size-5 fill-current">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <!-- Hugging Face Icon -->
              <svg v-else-if="social.type === 'huggingface'" viewBox="0 0 256 256" class="size-5">
                <path d="M230.721 172.7C230.183 170.673 229.313 168.75 228.146 167.008C228.396 166.091 228.587 165.159 228.714 164.217C229.543 158.241 227.471 152.77 223.567 148.537C221.452 146.225 219.185 144.698 216.784 143.761C218.36 137.018 219.157 130.117 219.161 123.193C219.161 120.03 218.982 116.932 218.682 113.88C218.526 112.356 218.337 110.836 218.115 109.32C217.428 104.847 216.408 100.431 215.064 96.11C214.183 93.2707 213.164 90.476 212.01 87.736C210.281 83.6782 208.262 79.75 205.969 75.982C204.465 73.475 202.827 71.0508 201.062 68.72C200.197 67.543 199.296 66.3938 198.358 65.274C195.58 61.898 192.561 58.7277 189.325 55.788C188.25 54.7997 187.145 53.8453 186.01 52.926C184.893 51.9943 183.751 51.0927 182.586 50.222C180.241 48.4766 177.818 46.8392 175.324 45.315C161.543 36.945 145.382 32.145 128.109 32.145C77.817 32.145 37.057 72.907 37.057 123.196C37.055 130.208 37.867 137.196 39.477 144.02C37.317 144.958 35.247 146.42 33.327 148.535C29.424 152.766 27.351 158.217 28.18 164.193C28.306 165.142 28.495 166.082 28.747 167.006C27.5811 168.749 26.7117 170.673 26.174 172.7C24.974 177.261 25.369 181.374 26.894 184.978C25.236 189.688 25.65 194.704 27.809 199.065C29.379 202.25 31.626 204.714 34.396 206.916C37.689 209.534 41.811 211.758 46.783 213.892C52.715 216.422 59.956 218.799 63.249 219.671C71.755 221.873 79.911 223.269 88.177 223.337C99.954 223.446 110.096 220.677 117.357 213.59C120.924 214.027 124.515 214.246 128.109 214.244C131.906 214.236 135.699 213.997 139.467 213.529C146.711 220.661 156.892 223.455 168.712 223.343C176.977 223.277 185.133 221.881 193.617 219.676C196.932 218.804 204.17 216.427 210.105 213.897C215.077 211.76 219.199 209.536 222.514 206.922C225.263 204.719 227.508 202.256 229.079 199.071C231.26 194.709 231.652 189.693 230.017 184.983C231.527 181.379 231.92 177.257 230.721 172.7ZM222.281 184.673C223.952 187.844 224.059 191.427 222.585 194.764C220.349 199.821 214.795 203.805 204.008 208.082C197.3 210.742 191.158 212.443 191.104 212.458C182.232 214.759 174.208 215.928 167.262 215.928C155.76 215.928 147.201 212.754 141.773 206.486C132.594 208.05 123.222 208.103 114.026 206.644C108.591 212.808 100.081 215.928 88.676 215.928C81.729 215.928 73.706 214.759 64.833 212.458C64.779 212.443 58.639 210.742 51.929 208.082C41.143 203.805 35.587 199.824 33.352 194.764C31.878 191.427 31.985 187.844 33.656 184.673C33.81 184.378 33.976 184.091 34.153 183.813C33.1516 182.309 32.4799 180.61 32.182 178.827C31.8842 177.045 31.967 175.22 32.425 173.472C33.089 170.949 34.46 168.851 36.322 167.344C35.425 165.87 34.8365 164.23 34.592 162.522C34.056 158.808 35.289 155.1 38.06 152.076C40.222 149.723 43.275 148.428 46.655 148.428H46.745C44.1965 140.259 42.9044 131.75 42.913 123.193C42.913 76.522 80.749 38.683 127.427 38.683C174.104 38.683 211.94 76.518 211.94 123.193C211.947 131.773 210.646 140.304 208.081 148.492C208.489 148.452 208.889 148.432 209.282 148.431C212.662 148.431 215.716 149.726 217.874 152.079C220.647 155.1 221.881 158.811 221.344 162.525C221.1 164.233 220.511 167.347 219.615 167.347C221.477 168.854 222.849 170.952 223.512 173.475C223.97 175.223 224.053 177.048 223.755 178.831C223.458 180.613 222.786 182.312 221.784 183.816C221.961 184.091 222.129 184.378 222.281 184.673Z" fill="white"/>
                <path d="M221.784 183.816C222.786 182.312 223.458 180.613 223.756 178.831C224.053 177.048 223.97 175.223 223.512 173.475C222.848 170.952 221.476 168.854 219.615 167.347C220.512 165.873 221.1 164.233 221.344 162.525C221.881 158.811 220.648 155.103 217.874 152.079C215.716 149.726 212.662 148.431 209.282 148.431C208.889 148.431 208.489 148.452 208.081 148.492C210.643 140.304 211.942 131.774 211.933 123.195C211.933 76.5231 174.097 38.6851 127.424 38.6851C80.75 38.6851 42.9099 76.5191 42.9099 123.195C42.9015 131.752 44.1936 140.261 46.742 148.43H46.6519C43.2719 148.43 40.219 149.724 38.06 152.077C35.287 155.098 34.0529 158.81 34.5899 162.523C34.8346 164.231 35.4231 165.872 36.3199 167.346C34.4579 168.852 33.086 170.95 32.422 173.473C31.9642 175.222 31.8817 177.047 32.1799 178.83C32.4781 180.612 33.1501 182.312 34.1519 183.816C33.9739 184.094 33.8099 184.381 33.6549 184.676C31.9849 187.847 31.877 191.43 33.352 194.767C35.588 199.824 41.1419 203.808 51.9289 208.085C58.6359 210.745 64.779 212.446 64.833 212.461C73.705 214.762 81.729 215.931 88.675 215.931C100.081 215.931 108.591 212.811 114.026 206.647C123.222 208.106 132.594 208.052 141.773 206.489C147.201 212.757 155.76 215.931 167.262 215.931C174.208 215.931 182.232 214.762 191.103 212.461C191.158 212.446 197.298 210.745 204.008 208.085C214.795 203.808 220.35 199.824 222.585 194.767C224.059 191.43 223.952 187.847 222.281 184.676C222.129 184.379 221.961 184.091 221.784 183.816ZM110.137 196.997C109.669 197.815 109.168 198.614 108.635 199.391C107.23 201.448 105.382 203.02 103.237 204.188C99.1369 206.424 93.947 207.205 88.675 207.205C80.346 207.205 71.808 205.256 67.023 204.015C66.787 203.954 37.689 195.735 41.373 188.739C41.993 187.562 43.0129 187.092 44.2979 187.092C49.4849 187.092 58.9299 194.816 62.9889 194.816C63.8959 194.816 64.5359 194.43 64.7969 193.488C66.5269 187.284 38.5039 184.676 40.8639 175.692C41.2799 174.102 42.41 173.456 43.998 173.456C50.856 173.455 66.248 185.516 69.467 185.516C69.714 185.516 69.8909 185.443 69.9869 185.291C70.0009 185.268 70.015 185.246 70.028 185.222C71.539 182.727 70.6719 180.913 60.3209 174.573L59.3269 173.968C47.9359 167.074 39.9409 162.925 44.4879 157.975C45.0109 157.404 45.7529 157.151 46.6539 157.151C47.7219 157.151 49.0149 157.508 50.4389 158.108C56.4549 160.645 64.793 167.564 68.276 170.581C68.8239 171.057 69.3683 171.538 69.9089 172.022C69.9089 172.022 74.319 176.608 76.985 176.608C77.599 176.608 78.1199 176.366 78.4729 175.768C80.364 172.58 60.9099 157.838 59.8129 151.755C59.0689 147.634 60.3349 145.546 62.6749 145.546C63.7879 145.546 65.1459 146.02 66.6449 146.971C71.2949 149.922 80.2729 165.35 83.5599 171.352C84.6619 173.363 86.5429 174.213 88.2379 174.213C91.6009 174.213 94.2299 170.87 88.5459 166.622C80.0029 160.23 83.001 149.782 87.078 149.139C87.252 149.111 87.4279 149.097 87.6029 149.097C91.3109 149.097 92.9459 155.486 92.9459 155.486C92.9459 155.486 97.7399 167.524 105.975 175.753C113.447 183.222 114.491 189.351 110.137 196.997ZM136.766 198.407L136.339 198.458L135.611 198.541C135.228 198.581 134.459 198.654L134.084 198.688L133.741 198.717L133.255 198.756L132.718 198.795L132.182 198.83L132.063 198.838C131.923 198.846 131.783 198.855 131.641 198.862L131.462 198.872C131.296 198.881 131.13 198.896 130.962 198.896H130.381L129.854 198.939C128.82 198.939 128.601 198.956 128.491 198.961L128.043 198.967H127.418C126.927 198.967 126.437 198.962 125.949 198.952L125.553 198.943C125.44 198.943 125.327 198.938 125.216 198.934L124.796 198.922L124.275 198.902L123.805 198.881L123.684 198.876L123.237 198.853C123.112 198.846 122.989 198.84 122.865 198.831L122.576 198.814C122.213 198.791 121.85 198.738 121.487 198.738L121.107 198.707C120.947 198.695 120.787 198.68 120.628 198.666C120.441 198.65 120.254 198.632 120.067 198.614C119.754 198.585 119.441 198.553 119.128 198.519H119.113C123.683 188.324 121.372 178.802 112.137 169.575C106.08 163.526 102.051 154.594 101.215 152.633C99.5229 146.828 95.045 140.375 87.608 140.375C86.979 140.375 86.351 140.425 85.73 140.523C82.472 141.036 79.624 142.911 77.592 145.733C75.396 143.002 73.262 140.831 71.332 139.605C68.422 137.76 65.5179 136.824 62.6889 136.824C59.1579 136.824 56.0019 138.274 53.8019 140.904L53.7459 140.971C53.7039 140.798 53.6639 140.625 53.6229 140.451L53.6179 140.428C53.1992 138.638 52.8477 136.833 52.5639 135.016C52.5639 135.004 52.5639 134.992 52.5579 134.98C52.5359 134.843 52.5159 134.705 52.4949 134.568C52.4334 134.162 52.3757 133.755 52.3219 133.348C52.2979 132.163 52.2719 132.978 52.2489 132.793L52.1809 132.238C52.1589 132.053 52.1409 131.885 52.1209 131.709L52.115 131.665C52.0351 130.945 52.115 131.665 52.115 131.665Z" fill="#32343D"/>
                <path d="M127.795 195.387C127.327 196.206 126.826 197.005 126.292 197.782C124.887 199.839 123.039 201.41 120.895 202.579C116.794 204.814 111.605 205.596 106.332 205.596C98.004 205.596 89.466 203.647 84.68 202.405C84.445 202.344 55.346 194.125 59.03 187.129C59.65 185.953 60.671 185.483 61.955 185.483C67.142 185.483 76.5871 193.207 80.6471 193.207C81.5531 193.207 82.193 192.82 82.454 191.879C84.184 185.674 56.161 183.066 58.521 174.082C58.938 174.082 58.938 174.082 58.521 174.082Z" fill="#FFAD03"/>
              </svg>
              <!-- Instagram Icon -->
              <svg v-else-if="social.type === 'instagram'" viewBox="0 0 24 24" class="size-5 fill-none stroke-current" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <!-- YouTube Icon -->
              <svg v-else-if="social.type === 'youtube'" viewBox="0 0 24 24" class="size-5 fill-current">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <!-- Email Icon -->
              <svg v-else-if="social.type === 'email'" viewBox="0 0 24 24" class="size-5 fill-none stroke-current" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <header
    :class="$attrs.class"
    class="padding-x absolute inset-0 z-20 h-fit -translate-y-full pt-6 will-change-auto"
  >
    <nav class="flex justify-between items-center w-full">
      <div class="flex items-center gap-6">
        <MagneticEffect
          :magnetoStrengthVal="20"
          :magnetoTextStrengthVal="10"
          divId="name-container"
          textId="name"
        >
          <div
            id="name-container"
            class="group h-fit cursor-pointer p-2 hidden md:block md:-m-10 md:p-10"
          >
            <h2
              id="name"
              class="font-fancy flex items-start text-xl font-extrabold uppercase md:text-3xl"
            >
              sooriyaa
              <span
                class="font-fancy inline! origin-center! text-xl transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]"
                >&copy;</span
              >
            </h2>
          </div>
        </MagneticEffect>


      </div>

      <div class="flex justify-start">
        <p
          class="heading-6 font-fancy text-flax-smoke-400 hidden font-bold uppercase select-none md:block"
        >
          available for work <br />
          and collaboration
        </p>
      </div>
      <div class="flex">
        <ul
          class="hidden w-full flex-1 gap-1 overflow-y-hidden text-lg font-medium md:flex md:gap-2 md:text-xl lg:gap-4 lg:text-2xl xl:text-3xl"
        >
          <Link
            v-for="(l, index) in navLinks"
            :key="l.label"
            tag="li"
            :label="l.label + (index !== navLinks.length - 1 ? ',' : '')"
            :url="l.url"
          />
        </ul>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';

  import { Link, BurgerMenuBtn, MagneticEffect } from '..';
  import { Circles } from '../design';


  import {
    animateNavbarEnter,
    animateNavbarLeave,
    navbarScale,
  } from '@/animations';
  import { identity, navbarLinks, navLinks } from '@/data';
  import { lenis } from '@/main';
  import { useRoute, useRouter } from 'vue-router';

  const socialIconLinks = [
    { name: 'GitHub', url: identity.socials.github, type: 'github' },
    { name: 'LinkedIn', url: identity.socials.linkedin, type: 'linkedin' },
    { name: 'Hugging Face', url: identity.socials.huggingface, type: 'huggingface' },
    { name: 'Instagram', url: identity.socials.instagram, type: 'instagram' },
    { name: 'YouTube', url: identity.socials.youtube, type: 'youtube' },
    { name: 'Email', url: `mailto:${identity.email}`, type: 'email' },
  ];



  const route = useRoute();
  const router = useRouter();

  const isNavbarOpen = ref(false);

  const toggleBtnClickAnimation = () => {
    isNavbarOpen.value = !isNavbarOpen.value;

    // animate the X on the button
    document.getElementById('magneto')?.classList.toggle('active');

    const x = document.getElementById('navbar') as HTMLDivElement;
    if (isNavbarOpen.value) {
      animateNavbarEnter('#navbar', '#navLinks li a', '.contact');
      x.focus();
    } else {
      animateNavbarLeave('#navbar', '#navLinks li a', '.contact');
      x.blur();
    }
  };

  const gotoSection = async (url: string) => {
    lenis.start();
    // Hash links target the home page; if we're on a category page, go home
    // first, then scroll to the section once it's mounted.
    if (url.startsWith('#') && route.name !== 'home') {
      await router.push({ name: 'home' });
      requestAnimationFrame(() => lenis.scrollTo(url, { duration: 2 }));
    } else {
      lenis.scrollTo(url, { duration: 3 });
    }
    toggleBtnClickAnimation();
  };

  onMounted(() => {
    navbarScale('#burger', '#hero');
  });

  const emit = defineEmits(['isLocked']);
  watch(isNavbarOpen, (newVal) => {
    emit('isLocked', newVal);
  });
</script>
