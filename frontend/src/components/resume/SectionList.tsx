import {
  User, Briefcase, GraduationCap, Wrench, FolderGit2,
} from "lucide-react";
import { cn } from "@/utils/cn";

const sections = [
  { id: "profile",    label: "Profile",    icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education",  label: "Education",  icon: GraduationCap },
  { id: "skills",     label: "Skills",     icon: Wrench },
  { id: "projects",   label: "Projects",   icon: FolderGit2 },
] as const;

type SectionListProps = {
  active: string;
  onSelect: (id: string) => void;
};

export function SectionList({ active, onSelect }: SectionListProps) {
  return (
    <nav className="flex flex-col gap-0.5 p-3">
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={cn(
              "group flex items-center gap-3 rounded-button px-3 py-2.5 text-left",
              "text-small font-medium transition-colors duration-card",
              isActive
                ? "bg-primary-tint text-green-deep"
                : "text-text-secondary hover:bg-bg-secondary hover:text-text",
            )}
          >
            <Icon
              size={16}
              className={cn(
                isActive ? "text-primary" : "text-text-muted group-hover:text-text-secondary",
              )}
            />
            {label}
          </button>
        );
      })}
    </nav>
  );
}