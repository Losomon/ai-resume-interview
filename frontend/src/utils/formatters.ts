export const pct = (n: number) => `${Math.round(n)}%`;
export const shortDate = (d: string | Date) => new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
export const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
