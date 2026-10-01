import type { SceneProps } from "./scene-types"
import styles from "../presentation.module.css"

export function TitleScene(_: SceneProps) {
  return (
    <div className={`${styles.scene} ${styles.titleScene}`}>
      <h1>Hei Dingo</h1>
    </div>
  )
}
