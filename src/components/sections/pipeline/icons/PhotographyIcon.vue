<template>
  <!-- Hand-drawn camera. Uses currentColor so the accent tint is set by the parent. -->
  <svg
    class="h-full w-full"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <filter id="ph1" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.045"
          numOctaves="2"
          seed="3"
          result="n"
        />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
      </filter>
      <filter id="ph2" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.05"
          numOctaves="2"
          seed="9"
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
      opacity="0.55"
      filter="url(#ph1)"
    >
      <path
        d="M4 8h3l1.5 -2h7l1.5 2h3a1 1 0 0 1 1 1v9a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-9a1 1 0 0 1 1 -1z"
      />
      <circle cx="12" cy="13" r="3.5" />
    </g>
    <g
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      filter="url(#ph2)"
    >
      <path
        d="M4 8h3l1.5 -2h7l1.5 2h3a1 1 0 0 1 1 1v9a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-9a1 1 0 0 1 1 -1z"
      />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M6.5 7.5v-.6" stroke-width="1.2" />
    </g>
  </svg>
</template>
