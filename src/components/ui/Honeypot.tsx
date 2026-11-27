/**
 * Spam trap: a field people never see or reach with the keyboard. Bots that fill
 * every input fill this one too, and the server quietly ignores their submission.
 */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
