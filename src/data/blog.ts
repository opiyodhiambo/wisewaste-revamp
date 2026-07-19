export type BlogPost = {
  tags?: any;
  slug: string;
  title: string;
  category: string;       // shows as the green chip on the image
  servicesLine?: string;  // optional: "Commercial Cleaning Services, Recycling"
  date: string;           // "September 11, 2024"
  author: string;         // "flashservices"
  cover: string;          // placeholder image path/url
  excerpt: string;
  content: {
    heading?: string;
    paragraphs: string[];
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "future-of-e-waste-recycling-in-kenya",
    title: "The Future of E-Waste Recycling in Kenya: A Sustainable Approach",
    category: "Sustainability",
    servicesLine: "Commercial Cleaning Services, Recycling",
    date: "October 17, 2024",
    author: "flashservices",
    cover: "/img/blog/placeholder-1.jpg",
    excerpt:
      "E-waste recycling is growing in Kenya. Here’s how responsible sorting and recovery can support a cleaner future.",
    content: [
      {
        paragraphs: [
          "E-waste is one of the fastest growing waste streams globally. Proper collection and separation is the first step toward safe recovery.",
          "By partnering with trained collectors and recycling facilities, businesses and households can reduce harmful dumping and support circular reuse.",
        ],
      },
      {
        heading: "What you can do today",
        paragraphs: [
          "Separate electronics from general waste.",
          "Use approved collection points and trusted waste handlers.",
          "Encourage office and community recycling programs.",
        ],
      },
    ],
  },
  {
    slug: "how-to-ensure-washrooms-are-hygienic",
    title: "How to Ensure Your Washrooms Are Hygienic: Top Tips for Nairobi Businesses",
    category: "Washroom hygiene solutions",
    servicesLine: "Commercial Cleaning Services, Washroom hygiene solutions",
    date: "September 11, 2024",
    author: "flashservices",
    cover: "/img/blog/placeholder-2.jpg",
    excerpt:
      "Simple hygiene routines, supplies, and schedules that keep washrooms safe and pleasant for staff and clients.",
    content: [
      {
        paragraphs: [
          "Washroom hygiene impacts health, comfort, and business reputation. A strong routine reduces complaints and prevents infections.",
        ],
      },
      {
        heading: "Daily hygiene checklist",
        paragraphs: [
          "Refill soap, tissue and sanitize touch points.",
          "Schedule frequent cleaning during peak hours.",
          "Use sanitary bin services where needed.",
        ],
      },
    ],
  },
  {
    slug: "recycling-solutions-in-nairobi",
    title: "Recycling Solutions in Nairobi: How Flash Services Helps You Go Green",
    category: "Recycling",
    servicesLine: "Commercial Cleaning Services, Recycling",
    date: "September 11, 2024",
    author: "flashservices",
    cover: "/img/blog/placeholder-3.jpg",
    excerpt:
      "Recycling is easier when collection, sorting, and reporting are handled consistently. Here’s how we do it.",
    content: [
      {
        paragraphs: [
          "A successful recycling program requires regular pickup schedules, good separation, and reliable partners.",
          "We help households and businesses set up sorting flows that reduce waste to landfill.",
        ],
      },
    ],
  },
  {
    slug: "importance-of-eco-friendly-pest-control",
    title: "The Importance of Eco-Friendly Pest Control for Homes and Businesses",
    category: "Commercial Cleaning Services",
    servicesLine: "Fumigation & Pest Control",
    date: "September 11, 2024",
    author: "flashservices",
    cover: "/img/blog/placeholder-4.jpg",
    excerpt:
      "Eco-friendly pest control protects people and pets while still delivering effective results.",
    content: [
      {
        paragraphs: [
          "Eco-friendly pest control focuses on safe products, proper application, and prevention-first methods.",
          "It reduces exposure risks while keeping your space clean and compliant.",
        ],
      },
    ],
  },
  {
    slug: "why-businesses-should-prioritize-smart-waste-management",
    title: "Why Businesses Should Prioritize Smart Waste Management Solutions",
    category: "waste management",
    date: "September 11, 2024",
    author: "flashservices",
    cover: "/img/blog/placeholder-5.jpg",
    excerpt:
      "Smart waste management reduces costs, improves compliance, and supports sustainability goals.",
    content: [
      {
        paragraphs: [
          "When waste is handled consistently, businesses reduce risk and improve brand trust.",
          "A good plan includes sorting, scheduled pickups, and clear reporting.",
        ],
      },
    ],
  },
  {
    slug: "top-5-benefits-of-professional-waste-management-services-in-nairobi",
    title: "Top 5 Benefits of Professional Waste Management Services in Nairobi",
    category: "waste management",
    date: "May 13, 2024",
    author: "flashservices",
    cover: "/img/blog/placeholder-6.jpg",
    excerpt:
      "Professional waste services save time, reduce risk, and deliver better outcomes for homes and businesses.",
    content: [
      {
        paragraphs: [
          "Professional waste management services provide a reliable pickup schedule, proper disposal, and better compliance.",
        ],
      },
      {
        heading: "1. Waste Disposal That Saves You Time",
        paragraphs: [
          "A predictable schedule helps you focus on your business and reduces overflow and complaints.",
        ],
      },
      {
        heading: "2. Compliance With Local Laws",
        paragraphs: [
          "Proper handling and disposal reduces legal risk and improves audit readiness.",
        ],
      },
      {
        heading: "3. Support Sustainable Practices",
        paragraphs: [
          "Sorting and recycling reduces landfill load and supports greener operations.",
        ],
      },
      {
        heading: "4. Cost Savings Over Time",
        paragraphs: [
          "Optimized pickups and correct streams reduce inefficiency and rework costs.",
        ],
      },
      {
        heading: "5. Customized Solutions",
        paragraphs: [
          "Different industries need different waste handling. Professional services adapt to your workflow.",
        ],
      },
    ],
  },
];

// Optional: if you want consistent ordering (newest first)
export const blogPostsSorted = [...blogPosts].sort((a, b) => {
  const da = new Date(a.date).getTime();
  const db = new Date(b.date).getTime();
  return db - da;
});