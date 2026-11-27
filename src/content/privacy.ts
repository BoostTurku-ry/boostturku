import { site } from "./site";

/**
 * Privacy documents. Section bodies are Markdown (rendered on the server).
 *
 * TODO(boost) before launch:
 * - When the forms are connected, name the services that receive submissions
 *   (e.g. the email provider or Google Workspace) in the "Who can see it" sections.
 * - Review both documents whenever data handling changes, and update `updated`.
 */

export type LegalSection = { id: string; title: string; body: string };

export type LegalDocument = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export const controller = {
  name: site.legalName,
  businessId: site.businessId as string | null,
  address: `${site.address.street}, ${site.address.city}, Finland`,
  email: site.email,
};

const controllerBlock = [
  `**${controller.name}**`,
  controller.businessId ? `Business ID ${controller.businessId}` : null,
  controller.address,
  `[${controller.email}](mailto:${controller.email})`,
]
  .filter(Boolean)
  .join("  \n");

const rights = `You have the right to:

- **Access** the personal data we hold about you and get a copy of it.
- **Correct** data that is wrong or out of date.
- **Erase** your data when there is no longer a reason for us to keep it.
- **Restrict** how we use your data while a question about it is being resolved.
- **Object** to processing based on our legitimate interest, including any use for communications.
- **Data portability**: receive data you gave us in a common, machine-readable format.
- **Withdraw consent** at any time, where we rely on consent. This doesn't affect processing that happened before.

To use any of these rights, email [${site.email}](mailto:${site.email}). We may ask you to confirm your identity, and we reply within one month.

If you think we handle your data unlawfully, you can complain to the Office of the Data Protection Ombudsman in Finland ([tietosuoja.fi](https://tietosuoja.fi/en)). We'd appreciate the chance to sort it out with you first.`;

export const privacyPolicy: LegalDocument = {
  slug: "privacy",
  eyebrow: "Privacy",
  title: "Privacy policy",
  intro:
    "How Boost Turku ry handles personal data on this website, in messages you send us and at our events. In short: we collect as little as we can, never sell it, and don't track you around the web.",
  updated: "27 November 2026",
  sections: [
    {
      id: "controller",
      title: "Who is responsible",
      body: `The controller of the personal data described here is:

${controllerBlock}

Boost Turku ry is a non-profit, student-run entrepreneurship society. Questions about privacy go to the board at the email address above.`,
    },
    {
      id: "website",
      title: "Visiting the website",
      body: `You can browse the whole site without giving us any personal data.

Like any website, the server that delivers these pages automatically processes technical information about each request: your IP address, browser and device type, the page requested and the time. This is needed to deliver the site and keep it secure, and it is kept only for a limited time for security and troubleshooting. We don't use it to identify visitors.

**Legal basis:** our legitimate interest in running a working, secure website (GDPR Art. 6(1)(f)).`,
    },
    {
      id: "cookies",
      title: "Cookies and local storage",
      body: `This website does **not** use cookies, analytics, advertising or tracking pixels, so there is no cookie banner.

The site stores one small setting in your browser's local storage: your light or dark theme choice (\`boost-theme\`). It never leaves your device, and you can clear it in your browser settings at any time.

Fonts and images are served from our own website, so your browser doesn't contact font or image services while you browse.`,
    },
    {
      id: "contact",
      title: "When you contact us",
      body: `When you use the contact form or email us, we receive your **name, email address, the topic you choose and your message**.

We use these only to read and answer your message, and to follow up on what you asked about (for example a partnership or speaking at an event). We don't add you to mailing lists.

**Legal basis:** our legitimate interest in answering people who contact us (GDPR Art. 6(1)(f)).

**How long we keep it:** we delete messages once the matter is handled, at the latest 12 months after the conversation ends, unless they're part of an ongoing collaboration.`,
    },
    {
      id: "membership",
      title: "Becoming a member",
      body: `When you join Boost through the membership form, your details are added to our member register. How we handle member data is described in its own notice: [Member register privacy notice](/privacy/members).`,
    },
    {
      id: "events",
      title: "Events and registration",
      body: `Our events are published on [lu.ma](https://lu.ma/boost). If you register for an event there, Luma processes your registration under [its own privacy policy](https://luma.com/privacy-policy), and as the organiser we see the details you give in the registration (typically your name and email) so we can run the event. We use them only for that event and related practical messages.

Links to Instagram, LinkedIn, Facebook, Telegram and other services take you to those platforms, which handle your data under their own policies.`,
    },
    {
      id: "photos",
      title: "Photos at our events",
      body: `We photograph and film many of our events and share the pictures on this website and on our social media channels, because showing what happens at Boost is how new students find us. Photos are mainly of groups, audiences and speakers.

**Legal basis:** our legitimate interest in communicating about our activities (GDPR Art. 6(1)(f)).

If you'd rather not be photographed, tell the photographer or an organiser at the event. If you'd like a photo of you removed from our website or channels, email [${site.email}](mailto:${site.email}) with a link or description and we'll take it down.`,
    },
    {
      id: "sharing",
      title: "Who can see your data",
      body: `Only the Boost board and volunteers who need it for their role can access personal data. We never sell or rent personal data.

We use trusted service providers to run the website, email and file storage. They process data only on our behalf and under data processing agreements. Some of them may process data outside the EU/EEA; in that case the transfer is protected by safeguards required by the GDPR, such as the European Commission's standard contractual clauses.`,
    },
    {
      id: "security",
      title: "Keeping it safe",
      body: `Access to personal data is limited to the people who need it, accounts are protected with personal credentials, and we review access when board members change at the end of each term.`,
    },
    { id: "rights", title: "Your rights", body: rights },
    {
      id: "changes",
      title: "Changes to this policy",
      body: `We update this policy when the way we handle data changes. The date at the top shows the latest version.`,
    },
  ],
};

