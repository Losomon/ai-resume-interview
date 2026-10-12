import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIMark, Button, ThemeToggle } from '@/components/ui';
import { useScrollY } from '@/hooks/useScrollY';
import { cn } from '@/utils/cn';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Job Match', href: '#jobs' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const scrolled = useScrollY(20);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 h-[72px]',
          'transition-all duration-300',
          scrolled
            ? 'border-b border-border bg-bg/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center gap-6 px-6 lg:px-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <AIMark size={26} />
            <span className="text-[17px] font-semibold tracking-tight text-text">
              CareerForge
              <span className="text-primary">.AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-button px-3 py-2 text-small font-medium text-text-secondary transition-colors duration-card hover:bg-bg-secondary hover:text-text"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            <Link
              to="/login"
              className="hidden rounded-button px-3 py-2 text-small font-medium text-text-secondary transition-colors duration-card hover:text-text lg:inline-flex"
            >
              Sign In
            </Link>
            <Link to="/register" className="hidden lg:inline-flex">
              <Button>Get Started Free</Button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-button text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 border-b border-border bg-bg/95 backdrop-blur-md lg:hidden"
          >
            <nav className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-button px-3 py-2.5 text-small font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text"
                >
                  {l.label}
                </a>
              ))}

              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full">Get Started Free</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
