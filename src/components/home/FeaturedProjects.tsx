import ProjectGrid from "@/components/project/ProjectGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";

const trendingProjects = [...projects]
  .sort((a, b) => b.stars - a.stars)
  .slice(0, 3);

const recentlyAddedProjects = [...projects]
  .sort(
    (a, b) =>
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  )
  .slice(0, 3);

const FeaturedProjects = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Trending Now"
          title="Top Projects by Stars"
          description="The most-starred projects in our collection — great places to learn from proven open-source codebases."
          linkLabel="View all projects →"
        />
      </ScrollReveal>

      <ScrollReveal delay={100} className="mt-8">
        <ProjectGrid projects={trendingProjects} />
      </ScrollReveal>

      <div className="mt-16 lg:mt-20">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Fresh Discoveries"
            title="Recently Added"
            description="The newest projects added to our open-source collection."
            linkLabel="Explore all →"
          />
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-8">
          <ProjectGrid projects={recentlyAddedProjects} />
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedProjects;