export const memberNotice: LegalDocument = {
  slug: "privacy/members",
  eyebrow: "Privacy · Members",
  title: "Member register privacy notice",
  intro:
    "Boost Turku ry keeps a register of its members, as every Finnish registered association must. This notice explains what goes into it, why, and how long it stays there.",
  updated: "27 November 2026",
  sections: [
    {
      id: "controller",
      title: "Controller and contact",
      body: `${controllerBlock}

The board of Boost Turku ry is responsible for the member register. Contact it at the email address above.`,
    },
    {
      id: "register",
      title: "Name of the register",
      body: `Member register of Boost Turku ry.`,
    },
    {
      id: "data",
      title: "What we collect",
      body: `When you join through the membership form we collect:

- **Full name**
- **Email address**
- **Where you study** (or that you aren't a student)
- **What you're interested in** at Boost, if you choose any (events, programs, volunteering, joining the board)
- **The date you joined**, and later the date your membership ends

We don't ask for your home address, phone number, date of birth or student number.`,
    },
    {
      id: "purpose",
      title: "Why we collect it",
      body: `- **Keeping the member register** that the Finnish Associations Act (yhdistyslaki) requires every registered association to maintain.
- **Running the association:** inviting members to association meetings and elections, and confirming who may vote and stand for the board.
- **Telling members about Boost:** news about events, programs and volunteering, matched to the interests you picked. You can opt out of these messages at any time and stay a member.
- **Reporting to funders:** we may report member numbers and the share of members by school to our partners. These reports are statistics only and never name anyone.`,
    },
    {
      id: "basis",
      title: "Legal basis",
      body: `- Keeping the member register is a **legal obligation** under the Associations Act (GDPR Art. 6(1)(c)).
- Handling the rest of your membership, such as meeting invitations, is necessary for your **membership of the association** (GDPR Art. 6(1)(b)).
- Messages about Boost activities are based on your **consent** given in the form, and our legitimate interest in keeping members informed (GDPR Art. 6(1)(a) and (f)).`,
    },
    {
      id: "source",
      title: "Where the data comes from",
      body: `From you, through the membership form or when you otherwise ask to join or update your details.`,
    },
    {
      id: "sharing",
      title: "Who can see it",
      body: `The board of Boost Turku ry and the volunteers who need it for their role. Member data is **not sold, rented or handed to sponsors or partners**.

The register is stored with service providers who process it on our behalf under data processing agreements. If any of them process data outside the EU/EEA, the transfer is protected by the safeguards the GDPR requires, such as standard contractual clauses.

Under the Associations Act, members may have the right to see the member register in connection with association matters.`,
    },
    {
      id: "retention",
      title: "How long we keep it",
      body: `For as long as you're a member. You can leave at any time by emailing [${site.email}](mailto:${site.email}).

When a membership ends we remove the person's details from the register within 12 months. Association records that must be kept, such as signed meeting minutes, may still include names where that is part of the record.`,
    },
    {
      id: "security",
      title: "How the register is protected",
      body: `The register is kept in access-controlled digital systems. Only people who need it for their Boost role can open it, each with their own credentials, and access is reviewed whenever the board changes. No paper copies are kept.`,
    },
    { id: "rights", title: "Your rights", body: rights },
  ],
};
