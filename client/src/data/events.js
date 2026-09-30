/**
 * SRIJAN 2026 — CENTRALIZED EVENT DATA ARCHITECTURE
 * 
 * ==============================================================================
 * INSTRUCTIONS FOR EDITING:
 * 1. Replace placeholder event names, descriptions, dates, and venues below.
 * 2. Replace the 'registrationUrl' with your actual Google Form URL for each event.
 * 3. Place your event brochure PDF files inside: 'client/public/brochures/'
 *    (e.g., 'client/public/brochures/event-1.pdf').
 * 4. Set 'brochureAvailable: true' once you have placed the PDF in the brochures folder.
 * 5. Update rules, team size, and contact details as needed.
 * 
 * NOTE FOR FUTURE BACKEND INTEGRATION:
 * When moving to full MERN stack (Express + MongoDB), this array can be directly
 * replaced with an API call: `GET /api/events` without changing any frontend UI components.
 * ==============================================================================
 */

export const events = [
  {
  id: "event-1",
  number: "01",
  name: "Hackathon",
  category: "Technical Competition",
  tagline: "Build. Innovate. Solve.",
  registrationType: "team",
  code: "HACK",
  minTeamSize: 2,
  maxTeamSize: 4,

  description:
    "A high-energy technical competition where participants transform innovative ideas into practical solutions for real-world problems.",

  fullDescription:
    "The Srijan Hackathon is a platform for students to turn ideas into impactful solutions. Participants will work in teams to identify problems, develop innovative approaches, and build functional prototypes within a limited time. The event focuses on creativity, problem-solving, technical implementation, teamwork, and the ability to present a practical solution.",

  icon: "Code2",

  brochure: "/brochures/event-1.pdf",
  brochureAvailable: false,

  registrationUrl: "https://forms.gle/8LBBSBz2yqJVDvKT9",

  date: "To be announced",
  venue: "To be announced",
  teamSize: "2–4 members",
  prizePool: "To be announced",

  rules: [
    "Participants must register within the specified registration period.",
    "Each team must consist of 2–4 members.",
    "Participants must develop their solution within the given hackathon duration.",
    "The submitted solution should address the given problem statement or challenge.",
    "Teams may use appropriate technologies, frameworks, APIs, and development tools as permitted by the organizers.",
    "Each team must submit and present their solution before the specified deadline.",
    "Projects will be evaluated based on innovation, technical implementation, problem-solving approach, feasibility, and presentation.",
    "Participants must follow the instructions and code of conduct provided by the organizers.",
    "The decision of the judging panel will be considered final."
  ],

  schedule: [
    {
      time: "TBA",
      activity: "Registration & Team Verification"
    },
    {
      time: "TBA",
      activity: "Problem Statement & Guidelines"
    },
    {
      time: "TBA",
      activity: "Hackathon Begins"
    },
    {
      time: "TBA",
      activity: "Project Submission"
    },
    {
      time: "TBA",
      activity: "Project Demonstration & Evaluation"
    },
    {
      time: "TBA",
      activity: "Results & Prize Distribution"
    }
  ],

  coordinators: [
    {
      name: "Student Coordinator",
      contact: "To be announced"
    }
  ]
},
  {
  id: "event-2",
  number: "02",
  name: "KBC Quiz",
  category: "Technical Quiz",
  tagline: "Think Fast. Answer Smart.",
  registrationType: "individual",
  code: "KBC",
  minTeamSize: 1,
  maxTeamSize: 1,

  description:
    "An exciting quiz competition that challenges participants on technical knowledge, logical reasoning, general awareness, and problem-solving skills.",

  fullDescription:
    "Srijan KBC Quiz is a fast-paced knowledge competition designed to test participants' technical understanding, logical thinking, general awareness, and ability to make quick decisions under pressure. Inspired by the popular quiz-show format, the event takes participants through multiple rounds of challenging questions, where accuracy, speed, and confidence play a key role. Get ready to test your knowledge, trust your instincts, and compete for the top spot.",

  icon: "Cpu",

  /* BROCHURE: Place PDF file inside public/brochures/event-2.pdf */
  brochure: "/brochures/event-2.pdf",
  brochureAvailable: false,

  /* GOOGLE FORM: Replace with your actual Google Form link */
  registrationUrl: "https://forms.gle/8LBBSBz2yqJVDvKT9",

  date: "To be announced",
  venue: "To be announced",
  teamSize: "To be announced",
  prizePool: "To be announced",

  rules: [
    "Participants must complete registration within the specified registration period.",
    "Participants must report at the venue before the scheduled reporting time.",
    "The quiz will consist of multiple rounds as decided by the organizers.",
    "Questions may cover technical knowledge, electronics, engineering, logical reasoning, general awareness, and current topics.",
    "Participants must answer within the time limit specified for each question or round.",
    "Use of mobile phones, smart devices, books, or unauthorized external assistance will not be permitted during the quiz.",
    "In case of a tie, a tie-breaker round may be conducted.",
    "Participants must follow the instructions given by the quizmaster and organizing team.",
    "The decision of the quizmaster and judging panel will be final."
  ],

  schedule: [
    {
      time: "TBA",
      activity: "Registration & Verification"
    },
    {
      time: "TBA",
      activity: "Quiz Introduction & Instructions"
    },
    {
      time: "TBA",
      activity: "Preliminary Round"
    },
    {
      time: "TBA",
      activity: "Qualifying / Main Round"
    },
    {
      time: "TBA",
      activity: "Final Round"
    },
    {
      time: "TBA",
      activity: "Results & Prize Distribution"
    }
  ],

  coordinators: [
    {
      name: "Student Coordinator",
      contact: "To be announced"
    }
  ]
},
  {
  id: "event-3",
  number: "03",
  name: "PCB Designing",
  category: "Technical Competition",
  tagline: "Design. Connect. Innovate.",
  registrationType: "individual",
  code: "PCB",
  minTeamSize: 1,
  maxTeamSize: 1,

  description:
    "A hands-on technical competition that challenges participants to design efficient, accurate, and practical printed circuit boards.",

  fullDescription:
    "Srijan PCB Designing is a technical challenge that tests participants' understanding of electronic circuits, component placement, circuit routing, and PCB design principles. Participants will be given a circuit or design challenge and will be required to develop a functional PCB layout within the given time. The event focuses on circuit understanding, design accuracy, routing efficiency, practical implementation, and attention to detail.",

  icon: "Terminal",

  /* BROCHURE: Place PDF file inside public/brochures/event-3.pdf */
  brochure: "/brochures/event-3.pdf",
  brochureAvailable: false,

  /* GOOGLE FORM: Replace with your actual Google Form link */
  registrationUrl: "https://forms.gle/8LBBSBz2yqJVDvKT9",

  date: "To be announced",
  venue: "To be announced",
  teamSize: "To be announced",
  prizePool: "To be announced",

  rules: [
    "Participants must complete registration within the specified registration period.",
    "Participants must report at the venue before the scheduled reporting time.",
    "The circuit or design challenge will be provided by the organizing team.",
    "Participants must create their PCB design according to the given specifications.",
    "Participants must follow the component, dimension, routing, and design constraints specified by the organizers.",
    "The submitted PCB design must be the participant's own work.",
    "Participants must complete and submit their design within the allotted time.",
    "Evaluation may consider circuit correctness, component placement, routing, design efficiency, accuracy, and overall implementation.",
    "Participants must follow all laboratory and equipment safety instructions.",
    "The decision of the judging panel will be final."
  ],

  schedule: [
    {
      time: "TBA",
      activity: "Registration & Verification"
    },
    {
      time: "TBA",
      activity: "Event Briefing & Instructions"
    },
    {
      time: "TBA",
      activity: "Circuit / Design Challenge Announcement"
    },
    {
      time: "TBA",
      activity: "PCB Designing Round"
    },
    {
      time: "TBA",
      activity: "Design Submission & Evaluation"
    },
    {
      time: "TBA",
      activity: "Results & Prize Distribution"
    }
  ],

  coordinators: [
    {
      name: "Student Coordinator",
      contact: "To be announced"
    }
  ]
},
 {
  id: "event-4",
  number: "04",
  name: "CAD Modeling",
  category: "Technical Competition",
  tagline: "Design. Model. Create.",
  registrationType: "individual",
  code: "CAD",
  minTeamSize: 1,
  maxTeamSize: 1,

  description:
    "A technical design competition that challenges participants to transform concepts and engineering ideas into accurate 3D CAD models.",

  fullDescription:
    "Srijan CAD Modeling is a design-focused technical competition that tests participants' ability to interpret engineering concepts and convert them into precise digital models. Participants will be given a design challenge and will create a 2D or 3D CAD model within the allotted time. The event emphasizes accuracy, creativity, modeling skills, design understanding, and efficient use of CAD tools.",

  icon: "Globe",

  /* BROCHURE: Place PDF file inside public/brochures/event-4.pdf */
  brochure: "/brochures/event-4.pdf",
  brochureAvailable: false,

  /* GOOGLE FORM: Replace with your actual Google Form link */
  registrationUrl: "https://forms.gle/8LBBSBz2yqJVDvKT9",

  date: "To be announced",
  venue: "To be announced",
  teamSize: "To be announced",
  prizePool: "To be announced",

  rules: [
    "Participants must complete registration within the specified registration period.",
    "Participants must report at the venue before the scheduled reporting time.",
    "The design problem or model requirements will be provided by the organizing team.",
    "Participants must create the required CAD model within the allotted time.",
    "Participants must follow the dimensions, specifications, and constraints provided in the problem statement.",
    "The submitted design must be the participant's original work.",
    "Participants must use the CAD software specified or permitted by the organizers.",
    "Participants must submit their final model in the required file format before the deadline.",
    "Evaluation may consider dimensional accuracy, design quality, modeling technique, creativity, and completion within the given time.",
    "The decision of the judging panel will be final."
  ],

  schedule: [
    {
      time: "TBA",
      activity: "Registration & Verification"
    },
    {
      time: "TBA",
      activity: "Event Briefing & Instructions"
    },
    {
      time: "TBA",
      activity: "Design Challenge Announcement"
    },
    {
      time: "TBA",
      activity: "CAD Modeling Round"
    },
    {
      time: "TBA",
      activity: "Model Submission & Evaluation"
    },
    {
      time: "TBA",
      activity: "Results & Prize Distribution"
    }
  ],

  coordinators: [
    {
      name: "Student Coordinator",
      contact: "To be announced"
    }
  ]
},
 {
  id: "event-5",
  number: "05",
  name: "Bridge Making",
  category: "Technical Competition",
  tagline: "Design. Build. Test.",
  registrationType: "individual",
  code: "BRG",
  minTeamSize: 1,
  maxTeamSize: 1,

  description:
    "A hands-on engineering challenge where participants design and construct a model bridge that combines structural strength, stability, creativity, and efficient use of materials.",

  fullDescription:
    "Srijan Bridge Making is a practical engineering challenge that tests participants' understanding of structural design, load distribution, stability, and material efficiency. Teams will design and construct a bridge model according to the specifications and constraints provided by the organizers. The completed structures will be tested for strength and stability, challenging participants to find the right balance between structural performance, creativity, and efficient material usage.",

  icon: "Layers",

  /* BROCHURE: Place PDF file inside public/brochures/event-5.pdf */
  brochure: "/brochures/event-5.pdf",
  brochureAvailable: false,

  /* GOOGLE FORM: Replace with your actual Google Form link */
  registrationUrl: "https://forms.gle/8LBBSBz2yqJVDvKT9",

  date: "To be announced",
  venue: "To be announced",
  teamSize: "To be announced",
  prizePool: "To be announced",

  rules: [
    "Participants must complete registration within the specified registration period.",
    "Each team must follow the team size specified by the organizers.",
    "The bridge must be constructed using only the materials permitted by the organizers.",
    "The bridge must satisfy the dimensions and design constraints provided in the problem statement.",
    "Participants must construct the bridge within the allotted time.",
    "The structure must be the team's original design and construction.",
    "The completed bridge will be tested according to the testing procedure announced by the organizers.",
    "Evaluation may consider load-bearing capacity, structural stability, material efficiency, design, and overall execution.",
    "Any structure that violates the specified dimensions, materials, or safety requirements may be disqualified.",
    "Participants must follow all safety instructions during construction and testing.",
    "The decision of the judging panel will be final."
  ],

  schedule: [
    {
      time: "TBA",
      activity: "Registration & Team Verification"
    },
    {
      time: "TBA",
      activity: "Event Briefing & Rules"
    },
    {
      time: "TBA",
      activity: "Design & Planning"
    },
    {
      time: "TBA",
      activity: "Bridge Construction"
    },
    {
      time: "TBA",
      activity: "Structural Testing"
    },
    {
      time: "TBA",
      activity: "Evaluation & Results"
    },
    {
      time: "TBA",
      activity: "Prize Distribution"
    }
  ],

  coordinators: [
    {
      name: "Student Coordinator",
      contact: "To be announced"
    }
  ]
},
{
  id: "event-6",
  number: "06",
  name: "Circuit Making",
  category: "Technical Competition",
  tagline: "Connect. Create. Conquer.",
  registrationType: "individual",
  code: "CIRCUIT",
  minTeamSize: 1,
  maxTeamSize: 1,

  description:
    "A hands-on electronics challenge where participants design, assemble, and test a working circuit based on a given problem statement.",

  fullDescription:
    "Srijan Circuit Making is a practical electronics competition designed to test participants' understanding of electronic components, circuit design, wiring, troubleshooting, and practical implementation. Participants will be given a circuit-based challenge and will be required to design and assemble a functional circuit within the allotted time. The event emphasizes circuit accuracy, component knowledge, systematic troubleshooting, creativity, and the ability to transform a circuit concept into a working prototype.",

  icon: "Zap",

  /* BROCHURE: Place PDF file inside public/brochures/event-6.pdf */
  brochure: "/brochures/event-6.pdf",
  brochureAvailable: false,

  /* GOOGLE FORM: Replace with your actual Google Form link */
  registrationUrl: "https://forms.gle/8LBBSBz2yqJVDvKT9",

  date: "To be announced",
  venue: "To be announced",
  teamSize: "To be announced",
  prizePool: "To be announced",

  rules: [
    "Participants must complete registration within the specified registration period.",
    "Participants must report at the venue before the scheduled reporting time.",
    "The circuit problem statement or challenge will be provided by the organizing team.",
    "Participants must design and assemble the circuit according to the given specifications.",
    "Only the components and equipment permitted by the organizers may be used.",
    "Participants must complete the circuit within the allotted time.",
    "The assembled circuit must demonstrate the required functionality during testing.",
    "Participants are responsible for checking their connections and ensuring proper circuit operation.",
    "Evaluation may consider circuit functionality, accuracy, design approach, component usage, troubleshooting ability, and completion time.",
    "Participants must follow all laboratory and electrical safety instructions.",
    "Any intentional damage to components or equipment may result in disqualification.",
    "The decision of the judging panel will be final."
  ],

  schedule: [
    {
      time: "TBA",
      activity: "Registration & Verification"
    },
    {
      time: "TBA",
      activity: "Event Briefing & Safety Instructions"
    },
    {
      time: "TBA",
      activity: "Circuit Challenge Announcement"
    },
    {
      time: "TBA",
      activity: "Circuit Designing & Assembly"
    },
    {
      time: "TBA",
      activity: "Testing & Troubleshooting"
    },
    {
      time: "TBA",
      activity: "Evaluation & Results"
    },
    {
      time: "TBA",
      activity: "Prize Distribution"
    }
  ],

  coordinators: [
    {
      name: "Student Coordinator",
      contact: "To be announced"
    }
  ]
}
];

