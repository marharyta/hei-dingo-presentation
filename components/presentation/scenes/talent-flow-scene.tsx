import { ArrowRight, Database, LockKeyhole, PenLine, Radar } from "lucide-react"
import type { SceneProps } from "./scene-types"
import styles from "../presentation.module.css"

const steps = [
  {
    number: "01",
    icon: Database,
    title: "Check your data",
    copy: "See the profile recruiters may already be using.",
  },
  {
    number: "02",
    icon: PenLine,
    title: "Update the record",
    copy: "Correct your role, skills, location and contact details.",
  },
  {
    number: "03",
    icon: Radar,
    title: "Open yourself to opportunities — privately",
    copy: "Signal interest without announcing a public job search.",
  },
] as const

export function TalentFlowScene(_: SceneProps) {
  return (
    <div className={`${styles.scene} ${styles.talentFlowScene}`}>
      <div className={styles.talentFlowHeading}>
        <p className={styles.kicker}>Your Hei Dingo flow</p>
        <h2>Three steps. <em>You stay in control.</em></h2>
      </div>

      <div className={styles.talentFlowSteps}>
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div className={styles.talentFlowItem} key={step.number}>
              <article>
                <header><span>{step.number}</span><Icon aria-hidden /></header>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
              {index < steps.length - 1 ? <ArrowRight className={styles.talentFlowArrow} aria-hidden /> : null}
            </div>
          )
        })}
      </div>

      <div className={styles.talentFlowOutcome}>
        <LockKeyhole aria-hidden />
        <strong>Recruiters contact you.</strong>
        <span>You decide who gets through.</span>
      </div>
    </div>
  )
}
