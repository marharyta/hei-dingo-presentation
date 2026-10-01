"use client"

import { Check, MapPin, Power, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import type { SceneProps } from "./scene-types"
import styles from "../presentation.module.css"

const chips = ["Startups", "Product companies", "React", "TypeScript", "Design systems"]

export function ProfileScene({ phase, next }: SceneProps) {
  const [selected, setSelected] = useState(() => new Set(chips))
  const [active, setActive] = useState(false)

  const toggleChip = (chip: string) => setSelected((current) => {
    const updated = new Set(current)
    if (updated.has(chip)) updated.delete(chip)
    else updated.add(chip)
    return updated
  })

  const activate = () => {
    setActive(true)
    window.setTimeout(next, 500)
  }

  return (
    <div className={`${styles.scene} ${styles.profileScene}`}>
      <div className={styles.profileHeading}>
        <div className={styles.profileIdentity}><p className={styles.kicker}>Your verified profile</p><h2>Lead Engineer</h2><span><MapPin aria-hidden /> Helsinki</span></div>
        <div className={active || phase > 0 ? styles.liveBadge : styles.draftBadge}><i />{active || phase > 0 ? "Discoverable" : "Private draft"}</div>
      </div>
      <div className={styles.profileGrid}>
        <div className={styles.salaryCard}><span>Salary</span><strong>Great salary</strong></div>
        <div className={styles.preferenceCard}><span>Working model</span><div className={styles.segmented}><button className={styles.segmentSelected}>Hybrid</button><button>Remote</button><button>Office</button></div></div>
        <div className={`${styles.preferenceCard} ${styles.chipCard}`}><span>Interested in</span><div>{chips.map((chip) => <button key={chip} onClick={() => toggleChip(chip)} className={selected.has(chip) ? styles.chipSelected : ""}>{selected.has(chip) ? <Check aria-hidden /> : null}{chip}</button>)}</div></div>
        <div className={styles.preferenceCard}><span>Dealbreaker</span><div className={styles.dealbreaker}><SlidersHorizontal aria-hidden /><b>No consulting</b></div></div>
      </div>
      <p className={styles.controlNote}>Accurate, current and private. Recruiters only see it when you choose.</p>
      <button className={active ? styles.activatedButton : styles.activateButton} onClick={activate} disabled={active}>
        {active ? <><Check aria-hidden /> You’re discoverable</> : <><Power aria-hidden /> Make me discoverable</>}
      </button>
    </div>
  )
}
