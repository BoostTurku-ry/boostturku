import { TelegramIcon, WhatsAppIcon } from "@/components/brand/SocialIcons";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type CommunityButtonsProps = {
  /** "light" for regular backgrounds, "dark" for night sections. */
  tone?: "light" | "dark";
  size?: "md" | "lg";
  /**
   * "secondary": Telegram as an outline button (when it's the only other action).
   * "tertiary": both as text buttons, next to an existing primary and secondary pair.
   */
  emphasis?: "secondary" | "tertiary";
  className?: string;
};

/** Telegram channel and WhatsApp community. Never louder than the page's primary action. */
export function CommunityButtons({ tone = "light", size = "md", emphasis = "secondary", className }: CommunityButtonsProps) {
  const { telegram, whatsapp } = site.community;
  const quiet = tone === "dark" ? "ghostDark" : "ghost";
  const outline = tone === "dark" ? "ghostLight" : "outline";
  const icon = size === "lg" ? "size-[18px]" : "size-4";
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <ButtonLink href={telegram.href} variant={emphasis === "secondary" ? outline : quiet} size={size} className="flex-1 sm:flex-none">
        <TelegramIcon className={icon} />
        {emphasis === "secondary" ? `Join our ${telegram.label}` : telegram.label}
      </ButtonLink>
      <ButtonLink href={whatsapp.href} variant={quiet} size={size} className="flex-1 sm:flex-none">
        <WhatsAppIcon className={icon} />
        {whatsapp.label}
      </ButtonLink>
    </div>
  );
}
