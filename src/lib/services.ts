export type Service = {
  title: string;
  image: string;
};

/** Verified Unsplash CDN URLs — cropped for 4:3 service cards. */
const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=675&q=85`;

export const services: Service[] = [
  {
    title: "Architectural Plan",
    image: photo("photo-1762146828422-50a8bd416d3c"),
  },
  {
    title: "Structural Engineering",
    image: photo("photo-1768677903496-becc4be07258"),
  },
  {
    title: "Civil Engineering",
    image: photo("photo-1541888946425-d81bb19240f5"),
  },
  {
    title: "MEP Engineering",
    image: photo("photo-1744627049721-73c27008ad28"),
  },
  {
    title: "Accessory Dwelling Unit",
    image: "/projects/Residential/ADU2/1.png",
  },
  {
    title: "Surveying",
    image: photo("photo-1682663810771-89d21838530f"),
  },
  {
    title: "Permit Expediting",
    image: photo("photo-1581092160562-40aa08e78837"),
  },
];
