"use client"

import React from "react"
import Link from "next/link"
import {
  Sparkles,
  Moon,
  Sun,
  MapPin,
  Calendar,
  ExternalLink,
  Mail,
  Copy,
  Check
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { resume } from "@/data/resume"
import { SocialItem } from "./typedef"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"

/* ─────────────────────────────────────────────────────────
   Hash-based route hook
   ───────────────────────────────────────────────────────── */

function useHash() {
  const [hash, setHash] = React.useState("")

  React.useEffect(() => {
    const update = () => setHash(window.location.hash)
    update()
    window.addEventListener("hashchange", update)
    return () => window.removeEventListener("hashchange", update)
  }, [])

  return hash
}

/* ─────────────────────────────────────────────────────────
   Mode Switcher Banner — minimal flat bar, always visible
   ───────────────────────────────────────────────────────── */

function ModeSwitcherBanner({ isLegacy }: { isLegacy: boolean }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-7 flex items-center justify-center px-4 border-b text-xs"
      style={{ backgroundColor: isLegacy ? "var(--background)" : "#e8f5e8", borderColor: isLegacy ? "var(--border)" : "#8ab88a" }}
    >
      {isLegacy ? (
        <a
          href="#/"
          className="hover:underline underline-offset-4 text-muted-foreground"
        >
          New Design &rarr;
        </a>
      ) : (
        <a
          href="#/legacy"
          style={{ color: "#2d6b2d" }}
          className="hover:underline underline-offset-4"
        >
          View Legacy Design &rarr;
        </a>
      )}
    </div>
  )
}

/* ═════════════════════════════════════════════════════════
   LEGACY PAGE — current design, completely unchanged
   ═════════════════════════════════════════════════════════ */

