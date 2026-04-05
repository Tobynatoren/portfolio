import type { ExperienceEntry } from "../types";

export const experience: ExperienceEntry[] = [
  {
    role: "Developer",
    company: "Dataproces",
    period: "Jul 2025 – Present",
    description:
      "Backend developer in the KØS division, building software that helps Danish municipalities streamline workflows and make better use of their data. Leading the database side of the department, which means I get to design data structures, optimize processing, and make sure integrations run smoothly. Built the District Window: a system that processes CPR-based population data, assigns residents to districts using geographic coordinates, and aggregates demographics by gender and age for municipal planning.",
    tech: ["PHP", "SQL", "Spring Boot", "Database Design"],
    type: "work",
  },
  {
    role: "Student Programmer",
    company: "Dataproces",
    period: "Apr 2024 – Jun 2025",
    description:
      "Started as a part-time student developer while completing my master's degree. Worked across backend systems serving municipalities, gaining hands-on experience with production databases and system integrations before transitioning to full-time.",
    tech: ["PHP", "SQL", "Database Administration"],
    type: "work",
  },
  {
    role: "MSc Digitalisation & Application Development",
    company: "Aalborg University",
    period: "Sep 2023 – Jul 2025",
    description:
      "Specialized in software development, with coursework spanning Java, project management, and strategic digital transformation.",
    tech: ["Java", "Project Management", "Software Architecture"],
    type: "education",
  },
  {
    role: "BA History",
    company: "Aalborg University",
    period: "Sep 2020 – Jun 2023",
    description:
      "Built a foundation in research methods and analytical thinking, with a practical focus on data analysis, programming in R, data mining, and database manipulation.",
    tech: ["R", "Data Mining", "Databases", "Research Methods"],
    type: "education",
  },
];
