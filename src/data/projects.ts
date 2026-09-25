// `short`: card on /built; `summary`: /work. CS 252 shell: never link the source.

export type Project = {
  name: string;
  tagline: string;
  start: string; // YYYY-MM, used for sorting
  dates: string;
  stack: string[];
  short: string;
  summary: string;
  note?: string;
  link?: string;
};

const all: Project[] = [
  {
    name: 'Shift scheduler',
    tagline: 'on-call rosters for 25 anesthesiologists',
    start: '2026-06',
    dates: 'June 2026 – Sept. 2026',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Python', 'OR-Tools'],
    short: 'An optimizer drafts the operating-room and on-call schedule using LLM parsing around rest rules. No patient names are stored.',
    summary:
      'A scheduling platform that assigns a 25-doctor anesthesiology group to operating rooms and on-call shifts. A Python/FastAPI service uses Google OR-Tools CP-SAT to encode rest rules and room workloads; an admin reviews the optimizer’s output before it is published. The data model stores no patient names.',
    note: 'on standby since Sept. 2026',
  },
  {
    name: 'Hermes',
    tagline: 'a secure Linux sandbox',
    start: '2026-04',
    dates: 'Apr. 2026 – July 2026',
    stack: ['C', 'seccomp-BPF', 'cgroups v2', 'FastAPI'],
    short: 'Runs untrusted binaries in C inside namespaces, a seccomp-BPF filter, and memory caps. Tested against 7 attacks.',
    summary:
      'A code execution engine in C that runs untrusted binaries inside isolated PID, network, and mount namespaces with a chroot jail, a seccomp-BPF syscall whitelist, and cgroups v2 memory caps. Exposed through a FastAPI service and tested against 7 attack scenarios.',
    link: 'https://github.com/vrovaris/secure-sandbox',
  },
  {
    name: 'Unix shell',
    tagline: 'a POSIX shell from scratch',
    start: '2026-02',
    dates: 'Feb. 2026 – Apr. 2026',
    stack: ['C/C++', 'Flex', 'Bison', 'POSIX'],
    short: 'Pipelines, background jobs, and a line editor with tab completion, on a Flex/Bison grammar.',
    summary:
      'A recursive grammar parser (Lex/Flex, Yacc/Bison), multi-stage pipelines, background jobs with SIGCHLD reaping, and a custom line editor with tab completion.',
    note: 'coursework, so no source here. sorry!',
  },
  {
    name: 'This notebook',
    tagline: 'the site you’re reading',
    start: '2026-09',
    dates: 'Sept. 2026',
    stack: ['Astro', 'TypeScript', 'CSS'],
    short: 'Static pages, hand-drawn SVG, and a few small scripts for the moving parts.',
    summary:
      'Static pages, hand-drawn SVG, and a few small scripts for the moving parts. The Santos counter asks ESPN for results straight from your browser.',
    link: 'https://github.com/vrovaris/personal-website',

  },
];

export const projects = all.sort((a, b) => b.start.localeCompare(a.start));
