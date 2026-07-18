import { domains } from '@/data';
import type { domainType, workItemType, mediaItemType } from '@/data';
import { work1, work2, work3, work4, work5 } from '@/assets/videos';
import { workBg1, workBg2, workBg3, workBg4, workBg5 } from '@/assets/images';

// Placeholder media cycled across items until real per-project assets exist.
// TODO: replace with real media by adding image/video fields in data.ts.
const placeholderVideos = [work1, work2, work3, work4, work5];
const placeholderBgs = [workBg1, workBg2, workBg3, workBg4, workBg5];

// Whether a media URL is a video (vs an image) — used to pick <video>/<img>.
export const isVideoSrc = (src: string) =>
  /\.(mp4|webm|mov|m4v|ogg)(\?|#|$)/i.test(src);

// Normalize the raw media (string | string[] | mediaItemType[]) to mediaItemType[]
export const normalizeMedia = (media: any): mediaItemType[] => {
  if (!media) return [];
  if (Array.isArray(media)) {
    return media.map((item) => {
      if (typeof item === 'string') {
        return { src: item };
      }
      return item;
    });
  }
  if (typeof media === 'string') {
    return [{ src: media }];
  }
  return [media];
};

// Flatten a single domain's projects (or categories) into work items.
const itemsForDomain = (
  domain: domainType,
  startIdx: number,
): workItemType[] => {
  const raw = domain.projects
    ? domain.projects.map((p) => ({
        name: p.name,
        desc: p.desc,
        links: p.links ?? {},
        media: p.media,
      }))
    : (domain.categories ?? []).map((c) => ({
        name: c,
        desc: domain.tool ?? '',
        links: {},
        media: undefined as any,
      }));

  return raw.map((item, i) => {
    const mediaIdx = startIdx + i;
    const normalized = item.media
      ? normalizeMedia(item.media)
      : [{ src: placeholderVideos[mediaIdx % placeholderVideos.length] }];

    return {
      key: `${domain.id}-${item.name}`,
      domainId: domain.id,
      domainLabel: domain.label,
      color: domain.color,
      name: item.name,
      desc: item.desc,
      url: '#',
      videoSrc: normalized[0]?.src || '',
      media: normalized,
      imageBg: placeholderBgs[mediaIdx % placeholderBgs.length],
      links: item.links,
    };
  });
};

// All work items across every domain, in domain order.
export const allWorkItems = (): workItemType[] => {
  const cards: workItemType[] = [];
  let idx = 0;
  for (const domain of domains) {
    const items = itemsForDomain(domain, idx);
    cards.push(...items);
    idx += items.length;
  }
  return cards;
};

// Work items for a single domain id (used by category sections + pages).
export const workItemsFor = (domainId: string): workItemType[] => {
  // Keep the same media offset the item would have in the full list so a
  // project shows identical media on the home section and its category page.
  let idx = 0;
  for (const domain of domains) {
    if (domain.id === domainId) return itemsForDomain(domain, idx);
    idx += domain.projects
      ? domain.projects.length
      : (domain.categories?.length ?? 0);
  }
  return [];
};
