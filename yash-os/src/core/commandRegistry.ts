import about from "@/commands/about";
import clear from "@/commands/clear";
import experience from "@/commands/experience";
import github from "@/commands/github";
import help from "@/commands/help";
import hire from "@/commands/hire";
import projects from "@/commands/projects";
import resume from "@/commands/resume";
import skills from "@/commands/skills";
import socials from "@/commands/socials";

export const commandRegistry: Record<
  string,
  () => string | string[]
> = {
  help,
  about,
  clear,
  projects,
  github,
  socials,
  skills,
  experience,
  resume,
  hire,
};