/**
 * Event Highlights / Spirit of Srijan
 */
export const srijanPillars = [
  {
    step: "01",
    title: "INNOVATE",
    tag: "Ideation",
    description: "Challenge conventional approaches and spark breakthrough concepts that address real-world technical problems.",
    icon: "Lightbulb"
  },
  {
    step: "02",
    title: "BUILD",
    tag: "Engineering",
    description: "Transform ideas into functional prototypes through focused engineering, coding, and collaborative development.",
    icon: "Hammer"
  },
  {
    step: "03",
    title: "COMPETE",
    tag: "Excellence",
    description: "Test your skills against the brightest collegiate minds in structured technical challenges and peer review.",
    icon: "Trophy"
  },
  {
    step: "04",
    title: "CREATE",
    tag: "Impact",
    description: "Bring your vision to life under the guiding ethos of Srijan: Together, we create.",
    icon: "Sparkles"
  }
];

/**
 * Brand & General Configuration
 */
export const siteConfig = {
  name: "SRIJAN",
  edition: "2026",
  tagline: "TOGETHER, WE CREATE",
  heroSubtitle: "A Technical Fest Where Ideas Turn Into Innovation.",
  aboutText: "Srijan is a technical event that brings together students, ideas, innovation and competition on a common platform.",
  collegeName: "College Technical Festival",
  contactEmail: "srijan.fest@college.edu", // PLACEHOLDER EMAIL
  socials: {
    instagram: "https://www.instagram.com/srijan_gcoea?stkn=OTg3M2RkYXZxOHUx", // PLACEHOLDER INSTAGRAM
    //linkedin: "https://linkedin.com/company/srijan-techfest", // PLACEHOLDER LINKEDIN
    email: "mailto:srijan.fest@college.edu" // PLACEHOLDER EMAIL LINK
  }
};
