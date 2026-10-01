import { BellOff } from "lucide-react"
import type { SceneProps } from "./scene-types"
import styles from "../presentation.module.css"

const matches = [
  { company: "Northstar", role: "Senior Product Engineer", salary: "€6,200–€7,000", detail: "Hybrid · Helsinki", score: "94%" },
  { company: "Kindred", role: "Design Systems Lead", salary: "€6,400–€7,200", detail: "Remote · Finland", score: "91%" },
]

export function LifeScene({ phase }: SceneProps) {
  return (
    <div className={`${styles.scene} ${styles.lifeScene}`}>
      <div className={styles.lifeCopy}>
        <h2>{phase === 0 ? "Done." : "Now go back to your life."}</h2>
        <p><BellOff aria-hidden /> No public signal. No nightly job-board ritual.</p>
      </div>
      {phase >= 2 ? <div className={styles.matches}><span>Meanwhile, in Hei Dingo…</span>{matches.map((match) => <article key={match.company}><div><small>Potential match · {match.score}</small><h3>{match.role}</h3><p>{match.company} · {match.detail}</p></div><strong>{match.salary}</strong></article>)}<em>You don’t need more job alerts. <b>You choose who gets through.</b></em></div> : null}
    </div>
  )
}
