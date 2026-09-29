import type { Metadata } from "next"
import { ContactForm } from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact — Strudel Session Sync",
  description:
    "Get in touch about Strudel Session Sync by sending an email to me@anirudhmv.in.",
}

export default function ContactPage() {
  return <ContactForm />
}