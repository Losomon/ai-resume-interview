import { Search } from "lucide-react";
import { AIMark, Badge, ThemeToggle } from "@/components/ui";
import { NotificationBell } from "./NotificationBell";
import { AccountMenu } from "./AccountMenu";
import { cn } from "@/utils/cn";

type TopbarProps = {
  title?: string;
};

export function Topbar({ title }: TopbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 h-[72px]",
        "border-b border-border bg-bg/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center gap-4 px-6 lg:px-10">
        <div className="flex items-center gap-2 lg:hidden">
          <AIMark size={22} />
          <span className="text-[15px] font-semibold text-text">CareerForge</span>
        </div>

        {title && (
          <h1 className="hidden text-[15px] font-semibold text-text lg:block">
            {title}
          </h1>
        )}

        <div className="ml-auto hidden h-10 w-[280px] items-center gap-2 rounded-button border border-border bg-card px-3 text-small text-text-muted transition-colors duration-card hover:border-border-hover md:flex lg:w-[320px]">
          <Search size={16} strokeWidth={2} className="shrink-0" />
          <span className="flex-1">Search anything</span>
          <Badge tone="neutral" className="text-[10px]">⌘K</Badge>
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <NotificationBell />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}