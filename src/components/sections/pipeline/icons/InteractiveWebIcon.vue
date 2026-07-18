<template>
  <!-- Hand-drawn browser window with cursor. -->
  <svg
    class="h-full w-full"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <filter id="iw1" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.045"
          numOctaves="2"
          seed="21"
          result="n"
        />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
      </filter>
      <filter id="iw2" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.05"
          numOctaves="2"
          seed="27"
          result="n"
        />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
      </filter>
    </defs>
    <g
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      opacity="0.5"
      filter="url(#iw1)"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
    </g>
    <g
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      filter="url(#iw2)"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
    </g>
    <path d="M13 13l4 2.2l-1.6 .5l-.7 1.6z" fill="currentColor" filter="url(#iw1)" />
  </svg>
</template>
