export function parseDate(value: string | undefined, format: "DD-MM-YYYY" | "YYYY-MM-DD"): Date | undefined {
  if (!value) return undefined;
  const pattern = format === "YYYY-MM-DD" ? /^(\d{4})-(\d{1,2})-(\d{1,2})$/ : /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  const match = value.match(pattern);
  if (!match) return undefined;
  const parts = match.slice(1).map(Number);
  const [year, month, day] = format === "YYYY-MM-DD" ? parts : [parts[2], parts[1], parts[0]];
  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year, month - 1, day);
  // Date normalizes impossible dates such as 31 February; reject that rollover.
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : undefined;
}
