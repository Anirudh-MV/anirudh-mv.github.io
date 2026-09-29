import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Strudel Session Sync",
  description:
    "Privacy policy for Strudel Session Sync: the extension collects no data, never pings a home server, and only talks to the Supabase project URL you provide in settings.",
}

function Policy() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline underline-offset-4"
        >
          ← Back to home
        </Link>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Strudel Session Sync &middot; Last updated: September 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed">
          <section className="rounded-lg border p-5">
            <h2 className="text-base font-semibold mb-2">We Collect No Data</h2>
            <p>
              Strudel Session Sync does not collect, store, transmit, or share
              any personal data. There is no analytics, no tracking, no
              telemetry, and no account system. The extension simply has no
              feature that phones home to any server owned or operated by the
              developer.
            </p>
          </section>

          <section className="rounded-lg border p-5">
            <h2 className="text-base font-semibold mb-2">
              How the Extension Works
            </h2>
            <p>
              The extension&apos;s only network activity is a direct connection
              between two parties that you explicitly configure:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>
                The <strong>strudel.cc</strong> web page (where your live-coding
                sessions live), and
              </li>
              <li>
                The <strong>Supabase project URL</strong> that you personally
                provide in the extension&apos;s settings.
              </li>
            </ul>
            <p className="mt-3">
              Your session data flows only from your browser to that specific
              Supabase backend. Nothing is ever sent to, or read from, any other
              server — including this website and any server the developer
              controls.
            </p>
          </section>

          <section className="rounded-lg border p-5">
            <h2 className="text-base font-semibold mb-2">Your Data Stays Yours</h2>
            <p>
              Because you supply your own Supabase URL and API key, the data you
              sync is stored on your own Supabase project. The developer has no
              access to it, cannot read it, and cannot recover it. Since nothing
              is collected, there is nothing to delete, export, or correct under
              data-privacy law.
            </p>
          </section>

          <section className="rounded-lg border p-5">
            <h2 className="text-base font-semibold mb-2">Contact</h2>
            <p>
              If you have any questions about this policy, you can reach out via
              the{" "}
              <Link
                href="/strudel-session-sync/contact-us"
                className="text-foreground hover:underline underline-offset-4"
              >
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  return <Policy />
}