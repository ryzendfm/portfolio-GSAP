import type { Component } from 'vue';
import { domains, pipeline } from '@/data';
import PhotographyIcon from './icons/PhotographyIcon.vue';
import DigitalArtIcon from './icons/DigitalArtIcon.vue';
import MotionIcon from './icons/MotionIcon.vue';
import ThreeDIcon from './icons/ThreeDIcon.vue';
import InteractiveWebIcon from './icons/InteractiveWebIcon.vue';
import AiSystemIcon from './icons/AiSystemIcon.vue';

export type pipelineDomainType = {
  id: string;
  label: string;
  // Per-domain neon accent, reused from data.ts (single source of truth).
  color: string;
  icon: Component;
};

// Maps each pipeline step (Photography → … → AI Systems) to its hand-drawn
// sketch icon. Colors come from the domain palette in data.ts so the accents
// stay in sync with the rest of the site.
const iconById: Record<string, Component> = {
  photo: PhotographyIcon,
  art: DigitalArtIcon,
  motion: MotionIcon,
  blender: ThreeDIcon,
  software: InteractiveWebIcon,
  ai: AiSystemIcon,
};

export const pipelineDomains: pipelineDomainType[] = pipeline.map((step) => ({
  id: step.id,
  label: step.label,
  color: domains.find((d) => d.id === step.id)?.color ?? '#b6b79f',
  icon: iconById[step.id],
}));
