"use client"

import { useCallback, useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Expand, Minimize, StickyNote, X } from "lucide-react"
import { ClosingScene } from "./scenes/closing-scene"
import { IntroScene } from "./scenes/intro-scene"
import { LifeScene } from "./scenes/life-scene"
import { OpportunityScene } from "./scenes/opportunity-scene"
import { ProblemScene } from "./scenes/problem-scene"
import { ProfileScene } from "./scenes/profile-scene"
import { TalentFlowScene } from "./scenes/talent-flow-scene"
import { TitleScene } from "./scenes/title-scene"
import { maxPhases, presenterNotes, sceneNames } from "./presentation-data"
import styles from "./presentation.module.css"

const scenes = [TitleScene, IntroScene, OpportunityScene, ProblemScene, TalentFlowScene, ProfileScene, LifeScene, ClosingScene]

export function Presentation() {
  const [scene, setScene] = useState(0)
  const [phase, setPhase] = useState(0)
  const [notesOpen, setNotesOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const goToScene = useCallback((nextScene: number) => {
    setScene(Math.max(0, Math.min(scenes.length - 1, nextScene)))
    setPhase(0)
  }, [])

  const next = useCallback(() => {
    if (phase < maxPhases[scene]) {
      setPhase((current) => current + 1)
      return
    }
    goToScene(scene + 1)
  }, [goToScene, phase, scene])

  const previous = useCallback(() => {
    if (phase > 0) {
      setPhase((current) => current - 1)
      return
    }
    if (scene > 0) {
      const previousScene = scene - 1
      setScene(previousScene)
      setPhase(maxPhases[previousScene])
    }
  }, [phase, scene])

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen()
    else await document.exitFullscreen()
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isEditable = Boolean(target?.closest("input, textarea, select, [role='slider']"))
      const isInteractive = Boolean(target?.closest("button, a, input, textarea, select, [role='slider']"))
      if (event.key === "ArrowRight" || event.key === " ") {
        if (isEditable || (event.key === " " && isInteractive)) return
        event.preventDefault()
        next()
      } else if (event.key === "ArrowLeft") {
        if (isEditable) return
        event.preventDefault()
        previous()
      } else if (event.key.toLowerCase() === "f") {
        void toggleFullscreen()
      } else if (event.key.toLowerCase() === "n") {
        setNotesOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [next, previous, toggleFullscreen])

  useEffect(() => {
    const handleFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", handleFullscreen)
    return () => document.removeEventListener("fullscreenchange", handleFullscreen)
  }, [])

  const Scene = scenes[scene]

  return (
    <main className={styles.presentation} aria-label="Hei Dingo interactive presentation">
      <header className={styles.chrome}>
        <button className={styles.brand} onClick={() => goToScene(0)} aria-label="Go to first scene">
          <span className={styles.brandMark}>D</span>
          <span>Hei Dingo</span>
        </button>
        <div className={styles.utilityActions}>
          <span className={styles.sceneLabel}>{String(scene + 1).padStart(2, "0")} · {sceneNames[scene]}</span>
          <button className={styles.iconButton} onClick={() => setNotesOpen((open) => !open)} aria-label="Toggle presenter notes" aria-pressed={notesOpen}>
            <StickyNote aria-hidden />
          </button>
          <button className={styles.iconButton} onClick={() => void toggleFullscreen()} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
            {isFullscreen ? <Minimize aria-hidden /> : <Expand aria-hidden />}
          </button>
        </div>
      </header>

      <section className={styles.stage} key={scene} aria-live="polite">
        <Scene phase={phase} next={next} goToScene={goToScene} />
      </section>

      <footer className={styles.navigation}>
        <div className={styles.progress} aria-label={`Scene ${scene + 1} of ${scenes.length}`}>
          {scenes.map((_, index) => (
            <button key={sceneNames[index]} className={index === scene ? styles.progressActive : styles.progressDot} onClick={() => goToScene(index)} aria-label={`Go to scene ${index + 1}: ${sceneNames[index]}`} aria-current={index === scene ? "step" : undefined} />
          ))}
        </div>
        <div className={styles.navButtons}>
          <button onClick={previous} disabled={scene === 0 && phase === 0} aria-label="Previous">
            <ArrowLeft aria-hidden />
          </button>
          <button onClick={next} disabled={scene === scenes.length - 1 && phase === maxPhases[scene]} aria-label="Next">
            <ArrowRight aria-hidden />
          </button>
        </div>
      </footer>

      {notesOpen ? (
        <aside className={styles.notes} aria-label="Presenter notes">
          <div>
            <span>Presenter notes · {scene + 1}/{scenes.length}</span>
            <button onClick={() => setNotesOpen(false)} aria-label="Close presenter notes"><X aria-hidden /></button>
          </div>
          <p>{presenterNotes[scene]}</p>
        </aside>
      ) : null}
    </main>
  )
}
