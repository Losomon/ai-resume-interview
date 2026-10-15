import { Github } from 'lucide-react';
import { Button } from '@/components/ui';

export function SocialAuthOptions() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-bg px-3 text-xs text-text-muted">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="secondary"
          disabled
          className="w-full hover:translate-y-0"
          aria-label="Google sign-in, coming soon"
        >
          <span className="font-semibold text-[#4285F4]" aria-hidden="true">
            G
          </span>
          Google
          <span className="sr-only">Coming soon</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled
          className="w-full hover:translate-y-0"
          aria-label="GitHub sign-in, coming soon"
        >
          <Github size={16} aria-hidden="true" />
          GitHub
          <span className="sr-only">Coming soon</span>
        </Button>
      </div>
      <p className="text-center text-xs text-text-muted">Google and GitHub sign-in coming soon</p>
    </div>
  );
}
