// ============================================================
//  HUMNGAMA — Product Catalogue (with real images)
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: "Wildcraft Voyager Backpack",
    category: "Sports",
    price: 1899,
    originalPrice: 2999,
    tag: "Sale",
    description: "Durable 45L backpack with padded laptop compartment, rain cover, and ergonomic shoulder straps. Perfect for treks and daily use.",
    details: ["45L capacity", "Padded 15\" laptop compartment", "Rain cover included", "Ergonomic back support"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    gradient: "linear-gradient(135deg,#1a5f3f,#2d8c5e)"
  },
  {
    id: 2,
    name: "boAt Airdopes 141",
    category: "Electronics",
    price: 1299,
    originalPrice: 2990,
    tag: "Bestseller",
    description: "True wireless earbuds with 42 hours total playback, IPX4 water resistance, and BEAST™ mode for gaming.",
    details: ["42hr total battery", "IPX4 water resistant", "BEAST™ mode low latency", "Bluetooth 5.0"],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
    gradient: "linear-gradient(135deg,#1a237e,#283593)"
  },
  {
    id: 3,
    name: "Saree — Banarasi Silk",
    category: "Fashion",
    price: 3499,
    originalPrice: 5500,
    tag: "Sale",
    description: "Pure Banarasi silk saree with zari weave. Rich traditional motifs with a modern colour palette. 6.3 metres with unstitched blouse piece.",
    details: ["Pure Banarasi silk", "Zari border & pallu", "6.3m with blouse piece", "Dry clean only"],
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
    gradient: "linear-gradient(135deg,#7b1fa2,#9c27b0)"
  },
  {
    id: 4,
    name: "Milton Thermosteel Flask 500ml",
    category: "Home & Kitchen",
    price: 649,
    originalPrice: 999,
    tag: null,
    description: "Double-wall stainless steel vacuum flask. Keeps beverages hot for 24 hours and cold for 48 hours. 100% leak-proof.",
    details: ["500ml capacity", "24hr hot / 48hr cold", "Food-grade stainless steel", "BPA-free, leak-proof"],
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    gradient: "linear-gradient(135deg,#37474f,#546e7a)"
  },
  {
    id: 5,
    name: "Himalaya Face Wash Neem",
    category: "Beauty",
    price: 179,
    originalPrice: null,
    tag: "New",
    description: "Gentle neem and turmeric face wash that removes excess oil and impurities. Suitable for all skin types. Dermatologically tested.",
    details: ["150ml pack", "Neem + turmeric formula", "Dermatologically tested", "Paraben-free"],
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80",
    gradient: "linear-gradient(135deg,#2e7d32,#43a047)"
  },
  {
    id: 6,
    name: "Tata Tea Gold 500g",
    category: "Grocery",
    price: 299,
    originalPrice: 340,
    tag: null,
    description: "Premium blend of Assam and Darjeeling long-leaf teas. Rich, aromatic cup every time. 500g resealable pack.",
    details: ["500g pack", "Assam + Darjeeling blend", "Long-leaf premium grade", "Resealable zipper pack"],
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80",
    gradient: "linear-gradient(135deg,#bf360c,#d84315)"
  },
  {
    id: 7,
    name: "Lego Classic Bricks 484 pcs",
    category: "Toys",
    price: 2499,
    originalPrice: 3299,
    tag: "Sale",
    description: "484-piece classic brick set in 33 colours. Encourages creative building for ages 4 and above. Compatible with all LEGO sets.",
    details: ["484 pieces", "33 colours", "Ages 4 and above", "Compatible with all LEGO"],
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80",
    gradient: "linear-gradient(135deg,#e65100,#f57c00)"
  },
  {
    id: 8,
    name: "Atomic Habits — James Clear",
    category: "Books",
    price: 349,
    originalPrice: 499,
    tag: "Bestseller",
    description: "The #1 bestseller on building good habits and breaking bad ones. Over 15 million copies sold worldwide. Paperback edition.",
    details: ["320 pages", "Paperback edition", "Language: English", "Publisher: Penguin"],
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    gradient: "linear-gradient(135deg,#1565c0,#1976d2)"
  },
  {
    id: 9,
    name: "Bosch Car Vacuum Cleaner",
    category: "Automotive",
    price: 1799,
    originalPrice: 2499,
    tag: "Sale",
    description: "12V DC portable car vacuum with powerful 75W motor. Includes HEPA filter, crevice nozzle, and 4.5m long cord.",
    details: ["75W motor", "12V DC car adapter", "HEPA filter", "4.5m power cord"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    gradient: "linear-gradient(135deg,#0d47a1,#1565c0)"
  },
  {
    id: 10,
    name: "Pedigree Adult Dog Food 3kg",
    category: "Pet Supplies",
    price: 799,
    originalPrice: 1050,
    tag: null,
    description: "Complete and balanced dry food for adult dogs. Real chicken with wholegrains. Supports healthy skin, coat, and joints.",
    details: ["3kg pack", "Real chicken flavour", "No artificial colours", "Vet recommended"],
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80",
    gradient: "linear-gradient(135deg,#4e342e,#6d4c41)"
  },
  {
    id: 11,
    name: "OnePlus Nord CE 4 Lite",
    category: "Electronics",
    price: 19999,
    originalPrice: 22999,
    tag: "New",
    description: "6.67\" FHD+ 120Hz display, Snapdragon 695, 50MP main camera, and 5500mAh battery with 80W SUPERVOOC charging.",
    details: ["6.67\" FHD+ 120Hz", "Snapdragon 695 5G", "5500mAh + 80W charge", "50MP triple camera"],
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    gradient: "linear-gradient(135deg,#212121,#424242)"
  },
  {
    id: 12,
    name: "Nike Running T-Shirt",
    category: "Fashion",
    price: 1495,
    originalPrice: null,
    tag: null,
    description: "Dri-FIT technology pulls sweat away from your skin. Lightweight mesh panels for ventilation. Standard fit for full range of motion.",
    details: ["Dri-FIT fabric", "Lightweight mesh panels", "Standard fit", "Machine wash safe"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    gradient: "linear-gradient(135deg,#c62828,#e53935)"
  },
  {
    id: 13,
    name: "Prestige Pressure Cooker 5L",
    category: "Home & Kitchen",
    price: 1299,
    originalPrice: 1799,
    tag: "Bestseller",
    description: "5-litre aluminium pressure cooker with safety valve and gasket release system. ISI marked, ideal for Indian cooking.",
    details: ["5L capacity", "ISI certified", "Aluminium body", "Safety pressure release"],
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80",
    gradient: "linear-gradient(135deg,#b71c1c,#c62828)"
  },
  {
    id: 14,
    name: "Borosil Glass Mixing Bowls Set",
    category: "Home & Kitchen",
    price: 899,
    originalPrice: 1299,
    tag: "Sale",
    description: "Set of 3 borosilicate glass mixing bowls. Microwave and dishwasher safe. Ideal for baking, salads, and meal prep.",
    details: ["Set of 3 sizes", "Borosilicate glass", "Microwave safe", "Dishwasher safe"],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    gradient: "linear-gradient(135deg,#1565c0,#1976d2)"
  },
  {
    id: 15,
    name: "Philips Air Fryer HD9200",
    category: "Home & Kitchen",
    price: 5499,
    originalPrice: 7999,
    tag: "Sale",
    description: "4.1L capacity air fryer with Rapid Air Technology. Up to 90% less fat. Pre-set cooking programmes for easy meals.",
    details: ["4.1L capacity", "1400W power", "Rapid Air Technology", "Dishwasher-safe parts"],
    image: "https://images.unsplash.com/photo-1648806571616-cb193b68af53?w=400&q=80",
    gradient: "linear-gradient(135deg,#37474f,#546e7a)"
  },
  {
    id: 16,
    name: "Cello Opalware Dinner Set 18pc",
    category: "Home & Kitchen",
    price: 1499,
    originalPrice: 2100,
    tag: "New",
    description: "18-piece opalware dinner set in classic white. Scratch-resistant, microwave-safe, break-resistant glass-ceramic material.",
    details: ["18 pieces", "Opalware glass-ceramic", "Microwave safe", "Break-resistant"],
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
    gradient: "linear-gradient(135deg,#4a148c,#6a1b9a)"
  }
];
