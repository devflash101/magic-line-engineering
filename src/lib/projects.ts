export type ProjectCategory = "Commercial" | "Residential" | "Interior Design";

export interface PortfolioProject {
  id: string;
  category: ProjectCategory;
  name: string;
  images: string[];
}

function projectImageUrl(...segments: string[]): string {
  return `/projects/${segments.map((s) => encodeURIComponent(s)).join("/")}`;
}

function numberedImages(
  category: string,
  project: string,
  count: number,
  ext = "png"
): string[] {
  return Array.from({ length: count }, (_, i) =>
    projectImageUrl(category, project, `${i + 1}.${ext}`)
  );
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "residential-adu1",
    category: "Residential",
    name: "ADU 1",
    images: numberedImages("Residential", "ADU1", 5),
  },
  {
    id: "residential-adu2",
    category: "Residential",
    name: "ADU 2",
    images: numberedImages("Residential", "ADU2", 6),
  },
  {
    id: "residential-atlanta",
    category: "Residential",
    name: "Atlanta, GA",
    images: numberedImages("Residential", "Atlanta, GA", 2),
  },
  {
    id: "residential-multi-family",
    category: "Residential",
    name: "Multi-family",
    images: numberedImages("Residential", "Multi-family", 7),
  },
  {
    id: "commercial-hotel",
    category: "Commercial",
    name: "Hotel",
    images: numberedImages("Commercial", "Hotel", 5),
  },
  {
    id: "commercial-gym",
    category: "Commercial",
    name: "Gym",
    images: numberedImages("Commercial", "Gym", 9),
  },
  {
    id: "interior-daycare-center",
    category: "Interior Design",
    name: "DayCare Center",
    images: numberedImages("Interior Design", "DayCare Center", 9),
  },
  {
    id: "interior-office",
    category: "Interior Design",
    name: "Office",
    images: numberedImages("Interior Design", "Office", 7),
  },
];

export const portfolioCategories = [
  "Residential",
  "Commercial",
  "Interior Design",
] as const;

export function getProjectById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.id === id);
}

export function getProjectCoverImage(project: PortfolioProject): string {
  return project.images[0];
}
