"use client"

import { useState } from "react"
import type { SceneProps } from "./scene-types"
import styles from "../presentation.module.css"

export function IntroScene({ phase, next, goToScene }: SceneProps) {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null)

  const choose = (choice: "yes" | "no") => {
    setAnswer(choice)
    if (choice === "no") window.setTimeout(() => goToScene(1), 360)
  }

  return (
    <div className={`${styles.scene} ${styles.centerScene}`}>
      <p className={styles.kicker}>A quick question</p>
      <h1>Are you looking<br />for a job?</h1>
      <div className={styles.heroActions}>
        <button className={styles.primaryButton} onClick={() => choose("yes")}>Yes</button>
        <button className={styles.secondaryButton} onClick={() => choose("no")}>Not really</button>
      </div>
      {answer === "yes" || phase > 0 ? (
        <button className={styles.answerAside} onClick={next}>
          Great. There are thousands of job boards for you. <span>Continue →</span>
        </button>
      ) : null}
    </div>
  )
}
