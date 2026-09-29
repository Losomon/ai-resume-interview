export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const minLen = (v: string, n: number) => v.trim().length >= n;
