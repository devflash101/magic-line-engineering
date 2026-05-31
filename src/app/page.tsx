import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Services from "./components/Services";
import TeamSection from "./components/TeamSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Services />
        <TeamSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
