import { ArrowUpRight, Check, CircleAlert } from "lucide-react"
import styles from "../presentation.module.css"

const unverifiedRows = [
  { label: "Current role", value: "Junior Software Developer", note: "Three roles out of date" },
  { label: "Employer", value: "Blockbuster", note: "Company closed" },
  { label: "Skills", value: "JavaScript", note: "Current specialist skills missing" },
  { label: "Location", value: "London", note: "Recently relocated" },
  { label: "Availability", value: "Not specified", note: "Opportunity preference missing" },
  { label: "Contact", value: "fairygirl96@yahoo.com", note: "Old inbox" },
] as const

const confirmedRows = [
  { label: "Current role", value: "Senior DevOps Engineer", note: "Experience shapes expectations.", href: "https://doi.org/10.2307/1882010" },
  { label: "Employer", value: "Google", note: "Complete profiles build trust.", href: "https://link.springer.com/article/10.1007/s10869-025-10032-9#Sec3" },
  { label: "Skills", value: "Kubernetes, Terraform, GCP", note: "Specific skills matter.", href: "https://doi.org/10.48550/arxiv.2409.18638" },
  { label: "Location", value: "Dublin", note: "Accurate details shape the record.", href: "https://link.springer.com/article/10.1007/s10869-025-10032-9#Sec3" },
  { label: "Availability", value: "Open to relocate", note: "Missing details lower hireability.", href: "https://link.springer.com/article/10.1007/s10869-025-10032-9#Sec3" },
  { label: "Contact", value: "hello@mydomain.com", note: "Work email data decays quickly.", href: "https://www.cleanlist.ai/blog/2026-01-22-b2b-data-decay-statistics" },
] as const

export function RecruiterRecord() {
  return (
    <div className={styles.recordOverlay}>
      <div className={styles.recordIntro}>
        <div>
          <p className={styles.kicker}>Third-party recruiter tools</p>
          <h2>Recruiters may already have a profile <em>of you.</em></h2>
        </div>
        <div>
          <p>Data-enrichment tools collect your job history, skills, location and contact details from public sources. Those records can be incomplete, outdated or simply wrong. <strong>Hei Dingo lets you update your data and make yourself available to recruiters. They write to you — not the other way around.</strong></p>
          <a href="https://heidingo.com/check/v2#reveal" target="_blank" rel="noreferrer">Access your data <ArrowUpRight aria-hidden /></a>
        </div>
      </div>

      <div className={styles.recordGrid}>
        <article className={styles.recordCard}>
          <header><div><span>Third-party record</span><h3>What a recruiter’s tool may show</h3></div><b className={styles.unverified}><CircleAlert aria-hidden /> Unverified</b></header>
          <div className={styles.recordRows}>{unverifiedRows.map((row) => <div key={row.label}><span>{row.label}</span><strong>{row.value}</strong><small>{row.note}</small></div>)}</div>
          <footer>Incomplete record — no way to correct it</footer>
        </article>

        <article className={`${styles.recordCard} ${styles.confirmedCard}`}>
          <header><div><span>Recruiter record</span><h3>What’s actually true — confirmed by you</h3></div><b className={styles.confirmed}><Check aria-hidden /> Confirmed</b></header>
          <div className={styles.recordRows}>{confirmedRows.map((row) => <div key={row.label}><span>{row.label}</span><strong>{row.value}</strong><a href={row.href} target="_blank" rel="noreferrer" aria-label={`${row.note} Open supporting source`}>{row.note} <ArrowUpRight aria-hidden /></a></div>)}</div>
          <footer><Check aria-hidden /> Current, reachable, ready to be found</footer>
        </article>
      </div>
    </div>
  )
}
