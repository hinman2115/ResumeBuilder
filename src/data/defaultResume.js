export const defaultResumeData = {
  personal: {
    fullName: "Alex Morgan",
    title: "Senior Full Stack Engineer & Tech Lead",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan-dev",
    github: "github.com/alexmorgan",
    portfolio: "alexmorgan.tech"
  },
  summary: "Accomplished Full Stack Software Engineer with 6+ years of experience designing, scaling, and maintaining high-traffic web applications and distributed systems. Expert in TypeScript, React, Node.js, and cloud architecture (AWS/GCP). Proven track record of spearheading technical initiatives, mentoring engineering teams, and optimizing product performance for millions of active users.",
  experience: [
    {
      id: "exp-1",
      jobTitle: "Senior Full Stack Engineer",
      company: "CloudScale Technologies",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "",
      currentlyWorking: true,
      description: "• Architected and shipped microservices using Node.js, TypeScript, and Docker, reducing API response latency by 38% across core services.\n• Led a squad of 7 engineers to rebuild the enterprise dashboard in React 18, enhancing user engagement and boosting system reliability to 99.98%.\n• Implemented automated CI/CD pipelines and end-to-end testing, reducing production deployment release cycles from 5 days to 2 hours."
    },
    {
      id: "exp-2",
      jobTitle: "Frontend Software Engineer",
      company: "Apex Digital Solutions",
      location: "Austin, TX",
      startDate: "2019-06",
      endDate: "2022-02",
      currentlyWorking: false,
      description: "• Built responsive, accessible UI components used by 1.2M+ active monthly users using React, Redux Toolkit, and Tailwind CSS.\n• Collaborated with UX designers and product managers to redesign checkout workflows, increasing conversion rates by 14%.\n• Pioneered the adoption of TypeScript across the frontend team, resulting in a 40% reduction in client-side runtime errors."
    },
    {
      id: "exp-3",
      jobTitle: "Junior Software Developer",
      company: "Innovatech Labs",
      location: "Seattle, WA",
      startDate: "2018-01",
      endDate: "2019-05",
      currentlyWorking: false,
      description: "• Developed RESTful endpoints and database schemas in PostgreSQL and Express.\n• Implemented automated integration tests with Jest, improving overall code coverage from 62% to 88%."
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science & Engineering",
      institution: "University of Washington",
      location: "Seattle, WA",
      startDate: "2014-09",
      endDate: "2018-05",
      description: "Graduated with Honors (Magna Cum Laude, GPA 3.85/4.0). Specialization in Distributed Systems and Human-Computer Interaction."
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "PulseMetrics - Realtime Analytics Engine",
      description: "Open-source high-throughput telemetry collector and streaming visualization dashboard capable of ingesting 50k events/sec.",
      technologies: "React, TypeScript, Go, WebSocket, TimescaleDB, Tailwind CSS",
      url: "https://github.com/alexmorgan/pulse-metrics"
    },
    {
      id: "proj-2",
      name: "DevDocs AI Assistant",
      description: "Smart semantic developer documentation indexing tool with instant keyboard-first search and natural language summaries.",
      technologies: "Next.js, Tailwind CSS, PostgreSQL, pgvector",
      url: "https://devdocs-ai.preview.app"
    }
  ],
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "Next.js",
    "Tailwind CSS",
    "PostgreSQL",
    "Docker",
    "AWS",
    "GraphQL",
    "Redis",
    "Git",
    "REST APIs",
    "System Design",
    "CI/CD"
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023-04",
      url: "https://aws.amazon.com/verification"
    },
    {
      id: "cert-2",
      name: "Meta Certified Front-End Developer Specialization",
      issuer: "Coursera / Meta",
      date: "2021-11",
      url: "https://coursera.org/verify/meta-frontend"
    }
  ],
  template: "modern",
  accentColor: "blue"
};

