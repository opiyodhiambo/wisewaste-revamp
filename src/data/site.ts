export const site = {
  name: "WiseWaste Garbage Solutions Limited",
  phoneDisplay: "0114262639",
  phoneDigits: "+254114262639",
  phoneAltDisplay: "0114262639",
  email: "info@wisewaste.co.ke",
  hours: "Mon–Sat: 8:00 am – 5:00 pm",
  locationShort: "Highway Mall Mombasa Road",
  locationsLong:
    "Highway Mall Mombasa Road, KENYA.",
  social: {
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Cleaning", slug: "cleaning" },
      { label: "Garbage collection", slug: "garbage-collection" },
      { label: "Sorting", slug: "sorting" },
      { label: "Recycling", slug: "recycling" },
      { label: "Reusing", slug: "reusing" },
      { label: "Decomposition", slug: "decomposition" },
    ],
  },
  { label: "Contact Us", to: "/contact" },
];
