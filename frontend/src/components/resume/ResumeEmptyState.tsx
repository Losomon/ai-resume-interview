import { AIMark, Button } from "@/components/ui";
import { FileText } from "lucide-react";

type Props = {
  onCreate: () => void;
};

export function ResumeEmptyState({ onCreate }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-border bg-card/50 px-6 py-16 text-center">
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-glow-green opacity-70 blur-xl" />
        <AIMark size={56} glow />
      </div>

      <h3 className="text-card text-text">No resumes yet</h3>
      <p className="mt-2 max-w-[320px] text-small text-text-secondary">
        Create your first resume and let CareerForge help you sharpen it.
      </p>

      <Button onClick={onCreate} className="mt-6">
        <FileText size={16} />
        Create Resume
      </Button>
    </div>
  );
}