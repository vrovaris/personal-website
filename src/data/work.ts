import { profile } from './profile';

const { orgs } = profile;

export type Role = { title: string; dates: string; points: string[]; url?: string };
export type Job = { org: string; url: string; place: string; roles: Role[] };

export const work: Job[] = [
  {
    org: 'Purdue University',
    url: orgs.purdue,
    place: 'West Lafayette, IN',
    roles: [
      {
        title: 'Undergraduate Research Assistant, AutoIC Lab',
        url: orgs.autoic,
        dates: 'Aug. 2026 – Present',
        points: [
          'Awarded a Purdue Office of Undergraduate Research Scholarship for 2026–2027 to research AI, natural language processing, and Building Information Modeling applied to construction automation, in a lab funded by the National Science Foundation.',
        ],
      },
      {
        title: 'Undergraduate Teaching Assistant, CS 18000',
        dates: 'Aug. 2026 – Present',
        points: [
          'Lead weekly lab sections of 25 students, hold office hours, and proctor exams for Purdue’s introductory CS course, taken by 761 students this term, coaching algorithm design, debugging, and object-oriented design in Java.',
        ],
      },
    ],
  },
  {
    org: 'BTG Pactual',
    url: orgs.btg,
    place: 'São Paulo, Brazil',
    roles: [
      {
        title: 'Software Engineering Intern, Energy Desk',
        dates: 'June 2026 – Aug. 2026',
        points: [
          'Built an event-driven integration between the Energy Desk’s backend and the bank’s core finance system using Python, RabbitMQ, and Celery, deployed on Kubernetes with PostgreSQL.',
          'Automated tracking of debit notes across 3 internal systems: 371 notes a month, over $140M in monthly flows, individual notes from $0.01 to $236M.',
          'Closed a $50M discrepancy between the bank’s managerial and accounting reports; delivered the system into UAT ahead of production rollout.',
        ],
      },
      {
        title: 'Software Engineering Intern',
        dates: 'June 2025 – Aug. 2025',
        points: [
          'Designed a serverless AI pipeline (AWS Lambda, SQS) for automated contract verification, processing 20,000+ signatures in hours; presented 80% efficiency gains to executives, driving enterprise-wide AI adoption.',
        ],
      },
    ],
  },
  {
    org: 'BRASA, Brazilian Student Association',
    url: orgs.brasa,
    place: 'Remote',
    roles: [
      {
        title: 'Technology Director',
        dates: 'Sept. 2025 – Aug. 2026',
        points: [
          'Owned the 2025–2026 technical roadmap across web, mobile, and data platforms serving 20,000+ members; managed 13 people across Product & UX, Software Engineering, and Data.',
          'Led architecture reviews and set technical standards; structured the migration of 12 years of legacy data into the platform’s unified PostgreSQL database.',
        ],
      },
      {
        title: 'Software Engineering Manager',
        dates: 'May 2025 – Sept. 2025',
        points: [
          'Managed 4 software engineers; established a development lifecycle with design reviews, documentation standards, and security checks, raising Net Promoter Score by 120+ points.',
        ],
      },
      {
        title: 'Software Engineering Analyst',
        dates: 'Oct. 2024 – May 2025',
        points: [
          'Built a React/Node.js portal with PostgreSQL, REST APIs, and role-based authentication; engineered a React Native app reaching 90%+ adoption across the 20,000+ member network.',
        ],
      },
    ],
  },
];
