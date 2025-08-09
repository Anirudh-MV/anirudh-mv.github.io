"use client"
import {
  Calendar,
  ExternalLink,
  Github,
  LinkIcon,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Sun,
  Briefcase,
  Phone,
  AudioLines,
  Sparkles,
} from "lucide-react"
import type React from "react"

import Link from "next/link"
import { resume } from "@/data/resume"

function SocialIcon({
  type,
  href,
  label,
}: { type: "github" | "linkedin" | "email" | "website" | "soundcloud" | "magic"; href: string; label?: string }) {
  const common = "size-5"
  const icon =
    type === "github" ? (
      <Github className={common} aria-hidden="true" />
    ) : type === "linkedin" ? (
      <Linkedin className={common} aria-hidden="true" />
    ) : type === "email" ? (
      <Mail className={common} aria-hidden="true" />
    ) : type === "soundcloud" ? (
      <AudioLines className={common} aria-hidden="true" />
    ) : type === "magic" ? (
      <Sparkles className={`${common} text-purple-500 animate-pulse`} aria-hidden="true" />
    ) : (
      <LinkIcon className={common} aria-hidden="true" />
    )
  const finalLabel =
    label ??
    (type === "github"
      ? "GitHub"
      : type === "linkedin"
        ? "LinkedIn"
        : type === "email"
          ? "Email"
          : type === "soundcloud"
            ? "SoundCloud"
            : type === "magic"
              ? "Magic Button"
              : "Website")
  return (
    <Link
      href={href}
      aria-label={finalLabel}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors ${
        type === "magic" ? "hover:border-purple-400 hover:shadow-md hover:shadow-purple-200/50" : ""
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{finalLabel}</span>
    </Link>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border px-2.5 py-1 text-xs">{children}</span>
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              className="h-28 w-28 rounded-full object-cover ring-2 ring-border"
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
              {resume.links?.github ? <SocialIcon type="github" href={resume.links.github} /> : null}
              {resume.links?.linkedin ? <SocialIcon type="linkedin" href={resume.links.linkedin} /> : null}
              {resume.links?.email ? <SocialIcon type="email" href={`mailto:${resume.links.email}`} /> : null}
              {resume.links?.website ? <SocialIcon type="website" href={resume.links.website} label="Website" /> : null}
              {resume.links?.soundcloud ? <SocialIcon type="soundcloud" href={resume.links.soundcloud} /> : null}
              {resume.links?.magic ? <SocialIcon type="magic" href={resume.links.magic} /> : null}
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
  if (!resume.links?.email && !resume.links?.website) return null
  return (
    <Section id="contact" title="Contact">
      <div className="flex flex-wrap items-center gap-2">
        {resume.links?.email ? (
          <Link
            href={`mailto:${resume.links.email}`}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
          >
            <Mail className="size-4" aria-hidden="true" /> {resume.links.email}
          </Link>
        ) : null}
        {resume.links?.website ? (
          <Link
            href={resume.links.website}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
          >
            <LinkIcon className="size-4" aria-hidden="true" /> {resume.links.website.replace(/^https?:\/\//, "")}
          </Link>
        ) : null}
        {resume.links?.phone ? (
          <Link
            href={`tel:${resume.links.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
          >
            <Phone className="size-4" aria-hidden="true" /> {resume.links.phone}
          </Link>
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
          <Briefcase className="size-3.5" aria-hidden="true" />
          <span>Built with v0</span>
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

export default function ClientPage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
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
    </div>
  )
}
