import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProjectDetail from "../../components/ProjectDetail";
import { getProjectById, portfolioProjects } from "@/lib/projects";

export function generateStaticParams() {
  return portfolioProjects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project — Magic Line" };
  return {
    title: `${project.name} — Magic Line`,
    description: `${project.category} project portfolio: ${project.name}`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <>
      <Navbar forceScrolled />
      <main className="min-h-screen bg-[#f5f4f0] pt-28">
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  );
}
