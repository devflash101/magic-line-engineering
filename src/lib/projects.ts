export interface PortfolioProject {
  id: string;
  category: "Commercial" | "Residential";
  name: string;
  images: string[];
}

function projectImageUrl(...segments: string[]): string {
  return `/Projects/${segments.map((s) => encodeURIComponent(s)).join("/")}`;
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
    id: "commercial-hotel",
    category: "Commercial",
    name: "Hotel",
    images: numberedImages("Commercial", "Hotel", 5),
  },
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
];

export const portfolioCategories = ["Residential", "Commercial"] as const;

export function getProjectById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.id === id);
}

export function getProjectCoverImage(project: PortfolioProject): string {
  return project.images[0];
}
