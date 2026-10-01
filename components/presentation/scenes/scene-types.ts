export type SceneProps = {
  phase: number
  next: () => void
  goToScene: (scene: number) => void
}
