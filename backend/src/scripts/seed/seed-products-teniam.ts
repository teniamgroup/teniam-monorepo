import { ProductStatus } from '@medusajs/framework/utils'

/**
 * Teniam dummy products (one per leaf category).
 *
 * Category linking:
 * - We store intended category in `metadata.category_handle`.
 * - Seed function resolves handle to ID when inserting.
 */

const img = {
  keyboard: 'https://source.unsplash.com/tROXvYvFtB4/1200x900',
  keyboardAlt: 'https://source.unsplash.com/6ddsNS2dybg/1200x900',
  gpu: 'https://source.unsplash.com/0yCpE1to0RA/1200x900',
  gpuAlt: 'https://source.unsplash.com/CYRhbpwG8Is/1200x900',
  desk: 'https://source.unsplash.com/hPCFOFtmNls/1200x900',
  deskAlt: 'https://source.unsplash.com/aZ9RPzXQ8S4/1200x900',
  monitor: 'https://source.unsplash.com/shr_Xn8S8QU/1200x900',
  microphone: 'https://source.unsplash.com/QwXbJLGxKc0/1200x900',
  microphoneAlt: 'https://source.unsplash.com/kBWS7hU0ot4/1200x900',
  headphones: 'https://source.unsplash.com/rlJngr1ReOw/1200x900',
  ssd: 'https://source.unsplash.com/2jX1yezKlrs/1200x900',
  chair: 'https://source.unsplash.com/XJgNXE8Kc5g/1200x900',
  camera: 'https://source.unsplash.com/9q_Sdz3W7S8/1200x900',
  light: 'https://source.unsplash.com/KJz3g6FJ98I/1200x900'
}

function mkProduct(input: {
  title: string
  handle: string
  subtitle?: string
  description: string
  thumbnail: string
  images?: string[]
  category_handle: string
  price_eur: number
}) {
  return {
    title: input.title,
    handle: input.handle,
    subtitle: input.subtitle ?? '',
    description: input.description,
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    thumbnail: input.thumbnail,
    metadata: {
      category_handle: input.category_handle
    },
    options: [
      {
        title: 'Condition',
        values: ['New', 'Used']
      }
    ],
    variants: [
      {
        title: 'New',
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: 'New' },
        prices: [
          {
            currency_code: 'eur',
            amount: input.price_eur
          }
        ]
      },
      {
        title: 'Used',
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: 'Used' },
        prices: [
          {
            currency_code: 'eur',
            amount: Math.max(1, Math.round(input.price_eur * 0.7))
          }
        ]
      }
    ],
    images: (input.images ?? [input.thumbnail]).map((url) => ({ url }))
  }
}

