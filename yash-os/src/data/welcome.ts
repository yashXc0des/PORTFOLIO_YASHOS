export const WELCOME = {
  greeting: "Hey, I'm Yash Parashar — SDE-2 & Full Stack Engineer.",
  bio: "I build scalable fintech systems, AI/RAG pipelines, and trading infrastructure. Type a command below to explore my work.",
} as const;

export const QUICK_COMMANDS = [
  { cmd: "help", hint: "all commands" },
  { cmd: "about", hint: "about me" },
  { cmd: "skills", hint: "tech stack" },
  { cmd: "projects", hint: "my work" },
  { cmd: "experience", hint: "career" },
  { cmd: "resume", hint: "download CV" },
  { cmd: "hire", hint: "why hire me" },
  { cmd: "github", hint: "github" },
  { cmd: "socials", hint: "connect" },
] as const;
