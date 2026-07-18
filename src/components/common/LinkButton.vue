<template>
  <component
    :is="url ? 'a' : 'button'"
    :href="url || undefined"
    :target="url ? '_blank' : undefined"
    :rel="url ? 'noopener noreferrer' : undefined"
    :type="url ? undefined : 'button'"
    class="link-button font-fancy"
    :style="{ '--clr': color }"
  >
    <!-- Logo on the Left -->
    <span class="link-button__icon">
      <!-- GitHub Logo -->
      <svg v-if="normalizedLabel === 'github'" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
      <!-- Hugging Face Logo -->
      <svg v-else-if="normalizedLabel === 'huggingface'" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-3-11.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-6.5 4.5a3.5 3.5 0 0 0 7 0h-7z"/>
      </svg>
      <!-- Live Logo (Globe) -->
      <svg v-else-if="normalizedLabel === 'live'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      <!-- YouTube Logo -->
      <svg v-else-if="normalizedLabel === 'youtube'" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
      <!-- Instagram Logo -->
      <svg v-else-if="normalizedLabel === 'instagram'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
      <!-- Download Logo -->
      <svg v-else-if="normalizedLabel === 'download'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      <!-- View All / Generic Chevron/Arrow -->
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </span>

    <!-- Name on the Right -->
    <span class="link-button__label">{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      label: string;
      url?: string;
      color?: string;
    }>(),
    {
      url: '',
      color: '#7808d0',
    },
  );

  const normalizedLabel = computed(() => {
    return props.label.toLowerCase().replace(/\s+/g, '');
  });
</script>

<style scoped>
  .link-button {
    line-height: 1;
    text-decoration: none;
    display: inline-flex;
    border: 1px solid var(--clr);
    cursor: pointer;
    align-items: center;
    gap: 0.5rem;
    background-color: transparent;
    color: #e8e8df;
    border-radius: 9999px;
    font-weight: 600;
    padding: 0.45rem 1rem 0.45rem 0.85rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    font-size: 0.75rem;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    font-family: var(--font-fancy), 'Bricolage Grotesque', sans-serif;
  }

  .link-button__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .link-button__icon svg {
    width: 100%;
    height: 100%;
  }

  .link-button__label {
    transition: transform 0.3s ease;
  }

  .link-button:hover {
    background-color: var(--clr);
    color: #0b0b0a;
    border-color: var(--clr);
  }

  .link-button:hover .link-button__icon {
    transform: scale(1.15);
  }
</style>
