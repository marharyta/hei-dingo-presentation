import Image from "next/image"
import talentAlone from "@/public/pitch/talent-alone.jpg"
import { BriefcaseBusiness, FileText, Link, Search, UserRound, X } from "lucide-react"
import type { SceneProps } from "./scene-types"
import { RecruiterRecord } from "./recruiter-record"
import styles from "../presentation.module.css"

const steps = [
  [Link, "LinkedIn"], [Search, "Job board"], [Search, "Another job board"],
  [FileText, "50 job descriptions"], [BriefcaseBusiness, "Applications"], [FileText, "Forms"], [X, "Unfortunately…"],
] as const

export function ProblemScene({ phase }: SceneProps) {
  return (
    <div className={`${styles.scene} ${styles.problemScene}`}>
      <div className={styles.personCard}>
        <Image src={talentAlone} alt="A professional sitting alone in the city" fill sizes="(max-width: 760px) 9rem, 24vw" />
        <div><UserRound aria-hidden /><strong>Skilled professional</strong><span>Already has a job</span></div>
      </div>
      <div className={styles.problemFlow}>
        {steps.map(([Icon, label], index) => phase > index ? (
          <div key={label} className={styles.problemStep} style={{ "--step": index } as React.CSSProperties}><Icon aria-hidden /><span>{label}</span></div>
        ) : null)}
      </div>
      {phase === 7 ? <div className={styles.freeze}><span>YOUR CAREER DATA ALREADY EXISTS.</span><h2>Where does your data end up?</h2><p>And who gets to decide whether it’s accurate?</p></div> : null}
      {phase >= 8 ? <RecruiterRecord /> : null}
    </div>
  )
}
