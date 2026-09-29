export const PageHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
  <header className="flex items-end justify-between gap-4 mb-8"><div><h1 className="text-[30px] font-semibold text-ink tracking-tight">{title}</h1>{subtitle && <p className="mt-1">{subtitle}</p>}</div>{action}</header>
);
