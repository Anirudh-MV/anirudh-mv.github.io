"use client"

import { useState } from "react"
import Link from "next/link"

const CONTACT_EMAIL = "me@anirudhmv.in"

export function ContactForm() {
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const baseSubject = subject.trim() || "Strudel Session Sync — feedback"
    const base = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(baseSubject)}`
    const bodyParts = []
    if (name.trim()) bodyParts.push(`Name: ${name.trim()}`)
    if (message.trim()) bodyParts.push(`\n\n${message.trim()}`)
    if (bodyParts.length > 0) {
      window.location.href = `${base}&body=${encodeURIComponent(bodyParts.join("\n"))}`
    } else {
      window.location.href = base
    }
  }

  const inputClasses =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-xl">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline underline-offset-4"
        >
          ← Back to home
        </Link>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
          Contact Us
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Questions, feedback, or issues with Strudel Session Sync? Fill in the
          form and it will open your email client to{" "}
          <span className="text-foreground">{CONTACT_EMAIL}</span> — nothing is
          submitted to this site.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-lg border p-6"
        >
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-sm font-medium">
              Your name (optional)
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className={inputClasses}
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-subject" className="text-sm font-medium">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className={inputClasses}
              placeholder="Strudel Session Sync — feedback"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Tell me what's on your mind…"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Send via Email
          </button>
        </form>
      </div>
    </div>
  )
}