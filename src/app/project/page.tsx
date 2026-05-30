import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectsPortfolio from "../components/ProjectsPortfolio";

export const metadata = {
  title: "Projects — Magic Line",
  description: "Portfolio of completed architecture and design projects.",
};

export default function ProjectPage() {
  return (
    <>
      <Navbar forceScrolled />
      <main className="min-h-screen bg-[#f5f4f0] pt-28">
        <ProjectsPortfolio />
      </main>
      <Footer />
    </>
  );
}
