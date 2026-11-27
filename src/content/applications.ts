/**
 * What can be applied to, and the default questions a new round starts with.
 * The board edits questions per round in /admin/applications; these are only the
 * starting point. Question ids are stored with each answer, so keep them stable.
 */

export type QuestionType = "short" | "long" | "email" | "url" | "select" | "checkbox";

export type Question = {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  help?: string;
  /** For "select". */
  options?: string[];
  /** Chair rounds: shown on the public candidates page (only for applicants who agree). */
  public?: boolean;
};

export const applicationKinds = {
  "startup-journey": {
    label: "Startup Journey",
    noun: "Startup Journey application",
    programHref: "/programs/startup-journey",
    blurb: "The summer accelerator for early-stage teams.",
  },
  "startup-marathon": {
    label: "Startup Marathon",
    noun: "Startup Marathon registration",
    programHref: "/programs/startup-marathon",
    blurb: "The 42-hour idea hackathon.",
  },
  omahomma: {
    label: "OmaHomma",
    noun: "OmaHomma application",
    programHref: "/programs/omahomma",
    blurb: "Create your own summer job.",
  },
  "poc-grant": {
    label: "Proof of Concept grant",
    noun: "PoC grant application",
    programHref: "/programs/poc-grant",
    blurb: "Funding to test an idea in practice.",
  },
  volunteer: {
    label: "Volunteer",
    noun: "volunteer application",
    programHref: "/get-involved",
    blurb: "Help run events, content and projects.",
  },
  board: {
    label: "Board",
    noun: "board application",
    programHref: "/get-involved",
    blurb: "Run Boost for a year as a board member.",
  },
  chair: {
    label: "Chairperson",
    noun: "chairperson application",
    programHref: "/get-involved",
    blurb: "Lead Boost and its board for a year.",
  },
} as const;

export type ApplicationKind = keyof typeof applicationKinds;

/** How the Apply menu in the header groups everything. */
export const applyMenu: { title: string; kinds: ApplicationKind[] }[] = [
  { title: "Programs", kinds: ["startup-journey", "startup-marathon", "omahomma", "poc-grant"] },
  { title: "Get involved", kinds: ["volunteer", "board", "chair"] },
];
export const isApplicationKind = (v: string): v is ApplicationKind => v in applicationKinds;

export const applicationStatuses = ["new", "reviewing", "shortlisted", "accepted", "declined"] as const;
export type ApplicationStatus = (typeof applicationStatuses)[number];

export const statusLabels: Record<ApplicationStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  accepted: "Accepted",
  declined: "Declined",
};

const studies: Question = { id: "studies", label: "What and where do you study?", type: "short", required: true };
const linkedin: Question = { id: "linkedin", label: "LinkedIn profile", type: "url", required: false };

export const defaultQuestions: Record<ApplicationKind, Question[]> = {
  "startup-journey": [
    { id: "team_name", label: "Team or idea name", type: "short", required: false, help: "Working names are fine." },
    {
      id: "motivation",
      label: "Motivation letter: why do you want to join Startup Journey?",
      type: "long",
      required: true,
      help: "In the first stage we mainly want to get to know you. You don't need a finished idea or a team yet.",
    },
    { id: "idea", label: "Describe your idea, even if it's early", type: "long", required: false },
    { id: "team", label: "Who is in your team? Names and what each person does", type: "long", required: false },
    {
      id: "full_time",
      label: "Can at least one founder work on the startup full-time during the program?",
      type: "select",
      required: true,
      options: ["Yes", "No", "Not sure yet"],
    },
    studies,
    { id: "links", label: "Website, pitch deck or demo link", type: "url", required: false },
  ],
  "startup-marathon": [
    { id: "team_status", label: "Are you coming with a team?", type: "select", required: true, options: ["I have a team", "I'm joining alone and want to find a team"] },
    { id: "team", label: "Team members' names", type: "long", required: false },
    { id: "idea", label: "Do you already have an idea? Tell us briefly", type: "long", required: false, help: "Not required. Many people find their idea at the event." },
    studies,
    { id: "diet", label: "Dietary restrictions", type: "short", required: false },
  ],
  omahomma: [
    { id: "plan", label: "What would your own summer job or business be?", type: "long", required: true },
    { id: "skills", label: "What skills, hobby or side project would you build it on?", type: "long", required: true },
    { id: "business_id", label: "Do you already have a business ID (Y-tunnus)?", type: "select", required: true, options: ["Yes", "No", "Not yet, but I plan to"] },
    studies,
  ],
  "poc-grant": [
    { id: "project", label: "Project name", type: "short", required: true },
    { id: "problem", label: "What problem does it solve, and for whom?", type: "long", required: true },
    { id: "test", label: "What will you build or test with the grant?", type: "long", required: true },
    { id: "budget", label: "How much funding do you need, and what for?", type: "long", required: true },
    { id: "team", label: "Who is in the team?", type: "long", required: false },
    studies,
  ],
  volunteer: [
    studies,
    {
      id: "area",
      label: "What would you most like to help with?",
      type: "select",
      required: true,
      options: [
        "Events and hosting",
        "Marketing and content (social media, design, photo, video)",
        "Partnerships and sponsors",
        "BoostHer",
        "Tech and the website",
        "Wherever I'm needed",
      ],
    },
    {
      id: "availability",
      label: "How much time could you give?",
      type: "select",
      required: true,
      options: ["A few hours a month", "A few hours a week", "Mainly at big events like Startup Marathon or Demo Day"],
    },
    { id: "why", label: "Why do you want to volunteer with Boost?", type: "long", required: true },
    { id: "experience", label: "Anything you've done before that could help?", type: "long", required: false, help: "Events, design, social media, clubs, jobs… anything counts." },
    { id: "telegram", label: "Telegram username", type: "short", required: false, help: "Volunteers coordinate in a Telegram group." },
  ],
  board: [
    studies,
    linkedin,
    { id: "why", label: "Why do you want to join the Boost board?", type: "long", required: true },
    { id: "bring", label: "What would you bring to the board?", type: "long", required: true, help: "Skills, experience, ideas or projects you'd like to run." },
    {
      id: "area",
      label: "Which area interests you most?",
      type: "select",
      required: false,
      options: ["Events", "Programs", "Marketing and communications", "Partnerships", "Finance", "BoostHer", "Not sure yet"],
    },
    {
      id: "meeting",
      label: "Can you attend the association meeting where the board is chosen?",
      type: "select",
      required: true,
      options: ["Yes", "No", "Not sure yet"],
    },
  ],
  chair: [
    { ...studies, public: true },
    { ...linkedin, public: true },
    {
      id: "vision",
      label: "Your vision for Boost",
      type: "long",
      required: true,
      public: true,
      help: "What should Boost be during your year, and why? If you agree below, this is shown on the candidates page.",
    },
    { id: "why_you", label: "Why are you the right person to lead Boost?", type: "long", required: true },
    { id: "experience", label: "Leadership or team experience", type: "long", required: false },
  ],
};
