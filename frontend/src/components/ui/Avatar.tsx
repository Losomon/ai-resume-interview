export function Avatar({ name, src, size = 36 }: { name: string; src?: string; size?: number }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return src ? <img src={src} alt={name} width={size} height={size} className="rounded-full object-cover" />
    : <span aria-label={name} className="grid place-items-center rounded-full bg-primary/20 text-primary-glow text-xs font-semibold" style={{ width: size, height: size }}>{initials}</span>;
}
