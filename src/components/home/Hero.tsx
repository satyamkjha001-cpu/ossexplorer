import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const Hero = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
      <ScrollReveal>
        <Badge
          variant="default"
          size="md"
          className="mb-6 border border-gray-200 px-4 py-2 text-sm dark:border-gray-800"
        >
          Open Source Project Explorer
        </Badge>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Discover Open Source Projects Worth Building
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg sm:leading-8">
          Explore open-source projects by domain, technology, and difficulty.
          Find projects that match your skills and discover opportunities to
          contribute.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <Button
          href="/projects"
          size="lg"
          className="mt-8 min-h-11 motion-safe:hover:-translate-y-0.5"
        >
          Explore Projects
        </Button>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
