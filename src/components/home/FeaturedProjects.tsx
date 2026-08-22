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
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Trending Now"
          title="Top Projects by Stars"
          description="The most-starred repositories in our collection — great places to study proven architectures."
          linkLabel="View all top starred →"
          linkHref="/projects?sort=stars-desc"
        />
      </ScrollReveal>

      <ScrollReveal delay={100} className="mt-8">
        <ProjectGrid projects={trendingProjects} />
      </ScrollReveal>

      <div className="mt-20 lg:mt-24">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Fresh Discoveries"
            title="Recently Added"
            description="The newest repositories curated into our open-source catalog."
            linkLabel="Explore recently added →"
            linkHref="/projects?sort=date-desc"
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
