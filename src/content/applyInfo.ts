import type { ApplicationKind } from "./applications";
import { boardFacts, ways } from "./getInvolved";
import { photos } from "./photos";
import { programDetails } from "./programs";
import type { FaqItem, Photo } from "./types";

/**
 * Background shown on each apply page, whether or not a round is open: what you're
 * applying for, the key facts, how selection works and common questions.
 * Programs reuse their program page content; the roles are written here, from the
 * board recruitment pages on the old site (2026 season).
 */
export type ApplyInfo = {
  title: string;
  summary: string;
  photo: Photo;
  facts: { label: string; value: string }[];
  blocks: { title: string; items: { title?: string; body: string }[] }[];
  timeline?: { title: string; steps: { label: string; value: string }[] };
  faq?: FaqItem[];
};

const boardFaq: FaqItem[] = [
  {
    question: "Do I need to be a student?",
    answer:
      "Boost is student-run, so students are preferred. If you're on a gap year or have just graduated, that's not a problem, and nothing in the association rules stops non-students from applying.",
  },
  {
    question: "How much time does it take?",
    answer:
      "Roughly 20–25 hours a week for the chairperson and 10–15 hours a week for board members. It depends on you: if you're building a project you care about, you'll probably put in more.",
  },
  {
    question: "Is the board work paid?",
    answer: `Board compensation was introduced in 2024. In 2026 it is ${boardFacts.find((f) => f.label.startsWith("Compensation"))?.value ?? "decided each year with the budget"}. The amount for the next year is set when the association confirms the budget.`,
  },
  {
    question: "Can I get study credits?",
    answer:
      'It depends on where you study. At the University of Turku, the "Boost related activities" course gives 2–6 ECTS depending on how much you take part.',
  },
];

const boardTimeline = {
  title: "How the 2026 season ran",
  steps: [
    { label: "18 Sep", value: "Board and chairperson applications open" },
    { label: "18 Oct", value: "Chairperson applications close" },
    { label: "22 Oct", value: "Fall association meeting elects the chairperson" },
    { label: "25 Oct", value: "Board applications close" },
    { label: "Late Nov", value: "Second fall meeting confirms the new board" },
  ],
};

const roles: Record<"volunteer" | "board" | "chair", ApplyInfo> = {
  volunteer: {
    title: "Volunteering at Boost",
    summary: ways.find((w) => w.title === "Volunteer")?.body ?? "",
    photo: photos.eventStand,
    facts: [
      { label: "What you do", value: "Events, workshops and project teams" },
      { label: "Credits", value: "2–6 ECTS at the University of Turku" },
      { label: "Membership", value: "Free" },
      { label: "Experience", value: "None needed" },
    ],
    blocks: [
      {
        title: "Ways to help",
        items: [
          { title: "Events", body: "Help run Boost events, from community breakfasts to founder nights." },
          { title: "Workshops", body: "Host a workshop on something you know well." },
          { title: "Project teams", body: "Join a team like BoostHer that plans its own events through the year." },
        ],
      },
      {
        title: "Why people do it",
        items: [
          { body: "It's the easiest way to meet the community and see how Boost works from the inside." },
          { body: "If you're thinking about the board one day, it's a good way to get to know how it works." },
          { body: 'At the University of Turku, active volunteering can count towards the "Boost related activities" course.' },
        ],
      },
    ],
  },
  board: {
    title: "Being on the board",
    summary:
      "The board runs Boost for a year: every event, program and partnership. It's a chance to build your skills and network and to make a real impact on the Turku startup ecosystem.",
    photo: photos.boardByTheWater,
    facts: boardFacts,
    blocks: [
      {
        title: "How the board is chosen",
        items: [
          { body: "The new chairperson is elected at the fall association meeting." },
          { body: "The chairperson goes through every board application, interviews applicants and has about two weeks to form the board." },
          { body: "The new board is confirmed at the second fall association meeting." },
        ],
      },
      {
        title: "Improve your chances",
        items: [
          { title: "Say why", body: "Make it clear why you want to be on the board." },
          { title: "Bring a vision", body: "Explain what you'd bring to the table and what you'd like to build during your term." },
          { title: "Show up", body: "Come to the fall association meeting and talk to the new chairperson so they get to know you." },
        ],
      },
    ],
    timeline: boardTimeline,
    faq: boardFaq,
  },
  chair: {
    title: "Running for chairperson",
    summary:
      "The chairperson leads Boost for a year and forms the board that runs it. They're elected by the members at the fall association meeting, the highest decision-making body of Boost Turku ry.",
    photo: photos.crewBoostBanner,
    facts: [
      { label: "Time", value: "About 20–25 hours a week" },
      { label: "Compensation (2026)", value: "€500/month" },
      { label: "Elected at", value: "The fall association meeting" },
      { label: "Who can run", value: "Any Boost member" },
    ],
    blocks: [
      {
        title: "Why apply in advance",
        items: [
          { body: "Any member can still run at the meeting itself, so applying beforehand isn't required." },
          { body: "Applications sent before the deadline are published on the candidates page, so members know what you stand for before they vote. That helps a lot." },
        ],
      },
      {
        title: "After the election",
        items: [
          { body: "The new chairperson reviews the board applications and interviews applicants." },
          { body: "Within about two weeks they present the new board, which the second fall association meeting confirms." },
          { body: "The same meeting also decides the budget for the coming year." },
        ],
      },
    ],
    timeline: boardTimeline,
    faq: boardFaq,
  },
};

export function getApplyInfo(kind: ApplicationKind): ApplyInfo | null {
  if (kind === "volunteer" || kind === "board" || kind === "chair") return roles[kind];
  const program = programDetails.find((p) => p.slug === kind);
  if (!program) return null;
  return {
    title: `About ${program.name}`,
    summary: program.summary,
    photo: program.photo,
    facts: program.facts,
    blocks: program.blocks,
    faq: program.faq,
  };
}
