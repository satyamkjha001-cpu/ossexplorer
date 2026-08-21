import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ProjectStats from "@/components/home/ProjectStats";
import DomainSection from "@/components/home/DomainSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-gray-950 dark:text-gray-100">
      <Hero />
      <FeaturedProjects />
      <ProjectStats />
      <DomainSection />
      <Footer />
    </main>
  );
}
