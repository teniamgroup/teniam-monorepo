"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsToInsert = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.productsToInsert = [
    {
        title: "Zenith Motorized Standing Desk",
        handle: "zenith-motorized-standing-desk",
        subtitle: "Elevate your productivity, literally.",
        description: "The Zenith Standing Desk features a dual motor system for smooth, quiet height adjustments. With a solid oak top and reinforced steel frame, it provides a wobble free experience whether you are sitting or standing.",
        thumbnail: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80",
        is_giftcard: false,
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
        status: utils_1.ProductStatus.PUBLISHED,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1wcm9kdWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zY3JpcHRzL3NlZWQvc2VlZC1wcm9kdWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBMEQ7QUFFN0MsUUFBQSxnQkFBZ0IsR0FBRztJQUM5QjtRQUNFLEtBQUssRUFBRSxnQ0FBZ0M7UUFDdkMsTUFBTSxFQUFFLGdDQUFnQztRQUN4QyxRQUFRLEVBQUUsdUNBQXVDO1FBQ2pELFdBQVcsRUFBRSx3TkFBd047UUFDck8sU0FBUyxFQUFFLDhGQUE4RjtRQUN6RyxXQUFXLEVBQUUsS0FBSztRQUNsQixNQUFNLEVBQUUscUJBQWEsQ0FBQyxTQUFTO1FBQy9CLFlBQVksRUFBRSxJQUFJO1FBQ2xCLE1BQU0sRUFBRTtZQUNOLEVBQUUsR0FBRyxFQUFFLCtGQUErRixFQUFFO1lBQ3hHLEVBQUUsR0FBRyxFQUFFLCtGQUErRixFQUFFO1NBQ3pHO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRTtZQUM3QyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1NBQzlDO1FBQ0QsUUFBUSxFQUFFO1lBQ1I7Z0JBQ0UsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7Z0JBQ3hDLE1BQU0sRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDbEQ7WUFDRDtnQkFDRSxLQUFLLEVBQUUsYUFBYTtnQkFDcEIsZUFBZSxFQUFFLEtBQUs7Z0JB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