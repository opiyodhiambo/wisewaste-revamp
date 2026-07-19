import plasticImage from "../assets/plastic.png";
import metalImage from "../assets/metals.png";
import ewasteImage from "../assets/ewaste.png";
import compostImage from "../assets/manure.png";

export type RecyclingService = {
  slug: string;
  sidebarTitle: string;
  heroTitle: string;
  title: string;
  image: string;
  intro: string[];
  gallery: {
    src: string;
    alt: string;
  }[];
  sections: {
    title: string;
    body: string[];
    bullets?: string[];
  }[];
};

export const recyclingServices: RecyclingService[] = [
  {
    slug: "plastic-recycling",
    sidebarTitle: "Plastic Recycling",
    heroTitle: "Plastic Recycling",
    title: "Plastic Recycling",
    image: plasticImage,
    intro: [
      "Wise Waste provides responsible plastic recycling solutions for homes, businesses, institutions, and commercial facilities. Our goal is to reduce plastic pollution by collecting, sorting, and channeling recyclable plastics into proper recovery streams.",
      "We support clients who want a cleaner environment by making plastic waste collection easier, more organized, and more reliable. Whether the waste comes from households, offices, estates, schools, restaurants, or commercial operations, our process helps ensure reusable plastic materials are not disposed of carelessly.",
    ],
    gallery: [
      {
        src: plasticImage,
        alt: "Plastic recycling collection",
      },
      {
        src: metalImage,
        alt: "Sorted recyclable materials",
      },
      {
        src: ewasteImage,
        alt: "Waste recovery process",
      },
    ],
    sections: [
      {
        title: "About Wise Waste Plastic Recycling",
        body: [
          "Plastic waste is one of the most common forms of waste generated daily. Through structured collection and sorting, Wise Waste helps clients reduce landfill waste while promoting cleaner, healthier surroundings.",
          "Our plastic recycling service focuses on separating useful plastic materials from general waste so that they can be directed to appropriate recycling and recovery channels.",
        ],
      },
      {
        title: "What We Handle",
        body: [],
        bullets: [
          "Plastic bottles and containers",
          "Packaging plastics",
          "Clean recyclable plastic materials",
          "Sorted commercial and household plastic waste",
          "Plastic waste from offices, schools, estates, and institutions",
          "Bulk plastic waste from businesses and commercial facilities",
          "Reusable plastic materials separated from mixed waste",
          "Plastic materials prepared for responsible recovery streams",
        ],
      },
      {
        title: "Our Plastic Recycling Approach",
        body: [
          "We encourage proper separation at the source, making collection more efficient and improving the quality of recyclable materials. This helps reduce contamination and increases the chances of successful recycling.",
        ],
        bullets: [
          "Waste collection planning based on client needs",
          "Sorting support for recyclable plastic materials",
          "Responsible handling to reduce environmental pollution",
          "Flexible pickup support for homes, estates, and businesses",
          "Cleaner waste flow from collection to recovery",
        ],
      },
      {
        title: "Impact of Plastic Recycling",
        body: [
          "Recycling plastic helps reduce environmental pollution, supports resource recovery, and promotes a circular economy where materials are reused instead of being discarded irresponsibly.",
        ],
        bullets: [
          "Reduces the amount of plastic ending up in dumpsites",
          "Supports cleaner communities and healthier surroundings",
          "Helps businesses improve their environmental responsibility",
          "Encourages better waste separation habits",
          "Contributes to sustainable resource use",
        ],
      },
    ],
  },

  {
    slug: "metal-recycling",
    sidebarTitle: "Metal Recycling",
    heroTitle: "Metal Recycling",
    title: "Metal Recycling",
    image: metalImage,
    intro: [
      "Wise Waste supports safe and efficient metal recycling by helping clients collect, separate, and manage recyclable metal waste from homes, offices, commercial sites, and institutions.",
      "Metal waste can still hold value when properly sorted and recovered. Our service helps ensure recyclable metal materials are handled responsibly instead of being mixed with general waste or discarded in unsafe locations.",
    ],
    gallery: [
      {
        src: metalImage,
        alt: "Metal recycling materials",
      },
      {
        src: plasticImage,
        alt: "Separated recyclable waste",
      },
      {
        src: ewasteImage,
        alt: "Recyclable recovery handling",
      },
    ],
    sections: [
      {
        title: "About Wise Waste Metal Recycling",
        body: [
          "Metal recycling helps conserve natural resources, reduce waste volumes, and create value from materials that would otherwise be discarded. Wise Waste promotes responsible handling of recyclable metal materials.",
          "We help clients separate and prepare metal waste so it can be directed to proper recycling channels, reducing clutter and improving environmental responsibility.",
        ],
      },
      {
        title: "What We Handle",
        body: [],
        bullets: [
          "Scrap metal materials",
          "Metal containers and tins",
          "Commercial recyclable metal waste",
          "Sorted household and institutional metal waste",
          "Aluminium cans and light metal items",
          "Metal waste from offices, estates, and facilities",
          "Reusable metallic materials from clean waste streams",
          "Bulk recyclable metal waste from commercial operations",
        ],
      },
      {
        title: "Our Metal Recycling Approach",
        body: [
          "Our approach helps clients identify recyclable metal materials and separate them from general waste. This improves safety, reduces waste volumes, and supports more efficient recovery.",
        ],
        bullets: [
          "Collection of sorted metal waste",
          "Support for separating metal from mixed waste",
          "Safe handling of sharp or bulky metal items",
          "Flexible pickup for commercial and institutional clients",
          "Responsible routing of recyclable metal materials",
        ],
      },
      {
        title: "Why Metal Recycling Matters",
        body: [
          "Proper metal recycling reduces the need for raw material extraction, lowers environmental impact, and supports sustainable waste management practices for businesses and communities.",
        ],
        bullets: [
          "Conserves natural resources",
          "Reduces pressure on landfills and dumpsites",
          "Supports cleaner business and residential spaces",
          "Improves waste organization for large facilities",
          "Promotes responsible material recovery",
        ],
      },
    ],
  },

  {
    slug: "ewaste-recycling",
    sidebarTitle: "E-Waste Recycling",
    heroTitle: "E-Waste Recycling",
    title: "E-Waste Recycling",
    image: ewasteImage,
    intro: [
      "Wise Waste provides responsible e-waste recycling support for electronic waste generated by households, businesses, schools, offices, and institutions. We help ensure electronic items are handled safely and sustainably.",
      "Electronic waste should not be treated like ordinary waste. Devices, cables, accessories, and office electronics may contain components that require careful separation and responsible disposal.",
    ],
    gallery: [
      {
        src: ewasteImage,
        alt: "Electronic waste recycling",
      },
      {
        src: metalImage,
        alt: "Recovered recyclable components",
      },
      {
        src: plasticImage,
        alt: "Sorted recyclable materials",
      },
    ],
    sections: [
      {
        title: "About Wise Waste E-Waste Recycling",
        body: [
          "Electronic waste requires careful handling because it may contain components that can harm the environment if disposed of incorrectly. Wise Waste helps clients separate and manage e-waste through responsible recycling workflows.",
          "Our e-waste recycling support is suitable for offices, schools, institutions, estates, households, and businesses that regularly replace or dispose of electronic items.",
        ],
      },
      {
        title: "What We Handle",
        body: [],
        bullets: [
          "Old computers and accessories",
          "Printers and office electronics",
          "Small electronic devices",
          "Cables, chargers, and electronic components",
          "Keyboards, mice, monitors, and related accessories",
          "Damaged or unused office electronics",
          "Electronic waste from schools and institutions",
          "Household electronic items prepared for disposal",
        ],
      },
      {
        title: "Our E-Waste Handling Approach",
        body: [
          "We help clients separate electronic waste from ordinary waste and prepare it for proper handling. This reduces environmental risks and supports recovery of useful materials from electronic components.",
        ],
        bullets: [
          "Safe collection of electronic waste",
          "Separation of e-waste from general waste",
          "Support for offices and institutions with bulk e-waste",
          "Responsible handling of cables, devices, and accessories",
          "Cleaner disposal process for outdated electronics",
        ],
      },
      {
        title: "Impact of E-Waste Recycling",
        body: [
          "Responsible e-waste recycling reduces environmental risk, supports recovery of reusable materials, and prevents harmful electronic waste from ending up in dumpsites or landfills.",
        ],
        bullets: [
          "Reduces unsafe disposal of electronic materials",
          "Protects the environment from harmful components",
          "Supports recovery of reusable parts and materials",
          "Improves office and institutional waste management",
          "Promotes responsible technology disposal habits",
        ],
      },
    ],
  },

  {
    slug: "compost-manure",
    sidebarTitle: "Compost Manure",
    heroTitle: "Compost Manure",
    title: "Compost Manure",
    image: compostImage,
    intro: [
      "Wise Waste promotes compost manure production by supporting the separation and responsible handling of organic waste from homes, institutions, restaurants, estates, and commercial facilities.",
      "Organic waste can become a useful resource when handled correctly. Through proper separation and composting, biodegradable waste can support soil improvement, landscaping, gardening, and greener communities.",
    ],
    gallery: [
      {
        src: compostImage,
        alt: "Compost manure preparation",
      },
      {
        src: plasticImage,
        alt: "Waste separation process",
      },
      {
        src: metalImage,
        alt: "Sorted waste recovery",
      },
    ],
    sections: [
      {
        title: "About Wise Waste Composting",
        body: [
          "Organic waste can be converted into useful compost manure instead of being thrown away. Wise Waste helps clients manage biodegradable waste in a way that supports agriculture, landscaping, and environmental sustainability.",
          "Our compost manure support focuses on encouraging proper separation of organic waste so that useful biodegradable materials can be diverted away from landfills.",
        ],
      },
      {
        title: "What We Handle",
        body: [],
        bullets: [
          "Food waste and organic kitchen waste",
          "Garden and landscaping waste",
          "Biodegradable commercial waste",
          "Organic waste from homes and institutions",
          "Restaurant and hotel organic waste",
          "Estate and residential green waste",
          "Fruit and vegetable waste",
          "Biodegradable waste suitable for composting",
        ],
      },
      {
        title: "Our Composting Approach",
        body: [
          "We encourage clients to separate organic waste from plastics, metals, and other non-biodegradable materials. This helps produce cleaner organic waste streams that can be converted into useful compost manure.",
        ],
        bullets: [
          "Organic waste separation support",
          "Collection planning for biodegradable waste",
          "Reduction of food waste sent to dumpsites",
          "Support for estates, restaurants, and institutions",
          "Promotion of cleaner and greener waste practices",
        ],
      },
      {
        title: "Benefits of Compost Manure",
        body: [
          "Composting helps reduce waste sent to landfills, improves soil health, and supports greener communities by turning organic waste into a useful environmental resource.",
        ],
        bullets: [
          "Improves soil structure and fertility",
          "Reduces landfill waste",
          "Supports gardening, landscaping, and agriculture",
          "Helps lower bad odours from mixed waste",
          "Promotes responsible organic waste management",
        ],
      },
    ],
  },
];