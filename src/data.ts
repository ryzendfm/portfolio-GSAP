import {
  motionTypography,
  motionFlow,
  motionManga,
  motion3d,
  motionPromoStartup,
  motionPromoStudent,
  motionStudy1,
  motionStudy2,
  renderSequenceBts,
  startTrailVideo,
  amadeusClip1,
  amadeusClip2,
  amadeusClip3,
  amadeusClip4,
} from '@/assets/videos';
import {
  skyStudy1,
  skyStudy2,
  skyStudy3,
  closeupEyeShot,
  guyDrawing,
  yuiYuigahamaDrawing,
  girlSketch,
  guySketchScreenshot,
  sketchScreenshot,
  skyPhoto1,
  skyPhoto2,
  skyPhoto3,
  astroPhoto1,
  astroPhoto2,
  travelPhoto1,
  travelPhoto2,
  travelPhoto3,
  gfxPhoto1,
  gfxPhoto2,
  gfxPhoto3,
} from '@/assets/images';

// Nav type
export type navLinkType = {
  label: string;
  url: string;
};

// Per-project external links. All optional — only present ones render.
export type projectLinksType = {
  github?: string;
  instagram?: string;
  youtube?: string;
  huggingface?: string;
  download?: string;
  live?: string;
};

// Domain / project types
export type mediaItemType = {
  src: string;
  label?: string;
};

export type projectType = {
  name: string;
  desc: string;
  links?: projectLinksType;
  // Real project video (imported asset URL) or list of videos. Falls back to a placeholder.
  media?: string | string[] | mediaItemType[];
};

export type domainType = {
  id: string;
  label: string;
  color: string;
  // Short "about" paragraph shown beside the category on the home page.
  blurb: string;
  categories?: string[];
  projects?: projectType[];
  tool?: string;
};

// A single flattened piece of work (project or category) used by the
// home category sections and the per-category "View All" pages.
export type workItemType = {
  key: string;
  domainId: string;
  domainLabel: string;
  color: string;
  name: string;
  desc: string;
  url: string;
  videoSrc: string;
  media: mediaItemType[];
  imageBg: string;
  links: projectLinksType;
};

export type timelineType = {
  year: string;
  items: string[];
};

export type statType = {
  value: string;
  label: string;
};

// Identity — single source of truth
const identity = {
  name: 'Sooriyaa TN',
  title: 'Digital Artist',
  roles: [
    'Developer',
    'Designer',
    'Motion Artist',
    'AI Builder',
    'Digital Artist',
  ],
  positioning: "I don't just learn tools. I combine them.",
  school: 'Muthayammal Engineering College (Anna University)',
  location: 'Tamil Nadu, India',
  email: 'tnsooriyaa@gmail.com',
  whatsapp: 'https://wa.me/919999999999',
  socials: {
    github: 'https://github.com/ryzendfm',
    linkedin: 'https://www.linkedin.com/in/sooriyaatn/',
    huggingface:
      'https://huggingface.co/ryzdfm/qwen2.5-coder-3b-claude_opus_4.6-distilled',
    instagram: 'https://www.instagram.com/ryzdfm/',
    youtube: 'https://youtube.com/@ryzendfm',
  },
};

// Nav
const navLinks: navLinkType[] = [
  {
    label: 'About',
    url: '#about-me-section',
  },
  {
    label: 'Identity',
    url: '#identity',
  },
  {
    label: 'Pipeline',
    url: '#pipeline',
  },
  {
    label: 'Work',
    url: '#work',
  },
  {
    label: 'Timeline',
    url: '#timeline',
  },
  {
    label: 'Contact',
    url: '#contact-section',
  },
];
const navbarLinks: navLinkType[] = [
  {
    label: 'Home',
    url: '#app',
  },
  ...navLinks,
];

const socialLinks: navLinkType[] = [
  {
    label: 'GitHub',
    url: identity.socials.github,
  },
  {
    label: 'LinkedIn',
    url: identity.socials.linkedin,
  },
  {
    label: 'HuggingFace',
    url: identity.socials.huggingface,
  },
];

const resourceLinks: navLinkType[] = [
  {
    label: 'HuggingFace Model',
    url: identity.socials.huggingface,
  },
  {
    label: 'GitHub',
    url: identity.socials.github,
  },
];

const heroText =
  'A creative technologist blending AI, engineering, motion, 3D, and art into one connected process.';

