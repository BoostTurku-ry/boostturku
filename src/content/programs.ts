import { photos } from "./photos";
import type { ProgramDetail } from "./types";

/**
 * Program pages. Dates reflect the 2026 season (as of Nov 2026); update
 * `status`, `facts` and `primaryCta` when a new round opens.
 */
export const programDetails: ProgramDetail[] = [
  {
    slug: "startup-journey",
    name: "Startup Journey",
    tagline: "Summer accelerator",
    summary:
      "An intensive accelerator for early-stage teams, held on-site in Turku every summer since 2011. It's free, and we never take equity.",
    status: { label: "2026 round completed · next round summer 2027", tone: "next" },
    photo: photos.journeyStage,
    facts: [
      { label: "Format", value: "On-site in Turku" },
      { label: "Length", value: "About 8 weeks" },
      { label: "2026 dates", value: "26 June – 13 August" },
      { label: "Cost", value: "Free, no equity" },
    ],
    overview: [
      "Startup Journey helps early-stage teams take a big step forward in a single summer. Over the program you work with experienced mentors and industry experts to sharpen the idea, build a prototype, test it with real customers and get ready to launch.",
      "It ends with Demo Day, where every team pitches to investors and the Turku startup community. After the summer you keep the network: coaches, alumni and the teams you built alongside.",
    ],
    blocks: [
      {
        title: "What we look for",
        items: [
          {
            title: "A scalable idea",
            body: "Research into the competition and early interest from customers or partners both count in your favour.",
          },
          {
            title: "A committed team",
            body: "At least one founder working full-time for the whole summer. The more of the team who can, the better.",
          },
          { title: "Motivation", body: "Drive and the willingness to build under pressure matter more than a polished plan." },
        ],
      },
      {
        title: "How applying works",
        items: [
          { body: "The first stage is a motivation letter. You don't need a finished idea or a full team to apply." },
          { body: "Apply early: we can help you shape the idea and find co-founders before the program starts." },
          { body: "Teams from outside Turku are welcome, although most come from the region." },
        ],
      },
    ],
    highlight: {
      eyebrow: "Demo Day 2025",
      title: "Twelve startups, one stage",
      body: "The 2025 cohort pitched at the Joki Center in front of more than 200 people. The jury came from Startup Foundation, Antler, NordicNinja and the City of Turku.",
      items: [
        { label: "Grand winner", value: "Futuuri: AI that turns X-ray, MRI and CT scans into clinical insight" },
        { label: "Second place", value: "F-Bureaucracy" },
        { label: "Best pitch", value: "Hajuton" },
        { label: "Best team", value: "SleepSafe" },
      ],
    },
    faq: [
      {
        question: "Is the program really free?",
        answer:
          "Yes, and we don't take any equity. Boost is a non-profit association funded by its partners, so taking part costs you nothing.",
      },
      {
        question: "My team isn't based in Turku. Can we apply?",
        answer:
          "Yes. Startup Journey is a Turku-based accelerator and most teams come from the region, but we accept a number of teams from other cities each year.",
      },
      {
        question: "Do I need a full team to apply?",
        answer:
          "No. You can apply with just an idea and build the team before the program starts. A committed team improves your chances, and we usually encourage solo founders to find a co-founder first, but we do accept one-person teams in some cases.",
      },
    ],
  },
  {
    slug: "startup-marathon",
    name: "Startup Marathon",
    tagline: "42-hour idea hackathon",
    summary:
      "A weekend for students who want to know what building a business from scratch feels like. No experience and no idea needed, just curiosity.",
    status: { label: "Held every March · 2027 date to be announced", tone: "next" },
    photo: photos.hackathon,
    facts: [
      { label: "Length", value: "42 hours, Friday to Sunday" },
      { label: "2026 venue", value: "Edu-City, Joukahaisenkatu 7" },
      { label: "Credits", value: "27 hours = 1 ECTS" },
      { label: "Cost", value: "Free, meals included" },
    ],
    overview: [
      "Over one weekend you turn a startup idea into a concrete business plan. Pitch your own idea or join someone else's, form a team, test the idea with real people and decide whether to pivot or keep going.",
      "Coaches run short workshops throughout and check in with every team. On Sunday you pitch to a jury, and you leave with new tools, new contacts and often a team that wants to keep building.",
    ],
    blocks: [
      {
        title: "Who it's for",
        items: [
          { body: "Any student who is curious about startups. No previous experience is necessary." },
          { body: "Come with an idea, or without one and join a team on Friday evening." },
          { body: "It counts toward the University of Turku's \"Boost related activities\" course." },
        ],
      },
    ],
    schedule: {
      title: "How the weekend runs",
      intro: "Based on the 2026 program; times vary slightly each year.",
      days: [
        {
          label: "Friday · Ideas",
          items: [
            ["16:00", "Welcome and opening keynote"],
            ["17:00", "Idea storm workshop and pitching the ideas"],
            ["18:00", "Team matchmaking"],
            ["19:00", "First coaching round, then dinner"],
          ],
        },
        {
          label: "Saturday · Validation",
          items: [
            ["10:00", "Customer validation workshop"],
            ["13:00", "Checkpoint with mentors"],
            ["15:00", "Pivot or persevere workshop"],
            ["16:00", "Second checkpoint, then pitch basics"],
          ],
        },
        {
          label: "Sunday · Pitch",
          items: [
            ["10:00", "Pitching workshop"],
            ["14:00", "Pitch decks due"],
            ["15:00", "Final pitches to the jury"],
            ["17:30", "Winners and what comes next"],
          ],
        },
      ],
    },
    faq: [
      {
        question: "Do I need a team or an idea?",
        answer: "Neither. Pitch an idea on Friday if you have one, or join another team. Most participants arrive without a team.",
      },
      {
        question: "What if our idea doesn't work out?",
        answer:
          "Then you've failed fast, which is the point. You'll have learned more in a weekend than most people do in months, and you can start the next idea with that knowledge.",
      },
      {
        question: "Can I get study credits?",
        answer: "Yes. It counts toward Boost activities, where 27 hours of work equals 1 ECTS.",
      },
    ],
  },
  {
    slug: "omahomma",
    name: "OmaHomma",
    tagline: "Create your own summer job",
    summary:
      "A flexible summer program for students who want to earn their summer income from their own skills, ideas or side project instead of a traditional job.",
    status: { label: "Applications in spring 2027", tone: "next" },
    photo: photos.omaHommaGroup,
    facts: [
      { label: "When", value: "Summer" },
      { label: "Early round", value: "March – April" },
      { label: "Open round", value: "May" },
      { label: "Funded by", value: "University of Turku" },
    ],
    overview: [
      "Summer jobs are getting harder to find. OmaHomma helps students turn that uncertainty into action by building something of their own: a small business, freelance work or a side hustle that earns real money.",
      "It's built to be easy to start. You don't need a finished business idea, only the motivation to try. Past participants have launched coaching services and other small ventures within a single summer.",
    ],
    blocks: [
      {
        title: "Two ways in",
        items: [
          {
            title: "Early round · March–April",
            body: "For students who already have an idea, side hustle or freelance concept. You get sparring early and can start building straight away.",
          },
          {
            title: "Open round · May",
            body: "For students who don't have an idea yet but want to explore entrepreneurship and develop one during the summer.",
          },
        ],
      },
      {
        title: "What you get",
        items: [
          { body: "Weekly check-ins to keep you focused and accountable" },
          { body: "Practical workshops on entrepreneurial and business skills" },
          { body: "Personal mentoring from experienced startup coaches and a dedicated program lead" },
          { body: "Help finding your first customers, and a community of students doing the same" },
        ],
      },
    ],
  },
  {
    slug: "poc-grant",
    name: "Proof of Concept Grant",
    tagline: "Funding for your first test",
    summary:
      "A 2026 pilot with the City of Turku: up to €5,000 for students and researchers to test whether an early business idea can work.",
    status: { label: "2026 applications closed", tone: "closed" },
    photo: photos.keynoteStage,
    facts: [
      { label: "Grant", value: "Up to €5,000 per idea" },
      { label: "2026 budget", value: "€30,000 in total" },
      { label: "Covers", value: "Living costs and PoC expenses" },
      { label: "Funded by", value: "City of Turku" },
    ],
    overview: [
      "A proof of concept is a small, early version of a product or service that shows the idea is feasible and worth pursuing. The goal is to test the key assumptions and get early feedback before you commit to building the whole thing.",
      "The grant covers about two months of living costs for one person, plus the costs of building and testing your proof of concept. €5,000 of the 2026 budget is set aside for the Startup Journey winner, and the rest is awarded through an open call.",
    ],
    blocks: [
      {
        title: "Who can apply",
        items: [
          {
            body: "Students and researchers from Turku's higher education institutions: University of Turku, Åbo Akademi, Turku University of Applied Sciences, Novia and HUMAK.",
          },
          { body: "You need a clear idea, a motivated team and a plan. Being in an incubator or accelerator strengthens your application." },
        ],
      },
      {
        title: "How decisions are made",
        items: [
          {
            body: "A steering group from Business Turku, Boost Turku and Monttu Ventures screens the applications and proposes ideas for funding to the City of Turku.",
          },
          { body: "The grant comes from the City of Turku's RDI voucher system." },
          {
            body: "The grant counts as taxable income and may affect unemployment benefits or other income-based support.",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Who reviews the applications?",
        answer:
          "A pre-screening committee: Elias Savonlahti (Business Turku), Aaron Lindberg (Boost Turku) and Ella Jokipii (Monttu Ventures).",
      },
      {
        question: "Who can I ask about the grant?",
        answer: "Email heta@boostturku.com with any questions about the grant or the application process.",
      },
    ],
  },
];

export function getProgram(slug: string) {
  return programDetails.find((p) => p.slug === slug);
}
