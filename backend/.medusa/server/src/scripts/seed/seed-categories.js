"use strict";
/**
 * Teniam category seed data.
 *
 * Notes:
 * - Medusa supports `handle` on categories.
 * - SEO fields can be stored in `metadata`.
 * - For hierarchy, we use `parent_handle` and resolve it in the seed function.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCategoriesToInsert = void 0;
exports.productCategoriesToInsert = [
    // Primary categories
    {
        name: 'Desk Setups',
        handle: 'desk-setups',
        description: 'Desks, ergonomic upgrades, cable management and essentials for a clean workspace.',
        is_active: true,
        metadata: {
            seo_title: 'Desk Setups & Workspace Gear for Modern Desks | Teniam',
            seo_description: 'Buy and sell desk setups, standing desks, cable management, and workspace accessories. Discover new and used desk gear built for modern setups.'
        }
    },
    {
        name: 'Keyboards & Input',
        handle: 'keyboards-input',
        description: 'Mechanical keyboards, custom builds, mice and desk mats for enthusiasts.',
        is_active: true,
        metadata: {
            seo_title: 'Mechanical Keyboards & Desk Input Gear | Teniam',
            seo_description: 'Buy and sell mechanical keyboards, keycaps, switches, mice, and desk mats. A marketplace built for keyboard enthusiasts.'
        }
    },
    {
        name: 'PC Components',
        handle: 'pc-components',
        description: 'Desktop hardware and parts for upgrades and custom PC builds.',
        is_active: true,
        metadata: {
            seo_title: 'PC Components & Desktop Parts Marketplace | Teniam',
            seo_description: 'Buy and sell PC components including GPUs, CPUs, RAM, and storage. Secure checkout for desktop hardware.'
        }
    },
    {
        name: 'Monitors & Mounts',
        handle: 'monitors-mounts',
        description: 'Monitors, arms and mounting solutions for clean, ergonomic setups.',
        is_active: true,
        metadata: {
            seo_title: 'Monitors & Desk Mounts for Setups | Teniam',
            seo_description: 'Buy and sell monitors, monitor arms, and mounting solutions built for modern desk setups.'
        }
    },
    {
        name: 'Audio & Video',
        handle: 'audio-video',
        description: 'Headphones, microphones, speakers and creator gear for your desk.',
        is_active: true,
        metadata: {
            seo_title: 'Desk Audio & Video Gear for Creators | Teniam',
            seo_description: 'Buy and sell desk audio and video gear including microphones, headphones, webcams, and interfaces.'
        }
    },
    {
        name: 'Lighting & Ambience',
        handle: 'lighting-ambience',
        description: 'RGB and lighting that makes your desk setup look and feel better.',
        is_active: true,
        metadata: {
            seo_title: 'Desk Lighting & Ambience Gear | Teniam',
            seo_description: 'Shop RGB lighting, desk lamps, wall panels and ambience gear for modern setups.'
        }
    },
    {
        name: 'Workspace Accessories',
        handle: 'workspace-accessories',
        description: 'Hubs, cables, chargers and everyday add-ons for the workspace.',
        is_active: true,
        metadata: {
            seo_title: 'Workspace Accessories for Desk Setups | Teniam',
            seo_description: 'Buy and sell workspace accessories including hubs, cables, chargers, organisers and stands.'
        }
    },
    {
        name: 'Digital Studio',
        handle: 'digital-studio',
        description: 'Wallpapers, icon packs, templates and curated software for your digital workspace.',
        is_active: false,
        metadata: {
            seo_title: 'Wallpapers, Templates & Digital Workspace Assets | Teniam',
            seo_description: 'Browse wallpapers, icon packs, templates and curated tools designed for modern workspaces.'
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
            seo_description: 'Buy and sell standing desks and adjustable workstations for modern desk setups.'
        }
    },
    {
        name: 'Desk Frames & Risers',
        handle: 'desk-frames-risers',
        parent_handle: 'desk-setups',
        is_active: true,
        metadata: {
            seo_title: 'Desk Frames & Risers for Custom Setups | Teniam',
            seo_description: 'Shop desk frames, risers and foundations for custom workspace builds.'
        }
    },
    {
        name: 'Desk Accessories',
        handle: 'desk-accessories',
        parent_handle: 'desk-setups',
        is_active: true,
        metadata: {
            seo_title: 'Desk Accessories for Clean Workspaces | Teniam',
            seo_description: 'Browse desk accessories designed to improve comfort, workflow and organisation.'
        }
    },
    {
        name: 'Cable Management',
        handle: 'cable-management',
        parent_handle: 'desk-setups',
        is_active: true,
        metadata: {
            seo_title: 'Cable Management for Desk Setups | Teniam',
            seo_description: 'Cable trays, clips and organisers to keep desk setups tidy and clutter-free.'
        }
    },
    {
        name: 'Desk Decor',
        handle: 'desk-decor',
        parent_handle: 'desk-setups',
        is_active: true,
        metadata: {
            seo_title: 'Desk Decor & Workspace Styling | Teniam',
            seo_description: 'Personalise your workspace with desk decor and styling accessories.'
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
            seo_description: 'Browse new and used mechanical keyboards from trusted sellers.'
        }
    },
    {
        name: 'Custom Keyboards',
        handle: 'custom-keyboards',
        parent_handle: 'keyboards-input',
        is_active: true,
        metadata: {
            seo_title: 'Custom Mechanical Keyboards & Builds | Teniam',
            seo_description: 'Custom-built keyboards, DIY builds and enthusiast-grade setups.'
        }
    },
    {
        name: 'Keycaps',
        handle: 'keycaps',
        parent_handle: 'keyboards-input',
        is_active: true,
        metadata: {
            seo_title: 'Keycaps for Mechanical Keyboards | Teniam',
            seo_description: 'Buy and sell keycap sets for custom mechanical keyboards.'
        }
    },
    {
        name: 'Switches',
        handle: 'switches',
        parent_handle: 'keyboards-input',
        is_active: true,
        metadata: {
            seo_title: 'Mechanical Keyboard Switches | Teniam',
            seo_description: 'Shop mechanical keyboard switches including linear, tactile and clicky options.'
        }
    },
    {
        name: 'Mice & Trackpads',
        handle: 'mice-trackpads',
        parent_handle: 'keyboards-input',
        is_active: true,
        metadata: {
            seo_title: 'Mice & Trackpads for Desk Setups | Teniam',
            seo_description: 'Gaming and productivity mice and trackpads for modern desk setups.'
        }
    },
    {
        name: 'Desk Mats',
        handle: 'desk-mats',
        parent_handle: 'keyboards-input',
        is_active: true,
        metadata: {
            seo_title: 'Desk Mats & Keyboard Mats | Teniam',
            seo_description: 'Desk mats and keyboard mats designed for performance and aesthetics.'
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
            seo_description: 'New and used graphics cards with secure checkout and clear condition details.'
        }
    },
    {
        name: 'CPUs',
        handle: 'cpus',
        parent_handle: 'pc-components',
        is_active: true,
        metadata: {
            seo_title: 'Desktop CPUs for PC Builds | Teniam',
            seo_description: 'Buy and sell desktop CPUs for gaming and productivity builds.'
        }
    },
    {
        name: 'Motherboards',
        handle: 'motherboards',
        parent_handle: 'pc-components',
        is_active: true,
        metadata: {
            seo_title: 'PC Motherboards for Desktop Builds | Teniam',
            seo_description: 'Shop motherboards for modern desktop builds and upgrades.'
        }
    },
    {
        name: 'RAM',
        handle: 'ram',
        parent_handle: 'pc-components',
        is_active: true,
        metadata: {
            seo_title: 'Desktop RAM & Memory | Teniam',
            seo_description: 'Buy and sell desktop RAM and memory kits for PC upgrades.'
        }
    },
    {
        name: 'Storage (SSD / HDD)',
        handle: 'storage',
        parent_handle: 'pc-components',
        is_active: true,
        metadata: {
            seo_title: 'SSDs & Hard Drives for PCs | Teniam',
            seo_description: 'Solid state drives and hard drives for desktop PCs and storage upgrades.'
        }
    },
    {
        name: 'Cooling & Fans',
        handle: 'cooling-fans',
        parent_handle: 'pc-components',
        is_active: true,
        metadata: {
            seo_title: 'PC Cooling & Fans | Teniam',
            seo_description: 'CPU coolers, case fans and cooling solutions for desktop PCs.'
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
            seo_description: 'Buy and sell monitors for gaming and productivity desk setups.'
        }
    },
    {
        name: 'Monitor Arms',
        handle: 'monitor-arms',
        parent_handle: 'monitors-mounts',
        is_active: true,
        metadata: {
            seo_title: 'Monitor Arms & Adjustable Mounts | Teniam',
            seo_description: 'Adjustable monitor arms for ergonomic, clean desk setups.'
        }
    },
    {
        name: 'Monitor Stands',
        handle: 'monitor-stands',
        parent_handle: 'monitors-mounts',
        is_active: true,
        metadata: {
            seo_title: 'Monitor Stands & Risers | Teniam',
            seo_description: 'Monitor stands and risers for better desk ergonomics and organisation.'
        }
    },
    {
        name: 'Mounts & Brackets',
        handle: 'mounts-brackets',
        parent_handle: 'monitors-mounts',
        is_active: true,
        metadata: {
            seo_title: 'Monitor Mounts & Brackets | Teniam',
            seo_description: 'Wall and desk mounts and brackets for monitors and displays.'
        }
    },
    {
        name: 'Privacy Screens',
        handle: 'privacy-screens',
        parent_handle: 'monitors-mounts',
        is_active: true,
        metadata: {
            seo_title: 'Monitor Privacy Screens | Teniam',
            seo_description: 'Privacy screens for monitors and shared workspaces.'
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
            seo_description: 'Buy and sell headphones for gaming, music and creator setups.'
        }
    },
    {
        name: 'Desk Speakers',
        handle: 'desk-speakers',
        parent_handle: 'audio-video',
        is_active: true,
        metadata: {
            seo_title: 'Desk Speakers for Work & Play | Teniam',
            seo_description: 'Browse desk speakers and compact audio solutions for your workspace.'
        }
    },
    {
        name: 'Microphones',
        handle: 'microphones',
        parent_handle: 'audio-video',
        is_active: true,
        metadata: {
            seo_title: 'Microphones for Streaming & Calls | Teniam',
            seo_description: 'Buy and sell microphones for podcasts, streaming and meetings.'
        }
    },
    {
        name: 'Audio Interfaces & DACs',
        handle: 'audio-interfaces-dacs',
        parent_handle: 'audio-video',
        is_active: true,
        metadata: {
            seo_title: 'Audio Interfaces & DACs for Desk Audio | Teniam',
            seo_description: 'Interfaces, DACs and desk audio gear for clean sound and better output.'
        }
    },
    {
        name: 'Webcams',
        handle: 'webcams',
        parent_handle: 'audio-video',
        is_active: true,
        metadata: {
            seo_title: 'Webcams for Desk Setups | Teniam',
            seo_description: 'Shop webcams for streaming, calls and creator workflows.'
        }
    },
    {
        name: 'Camera Mounts',
        handle: 'camera-mounts',
        parent_handle: 'audio-video',
        is_active: true,
        metadata: {
            seo_title: 'Camera Mounts & Desk Rigs | Teniam',
            seo_description: 'Desk mounts and rigs for cameras, lights and creator gear.'
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
            seo_description: 'LED light bars for desk ambience, bias lighting and setup aesthetics.'
        }
    },
    {
        name: 'RGB Lighting',
        handle: 'rgb-lighting',
        parent_handle: 'lighting-ambience',
        is_active: true,
        metadata: {
            seo_title: 'RGB Lighting for Desk Setups | Teniam',
            seo_description: 'RGB lighting and ambience gear for modern desk setups.'
        }
    },
    {
        name: 'Desk Lamps',
        handle: 'desk-lamps',
        parent_handle: 'lighting-ambience',
        is_active: true,
        metadata: {
            seo_title: 'Desk Lamps for Workspaces | Teniam',
            seo_description: 'Task lighting and desk lamps designed for modern workspaces.'
        }
    },
    {
        name: 'Wall Panels',
        handle: 'wall-panels',
        parent_handle: 'lighting-ambience',
        is_active: true,
        metadata: {
            seo_title: 'Wall Panels & Setup Backdrops | Teniam',
            seo_description: 'Wall panels and backdrop lighting for desk setup aesthetics.'
        }
    },
    {
        name: 'Smart Lighting',
        handle: 'smart-lighting',
        parent_handle: 'lighting-ambience',
        is_active: true,
        metadata: {
            seo_title: 'Smart Lighting for Desk Setups | Teniam',
            seo_description: 'Smart lights and connected desk lighting to elevate your workspace.'
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
            seo_description: 'USB hubs, docks and connectivity gear for modern desk setups.'
        }
    },
    {
        name: 'Power & Chargers',
        handle: 'power-chargers',
        parent_handle: 'workspace-accessories',
        is_active: true,
        metadata: {
            seo_title: 'Power & Chargers for Workspaces | Teniam',
            seo_description: 'Power strips, chargers and charging gear for desk setups.'
        }
    },
    {
        name: 'Cables & Custom Cables',
        handle: 'cables',
        parent_handle: 'workspace-accessories',
        is_active: true,
        metadata: {
            seo_title: 'Cables & Custom Cables for Desk Setups | Teniam',
            seo_description: 'USB, HDMI and custom cables for clean, reliable connections.'
        }
    },
    {
        name: 'Storage & Organisers',
        handle: 'storage-organisers',
        parent_handle: 'workspace-accessories',
        is_active: true,
        metadata: {
            seo_title: 'Storage & Organisers for Desk Setups | Teniam',
            seo_description: 'Drawers, trays and organisers for a tidy workspace.'
        }
    },
    {
        name: 'Stands & Holders',
        handle: 'stands-holders',
        parent_handle: 'workspace-accessories',
        is_active: true,
        metadata: {
            seo_title: 'Stands & Holders for Desk Setups | Teniam',
            seo_description: 'Stands and holders for headphones, controllers, phones and desk gear.'
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
            seo_description: 'Browse wallpapers designed for clean, modern desktop setups.'
        }
    },
    {
        name: 'Icon Packs',
        handle: 'icon-packs',
        parent_handle: 'digital-studio',
        is_active: false,
        metadata: {
            seo_title: 'Icon Packs for Desktop Setups | Teniam',
            seo_description: 'Discover icon packs for a cleaner, more aesthetic desktop.'
        }
    },
    {
        name: 'Productivity Templates',
        handle: 'templates',
        parent_handle: 'digital-studio',
        is_active: false,
        metadata: {
            seo_title: 'Productivity Templates for Workflows | Teniam',
            seo_description: 'Templates and systems to level up your productivity and workflow.'
        }
    },
    {
        name: 'Setup Tools',
        handle: 'setup-tools',
        parent_handle: 'digital-studio',
        is_active: false,
        metadata: {
            seo_title: 'Setup Tools & Utilities | Teniam',
            seo_description: 'Utilities and tools designed for clean, efficient desk and desktop setups.'
        }
    },
    {
        name: 'AI & Software',
        handle: 'ai-software',
        parent_handle: 'digital-studio',
        is_active: false,
        metadata: {
            seo_title: 'Curated AI & Software for Workspaces | Teniam',
            seo_description: 'Curated AI and productivity software for modern workspace workflows.'
        }
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1jYXRlZ29yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NjcmlwdHMvc2VlZC9zZWVkLWNhdGVnb3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7OztBQVdVLFFBQUEseUJBQXlCLEdBQW1CO0lBQ3ZELHFCQUFxQjtJQUNyQjtRQUNFLElBQUksRUFBRSxhQUFhO1FBQ25CLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLFdBQVcsRUFDVCxtRkFBbUY7UUFDckYsU0FBUyxFQUFFLElBQUk7UUFDZixRQUFRLEVBQUU7WUFDUixTQUFTLEVBQUUsd0RBQXdEO1lBQ25FLGVBQWUsRUFDYixpSkFBaUo7U0FDcEo7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLFdBQVcsRUFDVCwwRUFBMEU7UUFDNUUsU0FBUyxFQUFFLElBQUk7UUFDZixRQUFRLEVBQUU7WUFDUixTQUFTLEVBQUUsaURBQWlEO1lBQzVELGVBQWUsRUFDYiwwSEFBMEg7U0FDN0g7S0FDRjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLGVBQWU7UUFDdkIsV0FBVyxFQUNULCtEQUErRDtRQUNqRSxTQUFTLEVBQUUsSUFBSTtRQUNmLFFBQVEsRUFBRTtZQUNSLFNBQVMsRUFBRSxvREFBb0Q7WUFDL0QsZUFBZSxFQUNiLDBHQUEwRztTQUM3RztLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsV0FBVyxFQUNULG9FQUFvRTtRQUN0RSxTQUFTLEVBQUUsSUFBSTtRQUNmLFFBQVEsRUFBRTtZQUNSLFNBQVMsRUFBRSw0Q0FBNEM7WUFDdkQsZUFBZSxFQUNiLDJGQUEyRjtTQUM5RjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsYUFBYTtR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