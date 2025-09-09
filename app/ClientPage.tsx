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
          <div className="flex items-center group relative">
            <div className="absolute inset-0 rounded-md border-2 border-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Link
              href={`mailto:${resume.socials.email.href}`}
              className="inline-flex items-center gap-2 rounded-l-md border border-r-0 px-3 py-1.5 text-sm hover:bg-accent transition-colors relative z-10"
            >
              <Mail className="size-4" aria-hidden="true" /> {resume.socials.email.label}
            </Link>
            
            <Button
              onClick={() => copyToClipboard(resume.socials.email.href)}
              className="inline-flex items-center gap-2 rounded-l-md border border-r-0 px-3 py-1.5 text-sm hover:bg-accent transition-colors relative z-10"
              aria-label="Copy email to clipboard"
              variant="outline"
              size="sm"
              type="button"
            >
              {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            </Button>
          </div>
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
      <Toaster />
    </div>
  )
}