function SocialButton({
  socialItem
}: {
  socialItem: SocialItem
}) {
  const { href: linkHref, label, SocialIcon, action, visible } = socialItem
  if (!visible) return null;

  const common = "size-5"

  const isMagic: boolean = SocialIcon === Sparkles

  let icon = <SocialIcon className={common} aria-hidden="true" />;
  if (isMagic) {
    // Handle magic button case
    icon = (
      <SocialIcon
        className={`${common} text-purple-500 animate-pulse`}
        style={{
          animation: "pulse 0.2s linear infinite", // Adjust duration (e.g., 0.5s for faster pulse)
        }}
        aria-hidden="true"
      />
    );
  }

  const finalHref = action ? `${action}:${linkHref}` : linkHref;

  return (
    <Link
      href={finalHref}
      aria-label={label}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors ${
        isMagic ? "hover:border-purple-400 hover:shadow-md hover:shadow-purple-100/90" : ""
      }`}
      target="_blank"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border px-2.5 py-1 text-xs cursor-default">{children}</span>
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function HeaderNav() {
  const links = resume.nav ?? [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ]
  return (
    <header className="sticky top-7 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="#" className="font-medium">
          {resume.name ?? "Your Name"}
        </Link>
        <nav className="hidden sm:flex items-center gap-3">
          {links.map((l) => (
            <a key={l.href} className="text-sm hover:underline underline-offset-4" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="about" className="border-b">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="grid gap-6 md:grid-cols-[140px_1fr] md:gap-8 items-center">
          <div className="mx-auto md:mx-0">
            <img
              src={resume.profile?.imageSrc ?? "/images/profile.png"}
              alt={resume.profile?.imageAlt ?? `${resume.name} profile`}
              className="h-28 w-28 rounded-full object-cover"
            />
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{resume.name}</h1>
            <p className="text-base sm:text-lg text-muted-foreground">{resume.title}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {resume.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden="true" />
                  {resume.location}
                </span>
              ) : null}
              {resume.availability ? (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-4" aria-hidden="true" />
                  {resume.availability}
                </span>
              ) : null}
            </div>
            {resume.summary ? <p className="text-sm sm:text-base">{resume.summary}</p> : null}
            <div className="flex flex-wrap gap-2 pt-2">
              {Object.entries(resume.socials || {}).map(([key, value]) => {
                return (
                  <SocialButton
                    key={key}
                    socialItem={value}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const items = resume.experience ?? []
  if (!items.length) return null
  return (
    <Section id="experience" title="Experience">
      <ul className="grid gap-4">
        {items.map((job) => (
          <li key={`${job.company}-${job.role}`} className="rounded-lg border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-medium">
                {job.role} · {job.company}
              </div>
              <div className="text-xs text-muted-foreground">{job.period}</div>
            </div>
            {job.location ? <div className="text-xs text-muted-foreground mt-1">{job.location}</div> : null}
            {job.description ? <p className="mt-2 text-sm">{job.description}</p> : null}
            {job.highlights?.length ? (
              <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
                {job.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            ) : null}
            {job.tech?.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Projects() {
  const items = resume.projects ?? []
  if (!items.length) return null
  return (
    <Section id="projects" title="Projects">
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((p) => (
          <li key={p.name} className="rounded-lg border p-4 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium">{p.name}</div>
                {p.role ? <div className="text-xs text-muted-foreground mt-0.5">{p.role}</div> : null}
              </div>
              {p.link ? (
                <Link
                  href={p.link}
                  className="inline-flex items-center gap-1 text-sm hover:underline underline-offset-4"
                >
                  Visit <ExternalLink className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
            {p.description ? <p className="mt-2 text-sm flex-1">{p.description}</p> : null}
            {p.stack?.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Skills() {
  const skills = resume.skills ?? []
  if (!skills.length) return null
  return (
    <Section id="skills" title="Skills">
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}
      </div>
    </Section>
  )
}

function Education() {
  const items = resume.education ?? []
  if (!items.length) return null
  return (
    <Section id="education" title="Education">
      <ul className="grid gap-4">
        {items.map((e) => (
          <li key={`${e.school}-${e.degree}`} className="rounded-lg border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-medium">
                {e.degree} · {e.school}
              </div>
              <div className="text-xs text-muted-foreground">{e.period}</div>
            </div>
            {e.details ? <p className="mt-2 text-sm">{e.details}</p> : null}
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Contact() {
  const { toast } = useToast()
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      toast({
        title: "Email copied",
        description: "Email address has been copied to clipboard",
      })
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    }).catch(err => {
      console.error('Failed to copy: ', err)
      toast({
        title: "Failed to copy",
        description: "Could not copy email to clipboard",
        variant: "destructive",
      })
    })
  }

  if (!resume.socials?.email.href && !resume.socials?.website.href) return null
  return (
    <Section id="contact" title="Contact">
      <div className="flex flex-wrap items-center gap-2">
        {resume.socials?.email.href ? (
          <>
            <Link
              href={`mailto:${resume.socials.email.href}`}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
            >
              <Mail className="size-4" aria-hidden="true" /> {resume.socials.email.label}
            </Link>

            <Button
              onClick={() => copyToClipboard(resume.socials.email.href)}
              aria-label="Copy email to clipboard"
              variant="outline"
              size="sm"
              type="button"
            >
              {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            </Button>
          </>
        ) : null}
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-5xl px-4 py-8 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
        <div>
          &copy; {new Date().getFullYear()} {resume.name}. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5" aria-hidden="true" />
          <span>Cleaned up the garbage generated by v0 and Copilot</span>
        </div>
      </div>
    </footer>
  )
}

function SkipLink() {
  return (
    <a
      href="#about"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] rounded bg-primary text-primary-foreground px-3 py-1.5"
    >
      Skip to content
    </a>
  )
}

function ThemeToggle() {
  // Inline here to keep dependencies tiny; minimal JS to toggle the 'dark' class on <html>.
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      data-theme-toggle
      className="inline-flex items-center justify-center rounded-md border p-2 hover:bg-accent transition-colors"
      onClick={() => {
        if (typeof document === "undefined") return
        const el = document.documentElement
        const next = el.classList.contains("dark") ? "light" : "dark"
        el.classList.toggle("dark", next === "dark")
        try {
          localStorage.setItem("theme", next)
        } catch {}
      }}
    >
      <span className="dark:hidden inline-flex items-center gap-1 text-xs">
        <Moon className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Dark</span>
      </span>
      <span className="hidden dark:inline-flex items-center gap-1 text-xs">
        <Sun className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Light</span>
      </span>
    </button>
  )
}

function ThemeScript() {
  // Set initial theme without flicker
  const code = `
  (function(){
    try{
      var t = localStorage.getItem('theme');
      var m = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var final = t || m;
      if(final === 'dark') document.documentElement.classList.add('dark');
    }catch(e){}
  })();`
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}

function LegacyPage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground pt-7">
      <ThemeScript />
      <SkipLink />
      <HeaderNav />
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-10">
        <Hero />
        <div className="grid gap-10">
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

/* ═════════════════════════════════════════════════════════
   SKEUOMORPHIC PAGE — Vista Aero / Aqua + Lime Green
   ═════════════════════════════════════════════════════════ */

function SkeuomorphicStyles() {
  const css = `
    /* ── Palette variables scoped to .skeo-root ── */
    .skeo-root {
      --skeo-bg: #c8e6c8;
      --skeo-bg-alt: #d8ecd8;
      --skeo-header-from: #3a8a3a;
      --skeo-header-to: #1e5a1e;
      --skeo-card-bg: #f2f8f0;
      --skeo-card-border: #8ab88a;
      --skeo-lime: #7dd94e;
      --skeo-lime-dark: #4a9a2e;
      --skeo-aqua-from: #5bcbe8;
      --skeo-aqua-to: #0e7fc0;
      --skeo-text: #1a2a1a;
      --skeo-text-muted: #4a6a4a;
      --skeo-shadow: rgba(0,0,0,0.3);
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      color: var(--skeo-text);
    }
    /* Reset border-color inherited from @layer base { * { @apply border-border } } */
    .skeo-root *,
    .skeo-root *::before,
    .skeo-root *::after {
      border-color: currentColor;
    }

    /* ── Linen diagonal-stripe texture ── */
    .skeo-root {
      background-color: var(--skeo-bg);
      background-image:
        repeating-linear-gradient(
          45deg,
          rgba(255,255,255,0.08) 0px,
          rgba(255,255,255,0.08) 1px,
          transparent 1px,
          transparent 6px
        );
    }

    /* ── Glossy button base ── */
    .skeo-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      border: 1px solid #0a5a8a;
      background: linear-gradient(to bottom, var(--skeo-aqua-from), var(--skeo-aqua-to));
      color: #fff;
      font-weight: 600;
      font-size: 0.875rem;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      box-shadow: 0 1px 0 rgba(255,255,255,0.3) inset, 0 3px 8px rgba(0,0,0,0.25);
      cursor: pointer;
      transition: all 0.15s ease;
      overflow: hidden;
      text-decoration: none;
    }
    .skeo-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%);
      border-radius: 7px 7px 0 0;
      pointer-events: none;
    }
    .skeo-btn:hover {
      background: linear-gradient(to bottom, #6dd8f2, #1890d0);
      box-shadow: 0 1px 0 rgba(255,255,255,0.4) inset, 0 4px 12px rgba(0,0,0,0.3);
    }
    .skeo-btn:active {
      background: linear-gradient(to bottom, var(--skeo-aqua-to), var(--skeo-aqua-from));
      box-shadow: 0 2px 4px rgba(0,0,0,0.4) inset;
    }

    /* ── Green variant button ── */
    .skeo-btn-green {
      border-color: #2d6b1e;
      background: linear-gradient(to bottom, #7dd94e, #4a9a2e);
    }
    .skeo-btn-green:hover {
      background: linear-gradient(to bottom, #90e860, #5ab03a);
    }
    .skeo-btn-green:active {
      background: linear-gradient(to bottom, #4a9a2e, #7dd94e);
    }

    /* ── Card panel ── */
    .skeo-card {
      background: linear-gradient(to bottom, #ffffff 0%, var(--skeo-card-bg) 100%);
      border: 1px solid var(--skeo-card-border);
      border-radius: 12px;
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.9),
        0 4px 12px rgba(0,0,0,0.2),
        0 1px 3px rgba(0,0,0,0.15);
      padding: 1.25rem;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }
    .skeo-card:hover {
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.9),
        0 6px 20px rgba(0,0,0,0.25),
        0 2px 6px rgba(0,0,0,0.15);
      transform: translateY(-1px);
    }

    /* ── Badge pill with gloss ── */
    .skeo-badge {
      display: inline-block;
      position: relative;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      border: 1px solid #2d6b1e;
      background: linear-gradient(to bottom, #90e860 0%, #5ab03a 100%);
      color: #1a3a0a;
      font-size: 0.75rem;
      font-weight: 600;
      text-shadow: 0 1px 0 rgba(255,255,255,0.4);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 3px rgba(0,0,0,0.2);
      overflow: hidden;
    }
    .skeo-badge::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);
      border-radius: 20px 20px 0 0;
      pointer-events: none;
    }

    /* ── Header gloss strip ── */
    .skeo-header {
      background: linear-gradient(to bottom, var(--skeo-header-from), var(--skeo-header-to));
      border-bottom: 2px solid #143a14;
    }
    .skeo-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 45%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
      pointer-events: none;
      z-index: 0;
    }

    /* ── Nav link pill ── */
    .skeo-nav-link {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.85rem;
      border-radius: 6px;
      color: rgba(255,255,255,0.9);
      font-size: 0.8rem;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
      text-decoration: none;
      transition: all 0.15s ease;
      border: 1px solid transparent;
    }
    .skeo-nav-link:hover {
      background: rgba(255,255,255,0.18);
      border-color: rgba(255,255,255,0.25);
      color: #fff;
    }

    /* ── 3D section divider ── */
    .skeo-divider {
      border: none;
      height: 2px;
      background: linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(255,255,255,0.6) 100%);
      margin: 1.5rem 0;
    }

    /* ── Section title with engraved look ── */
    .skeo-section-title {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--skeo-text);
      text-shadow: 0 1px 0 rgba(255,255,255,0.7), 0 -1px 0 rgba(0,0,0,0.1);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid transparent;
      border-image: linear-gradient(to right, var(--skeo-lime), var(--skeo-header-from), transparent) 1;
    }

    /* ── Footer ── */
    .skeo-footer {
      background: linear-gradient(to bottom, var(--skeo-header-to), #0e3a0e);
      border-top: 2px solid #143a14;
      position: relative;
      overflow: hidden;
    }
    .skeo-footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%);
      pointer-events: none;
    }

    /* ── Profile photo ring ── */
    .skeo-avatar {
      border-radius: 50%;
      box-shadow:
        0 0 0 3px #7dd94e,
        0 0 0 6px #2d6b2d,
        0 0 0 8px rgba(255,255,255,0.5),
        0 8px 24px rgba(0,0,0,0.45);
    }

    /* ── Mobile hamburger button ── */
    /* NOTE: display is handled by Tailwind (flex flex-col / sm:hidden) to avoid cascade conflicts */
    .skeo-hamburger {
      gap: 4px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px;
    }
    .skeo-hamburger span {
      display: block;
      width: 20px;
      height: 2px;
      background: rgba(255,255,255,0.9);
      border-radius: 2px;
    }

    /* ── Aqua social link ── */
    .skeo-social-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.35rem 0.75rem;
      border-radius: 8px;
      border: 1px solid #0a5a8a;
      background: linear-gradient(to bottom, var(--skeo-aqua-from), var(--skeo-aqua-to));
      color: #fff;
      font-size: 0.8rem;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      text-decoration: none;
      position: relative;
      overflow: hidden;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 6px rgba(0,0,0,0.25);
      transition: all 0.15s ease;
    }
    .skeo-social-link::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 50%;
      background: linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0));
      border-radius: 7px 7px 0 0;
      pointer-events: none;
    }
    .skeo-social-link:hover {
      background: linear-gradient(to bottom, #6dd8f2, #1890d0);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.3);
    }

    /* ── Purple magic variant ── */
    .skeo-social-link.magic {
      border-color: #6a2c9a;
      background: linear-gradient(to bottom, #c084fc, #7c3aed);
    }
    .skeo-social-link.magic:hover {
      background: linear-gradient(to bottom, #d0a0ff, #8b5cf6);
    }
  `
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

/* ── Skeuomorphic section components ── */

function SkeoSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: "6rem" }}>
      <h2 className="skeo-section-title">{title}</h2>
      <div>{children}</div>
    </section>
  )
}

function SkeoHeader() {
  const links = resume.nav ?? []
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="skeo-header" style={{ position: "sticky", top: "1.75rem", zIndex: 50 }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1rem", height: "3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <a
          href="#"
          style={{ color: "#fff", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontSize: "1.15rem", textShadow: "0 2px 4px rgba(0,0,0,0.4)", textDecoration: "none" }}
        >
          {resume.name ?? "Your Name"}
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center" style={{ gap: "0.25rem" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="skeo-nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="skeo-hamburger flex flex-col sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen ? (
        <nav className="flex flex-col sm:hidden relative z-[1]" style={{ padding: "0 1rem 0.75rem", gap: "0.25rem" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="skeo-nav-link" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}

function SkeoHero() {
  return (
    <section id="about" style={{ padding: "2rem 0" }}>
      <div className="skeo-card" style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <div style={{ display: "grid", gap: "1.5rem", alignItems: "center" }} className="grid-cols-1 md:grid-cols-[140px_1fr]">
          <div style={{ textAlign: "center" }} className="md:text-left">
            <img
              src={resume.profile?.imageSrc ?? "/images/profile.png"}
              alt={resume.profile?.imageAlt ?? `${resume.name} profile`}
              className="skeo-avatar"
              style={{ width: "7rem", height: "7rem", objectFit: "cover", display: "inline-block" }}
            />
          </div>
          <div>
            <h1 style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "1.75rem",
              fontWeight: 700,
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              marginBottom: "0.35rem",
            }}>
              {resume.name}
            </h1>
            <p style={{ color: "var(--skeo-text-muted)", fontSize: "0.95rem", marginBottom: "0.75rem" }}>
              {resume.title}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              {resume.location ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  <MapPin style={{ width: "1rem", height: "1rem" }} aria-hidden="true" />
                  {resume.location}
                </span>
              ) : null}
              {resume.availability ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  <Calendar style={{ width: "1rem", height: "1rem" }} aria-hidden="true" />
                  {resume.availability}
                </span>
              ) : null}
            </div>

            {resume.summary ? (
              <p style={{ fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>{resume.summary}</p>
            ) : null}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.entries(resume.socials || {}).map(([key, value]) => {
                if (!value.visible) return null
                const isMagic = value.SocialIcon === Sparkles
                const Icon = value.SocialIcon
                const finalHref = value.action ? `${value.action}:${value.href}` : value.href
                return (
                  <a
                    key={key}
                    href={finalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`skeo-social-link ${isMagic ? "magic" : ""}`}
                    aria-label={value.label}
                  >
                    <Icon style={{ width: "1rem", height: "1rem" }} aria-hidden="true" />
                    <span className="hidden sm:inline">{value.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkeoExperience() {
  const items = resume.experience ?? []
  if (!items.length) return null
  return (
    <SkeoSection id="experience" title="Experience">
      <div style={{ display: "grid", gap: "1rem" }}>
        {items.map((job) => (
          <div key={`${job.company}-${job.role}`} className="skeo-card">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
              <div style={{ fontWeight: 700, fontFamily: "Georgia, 'Times New Roman', serif" }}>
                {job.role} &middot; {job.company}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--skeo-text-muted)" }}>{job.period}</div>
            </div>
            {job.location ? <div style={{ fontSize: "0.75rem", color: "var(--skeo-text-muted)", marginTop: "0.2rem" }}>{job.location}</div> : null}
            {job.description ? <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", lineHeight: 1.5 }}>{job.description}</p> : null}
            {job.highlights?.length ? (
              <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", listStyleType: "disc", display: "grid", gap: "0.25rem", fontSize: "0.875rem", lineHeight: 1.5 }}>
                {job.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            ) : null}
            {job.tech?.length ? (
              <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {job.tech.map((t) => (
                  <span key={t} className="skeo-badge">{t}</span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </SkeoSection>
  )
}

function SkeoProjects() {
  const items = resume.projects ?? []
  if (!items.length) return null
  return (
    <SkeoSection id="projects" title="Projects">
      <div style={{ display: "grid", gap: "1rem" }} className="grid-cols-1 sm:grid-cols-2">
        {items.map((p) => (
          <div key={p.name} className="skeo-card" style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
              <div>
                <div style={{ fontWeight: 700, fontFamily: "Georgia, 'Times New Roman', serif" }}>{p.name}</div>
                {p.role ? <div style={{ fontSize: "0.75rem", color: "var(--skeo-text-muted)", marginTop: "0.15rem" }}>{p.role}</div> : null}
              </div>
              {p.link ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="skeo-btn skeo-btn-green" style={{ fontSize: "0.75rem", padding: "0.3rem 0.75rem" }}>
                  Visit <ExternalLink style={{ width: "0.85rem", height: "0.85rem" }} aria-hidden="true" />
                </a>
              ) : null}
            </div>
            {p.description ? <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", lineHeight: 1.5, flex: 1 }}>{p.description}</p> : null}
            {p.stack?.length ? (
              <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {p.stack.map((t) => (
                  <span key={t} className="skeo-badge">{t}</span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </SkeoSection>
  )
}

function SkeoSkills() {
  const skills = resume.skills ?? []
  if (!skills.length) return null
  return (
    <SkeoSection id="skills" title="Skills">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {skills.map((s) => (
          <span key={s} className="skeo-badge">{s}</span>
        ))}
      </div>
    </SkeoSection>
  )
}

function SkeoEducation() {
  const items = resume.education ?? []
  if (!items.length) return null
  return (
    <SkeoSection id="education" title="Education">
      <div style={{ display: "grid", gap: "1rem" }}>
        {items.map((e) => (
          <div key={`${e.school}-${e.degree}`} className="skeo-card">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
              <div style={{ fontWeight: 700, fontFamily: "Georgia, 'Times New Roman', serif" }}>
                {e.degree} &middot; {e.school}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--skeo-text-muted)" }}>{e.period}</div>
            </div>
            {e.details ? <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>{e.details}</p> : null}
          </div>
        ))}
      </div>
    </SkeoSection>
  )
}

function SkeoContact() {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(err => {
      console.error("Failed to copy:", err)
    })
  }

  if (!resume.socials?.email.href && !resume.socials?.website.href) return null
  return (
    <SkeoSection id="contact" title="Contact">
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
        {resume.socials?.email.href ? (
          <>
            <a
              href={`mailto:${resume.socials.email.href}`}
              className="skeo-btn"
            >
              <Mail style={{ width: "1rem", height: "1rem" }} aria-hidden="true" />
              {resume.socials.email.label}
            </a>
            <button
              type="button"
              className="skeo-btn skeo-btn-green"
              onClick={() => copyToClipboard(resume.socials.email.href)}
              aria-label="Copy email to clipboard"
            >
              {copied ? (
                <Check style={{ width: "1rem", height: "1rem", color: "#fff" }} />
              ) : (
                <Copy style={{ width: "1rem", height: "1rem" }} />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          </>
        ) : null}
      </div>
    </SkeoSection>
  )
}

function SkeoFooter() {
  return (
    <footer className="skeo-footer" style={{ marginTop: "2.5rem" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "1.25rem 1rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", position: "relative", zIndex: 1 }}>
        <div>
          &copy; {new Date().getFullYear()} {resume.name}. All rights reserved.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Sparkles style={{ width: "0.85rem", height: "0.85rem" }} aria-hidden="true" />
          <span>Skeuomorphic edition &mdash; because glossy buttons spark joy</span>
        </div>
      </div>
    </footer>
  )
}

function SkeuomorphicPage() {
  return (
    <div className="skeo-root" style={{ minHeight: "100dvh", paddingTop: "1.75rem" }}>
      <SkeuomorphicStyles />
      <SkeoHeader />
      <main style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1rem 2rem" }}>
        <SkeoHero />
        <div style={{ display: "grid", gap: "2.5rem" }}>
          <SkeoExperience />
          <SkeoProjects />
          <SkeoSkills />
          <SkeoEducation />
          <SkeoContact />
        </div>
      </main>
      <SkeoFooter />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Default export — hash-based router
   ───────────────────────────────────────────────────────── */

export default function ClientPage() {
  const hash = useHash()
  const isLegacy = hash === "#/legacy"

  return (
    <>
      <ModeSwitcherBanner isLegacy={isLegacy} />
      {isLegacy ? <LegacyPage /> : <SkeuomorphicPage />}
    </>
  )
}
