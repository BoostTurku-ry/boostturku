"use client";

import { useState } from "react";
import type { Question, QuestionType } from "@/content/applications";
import { inputClass, labelClass } from "@/components/admin/ui";
import { cn } from "@/lib/cn";

const TYPES: { value: QuestionType; label: string }[] = [
  { value: "short", label: "Short answer" },
  { value: "long", label: "Long answer" },
  { value: "select", label: "Choice" },
  { value: "url", label: "Link" },
  { value: "email", label: "Email" },
  { value: "checkbox", label: "Checkbox" },
];

type Draft = Question & { key: string; optionsText?: string };

let next = 0;
const toDraft = (q: Question): Draft => ({ ...q, key: `q${next++}`, optionsText: q.options?.join("\n") });

/**
 * Edits a round's questions. The list is sent to the server as JSON in a hidden
 * input; the server cleans it (lib/admin/actions.ts parseQuestions).
 */
export function QuestionsEditor({ initial, allowPublic }: { initial: Question[]; allowPublic: boolean }) {
  const [items, setItems] = useState<Draft[]>(() => initial.map(toDraft));

  const update = (key: string, patch: Partial<Draft>) => setItems((list) => list.map((q) => (q.key === key ? { ...q, ...patch } : q)));
  const move = (index: number, by: number) =>
    setItems((list) => {
      const to = index + by;
      if (to < 0 || to >= list.length) return list;
      const copy = [...list];
      [copy[index], copy[to]] = [copy[to], copy[index]];
      return copy;
    });

  const payload = items.map((q) => ({
    id: q.id,
    label: q.label,
    type: q.type,
    required: q.required,
    help: q.help,
    public: q.public,
    options: q.type === "select" ? (q.optionsText ?? "").split("\n").map((o) => o.trim()).filter(Boolean) : undefined,
  }));

  return (
    <div>
      <input type="hidden" name="questions" value={JSON.stringify(payload)} />
      <p className="text-xs text-ink-muted">Name and email are always asked. Answers stay linked to a question even if you rename it.</p>
      <ol className="mt-3 divide-y divide-line border-y border-line">
        {items.map((q, i) => (
          <li key={q.key} className="grid gap-3 py-4 sm:grid-cols-[1.5rem_1fr_auto]">
            <span className="pt-2 text-xs text-ink-muted tabular-nums">{i + 1}</span>
            <div className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-[1fr_10rem]">
                <label className="block">
                  <span className={labelClass}>Question</span>
                  <input className={cn(inputClass, "mt-1")} value={q.label} onChange={(e) => update(q.key, { label: e.target.value })} />
                </label>
                <label className="block">
                  <span className={labelClass}>Type</span>
                  <select className={cn(inputClass, "mt-1")} value={q.type} onChange={(e) => update(q.key, { type: e.target.value as QuestionType })}>
                    {TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {q.type === "select" && (
                <label className="block">
                  <span className={labelClass}>Options, one per line</span>
                  <textarea
                    rows={3}
                    className={cn(inputClass, "mt-1 h-auto py-2")}
                    value={q.optionsText ?? ""}
                    onChange={(e) => update(q.key, { optionsText: e.target.value })}
                  />
                </label>
              )}
              <label className="block">
                <span className={labelClass}>Help text (optional)</span>
                <input className={cn(inputClass, "mt-1")} value={q.help ?? ""} onChange={(e) => update(q.key, { help: e.target.value })} />
              </label>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={q.required} onChange={(e) => update(q.key, { required: e.target.checked })} className="accent-boost" />
                  Required
                </label>
                {allowPublic && (
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={Boolean(q.public)} onChange={(e) => update(q.key, { public: e.target.checked })} className="accent-boost" />
                    Show on candidates page
                  </label>
                )}
              </div>
            </div>
            <div className="flex gap-1 text-xs sm:flex-col sm:items-end">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="px-1 text-ink-muted hover:text-ink disabled:opacity-30">
                ↑ Up
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="px-1 text-ink-muted hover:text-ink disabled:opacity-30">
                ↓ Down
              </button>
              <button type="button" onClick={() => setItems((list) => list.filter((x) => x.key !== q.key))} className="px-1 text-boost hover:underline">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => setItems((list) => [...list, toDraft({ id: "", label: "", type: "short", required: false })])}
        className="mt-3 text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
      >
        + Add a question
      </button>
    </div>
  );
}
