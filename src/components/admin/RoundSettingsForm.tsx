"use client";

import { startTransition, useActionState } from "react";
import { QuestionsEditor } from "@/components/admin/QuestionsEditor";
import { inputClass, labelClass } from "@/components/admin/ui";
import type { Question } from "@/content/applications";
import { saveRound, type SaveRoundState } from "@/lib/admin/actions";
import { cn } from "@/lib/cn";

type RoundSettingsFormProps = {
  round: {
    id: string;
    kind: string;
    title: string;
    intro: string;
    is_published: boolean;
    show_candidates: boolean;
    questions: Question[];
  };
  /** Helsinki wall-clock values for the datetime inputs. */
  opensLocal: string;
  closesLocal: string;
};

export function RoundSettingsForm({ round, opensLocal, closesLocal }: RoundSettingsFormProps) {
  const [state, action, pending] = useActionState<SaveRoundState, FormData>(saveRound, { status: "idle" });
  const isChair = round.kind === "chair";

  return (
    // Submitted by hand instead of <form action>: React resets forms after an action,
    // which would snap the question-type dropdowns back to their first option.
    <form
      className="space-y-10"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => action(data));
      }}
    >
      <input type="hidden" name="id" value={round.id} />
      <input type="hidden" name="kind" value={round.kind} />

      <section className="space-y-4">
        <label className="flex items-start gap-3 border-y border-line py-4">
          <input type="checkbox" name="is_published" defaultChecked={round.is_published} className="mt-1 accent-boost" />
          <span>
            <span className="block text-sm text-ink">Published</span>
            <span className="block text-xs text-ink-muted">
              When on, the form accepts applications between the opening and closing time, and the program page shows an Apply button.
            </span>
          </span>
        </label>

        <div className="grid gap-4 sm:grid-cols-[1fr_12rem_12rem]">
          <label className="block">
            <span className={labelClass}>Title</span>
            <input name="title" defaultValue={round.title} required className={cn(inputClass, "mt-1")} />
          </label>
          <label className="block">
            <span className={labelClass}>Opens (Finnish time)</span>
            <input type="datetime-local" name="opens_at" defaultValue={opensLocal} required className={cn(inputClass, "mt-1")} />
          </label>
          <label className="block">
            <span className={labelClass}>Closes (Finnish time)</span>
            <input type="datetime-local" name="closes_at" defaultValue={closesLocal} required className={cn(inputClass, "mt-1")} />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Introduction shown next to the form (optional, Markdown: **bold**, lists, links)</span>
          <textarea
            name="intro"
            rows={6}
            defaultValue={round.intro}
            placeholder={isChair ? "Timeline, what the role involves, the association meeting date…" : "What happens after applying, key dates…"}
            className={cn(inputClass, "mt-1 h-auto py-2 leading-relaxed")}
          />
        </label>

        {isChair && (
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="show_candidates" defaultChecked={round.show_candidates} className="mt-1 accent-boost" />
            <span>
              <span className="block text-ink">Candidates page</span>
              <span className="block text-xs text-ink-muted">
                Show candidates you approve at /apply/chair/candidates. Only applicants who agreed to be published can be shown.
              </span>
            </span>
          </label>
        )}
      </section>

      <section>
        <h2 className="text-sm font-medium text-ink">Questions</h2>
        <div className="mt-2">
          <QuestionsEditor initial={round.questions} allowPublic={isChair} />
        </div>
      </section>

      <div className="flex items-center gap-4 border-t border-line pt-5">
        <button type="submit" disabled={pending} className="h-9 rounded-sm bg-ink px-4 text-sm text-paper transition-colors hover:bg-ink/85 disabled:opacity-60">
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state.message && <p className={cn("text-sm", state.status === "error" ? "text-boost" : "text-ink-muted")}>{state.message}</p>}
      </div>
    </form>
  );
}
