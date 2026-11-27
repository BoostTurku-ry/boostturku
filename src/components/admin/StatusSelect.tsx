"use client";

import { applicationStatuses, statusLabels, type ApplicationStatus } from "@/content/applications";
import { setApplicationStatus } from "@/lib/admin/actions";

/** Status dropdown that saves as soon as it changes. */
export function StatusSelect({ id, status }: { id: string; status: ApplicationStatus }) {
  return (
    <form action={setApplicationStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        aria-label="Application status"
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="h-8 rounded-sm border border-line bg-surface px-2 text-[13px] text-ink outline-none focus:border-ink/40"
      >
        {applicationStatuses.map((s) => (
          <option key={s} value={s}>
            {statusLabels[s]}
          </option>
        ))}
      </select>
    </form>
  );
}

