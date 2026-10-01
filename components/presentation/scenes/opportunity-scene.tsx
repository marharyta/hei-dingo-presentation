import type { SceneProps } from "./scene-types"
import styles from "../presentation.module.css"

const conditions = ["Great salary", "A product you care about", "Remote or hybrid", "A great team", "Real career growth"]

export function OpportunityScene({ phase, goToScene }: SceneProps) {
  return (
    <div className={`${styles.scene} ${styles.opportunityScene}`}>
      <p className={styles.kicker}>But…</p>
      <h2>What if the right company offered you…</h2>
      <div className={styles.conditionStack}>
        {conditions.map((condition, index) => (
          <div key={condition} className={phase > index ? styles.conditionVisible : styles.conditionHidden}>
            <span>{String(index + 1).padStart(2, "0")}</span>{condition}
          </div>
        ))}
      </div>
      {phase >= 6 ? (
        <div className={styles.talkPrompt}>
          <p>Would you talk to them?</p>
          <div><button onClick={() => goToScene(2)}>👀 Maybe</button><button onClick={() => goToScene(2)}>Absolutely</button></div>
        </div>
      ) : <p className={styles.tapHint}>Click or press → to reveal</p>}
    </div>
  )
}
