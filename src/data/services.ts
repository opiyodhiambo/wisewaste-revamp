import Vehicle1 from "../assets/Vehicle1.jpeg";
import vehicle10 from "../assets/vehicle10.jpeg";
import vehicle4 from "../assets/vehicle40.jpeg";
import logo2 from "../assets/logo2.png";
import vehicle8 from "../assets/vehicle8.jpeg";
import vehicle6 from "../assets/vehicle33.jpeg";
import bins from "../assets/bins.png";
import people from "../assets/people.png";
import fumigation1 from "../assets/fumigation1.jpg";
import fumigation2 from "../assets/fumigation2.jpg";
import fummigation from "../assets/fummigation.png";
import {
  Home,
  Layers,
  Cpu,
  Recycle,
  Factory,
  Zap,
  Leaf,
  Globe,
} from "lucide-react";
import vehicle18 from "../assets/vehicle23.jpeg";
import vehicle19 from "../assets/vehicle29.jpeg";
import vehicle20 from "../assets/vehicle36.jpeg";
import vehicle22 from "../assets/vehicle23.jpeg";
import vehicle21 from "../assets/vehicle25.jpeg";

export type Service = {
  slug: string;
  title: string;
  categoryBadges?: string[];

  bullets: string[];
  excerpt: string;

  overviewTitle: string;
  overviewText: string;
  heroImage?: string[];
  galleryImages?: string[];

  cardIcon: any; // lucide icon component
  hoverImage: string; // image used on hover bg
};

// NOTE: No dedicated photography exists yet for e-waste, plastic recycling,
// metal recycling, green energy, green manure, or trading/exporting.
// Existing vehicle/bins/people/fumigation assets are reused as placeholders
// below. Swap these out once real images for each category are available.

