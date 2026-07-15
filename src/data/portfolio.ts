import type { StaticPortfolioData } from '../types';

export const portfolioData: StaticPortfolioData = {
  name: 'Mamadou Boussouriou Diallo',
  location: 'Paris, France',
  phone: '+33 7 68 46 47 45',
  email: 'diallo99bouss@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mb-diallo/',
  linkedinHandle: 'mb-diallo',
  github: 'https://github.com/',

  stats: [
    { num: '2+' },
    { num: '1000+' },
    { num: '50+' },
  ],

  skills: {
    frontend: [
      { name: 'React ', pct: 80 },
      { name: 'TypeScript', pct: 85 },
      { name: 'Angular', pct: 70 },
      { name: 'Material UI / Bootstrap', pct: 85 },
      { name: 'TanStack Query / Zustand', pct: 75 },
    ],
    backend: [
      { name: 'C# / ASP.NET Core', pct: 90 },
      { name: 'Entity Framework ', pct: 90 },
      { name: 'Microservices / REST', pct: 85 },
      { name: 'DDD / Clean Architecture', pct: 80 },
      { name: 'Java Spring Boot', pct: 68 },
      { name: 'PHP / Symfony', pct: 60 },
    ],
    bdd: [
      { name: 'PostgreSQL', pct: 80 },
      { name: 'MySQL', pct: 80 },
      { name: 'MongoDB', pct: 72 },
      { name: 'BigQuery', pct: 70 },
    ],
    devops: [
      { name: 'Git / GitHub', pct: 90 },
      { name: 'Docker', pct: 80 },
      { name: 'Azure DevOps', pct: 90 },
      { name: 'Jenkins / SonarQube', pct: 68 },
      { name: 'Scrum / Agile', pct: 90 },
    ],
  },

  skillCategoryKeys: ['frontend', 'backend', 'bdd', 'devops'],

  experiences: [
    {
      company: 'Kantena Technologies',
      location: 'Levallois-Perret',
      active: true,
      tags: ['.NET', 'React', 'Azure DevOps', 'Entity Framework', 'Entra ID','Azure', 'Clean Architecture', 'UML'],
    },
    {
      company: 'Colas Digital Solutions',
      location: 'Paris',
      active: true,
      tags: ['C# .NET', 'React', 'TypeScript', 'Entity Framework', 'DDD', 'Zustand', 'PostgreSQL', 'Docker', 'BigQuery', 'Azure'],
    },
    {
      company: 'Béjour',
      location: 'Paris',
      active: false,
      tags: ['Angular', 'Bootstrap', 'Firebase', 'Node.js'],
    },
    {
      company: 'Sen-cash',
      location: 'Dakar',
      active: false,
      tags: ['PHP', 'Symfony', 'JavaScript'],
    },
  ],

  terminal: [
    { cmd: 'whoami' },
    { cmd: 'cat strengths.txt' },
    { cmd: 'echo $STATUS', success: true },
  ],
};
