import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import SectionReveal from "./components/SectionReveal";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6">
        <Hero />
        <SectionReveal>
          <Projects />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <Skills />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <Experience />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <Contact />
        </SectionReveal>
      </main>
    </div>
  );
}

export default App;