export const services: Service[] = [
  // 1) Garbage Collection
  {
    slug: "garbage-collection",
    title: "Garbage Collection",
    categoryBadges: ["For Home", "For Business"],
    excerpt:
      "Reliable waste pickup for homes and businesses with consistent collection schedules.",
    bullets: [
      "Scheduled pickups",
      "Bulk waste handling",
      "Reliable service coverage",
    ],

    overviewTitle: "Garbage Collection",
    overviewText:
      "At Wise Waste Services, we provide reliable and efficient garbage collection services that ensure waste is removed safely, promptly, and responsibly. Our structured collection schedules are designed to minimize disruptions while maintaining clean and orderly surroundings for homes, businesses, and institutions. We recognize that improper waste handling can lead to health risks and environmental damage, which is why our team follows strict operational and safety standards. By combining dependable logistics with experienced personnel, we guarantee that your waste is managed seamlessly, giving you peace of mind while contributing to cleaner communities and a more sustainable environment.",
    heroImage: [vehicle21, vehicle22, vehicle8],
    galleryImages: [vehicle10, vehicle4, vehicle6, vehicle8],

    cardIcon: Home,
    hoverImage: vehicle4,
  },

  // 2) Garbage Sorting and Segregation
  {
    slug: "sorting-and-segregation",
    title: "Garbage Sorting and Segregation",
    categoryBadges: ["For Home", "For Organizations", "For Business"],
    excerpt:
      "Waste separation at source and at collection points to improve recovery and reduce landfill.",
    bullets: [
      "Source separation guidance",
      "On-site sorting support",
      "Cleaner recyclable streams",
    ],

    overviewTitle: "Garbage Sorting and Segregation",
    overviewText:
      "At Wise Waste Services, we treat sorting and segregation as a critical first step in effective waste recovery. Proper separation of waste at the source significantly improves recycling efficiency, reduces landfill dependency, and lowers overall disposal costs. Our sorting services help clients identify and separate different waste streams such as plastics, e-waste, metals, and organic material. Through education, on-site support, and structured systems, we enable households, businesses, and organizations to adopt responsible waste practices that feed directly into our recycling and recovery operations.",
    heroImage: [people, vehicle4, vehicle21],
    galleryImages: [
      "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=900&q=60",
    ],

    cardIcon: Layers,
    hoverImage: logo2,
  },

  // 3) E-waste Recycling
  {
    slug: "ewaste-recycling",
    title: "E-waste Recycling",
    categoryBadges: ["For Business", "For Organizations"],
    excerpt:
      "Safe recovery of electronic waste, extracting reusable components and materials.",
    bullets: [
      "Safe electronics dismantling",
      "Component and metal recovery",
      "Compliant disposal of hazardous parts",
    ],

    overviewTitle: "E-waste Recycling",
    overviewText:
      "At Wise Waste Services, we specialize in the responsible recycling of electronic waste, one of the fastest-growing and most hazardous waste streams globally. Our process safely dismantles discarded electronics to recover valuable materials, including metals and reusable components, while ensuring hazardous elements are handled and disposed of in line with environmental regulations. By diverting e-waste from landfills and informal dumping, we help clients meet compliance obligations while recovering economic value from equipment that would otherwise go to waste.",
    heroImage: [fummigation, vehicle18, vehicle22],
    galleryImages: [fumigation1, fumigation2, vehicle6],

    cardIcon: Cpu,
    hoverImage: vehicle10,
  },

  // 4) Plastic Recycling
  {
    slug: "plastic-recycling",
    title: "Plastic Recycling",
    categoryBadges: ["For Home", "For Organizations", "For Business"],
    excerpt:
      "Recovering and reprocessing plastic waste into reusable raw material.",
    bullets: [
      "Plastic waste recovery",
      "Sorting by polymer type",
      "Reduced landfill footprint",
    ],

    overviewTitle: "Plastic Recycling",
    overviewText:
      "At Wise Waste Services, we recover plastic waste and process it into raw material that can re-enter manufacturing supply chains instead of accumulating in landfills or the environment. Our plastic recycling operations sort collected material by polymer type, clean it, and prepare it for reprocessing. By closing the loop on plastic waste, we help reduce reliance on virgin plastic production and lower the environmental footprint of the materials our clients discard.",
    heroImage: [bins, people, vehicle20],
    galleryImages: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=60",
      vehicle4,
      vehicle6,
      vehicle8,
    ],

    cardIcon: Recycle,
    hoverImage: vehicle6,
  },

  // 5) Metal Recycling
  {
    slug: "metal-recycling",
    title: "Metal Recycling",
    categoryBadges: ["For Business", "For Organizations"],
    excerpt:
      "Recovery of ferrous and non-ferrous metals for reuse in industrial supply chains.",
    bullets: [
      "Scrap metal recovery",
      "Ferrous and non-ferrous sorting",
      "Supply to industrial buyers",
    ],

    overviewTitle: "Metal Recycling",
    overviewText:
      "At Wise Waste Services, we recover ferrous and non-ferrous metals from waste streams and prepare them for reuse in industrial manufacturing. Our metal recycling process includes sorting, grading, and consolidating scrap metal so it can be supplied back into production, reducing the need for new metal extraction. This work supports both environmental conservation and the local industrial economy by keeping valuable metal resources in circulation.",
    heroImage: [vehicle18, vehicle20, vehicle21],
    galleryImages: [vehicle8, vehicle6, vehicle4, vehicle10],

    cardIcon: Factory,
    hoverImage: Vehicle1,
  },

  // 6) Green Energy Generation
  {
    slug: "green-energy-generation",
    title: "Green Energy Generation",
    categoryBadges: ["For Organizations", "For Business"],
    excerpt:
      "Converting recovered organic and waste material into usable green energy.",
    bullets: [
      "Waste-to-energy processing",
      "Renewable energy output",
      "Reduced dependence on fossil fuels",
    ],

    overviewTitle: "Green Energy Generation",
    overviewText:
      "At Wise Waste Services, we convert appropriate waste streams into usable green energy, turning what would otherwise be a disposal burden into a renewable resource. This process reduces the volume of waste requiring landfill disposal while generating energy that offsets reliance on fossil fuels. It is part of our broader effort to treat waste not as a problem to be buried, but as a resource to be recovered.",
    heroImage: [fummigation, vehicle19, vehicle20],
    galleryImages: [fumigation1, fumigation2],

    cardIcon: Zap,
    hoverImage: vehicle20,
  },

  // 7) Green Manure
  {
    slug: "green-manure",
    title: "Green Manure",
    categoryBadges: ["For Home", "For Organizations", "For Business"],
    excerpt:
      "Turning organic waste into nutrient-rich manure for agricultural use.",
    bullets: [
      "Organic waste separation",
      "Composting into green manure",
      "Reduced methane emissions",
    ],

    overviewTitle: "Green Manure",
    overviewText:
      "At Wise Waste Services, we process organic waste into green manure, a nutrient-rich soil amendment for agricultural use. Proper handling of organic material keeps it out of landfills, where it would otherwise generate methane, and instead returns it to productive use in farming and land management. This closes the loop between household and business organic waste and the agricultural sector.",
    heroImage: [vehicle18, vehicle22, people],
    galleryImages: [vehicle8, vehicle6, vehicle4],

    cardIcon: Leaf,
    hoverImage: vehicle22,
  },

  // 8) Trading in Recycled Materials and Exporting
  {
    slug: "trading-and-exporting",
    title: "Trading in Recycled Materials and Exporting",
    categoryBadges: ["For Business", "For Organizations"],
    excerpt:
      "Trading and exporting recovered industrial materials and precious minerals.",
    bullets: [
      "Industrial Materials",
      "Precious Minerals",
      "Export-ready processing and logistics",
    ],

    overviewTitle: "Trading in Recycled Materials and Exporting",
    overviewText:
      "At Wise Waste Services, we trade in recovered materials, including industrial materials and precious minerals reclaimed through our recycling operations, and export them to buyers who reintroduce them into manufacturing supply chains. This service connects our recovery operations, from sorting through metal and e-waste recycling, to real market demand, ensuring recovered resources are put to productive use rather than sitting idle.",
    heroImage: [vehicle21, vehicle19, bins],
    galleryImages: [vehicle10, vehicle4, vehicle6],

    cardIcon: Globe,
    hoverImage: vehicle19,
  },
];