import { ProductStatus } from "@medusajs/framework/utils";

export const productsToInsert = [
  {
    title: "Zenith Motorized Standing Desk",
    handle: "zenith-motorized-standing-desk",
    subtitle: "Elevate your productivity, literally.",
    description: "The Zenith Standing Desk features a dual motor system for smooth, quiet height adjustments. With a solid oak top and reinforced steel frame, it provides a wobble free experience whether you are sitting or standing.",
    thumbnail: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80" },
      { url: "https://images.unsplash.com/photo-1616533382363-b4bca072473c?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["Oak", "Walnut"] },
      { title: "Size", values: ["120cm", "140cm"] }
    ],
    variants: [
      {
        title: "Oak / 120cm",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Oak", Size: "120cm" },
        prices: [{ currency_code: "eur", amount: 49900 }]
      },
      {
        title: "Oak / 140cm",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Oak", Size: "140cm" },
        prices: [{ currency_code: "eur", amount: 54900 }]
      },
      {
        title: "Walnut / 120cm",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Walnut", Size: "120cm" },
        prices: [{ currency_code: "eur", amount: 52900 }]
      },
      {
        title: "Walnut / 140cm",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Walnut", Size: "140cm" },
        prices: [{ currency_code: "eur", amount: 57900 }]
      }
    ],
    collection_id: "COLLECTION_ID_HOME_OFFICE_ESSENTIALS",
    categories: [{ id: "CATEGORY_ID_STANDING_DESKS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "standing-desks" }
  },
  {
    title: "Swift-Click Pro Wireless Mouse",
    handle: "swift-click-pro-wireless-mouse",
    subtitle: "Precision at your fingertips.",
    description: "Engineered for professional gamers, the Swift-Click Pro offers a 26k DPI sensor and sub-1ms latency. Its ergonomic shell reduces wrist fatigue during long sessions.",
    thumbnail: "https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["Black", "White"] }
    ],
    variants: [
      {
        title: "Black",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Black" },
        prices: [{ currency_code: "eur", amount: 8900 }]
      },
      {
        title: "White",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "White" },
        prices: [{ currency_code: "eur", amount: 8900 }]
      }
    ],
    collection_id: "COLLECTION_ID_GAMING_GEAR",
    categories: [{ id: "CATEGORY_ID_MICE_TRACKPADS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "mice-trackpads" }
  },
  {
    title: "Lunar Felt Desk Mat",
    handle: "lunar-felt-desk-mat",
    subtitle: "Warmth and texture for your workspace.",
    description: "Made from premium synthetic felt with a non-slip cork base, this mat protects your desk while providing a soft surface for your hands and devices.",
    thumbnail: "https://images.unsplash.com/photo-1616412184852-c0fb9903930b?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1616412184852-c0fb9903930b?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Size", values: ["Medium", "Large"] },
      { title: "Color", values: ["Grey", "Anthracite"] }
    ],
    variants: [
      {
        title: "Medium / Grey",
        allow_backorder: false,
        manage_inventory: true,
        options: { Size: "Medium", Color: "Grey" },
        prices: [{ currency_code: "eur", amount: 3500 }]
      },
      {
        title: "Medium / Anthracite",
        allow_backorder: false,
        manage_inventory: true,
        options: { Size: "Medium", Color: "Anthracite" },
        prices: [{ currency_code: "eur", amount: 3500 }]
      },
      {
        title: "Large / Grey",
        allow_backorder: false,
        manage_inventory: true,
        options: { Size: "Large", Color: "Grey" },
        prices: [{ currency_code: "eur", amount: 4500 }]
      },
      {
        title: "Large / Anthracite",
        allow_backorder: false,
        manage_inventory: true,
        options: { Size: "Large", Color: "Anthracite" },
        prices: [{ currency_code: "eur", amount: 4500 }]
      }
    ],
    collection_id: "COLLECTION_ID_HOME_OFFICE_ESSENTIALS",
    categories: [{ id: "CATEGORY_ID_DESK_MATS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "desk-mats" }
  },
  {
    title: "Aero-Flow Monitor Arm",
    handle: "aero-flow-monitor-arm",
    subtitle: "Free your desk space.",
    description: "A gas-spring monitor arm that allows for effortless height, tilt, and swivel adjustments. Compatible with VESA mounts and screens up to 34 inches.",
    thumbnail: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Condition", values: ["New", "Used"] }
    ],
    variants: [
      {
        title: "New",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "New" },
        prices: [{ currency_code: "eur", amount: 12000 }]
      },
      {
        title: "Used",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "Used" },
        prices: [{ currency_code: "eur", amount: 8500 }]
      }
    ],
    collection_id: "COLLECTION_ID_CREATIVE_WORKSTATION",
    categories: [{ id: "CATEGORY_ID_MONITOR_ARMS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "monitor-arms" }
  },
  {
    title: "Studio-Clarity Open-Back Headphones",
    handle: "studio-clarity-open-back-headphones",
    subtitle: "Professional grade soundstage.",
    description: "Experience music the way it was intended. These open-back headphones provide an expansive soundstage and neutral frequency response for mixing and critical listening.",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["Silver", "Black"] }
    ],
    variants: [
      {
        title: "Silver",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Silver" },
        prices: [{ currency_code: "eur", amount: 29900 }]
      },
      {
        title: "Black",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Black" },
        prices: [{ currency_code: "eur", amount: 29900 }]
      }
    ],
    collection_id: "COLLECTION_ID_AUDIO_VISUAL",
    categories: [{ id: "CATEGORY_ID_HEADPHONES" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "headphones" }
  },
  {
    title: "RTX 5080 Ultra GPU",
    handle: "rtx-5080-ultra-gpu",
    subtitle: "The ultimate gaming beast.",
    description: "Push the limits of 4K gaming with the latest architectural breakthroughs. Features 16GB of GDDR7 memory and incredible ray-tracing performance.",
    thumbnail: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: false,
    images: [
      { url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Condition", values: ["New"] }
    ],
    variants: [
      {
        title: "New",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "New" },
        prices: [{ currency_code: "eur", amount: 119900 }]
      }
    ],
    collection_id: "COLLECTION_ID_CUSTOM_BUILDS",
    categories: [{ id: "CATEGORY_ID_GPUS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "gpus" }
  },
  {
    title: "Mechanical Switch Sampler Pack",
    handle: "mechanical-switch-sampler-pack",
    subtitle: "Find your perfect click.",
    description: "Can't decide on a switch? This sampler includes 12 different mechanical switches ranging from linear to clicky and tactile.",
    thumbnail: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Set Size", values: ["12-Pack", "24-Pack"] }
    ],
    variants: [
      {
        title: "12-Pack",
        allow_backorder: false,
        manage_inventory: true,
        options: { "Set Size": "12-Pack" },
        prices: [{ currency_code: "eur", amount: 1900 }]
      },
      {
        title: "24-Pack",
        allow_backorder: false,
        manage_inventory: true,
        options: { "Set Size": "24-Pack" },
        prices: [{ currency_code: "eur", amount: 3500 }]
      }
    ],
    collection_id: "COLLECTION_ID_CUSTOM_BUILDS",
    categories: [{ id: "CATEGORY_ID_SWITCHES" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "switches" }
  },
  {
    title: "Titan 4K Curved Monitor",
    handle: "titan-4k-curved-monitor",
    subtitle: "Immersive visuals for work and play.",
    description: "A 34-inch ultra-wide curved display with 144Hz refresh rate and HDR1000. Perfect for cinematic gaming and large-scale creative workflows.",
    thumbnail: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Condition", values: ["New", "Used"] }
    ],
    variants: [
      {
        title: "New",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "New" },
        prices: [{ currency_code: "eur", amount: 89900 }]
      },
      {
        title: "Used",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "Used" },
        prices: [{ currency_code: "eur", amount: 65000 }]
      }
    ],
    collection_id: "COLLECTION_ID_GAMING_GEAR",
    categories: [{ id: "CATEGORY_ID_MONITORS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "monitors" }
  },
  {
    title: "Coiled Aviator USB-C Cable",
    handle: "coiled-aviator-usb-c-cable",
    subtitle: "The aesthetic choice for keyboards.",
    description: "Durable paracord-wrapped cable with a high-quality aviator connector. Adds a professional look to any mechanical keyboard setup.",
    thumbnail: "https://images.unsplash.com/photo-1619103300867-6260d60914ad?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1619103300867-6260d60914ad?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["Sky Blue", "Midnight", "Laser Pink"] }
    ],
    variants: [
      {
        title: "Sky Blue",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Sky Blue" },
        prices: [{ currency_code: "eur", amount: 4500 }]
      },
      {
        title: "Midnight",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Midnight" },
        prices: [{ currency_code: "eur", amount: 4500 }]
      },
      {
        title: "Laser Pink",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Laser Pink" },
        prices: [{ currency_code: "eur", amount: 4500 }]
      }
    ],
    collection_id: "COLLECTION_ID_ACCESSORIES",
    categories: [{ id: "CATEGORY_ID_CABLES" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "cables" }
  },
  {
    title: "Minimalist Desktop Organizer",
    handle: "minimalist-desktop-organizer",
    subtitle: "A place for everything.",
    description: "A modular organization tray for your pens, cards, and everyday carry. Features magnetic attachments and a high-quality aluminum finish.",
    thumbnail: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["Silver", "Space Grey"] }
    ],
    variants: [
      {
        title: "Silver",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Silver" },
        prices: [{ currency_code: "eur", amount: 5900 }]
      },
      {
        title: "Space Grey",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Space Grey" },
        prices: [{ currency_code: "eur", amount: 5900 }]
      }
    ],
    collection_id: "COLLECTION_ID_HOME_OFFICE_ESSENTIALS",
    categories: [{ id: "CATEGORY_ID_STORAGE_ORGANISERS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "storage-organisers" }
  },
  {
    title: "Pro-Stream XLR Microphone",
    handle: "pro-stream-xlr-microphone",
    subtitle: "Broadcast-quality voice.",
    description: "Large-diaphragm condenser microphone designed for podcasters and streamers. Requires 48V phantom power via an audio interface.",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Condition", values: ["New", "Used"] }
    ],
    variants: [
      {
        title: "New",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "New" },
        prices: [{ currency_code: "eur", amount: 24900 }]
      },
      {
        title: "Used",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "Used" },
        prices: [{ currency_code: "eur", amount: 18000 }]
      }
    ],
    collection_id: "COLLECTION_ID_AUDIO_VISUAL",
    categories: [{ id: "CATEGORY_ID_MICROPHONES" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "microphones" }
  },
  {
    title: "Hex-Grid RGB Wall Panels",
    handle: "hex-grid-rgb-wall-panels",
    subtitle: "Paint your walls with light.",
    description: "Smart LED panels that sync with your computer or music. Easy to install with included adhesive strips. Expandable up to 30 panels.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Pack Size", values: ["7-Pack", "15-Pack"] }
    ],
    variants: [
      {
        title: "7-Pack",
        allow_backorder: false,
        manage_inventory: true,
        options: { "Pack Size": "7-Pack" },
        prices: [{ currency_code: "eur", amount: 14900 }]
      },
      {
        title: "15-Pack",
        allow_backorder: false,
        manage_inventory: true,
        options: { "Pack Size": "15-Pack" },
        prices: [{ currency_code: "eur", amount: 25900 }]
      }
    ],
    collection_id: "COLLECTION_ID_LIGHTING_SOLUTIONS",
    categories: [{ id: "CATEGORY_ID_RGB_LIGHTING" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "rgb-lighting" }
  },
  {
    title: "Ergo-Comfort Desk Chair",
    handle: "ergo-comfort-desk-chair",
    subtitle: "Support for your spine.",
    description: "Breathable mesh back with adjustable lumbar support and 4D armrests. Designed to support 8+ hours of daily use.",
    thumbnail: "https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["Onyx Black", "Storm Grey"] }
    ],
    variants: [
      {
        title: "Onyx Black",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Onyx Black" },
        prices: [{ currency_code: "eur", amount: 34900 }]
      },
      {
        title: "Storm Grey",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Storm Grey" },
        prices: [{ currency_code: "eur", amount: 34900 }]
      }
    ],
    collection_id: "COLLECTION_ID_HOME_OFFICE_ESSENTIALS",
    categories: [{ id: "CATEGORY_ID_DESK_ACCESSORIES" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "desk-accessories" }
  },
  {
    title: "Velvet Gradient Keycap Set",
    handle: "velvet-gradient-keycap-set",
    subtitle: "Durable PBT, beautiful colors.",
    description: "Thick PBT doubleshot keycaps featuring a sunset gradient. Compatible with most mechanical keyboards using MX-style switches.",
    thumbnail: "https://images.unsplash.com/photo-1618384887929-16ec33faf9c1?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1618384887929-16ec33faf9c1?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Layout", values: ["ANSI", "ISO"] }
    ],
    variants: [
      {
        title: "ANSI",
        allow_backorder: false,
        manage_inventory: true,
        options: { Layout: "ANSI" },
        prices: [{ currency_code: "eur", amount: 6500 }]
      },
      {
        title: "ISO",
        allow_backorder: false,
        manage_inventory: true,
        options: { Layout: "ISO" },
        prices: [{ currency_code: "eur", amount: 6500 }]
      }
    ],
    collection_id: "COLLECTION_ID_CUSTOM_BUILDS",
    categories: [{ id: "CATEGORY_ID_KEYCAPS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "keycaps" }
  },
  {
    title: "Sonic-Pulse Desk Speakers",
    handle: "sonic-pulse-desk-speakers",
    subtitle: "Compact size, massive sound.",
    description: "High-fidelity bookshelf speakers for your desk. Features Bluetooth 5.0 and optical inputs for versatile connectivity.",
    thumbnail: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Condition", values: ["New", "Used"] }
    ],
    variants: [
      {
        title: "New",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "New" },
        prices: [{ currency_code: "eur", amount: 19900 }]
      },
      {
        title: "Used",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "Used" },
        prices: [{ currency_code: "eur", amount: 14000 }]
      }
    ],
    collection_id: "COLLECTION_ID_AUDIO_VISUAL",
    categories: [{ id: "CATEGORY_ID_DESK_SPEAKERS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "desk-speakers" }
  },
  {
    title: "Thunderbolt 4 Docking Station",
    handle: "thunderbolt-4-docking-station",
    subtitle: "The ultimate single-cable solution.",
    description: "Connect your laptop to dual 4K monitors, peripherals, and high-speed storage with a single Thunderbolt 4 cable. Features 90W power delivery.",
    thumbnail: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Power Output", values: ["90W", "120W"] }
    ],
    variants: [
      {
        title: "90W",
        allow_backorder: false,
        manage_inventory: true,
        options: { "Power Output": "90W" },
        prices: [{ currency_code: "eur", amount: 22900 }]
      },
      {
        title: "120W",
        allow_backorder: false,
        manage_inventory: true,
        options: { "Power Output": "120W" },
        prices: [{ currency_code: "eur", amount: 27900 }]
      }
    ],
    collection_id: "COLLECTION_ID_ACCESSORIES",
    categories: [{ id: "CATEGORY_ID_USB_HUBS_DOCKS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "usb-hubs-docks" }
  },
  {
    title: "4K Ultra-Crisp Webcam",
    handle: "4k-ultra-crisp-webcam",
    subtitle: "Crystal clear video for every meeting.",
    description: "High-definition 4K webcam with auto-focus and low-light correction. Built-in privacy shutter ensures your security.",
    thumbnail: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["Black", "White"] }
    ],
    variants: [
      {
        title: "Black",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Black" },
        prices: [{ currency_code: "eur", amount: 12900 }]
      },
      {
        title: "White",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "White" },
        prices: [{ currency_code: "eur", amount: 12900 }]
      }
    ],
    collection_id: "COLLECTION_ID_AUDIO_VISUAL",
    categories: [{ id: "CATEGORY_ID_WEBCAMS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "webcams" }
  },
  {
    title: "65W GaN Travel Charger",
    handle: "65w-gan-travel-charger",
    subtitle: "Small size, big power.",
    description: "A compact Gallium Nitride (GaN) charger with two USB-C ports and one USB-A port. Charges your laptop and phone simultaneously.",
    thumbnail: "https://images.unsplash.com/photo-1610492314415-d4452188448b?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1610492314415-d4452188448b?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["White", "Black"] }
    ],
    variants: [
      {
        title: "White",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "White" },
        prices: [{ currency_code: "eur", amount: 4900 }]
      },
      {
        title: "Black",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Black" },
        prices: [{ currency_code: "eur", amount: 4900 }]
      }
    ],
    collection_id: "COLLECTION_ID_ACCESSORIES",
    categories: [{ id: "CATEGORY_ID_POWER_CHARGERS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "power-chargers" }
  },
  {
    title: "Bamboo Monitor Stand",
    handle: "bamboo-monitor-stand",
    subtitle: "Eco-friendly ergonomics.",
    description: "Raise your monitor to eye level with this sustainable bamboo stand. Includes built-in slots for your phone and stationery.",
    thumbnail: "https://images.unsplash.com/photo-1615803795033-5bc500e57608?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1615803795033-5bc500e57608?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Condition", values: ["New"] }
    ],
    variants: [
      {
        title: "New",
        allow_backorder: false,
        manage_inventory: true,
        options: { Condition: "New" },
        prices: [{ currency_code: "eur", amount: 3900 }]
      }
    ],
    collection_id: "COLLECTION_ID_HOME_OFFICE_ESSENTIALS",
    categories: [{ id: "CATEGORY_ID_MONITOR_STANDS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "monitor-stands" }
  },
  {
    title: "Acoustic Wall Panels",
    handle: "acoustic-wall-panels",
    subtitle: "Better sound, better focus.",
    description: "High-density foam panels that reduce echo and reverb in your workspace. Stylish hexagon design allows for creative patterns.",
    thumbnail: "https://images.unsplash.com/photo-1519710192704-c6c23f8189b6?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1519710192704-c6c23f8189b6?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["Dark Grey", "Light Grey"] },
      { title: "Quantity", values: ["12-Pack"] }
    ],
    variants: [
      {
        title: "Dark Grey / 12-Pack",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Dark Grey", Quantity: "12-Pack" },
        prices: [{ currency_code: "eur", amount: 5500 }]
      },
      {
        title: "Light Grey / 12-Pack",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Light Grey", Quantity: "12-Pack" },
        prices: [{ currency_code: "eur", amount: 5500 }]
      }
    ],
    collection_id: "COLLECTION_ID_CREATIVE_WORKSTATION",
    categories: [{ id: "CATEGORY_ID_WALL_PANELS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "wall-panels" }
  },
  {
    title: "Smart LED Desk Lamp",
    handle: "smart-led-desk-lamp",
    subtitle: "Lighting that adapts to you.",
    description: "Adjustable color temperature and brightness via a touch-sensitive slider or mobile app. Features an integrated Qi wireless charger.",
    thumbnail: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Color", values: ["Black", "Silver"] }
    ],
    variants: [
      {
        title: "Black",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Black" },
        prices: [{ currency_code: "eur", amount: 7900 }]
      },
      {
        title: "Silver",
        allow_backorder: false,
        manage_inventory: true,
        options: { Color: "Silver" },
        prices: [{ currency_code: "eur", amount: 7900 }]
      }
    ],
    collection_id: "COLLECTION_ID_LIGHTING_SOLUTIONS",
    categories: [{ id: "CATEGORY_ID_DESK_LAMPS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "desk-lamps" }
  },
  {
    title: "Privacy Screen Filter",
    handle: "privacy-screen-filter",
    subtitle: "Keep your work private.",
    description: "Magnetic privacy filter that limits the viewing angle to +/- 30 degrees. Reduces blue light by up to 45%.",
    thumbnail: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
    is_giftcard: false,
    status: ProductStatus.PUBLISHED,
    discountable: true,
    images: [
      { url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=80" }
    ],
    options: [
      { title: "Size", values: ["13 inch", "15 inch"] }
    ],
    variants: [
      {
        title: "13 inch",
        allow_backorder: false,
        manage_inventory: true,
        options: { Size: "13 inch" },
        prices: [{ currency_code: "eur", amount: 2500 }]
      },
      {
        title: "15 inch",
        allow_backorder: false,
        manage_inventory: true,
        options: { Size: "15 inch" },
        prices: [{ currency_code: "eur", amount: 3000 }]
      }
    ],
    collection_id: "COLLECTION_ID_ACCESSORIES",
    categories: [{ id: "CATEGORY_ID_PRIVACY_SCREENS" }],
    sales_channels: [{ id: "SALES_CHANNEL_ID_DEFAULT" }],
    additional_data: { seller_id: "SELLER_ID_MERCIUS" },
    metadata: { category_handle: "privacy-screens" }
  }
];