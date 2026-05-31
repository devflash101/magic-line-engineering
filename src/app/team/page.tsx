import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamPageContent from "../components/TeamPageContent";

export const metadata = {
  title: "Team — Magic Line",
  description: "Meet the leadership and specialists behind Magic Line Architecture & Design.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar forceScrolled />
      <main className="min-h-screen bg-[#f5f4f0] pt-28">
        <TeamPageContent />
      </main>
      <Footer />
    </>
  );
}
