import { cn } from "@/lib/cn";

type ContactIconsProps = {
  name: string;
  email?: string;
  linkedin?: string;
  className?: string;
};

const badge =
  "grid size-7 place-items-center rounded-md text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-offset-2";

/** A person's email and LinkedIn as small square coloured icon buttons: Boost red for mail, LinkedIn blue for LinkedIn. */
export function ContactIcons({ name, email, linkedin, className }: ContactIconsProps) {
  if (!email && !linkedin) return null;
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {email && (
        <a href={`mailto:${email}`} aria-label={`Email ${name} (${email})`} title={email} className={cn(badge, "bg-boost")}>
          <svg aria-hidden viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
          </svg>
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          title="LinkedIn"
          className={cn(badge, "bg-[#0a66c2]")}
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4v-11Z" />
          </svg>
        </a>
      )}
    </div>
  );
}
