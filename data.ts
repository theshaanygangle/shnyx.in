import { AboutData, Project, Achievement, BlogPost } from "./types";

export const ABOUT_DATA: AboutData = {
  name: "Shaany",
  title: "Full-Stack Developer",
  bio: "I craft modern, high-quality web apps and MVPs that balance clean design, strong performance, and scalable Node.js backends. Passionate about TypeScript, React optimization, and delivering a smooth developer experience from idea to deployment.",
  email: "theshaanygangle@gmail.com",
  socials: {
    github: "https://github.com/theshaanygangle",
    linkedin: "https://www.linkedin.com/in/theshaanygangle/",
    twitter: "https://x.com/theshaanygangle",
    resume:
      "https://drive.google.com/file/d/14m033ndTJMEO151U94L03Ti4suyjxB3B/view?usp=sharing",
  },
  skills: [
    { id: "react", label: "React", level: "expert", years: 4 },
    { id: "ts", label: "TypeScript", level: "advanced", years: 3 },
    { id: "node", label: "Node.js", level: "advanced", years: 3 },
    { id: "next", label: "Next.js", level: "advanced", years: 3 },
    { id: "tailwind", label: "Tailwind", level: "expert", years: 2 },
    { id: "postgres", label: "MongoDB", level: "intermediate", years: 2 },
  ],
  stats: {
    years: 4,
    projects: 24,
    contributions: 2210,
  },
  github: {
    profile: "https://github.com/theshaanygangle",
    contributions: 2210,
    lastActive: "2025-11-20",
  },
  timeline: [
    {
      role: "Founding Frontend Engineer",
      org: "Company X",
      from: "2025-08",
      to: "Present",
      location: "Remote",
      description:
        "Leading the frontend migration to Next.js 14 and establishing the internal design system.",
    },
    {
      role: "Full Stack Developer",
      org: "TechAgency",
      from: "2023-01",
      to: "2025-07",
      location: "New York, NY",
      description:
        "Built and shipped 10+ client projects using React, Node.js, and AWS.",
    },
    {
      role: "Junior Developer",
      org: "StartUp Inc",
      from: "2021-06",
      to: "2022-12",
      location: "Remote",
      description:
        "Maintained legacy React codebase and implemented new feature requests.",
    },
  ],
  resume:
    "https://drive.google.com/file/d/14m033ndTJMEO151U94L03Ti4suyjxB3B/view?usp=sharing",
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    title: "Orbit",
    summary: "Real-time chat application.",
    description:
      "A real-time chat app built with the MERN stack and WebSockets, featuring secure authentication and smooth live messaging.",
    tags: ["React", "Node.js", "Express", "MongoDB", "WebSocket", "Bcrypt"],
    thumbnail: "/5.png",
    images: ["/5.png"],
    year: "2025",
    category: "Backend",
    featured: true,
    links: {
      live: "https://github.com/theshaanygangle/Orbit_BE",
      repo: "https://github.com/theshaanygangle/Orbit_BE",
    },
    details: {
      problem:
        "Students and small teams needed a lightweight, real-time chat tool.",
      solution:
        "Built an efficient chat system using WebSockets, secure login with bcrypt, and optimized MongoDB message storage.",
      techStack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "WebSocket",
        "Bcrypt",
      ],
      role: "Under Development",
      metrics: ["100+ simultaneous users", "End-to-end real-time syncing"],
    },
  },
  {
    id: "2",
    title: "Mindful Chat",
    summary: "AI mental health chatbot.",
    description:
      "A conversational AI assistant using ChatGPT API designed to provide mental wellness support and guided reflections.",
    tags: ["React", "Node.js", "ChatGPT API", "Express"],
    thumbnail: "/6.png",
    images: ["/6.png"],
    year: "2025",
    category: "Full Stack",
    featured: true,
    links: {
      live: "#",
      repo: "#",
    },
    details: {
      problem:
        "People needed quick, non-judgmental mental health assistance without professional barriers.",
      solution:
        "Developed a safe AI-powered chatbot leveraging the ChatGPT API, with mood tracking and reflection prompts.",
      techStack: ["React", "Node.js", "Express", "ChatGPT API"],
      role: "Under Development",
      metrics: ["Handles 2k+ daily conversations", "90% user satisfaction"],
    },
  },
  {
    id: "3",
    title: "SuprResume.ai",
    summary: "AI-powered resume builder.",
    description:
      "A modern resume building tool powered by AI that generates optimized bullet points and ATS-friendly formatting.",
    tags: ["Next.js", "Node.js", "AI", "Tailwind"],
    thumbnail: "/7.png",
    images: ["/7.png"],
    year: "2025",
    category: "Full Stack",
    featured: true,
    links: {
      live: "#",
      repo: "#",
    },
    details: {
      problem:
        "Students and job-seekers struggled to create professional, ATS-friendly resumes.",
      solution:
        "Built an AI-assisted resume generator that creates sections, improves content quality, and exports clean PDF resumes.",
      techStack: ["Next.js", "Node.js", "OpenAI API", "Tailwind CSS"],
      role: "Under Development",
      metrics: ["Generates resumes in <10 seconds", "Used by 300+ job seekers"],
    },
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    title: "BASH",
    issuer: "Spoken Tutorial IIT Bombay",
    date: "2025",
    thumbnail: "/BASH.png",
    url: "https://spoken-tutorial.org/software-training/test/participant/certificate/153320/4031762/",
  },
  {
    id: "2",
    title: "Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    date: "2025",
    thumbnail: "/c2.jpg",
    url: "https://www.udemy.com/certificate/UC-ef877cbe-04c8-4aa8-b530-8be39a76b110/",
  },
  {
    id: "3",
    title: "GIT",
    issuer: "Spoken Tutorial IIT Bombay",
    date: "2025",
    thumbnail: "/GIT.png",
    url: "https://spoken-tutorial.org/software-training/test/participant/certificate/139645/4031762/",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Top UI/UX Tools Every Designer Should Use in 2025",
    excerpt:
      "From Figma to Framer, explore the essential tools modern designers rely on to craft clean, accessible, and delightful user experiences.",
    date: "Nov 08, 2025",
    readTime: "9 min read",
    category: "Design",
    tags: ["UI/UX", "Figma", "Design Tools"],
    thumbnail: "/1.png",
    content: `
## Introduction
The world of UI/UX design has transformed dramatically over the last decade. What used to rely heavily on static tools like Photoshop or Sketch has evolved into dynamic, collaborative, cloud-based platforms. As user expectations rise, designers must master tools that go beyond interface creation—tools for prototyping, user testing, documentation, accessibility, and collaboration.

In 2025, UI/UX design isn't just about visuals. It's about systems, workflows, psychology, and inclusive experiences. This blog highlights the **top UI/UX tools every designer should know** to stay competitive in today’s industry.

## 1. Figma — The Industry Standard
Figma continues to dominate the design ecosystem with real-time collaboration, Auto-Layout 5.0, Variables & Modes, Component Properties, and advanced prototyping.  
Its biggest strength: **one tool for teams, designers, and developers**.

## 2. Framer — Realistic Prototypes
Framer allows designers to build production-level, interactive prototypes with native-level animations. It is unmatched when testing real app flow with logic, conditional rendering, and micro-interactions.

## 3. FigJam — Where Ideas Start
A collaborative whiteboard for brainstorming, mapping journeys, wireframing, retros, planning, and workshops. FigJam integrates seamlessly with Figma UI files.

## 4. Notion — The Designer's Knowledge Hub
Designers document design systems, UX guidelines, research notes, and content flows. Notion has become the universal documentation tool for design teams.

## 5. Maze — Remote User Testing Tool
Maze transforms prototypes into user tests with:
- Heatmaps
- Task analysis
- Recorded sessions
- Surveys
- Usability scoring

## 6. Dev Mode & Zeplin — Developer Handoff
As UI/UX becomes more systemized, clear handoff matters. Dev Mode (Figma) + Zeplin provide perfect spacing, code snippets, versioning, and design–code mapping.

## 7. Penpot — The Open-Source Alternative
Teams wanting privacy, control, and open-source workflows choose Penpot.

## 8. Airtable — Design Ops & System Management
Used to track:
- Components  
- Tokens  
- Visual language  
- QA  
- Design iterations  

## Conclusion
Mastering these tools will help designers deliver consistent, quality, and scalable experiences. In 2025, the best designers aren’t the ones who know the most tools—they’re the ones who know **which tools to use and why**.
`,
  },
  {
    id: "2",
    title: "Must-Have VS Code Extensions for Web Developers",
    excerpt:
      "Boost productivity, eliminate bugs, and streamline your workflow with these essential VS Code extensions for modern web development.",
    date: "Oct 04, 2025",
    readTime: "10 min read",
    category: "Productivity",
    tags: ["VS Code", "Web Dev", "Tools"],
    thumbnail: "/2.png",
    content: `
## Introduction
VS Code is the world's most-used code editor, especially among web developers. Lightweight yet powerful, its true potential is unlocked through its extension ecosystem.  

This blog covers the **must-have VS Code extensions** for frontend, backend, and full-stack developers.

## Prettier — Code Formatting Made Painless
Prettier automatically formats code on save, ensuring your team never argues about indentation, semicolons, or quotes again.

## ESLint — Catch Errors Early
ESLint analyzes your code for:
- Bad patterns
- Incorrect imports
- Unused variables
- Anti-patterns  
Deeply integrated into modern React/Next.js dev workflows.

## Tailwind CSS IntelliSense
Tailwind users enjoy:
- Autocomplete  
- Color previews  
- Real-time validation  
This extension speeds up UI development significantly.

## GitLens — Visual Git Superpowers
GitLens brings:
- Line authorship  
- Commit history  
- File timeline  
All inside VS Code.

## Thunder Client — Postman Alternative
A lightweight REST client inside VS Code:
- Send requests  
- Save collections  
- Test APIs  
Perfect for MERN and full-stack devs.

## Error Lens
Highlights errors inline, making debugging quicker.

## Live Server
Instant reload for static HTML/CSS projects.

## REST Client
Write http files and call APIs without leaving VS Code.

## CodeSnap
Export beautiful code screenshots for blogs, tutorials, or LinkedIn posts.

## Conclusion
Configuring VS Code with the right extensions transforms your workflow. You write faster, debug better, and build cleaner codebases.
`,
  },
  {
    id: "3",
    title: "How to Write the Best Prompts (Beginner to Pro Guide)",
    excerpt:
      "Unlock the full power of AI by mastering the art of writing clear, structured, and effective prompts.",
    date: "Sep 30, 2025",
    readTime: "11 min read",
    category: "AI",
    tags: ["Prompt Engineering", "ChatGPT", "AI"],
    thumbnail: "/3.png",
    content: `
## Introduction
AI is becoming the default interface for coding, research, writing, planning, and creativity. Yet, results vary wildly depending on the prompt. The solution is **prompt engineering**, a structured way of communicating with AI models.

This guide shows how to write prompts that produce accurate, helpful, and high-quality outputs.

## 1. Be Hyper-Specific
Bad prompt: “Explain JavaScript closures.”  
Good prompt: “Explain JavaScript closures to a beginner using simple language and examples.”

Specificity reduces ambiguity.

## 2. Provide Context
Tell the AI:
- Who you are
- What your goal is
- Where this content will be used
- What tone or depth you want

Context = clarity.

## 3. Use Role Prompting
Examples:
- “Act as a senior React developer.”
- “Act as a UI/UX mentor.”
- “Act as a fitness trainer.”

Roles shape the AI's tone and expertise.

## 4. Set Format & Constraints
Examples:
- “Explain in bullet points.”
- “Use under 150 words.”
- “Structure like a tutorial.”

## 5. Ask for Step-by-Step Reasoning
Step-by-step prompting reduces hallucinations.

## 6. Give Examples
Few-shot prompting is extremely powerful.  
Show inputs + expected outputs to anchor AI behavior.

## 7. Iterate & Refine
Prompt engineering is an iterative loop.

## Conclusion
Great prompts follow this formula:

**Context + Role + Instruction + Constraints + Output Format**

Master this and you unlock elite productivity with any AI.
`,
  },
];