const locationPlace = `11°08'N 78°10'E`;
const locationCountry = 'Tamil Nadu, India';

// Achievements
const stats: statType[] = [
  { value: '150+', label: 'LeetCode Problems' },
  { value: 'Top 10', label: 'HackIndia 2026' },
  { value: '70-90 t/s', label: 'Fine-tuned model on RTX 3050' },
];

// The 6 domains ("planets"). `color` is the per-domain neon accent,
// applied only as an accent over the flax-smoke base palette.
const domains: domainType[] = [
  {
    id: 'ai',
    label: 'AI Research & Agents',
    color: '#00D4FF',
    blurb:
      'Agentic systems, fine-tuned models, and research tools — where reasoning loops meet real products.',
    projects: [
      {
        name: 'Amadeus',
        desc: 'Electron/React/FastAPI agentic desktop assistant, ReAct loop',
        links: {
          github: 'https://github.com/ryzendfm',
          huggingface: identity.socials.huggingface,
        },
        media: [
          { label: 'PPT Generation', src: amadeusClip1 },
          { label: 'Downloading Resources', src: amadeusClip2 },
          { label: 'File Management', src: amadeusClip3 },
          { label: 'Finding Video', src: amadeusClip4 },
        ],
      },
      {
        name: 'QwOpus 4.6 3B',
        desc: 'Qwen 2.5 Coder 3B distilled on Claude Opus 4.6 datasets — fine-tuned for reasoning and code, running at 70–90 t/s on RTX 3050',
        links: {
          huggingface: 'https://huggingface.co/ryzdfm/qwen2.5-coder-3b-claude_opus_4.6-distilled',
        },
        media: `${import.meta.env.BASE_URL}media/QwOpus logo.jpeg`,
      },
      {
        name: 'Slider AI',
        desc: 'AI-assisted presentation generation tool',
        media: `${import.meta.env.BASE_URL}media/Slider AI video.mp4`,
        links: {
          github: 'https://github.com/ryzendfm/Slider-AI---AI-Powered-Slide-Generator',
        },
      },
    ],
  },
  {
    id: 'software',
    label: 'Software Engineering',
    color: '#7C3AED',
    blurb:
      'Full-stack systems and platforms built to ship — ERPs, real-time apps, and internal tools that hold up in production.',
    projects: [
      {
        name: 'Aran Config ERP',
        desc: 'Manufacturing/window production ERP for Red Angle',
      },
      { name: 'Placement Tracker', desc: 'Campus placement management system' },
      { name: 'Leave Management System', desc: 'Institutional leave workflow' },
      { name: 'Student Chat Platform', desc: 'Real-time student messaging app' },
      {
        name: 'Inter-College Chat Application',
        desc: 'Cross-college communication platform',
      },
    ],
  },
  {
    id: 'motion',
    label: 'Motion Graphics',
    color: '#FF5C8A',
    blurb:
      'Type in motion, flow edits, and vector animation — turning static frames into rhythm and energy.',
    projects: [
      {
        name: 'Typography',
        desc: 'Kinetic type animation set to rhythm',
        media: motionTypography,
      },
      {
        name: 'Flow Editing',
        desc: 'Beat-synced flow edit',
        media: motionFlow,
      },
      {
        name: 'Manga Animation',
        desc: 'Animated manga panels with motion and depth',
        media: motionManga,
      },
      {
        name: '3D Animation',
        desc: 'Rendered 3D motion sequence',
        media: motion3d,
      },
      {
        name: 'Promo Edit',
        desc: 'Startup promo edit — pacing, type, and energy',
        media: [
          { label: 'Startup Phase', src: motionPromoStartup },
          { label: 'Student Phase', src: motionPromoStudent },
        ],
      },
    ],
  },
  {
    id: 'blender',
    label: 'Blender & 3D',
    color: '#FACC15',
    blurb:
      'Environments, hard-surface models, and procedural art — building worlds one node and mesh at a time.',
    projects: [
      {
        name: 'Showreel',
        desc: 'Official 3D showreel — highlights reel showcasing my best Blender work',
        media: [motionStudy1, motionStudy2],
      },
      {
        name: 'BTS',
        desc: 'Behind the scenes — raw render passes, viewport footage, and production process',
        media: renderSequenceBts,
      },
      {
        name: 'Interactive WebGL Showroom',
        desc: 'Real-time interactive 3D product visualization built with WebGL and OrbitControls',
        media: `${import.meta.env.BASE_URL}media/porsche_site_recording.mp4`,
        links: {
          live: 'https://porsche-web-gl-landing-page.vercel.app/',
          github: 'https://github.com/ryzendfm/Porsche-WebGL-landing-page',
        },
      },
    ],
  },
  {
    id: 'art',
    label: 'Digital Art',
    color: '#FF9F1C',
    blurb:
      'Hand-drawn on mobile — skies, characters, and atmosphere studies exploring light, mood, and form.',
    projects: [
      {
        name: 'Sky & Atmosphere Studies',
        desc: 'Digital paintings capturing light, clouds, and painterly silhouettes, inspired by natural atmospheres.',
        media: [
          { src: skyStudy1, label: 'Study 1' },
          { src: skyStudy2, label: 'Study 2' },
          { src: skyStudy3, label: 'Study 3' },
        ],
      },
      {
        name: 'Character Sketches',
        desc: 'Loose, high-energy character lineart and wash studies, exploring gestures and rough structural drafts.',
        media: [
          { src: girlSketch, label: 'Sketch 1' },
          { src: guySketchScreenshot, label: 'Sketch 2' },
          { src: sketchScreenshot, label: 'Sketch 3' },
        ],
      },
      {
        name: 'Character Renders',
        desc: 'Tight digital renders with polished lineart, dynamic color gradients, and effects-heavy studio lighting.',
        media: [
          { src: closeupEyeShot, label: 'Render 1' },
          { src: guyDrawing, label: 'Render 2' },
          { src: yuiYuigahamaDrawing, label: 'Render 3' },
        ],
      },
    ],
    tool: 'Ibis Paint X (mobile, hand-drawn)',
  },
  {
    id: 'photo',
    label: 'Photography & GFX',
    color: '#22D3EE',
    blurb:
      'Skies, stars, and places — capturing the raw signal that everything else in this practice is built from.',
    projects: [
      {
        name: 'Sky/Atmosphere Photography',
        desc: 'High-contrast captures of cloud formations, sunbeams, and dusk palettes.',
        media: [
          { src: skyPhoto1, label: 'Photo 1' },
          { src: skyPhoto2, label: 'Photo 2' },
          { src: skyPhoto3, label: 'Photo 3' },
        ],
      },
      {
        name: 'Astrophotography',
        desc: 'Long exposures of night skies, capturing stars, galactic cores, and silhouettes.',
        media: [
          { src: astroPhoto1, label: 'Astro 1' },
          { src: startTrailVideo, label: 'Astro 2' },
          { src: astroPhoto2, label: 'Astro 3' },
        ],
      },
      {
        name: 'Travel/Location Series',
        desc: 'Location series featuring distressed stencil typography treatments and rich landscape tones.',
        media: [
          { src: travelPhoto1, label: 'Travel 1' },
          { src: travelPhoto2, label: 'Travel 2' },
          { src: travelPhoto3, label: 'Travel 3' },
        ],
      },
      {
        name: 'Graphic Design & GFX',
        desc: 'Creative poster designs, typographic work, and graphic layout composition.',
        media: [
          { src: gfxPhoto1, label: 'GFX 1' },
          { src: gfxPhoto2, label: 'GFX 2' },
          { src: gfxPhoto3, label: 'GFX 3' },
        ],
      },
    ],
  },
];

// The connecting thread — Creative Pipeline order (Photography → ... → AI)
const pipeline = [
  { id: 'photo', label: 'Photography' },
  { id: 'art', label: 'Digital Art' },
  { id: 'motion', label: 'Motion' },
  { id: 'blender', label: '3D' },
  { id: 'software', label: 'Interactive Web' },
  { id: 'ai', label: 'AI Systems' },
];

const timeline: timelineType[] = [
  { year: '2021', items: ['Started Blender', 'Marvelous Designer'] },
  {
    year: '2023',
    items: ['Motion Graphics', 'Video Editing', 'Started Computer Science'],
  },
  {
    year: '2024',
    items: ['Web Development', 'Frontend Engineering', 'AI Automation'],
  },
  {
    year: '2025',
    items: ['Fine-Tuning Models', 'Agentic Systems', 'Advanced AI Projects'],
  },
];

export {
  identity,
  stats,
  domains,
  pipeline,
  timeline,
  socialLinks,
  resourceLinks,
  heroText,
  locationPlace,
  locationCountry,
  navLinks,
  navbarLinks,
};