export const productsToInsert = [
  // Desk Setups
  mkProduct({
    title: 'ErgoLift Standing Desk',
    handle: 'ergolift-standing-desk',
    subtitle: 'Adjustable sit-stand desk for clean setups',
    description:
      'A modern sit-stand desk built for creators and remote work. Smooth height adjustment and a clean minimalist look.',
    thumbnail: img.desk,
    images: [img.desk, img.deskAlt],
    category_handle: 'standing-desks',
    price_eur: 399
  }),
  mkProduct({
    title: 'ModFrame Desk Frame Kit',
    handle: 'modframe-desk-frame-kit',
    subtitle: 'Build your own desk foundation',
    description:
      'An adjustable desk frame kit for custom tops. Ideal for DIY desk builds and upgrades.',
    thumbnail: img.deskAlt,
    category_handle: 'desk-frames-risers',
    price_eur: 249
  }),
  mkProduct({
    title: 'Desk Organizer Set',
    handle: 'desk-organizer-set',
    subtitle: 'Keep essentials tidy and within reach',
    description:
      'A compact desk accessory bundle designed to reduce clutter and improve workflow.',
    thumbnail: img.chair,
    category_handle: 'desk-accessories',
    price_eur: 39
  }),
  mkProduct({
    title: 'CableClean Under-Desk Tray',
    handle: 'cableclean-under-desk-tray',
    subtitle: 'Route power bricks and cables cleanly',
    description:
      'Under-desk cable tray with simple mounting. Keeps cables hidden and your setup looking sharp.',
    thumbnail: img.desk,
    category_handle: 'cable-management',
    price_eur: 29
  }),
  mkProduct({
    title: 'Minimal Desk Decor Kit',
    handle: 'minimal-desk-decor-kit',
    subtitle: 'Small touches that level up a setup',
    description:
      'A small desk decor bundle to personalise your workspace without making it busy.',
    thumbnail: img.deskAlt,
    category_handle: 'desk-decor',
    price_eur: 25
  }),

  // Keyboards & Input
  mkProduct({
    title: 'Nimbus Mechanical Keyboard',
    handle: 'nimbus-mechanical-keyboard',
    subtitle: 'Crisp typing feel, clean aesthetic',
    description:
      'A mechanical keyboard designed for both work and play, with a clean profile and solid build quality.',
    thumbnail: img.keyboard,
    images: [img.keyboard, img.keyboardAlt],
    category_handle: 'mechanical-keyboards',
    price_eur: 129
  }),
  mkProduct({
    title: 'Custom 65% Keyboard Build',
    handle: 'custom-65-keyboard-build',
    subtitle: 'Compact layout, premium feel',
    description:
      'A compact custom keyboard build with enthusiast-grade parts and a minimalist look.',
    thumbnail: img.keyboardAlt,
    category_handle: 'custom-keyboards',
    price_eur: 219
  }),
  mkProduct({
    title: 'PBT Keycap Set',
    handle: 'pbt-keycap-set',
    subtitle: 'Durable keycaps for daily use',
    description:
      'A durable keycap set for mechanical keyboards with a clean, modern style.',
    thumbnail: img.keyboard,
    category_handle: 'keycaps',
    price_eur: 59
  }),
  mkProduct({
    title: 'Tactile Switch Pack',
    handle: 'tactile-switch-pack',
    subtitle: 'Smooth bump, consistent feel',
    description:
      'A switch pack for custom builds. Great for anyone chasing a satisfying tactile feel.',
    thumbnail: img.keyboardAlt,
    category_handle: 'switches',
    price_eur: 35
  }),
  mkProduct({
    title: 'Precision Wireless Mouse',
    handle: 'precision-wireless-mouse',
    subtitle: 'Low-latency wireless input',
    description:
      'A lightweight wireless mouse for productivity and gaming with a clean setup-friendly design.',
    thumbnail: img.keyboard,
    category_handle: 'mice-trackpads',
    price_eur: 79
  }),
  mkProduct({
    title: 'XL Desk Mat',
    handle: 'xl-desk-mat',
    subtitle: 'Smooth glide, clean look',
    description:
      'An oversized desk mat that improves mouse control and makes a setup feel cohesive.',
    thumbnail: img.keyboardAlt,
    category_handle: 'desk-mats',
    price_eur: 29
  }),

  // PC Components
  mkProduct({
    title: 'RTX-Class Graphics Card',
    handle: 'rtx-class-graphics-card',
    subtitle: 'High-performance GPU for modern builds',
    description:
      'A high-performance graphics card suited for gaming and creative workloads. Secure checkout recommended.',
    thumbnail: img.gpu,
    images: [img.gpu, img.gpuAlt],
    category_handle: 'gpus',
    price_eur: 499
  }),
  mkProduct({
    title: 'Desktop CPU (8-Core)',
    handle: 'desktop-cpu-8-core',
    subtitle: 'Fast performance for work and play',
    description:
      'An 8-core desktop CPU for gaming and productivity builds. Great upgrade option for mid-range systems.',
    thumbnail: img.ssd,
    category_handle: 'cpus',
    price_eur: 189
  }),
  mkProduct({
    title: 'ATX Motherboard',
    handle: 'atx-motherboard',
    subtitle: 'Reliable base for a desktop build',
    description:
      'An ATX motherboard with a clean layout and solid connectivity for custom builds.',
    thumbnail: img.gpuAlt,
    category_handle: 'motherboards',
    price_eur: 149
  }),
  mkProduct({
    title: 'DDR4 Memory Kit (16GB)',
    handle: 'ddr4-memory-kit-16gb',
    subtitle: 'Smooth multitasking and gaming',
    description: 'A 16GB memory kit suitable for most modern desktop builds.',
    thumbnail: img.ssd,
    category_handle: 'ram',
    price_eur: 69
  }),
  mkProduct({
    title: 'NVMe SSD (1TB)',
    handle: 'nvme-ssd-1tb',
    subtitle: 'Fast storage for modern PCs',
    description:
      'A fast NVMe SSD for quick boot times and snappy app loads. Great upgrade for older builds.',
    thumbnail: img.ssd,
    category_handle: 'storage',
    price_eur: 89
  }),
  mkProduct({
    title: 'Quiet Cooling Fan Kit',
    handle: 'quiet-cooling-fan-kit',
    subtitle: 'Better airflow, less noise',
    description:
      'A cooling fan kit to improve airflow and keep your PC running cooler and quieter.',
    thumbnail: img.gpuAlt,
    category_handle: 'cooling-fans',
    price_eur: 35
  }),

  // Monitors & Mounts
  mkProduct({
    title: '27" 4K Monitor',
    handle: '27-4k-monitor',
    subtitle: 'Crisp display for work + gaming',
    description:
      'A 27-inch 4K monitor that looks great on modern setups. Ideal for creators and productivity.',
    thumbnail: img.monitor,
    category_handle: 'monitors',
    price_eur: 299
  }),
  mkProduct({
    title: 'Adjustable Monitor Arm',
    handle: 'adjustable-monitor-arm',
    subtitle: 'Ergonomic mounting for clean desks',
    description:
      'A monitor arm with smooth adjustments to free desk space and improve posture.',
    thumbnail: img.monitor,
    category_handle: 'monitor-arms',
    price_eur: 79
  }),
  mkProduct({
    title: 'Monitor Stand Riser',
    handle: 'monitor-stand-riser',
    subtitle: 'Lift your screen, organise your desk',
    description:
      'A sturdy monitor riser that creates space under your display for accessories.',
    thumbnail: img.monitor,
    category_handle: 'monitor-stands',
    price_eur: 39
  }),
  mkProduct({
    title: 'VESA Mount Bracket',
    handle: 'vesa-mount-bracket',
    subtitle: 'Secure mounting for compatible monitors',
    description:
      'A VESA bracket for mounting compatible monitors to arms and stands.',
    thumbnail: img.monitor,
    category_handle: 'mounts-brackets',
    price_eur: 19
  }),
  mkProduct({
    title: 'Privacy Screen Filter',
    handle: 'privacy-screen-filter',
    subtitle: 'Reduce side-angle viewing',
    description:
      'A privacy screen filter to help keep your display content less visible from side angles.',
    thumbnail: img.monitor,
    category_handle: 'privacy-screens',
    price_eur: 29
  }),

  // Audio & Video
  mkProduct({
    title: 'Studio Headphones',
    handle: 'studio-headphones',
    subtitle: 'Comfortable, detailed audio',
    description:
      'Over-ear headphones for focused work, editing and gaming. Setup-friendly look.',
    thumbnail: img.headphones,
    category_handle: 'headphones',
    price_eur: 99
  }),
  mkProduct({
    title: 'Compact Desk Speakers',
    handle: 'compact-desk-speakers',
    subtitle: 'Clean sound without taking space',
    description:
      'A compact speaker set designed for desks with limited space.',
    thumbnail: img.headphones,
    category_handle: 'desk-speakers',
    price_eur: 79
  }),
  mkProduct({
    title: 'Podcast Microphone',
    handle: 'podcast-microphone',
    subtitle: 'Clear voice capture for calls and content',
    description:
      'A dynamic microphone ideal for streaming, podcasts and meetings.',
    thumbnail: img.microphone,
    images: [img.microphone, img.microphoneAlt],
    category_handle: 'microphones',
    price_eur: 129
  }),
  mkProduct({
    title: 'USB Audio Interface / DAC',
    handle: 'usb-audio-interface-dac',
    subtitle: 'Cleaner sound for headphones and mics',
    description:
      'A compact DAC/interface to improve audio quality for headphones and microphones.',
    thumbnail: img.ssd,
    category_handle: 'audio-interfaces-dacs',
    price_eur: 89
  }),
  mkProduct({
    title: '1080p Webcam',
    handle: '1080p-webcam',
    subtitle: 'Sharper calls and streams',
    description:
      'A clean 1080p webcam for meetings and streaming with plug-and-play setup.',
    thumbnail: img.camera,
    category_handle: 'webcams',
    price_eur: 49
  }),
  mkProduct({
    title: 'Camera Desk Mount',
    handle: 'camera-desk-mount',
    subtitle: 'Flexible camera positioning',
    description:
      'A desk mount for cameras and accessories to level up your creator setup.',
    thumbnail: img.camera,
    category_handle: 'camera-mounts',
    price_eur: 39
  }),

  // Lighting & Ambience
  mkProduct({
    title: 'LED Desk Light Bar',
    handle: 'led-desk-light-bar',
    subtitle: 'Even lighting for your workspace',
    description:
      'A slim LED light bar that brightens your desk without glare.',
    thumbnail: img.light,
    category_handle: 'led-light-bars',
    price_eur: 49
  }),
  mkProduct({
    title: 'RGB Light Strip Kit',
    handle: 'rgb-light-strip-kit',
    subtitle: 'Ambient colour for setups',
    description:
      'RGB light strips to add ambience behind monitors or along desk edges.',
    thumbnail: img.light,
    category_handle: 'rgb-lighting',
    price_eur: 29
  }),
  mkProduct({
    title: 'Minimal Desk Lamp',
    handle: 'minimal-desk-lamp',
    subtitle: 'Soft lighting, clean design',
    description:
      'A minimalist desk lamp to improve lighting and reduce eye strain.',
    thumbnail: img.light,
    category_handle: 'desk-lamps',
    price_eur: 39
  }),
  mkProduct({
    title: 'Ambient Wall Panel Set',
    handle: 'ambient-wall-panel-set',
    subtitle: 'Set the mood behind your desk',
    description:
      'Wall lighting panels that add depth and personality to a workspace.',
    thumbnail: img.light,
    category_handle: 'wall-panels',
    price_eur: 89
  }),
  mkProduct({
    title: 'Smart Desk Light',
    handle: 'smart-desk-light',
    subtitle: 'App-controlled ambience',
    description:
      'A smart light that supports schedules and easy brightness control for your workspace.',
    thumbnail: img.light,
    category_handle: 'smart-lighting',
    price_eur: 59
  }),

  // Workspace Accessories
  mkProduct({
    title: 'USB-C Hub Dock',
    handle: 'usb-c-hub-dock',
    subtitle: 'Expand ports for a clean setup',
    description:
      'A compact USB-C hub to add ports and simplify your desk cable layout.',
    thumbnail: img.ssd,
    category_handle: 'usb-hubs-docks',
    price_eur: 39
  }),
  mkProduct({
    title: 'GaN Fast Charger',
    handle: 'gan-fast-charger',
    subtitle: 'Small charger, big power',
    description:
      'A compact fast charger for phones, tablets and accessories on your desk.',
    thumbnail: img.ssd,
    category_handle: 'power-chargers',
    price_eur: 29
  }),
  mkProduct({
    title: 'USB-C Cable Set',
    handle: 'usb-c-cable-set',
    subtitle: 'Clean cables for clean desks',
    description:
      'A cable set to keep your desk tidy and your devices charged.',
    thumbnail: img.ssd,
    category_handle: 'cables',
    price_eur: 15
  }),
  mkProduct({
    title: 'Workspace Storage Organizer',
    handle: 'workspace-storage-organizer',
    subtitle: 'Declutter your setup',
    description:
      'A storage organiser for keeping small accessories in one place.',
    thumbnail: img.deskAlt,
    category_handle: 'storage-organisers',
    price_eur: 25
  }),
  mkProduct({
    title: 'Laptop / Tablet Stand',
    handle: 'laptop-tablet-stand',
    subtitle: 'Better posture, better airflow',
    description:
      'A stand that lifts a laptop or tablet for improved ergonomics and a cleaner desk layout.',
    thumbnail: img.desk,
    category_handle: 'stands-holders',
    price_eur: 29
  })
]
