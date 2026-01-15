/**
 * Teniam category seed data.
 *
 * Notes:
 * - Medusa supports `handle` on categories.
 * - SEO fields can be stored in `metadata`.
 * - For hierarchy, we use `parent_handle` and resolve it in the seed function.
 */

export type SeedCategory = {
  name: string
  handle: string
  description?: string
  is_active: boolean
  parent_handle?: string
  metadata?: Record<string, any>
}

export const productCategoriesToInsert: SeedCategory[] = [
  // Primary categories
  {
    name: 'Desk Setups',
    handle: 'desk-setups',
    description:
      'Desks, ergonomic upgrades, cable management and essentials for a clean workspace.',
    is_active: true,
    metadata: {
      seo_title: 'Desk Setups & Workspace Gear for Modern Desks | Teniam',
      seo_description:
        'Buy and sell desk setups, standing desks, cable management, and workspace accessories. Discover new and used desk gear built for modern setups.'
    }
  },
  {
    name: 'Keyboards & Input',
    handle: 'keyboards-input',
    description:
      'Mechanical keyboards, custom builds, mice and desk mats for enthusiasts.',
    is_active: true,
    metadata: {
      seo_title: 'Mechanical Keyboards & Desk Input Gear | Teniam',
      seo_description:
        'Buy and sell mechanical keyboards, keycaps, switches, mice, and desk mats. A marketplace built for keyboard enthusiasts.'
    }
  },
  {
    name: 'PC Components',
    handle: 'pc-components',
    description:
      'Desktop hardware and parts for upgrades and custom PC builds.',
    is_active: true,
    metadata: {
      seo_title: 'PC Components & Desktop Parts Marketplace | Teniam',
      seo_description:
        'Buy and sell PC components including GPUs, CPUs, RAM, and storage. Secure checkout for desktop hardware.'
    }
  },
  {
    name: 'Monitors & Mounts',
    handle: 'monitors-mounts',
    description:
      'Monitors, arms and mounting solutions for clean, ergonomic setups.',
    is_active: true,
    metadata: {
      seo_title: 'Monitors & Desk Mounts for Setups | Teniam',
      seo_description:
        'Buy and sell monitors, monitor arms, and mounting solutions built for modern desk setups.'
    }
  },
  {
    name: 'Audio & Video',
    handle: 'audio-video',
    description:
      'Headphones, microphones, speakers and creator gear for your desk.',
    is_active: true,
    metadata: {
      seo_title: 'Desk Audio & Video Gear for Creators | Teniam',
      seo_description:
        'Buy and sell desk audio and video gear including microphones, headphones, webcams, and interfaces.'
    }
  },
  {
    name: 'Lighting & Ambience',
    handle: 'lighting-ambience',
    description:
      'RGB and lighting that makes your desk setup look and feel better.',
    is_active: true,
    metadata: {
      seo_title: 'Desk Lighting & Ambience Gear | Teniam',
      seo_description:
        'Shop RGB lighting, desk lamps, wall panels and ambience gear for modern setups.'
    }
  },
  {
    name: 'Workspace Accessories',
    handle: 'workspace-accessories',
    description:
      'Hubs, cables, chargers and everyday add-ons for the workspace.',
    is_active: true,
    metadata: {
      seo_title: 'Workspace Accessories for Desk Setups | Teniam',
      seo_description:
        'Buy and sell workspace accessories including hubs, cables, chargers, organisers and stands.'
    }
  },
  {
    name: 'Digital Studio',
    handle: 'digital-studio',
    description:
      'Wallpapers, icon packs, templates and curated software for your digital workspace.',
    is_active: false,
    metadata: {
      seo_title: 'Wallpapers, Templates & Digital Workspace Assets | Teniam',
      seo_description:
        'Browse wallpapers, icon packs, templates and curated tools designed for modern workspaces.'
    }
  },

  // Desk Setups (children)
  {
    name: 'Standing Desks',
    handle: 'standing-desks',
    parent_handle: 'desk-setups',
    is_active: true,
    metadata: {
      seo_title: 'Standing Desks for Home & Office Setups | Teniam',
      seo_description:
        'Buy and sell standing desks and adjustable workstations for modern desk setups.'
    }
  },
  {
    name: 'Desk Frames & Risers',
    handle: 'desk-frames-risers',
    parent_handle: 'desk-setups',
    is_active: true,
    metadata: {
      seo_title: 'Desk Frames & Risers for Custom Setups | Teniam',
      seo_description:
        'Shop desk frames, risers and foundations for custom workspace builds.'
    }
  },
  {
    name: 'Desk Accessories',
    handle: 'desk-accessories',
    parent_handle: 'desk-setups',
    is_active: true,
    metadata: {
      seo_title: 'Desk Accessories for Clean Workspaces | Teniam',
      seo_description:
        'Browse desk accessories designed to improve comfort, workflow and organisation.'
    }
  },
  {
    name: 'Cable Management',
    handle: 'cable-management',
    parent_handle: 'desk-setups',
    is_active: true,
    metadata: {
      seo_title: 'Cable Management for Desk Setups | Teniam',
      seo_description:
        'Cable trays, clips and organisers to keep desk setups tidy and clutter-free.'
    }
  },
  {
    name: 'Desk Decor',
    handle: 'desk-decor',
    parent_handle: 'desk-setups',
    is_active: true,
    metadata: {
      seo_title: 'Desk Decor & Workspace Styling | Teniam',
      seo_description:
        'Personalise your workspace with desk decor and styling accessories.'
    }
  },

  // Keyboards & Input (children)
  {
    name: 'Mechanical Keyboards',
    handle: 'mechanical-keyboards',
    parent_handle: 'keyboards-input',
    is_active: true,
    metadata: {
      seo_title: 'Mechanical Keyboards – New & Used | Teniam',
      seo_description:
        'Browse new and used mechanical keyboards from trusted sellers.'
    }
  },
  {
    name: 'Custom Keyboards',
    handle: 'custom-keyboards',
    parent_handle: 'keyboards-input',
    is_active: true,
    metadata: {
      seo_title: 'Custom Mechanical Keyboards & Builds | Teniam',
      seo_description:
        'Custom-built keyboards, DIY builds and enthusiast-grade setups.'
    }
  },
  {
    name: 'Keycaps',
    handle: 'keycaps',
    parent_handle: 'keyboards-input',
    is_active: true,
    metadata: {
      seo_title: 'Keycaps for Mechanical Keyboards | Teniam',
      seo_description:
        'Buy and sell keycap sets for custom mechanical keyboards.'
    }
  },
  {
    name: 'Switches',
    handle: 'switches',
    parent_handle: 'keyboards-input',
    is_active: true,
    metadata: {
      seo_title: 'Mechanical Keyboard Switches | Teniam',
      seo_description:
        'Shop mechanical keyboard switches including linear, tactile and clicky options.'
    }
  },
  {
    name: 'Mice & Trackpads',
    handle: 'mice-trackpads',
    parent_handle: 'keyboards-input',
    is_active: true,
    metadata: {
      seo_title: 'Mice & Trackpads for Desk Setups | Teniam',
      seo_description:
        'Gaming and productivity mice and trackpads for modern desk setups.'
    }
  },
  {
    name: 'Desk Mats',
    handle: 'desk-mats',
    parent_handle: 'keyboards-input',
    is_active: true,
    metadata: {
      seo_title: 'Desk Mats & Keyboard Mats | Teniam',
      seo_description:
        'Desk mats and keyboard mats designed for performance and aesthetics.'
    }
  },

  // PC Components (children)
  {
    name: 'Graphics Cards (GPUs)',
    handle: 'gpus',
    parent_handle: 'pc-components',
    is_active: true,
    metadata: {
      seo_title: 'Graphics Cards (GPUs) – Buy & Sell | Teniam',
      seo_description:
        'New and used graphics cards with secure checkout and clear condition details.'
    }
  },
  {
    name: 'CPUs',
    handle: 'cpus',
    parent_handle: 'pc-components',
    is_active: true,
    metadata: {
      seo_title: 'Desktop CPUs for PC Builds | Teniam',
      seo_description:
        'Buy and sell desktop CPUs for gaming and productivity builds.'
    }
  },
  {
    name: 'Motherboards',
    handle: 'motherboards',
    parent_handle: 'pc-components',
    is_active: true,
    metadata: {
      seo_title: 'PC Motherboards for Desktop Builds | Teniam',
      seo_description:
        'Shop motherboards for modern desktop builds and upgrades.'
    }
  },
  {
    name: 'RAM',
    handle: 'ram',
    parent_handle: 'pc-components',
    is_active: true,
    metadata: {
      seo_title: 'Desktop RAM & Memory | Teniam',
      seo_description:
        'Buy and sell desktop RAM and memory kits for PC upgrades.'
    }
  },
  {
    name: 'Storage (SSD / HDD)',
    handle: 'storage',
    parent_handle: 'pc-components',
    is_active: true,
    metadata: {
      seo_title: 'SSDs & Hard Drives for PCs | Teniam',
      seo_description:
        'Solid state drives and hard drives for desktop PCs and storage upgrades.'
    }
  },
  {
    name: 'Cooling & Fans',
    handle: 'cooling-fans',
    parent_handle: 'pc-components',
    is_active: true,
    metadata: {
      seo_title: 'PC Cooling & Fans | Teniam',
      seo_description:
        'CPU coolers, case fans and cooling solutions for desktop PCs.'
    }
  },

  // Monitors & Mounts (children)
  {
    name: 'Monitors',
    handle: 'monitors',
    parent_handle: 'monitors-mounts',
    is_active: true,
    metadata: {
      seo_title: 'Computer Monitors – New & Used | Teniam',
      seo_description:
        'Buy and sell monitors for gaming and productivity desk setups.'
    }
  },
  {
    name: 'Monitor Arms',
    handle: 'monitor-arms',
    parent_handle: 'monitors-mounts',
    is_active: true,
    metadata: {
      seo_title: 'Monitor Arms & Adjustable Mounts | Teniam',
      seo_description:
        'Adjustable monitor arms for ergonomic, clean desk setups.'
    }
  },
  {
    name: 'Monitor Stands',
    handle: 'monitor-stands',
    parent_handle: 'monitors-mounts',
    is_active: true,
    metadata: {
      seo_title: 'Monitor Stands & Risers | Teniam',
      seo_description:
        'Monitor stands and risers for better desk ergonomics and organisation.'
    }
  },
  {
    name: 'Mounts & Brackets',
    handle: 'mounts-brackets',
    parent_handle: 'monitors-mounts',
    is_active: true,
    metadata: {
      seo_title: 'Monitor Mounts & Brackets | Teniam',
      seo_description:
        'Wall and desk mounts and brackets for monitors and displays.'
    }
  },
  {
    name: 'Privacy Screens',
    handle: 'privacy-screens',
    parent_handle: 'monitors-mounts',
    is_active: true,
    metadata: {
      seo_title: 'Monitor Privacy Screens | Teniam',
      seo_description:
        'Privacy screens for monitors and shared workspaces.'
    }
  },

  // Audio & Video (children)
  {
    name: 'Headphones',
    handle: 'headphones',
    parent_handle: 'audio-video',
    is_active: true,
    metadata: {
      seo_title: 'Headphones for Desk Setups | Teniam',
      seo_description:
        'Buy and sell headphones for gaming, music and creator setups.'
    }
  },
  {
    name: 'Desk Speakers',
    handle: 'desk-speakers',
    parent_handle: 'audio-video',
    is_active: true,
    metadata: {
      seo_title: 'Desk Speakers for Work & Play | Teniam',
      seo_description:
        'Browse desk speakers and compact audio solutions for your workspace.'
    }
  },
  {
    name: 'Microphones',
    handle: 'microphones',
    parent_handle: 'audio-video',
    is_active: true,
    metadata: {
      seo_title: 'Microphones for Streaming & Calls | Teniam',
      seo_description:
        'Buy and sell microphones for podcasts, streaming and meetings.'
    }
  },
  {
    name: 'Audio Interfaces & DACs',
    handle: 'audio-interfaces-dacs',
    parent_handle: 'audio-video',
    is_active: true,
    metadata: {
      seo_title: 'Audio Interfaces & DACs for Desk Audio | Teniam',
      seo_description:
        'Interfaces, DACs and desk audio gear for clean sound and better output.'
    }
  },
  {
    name: 'Webcams',
    handle: 'webcams',
    parent_handle: 'audio-video',
    is_active: true,
    metadata: {
      seo_title: 'Webcams for Desk Setups | Teniam',
      seo_description:
        'Shop webcams for streaming, calls and creator workflows.'
    }
  },
  {
    name: 'Camera Mounts',
    handle: 'camera-mounts',
    parent_handle: 'audio-video',
    is_active: true,
    metadata: {
      seo_title: 'Camera Mounts & Desk Rigs | Teniam',
      seo_description:
        'Desk mounts and rigs for cameras, lights and creator gear.'
    }
  },

  // Lighting & Ambience (children)
  {
    name: 'LED Light Bars',
    handle: 'led-light-bars',
    parent_handle: 'lighting-ambience',
    is_active: true,
    metadata: {
      seo_title: 'LED Light Bars for Desk Setups | Teniam',
      seo_description:
        'LED light bars for desk ambience, bias lighting and setup aesthetics.'
    }
  },
  {
    name: 'RGB Lighting',
    handle: 'rgb-lighting',
    parent_handle: 'lighting-ambience',
    is_active: true,
    metadata: {
      seo_title: 'RGB Lighting for Desk Setups | Teniam',
      seo_description:
        'RGB lighting and ambience gear for modern desk setups.'
    }
  },
  {
    name: 'Desk Lamps',
    handle: 'desk-lamps',
    parent_handle: 'lighting-ambience',
    is_active: true,
    metadata: {
      seo_title: 'Desk Lamps for Workspaces | Teniam',
      seo_description:
        'Task lighting and desk lamps designed for modern workspaces.'
    }
  },
  {
    name: 'Wall Panels',
    handle: 'wall-panels',
    parent_handle: 'lighting-ambience',
    is_active: true,
    metadata: {
      seo_title: 'Wall Panels & Setup Backdrops | Teniam',
      seo_description:
        'Wall panels and backdrop lighting for desk setup aesthetics.'
    }
  },
  {
    name: 'Smart Lighting',
    handle: 'smart-lighting',
    parent_handle: 'lighting-ambience',
    is_active: true,
    metadata: {
      seo_title: 'Smart Lighting for Desk Setups | Teniam',
      seo_description:
        'Smart lights and connected desk lighting to elevate your workspace.'
    }
  },

  // Workspace Accessories (children)
  {
    name: 'USB Hubs & Docks',
    handle: 'usb-hubs-docks',
    parent_handle: 'workspace-accessories',
    is_active: true,
    metadata: {
      seo_title: 'USB Hubs & Docks for Desk Setups | Teniam',
      seo_description:
        'USB hubs, docks and connectivity gear for modern desk setups.'
    }
  },
  {
    name: 'Power & Chargers',
    handle: 'power-chargers',
    parent_handle: 'workspace-accessories',
    is_active: true,
    metadata: {
      seo_title: 'Power & Chargers for Workspaces | Teniam',
      seo_description:
        'Power strips, chargers and charging gear for desk setups.'
    }
  },
  {
    name: 'Cables & Custom Cables',
    handle: 'cables',
    parent_handle: 'workspace-accessories',
    is_active: true,
    metadata: {
      seo_title: 'Cables & Custom Cables for Desk Setups | Teniam',
      seo_description:
        'USB, HDMI and custom cables for clean, reliable connections.'
    }
  },
  {
    name: 'Storage & Organisers',
    handle: 'storage-organisers',
    parent_handle: 'workspace-accessories',
    is_active: true,
    metadata: {
      seo_title: 'Storage & Organisers for Desk Setups | Teniam',
      seo_description:
        'Drawers, trays and organisers for a tidy workspace.'
    }
  },
  {
    name: 'Stands & Holders',
    handle: 'stands-holders',
    parent_handle: 'workspace-accessories',
    is_active: true,
    metadata: {
      seo_title: 'Stands & Holders for Desk Setups | Teniam',
      seo_description:
        'Stands and holders for headphones, controllers, phones and desk gear.'
    }
  },

  // Digital Studio (children - keep inactive)
  {
    name: 'Wallpapers',
    handle: 'wallpapers',
    parent_handle: 'digital-studio',
    is_active: false,
    metadata: {
      seo_title: 'Desk Wallpapers & Backgrounds | Teniam',
      seo_description:
        'Browse wallpapers designed for clean, modern desktop setups.'
    }
  },
  {
    name: 'Icon Packs',
    handle: 'icon-packs',
    parent_handle: 'digital-studio',
    is_active: false,
    metadata: {
      seo_title: 'Icon Packs for Desktop Setups | Teniam',
      seo_description:
        'Discover icon packs for a cleaner, more aesthetic desktop.'
    }
  },
  {
    name: 'Productivity Templates',
    handle: 'templates',
    parent_handle: 'digital-studio',
    is_active: false,
    metadata: {
      seo_title: 'Productivity Templates for Workflows | Teniam',
      seo_description:
        'Templates and systems to level up your productivity and workflow.'
    }
  },
  {
    name: 'Setup Tools',
    handle: 'setup-tools',
    parent_handle: 'digital-studio',
    is_active: false,
    metadata: {
      seo_title: 'Setup Tools & Utilities | Teniam',
      seo_description:
        'Utilities and tools designed for clean, efficient desk and desktop setups.'
    }
  },
  {
    name: 'AI & Software',
    handle: 'ai-software',
    parent_handle: 'digital-studio',
    is_active: false,
    metadata: {
      seo_title: 'Curated AI & Software for Workspaces | Teniam',
      seo_description:
        'Curated AI and productivity software for modern workspace workflows.'
    }
  }
]
