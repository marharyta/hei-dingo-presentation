import Image from "next/image"
import closingGroup from "@/public/pitch/closing-group.jpg"
import qrCode from "@/public/pitch/hei-dingo-qr.png"
import { ArrowUpRight } from "lucide-react"
import type { SceneProps } from "./scene-types"
import styles from "../presentation.module.css"

export function ClosingScene(_: SceneProps) {
  return (
    <div className={`${styles.scene} ${styles.closingScene}`}>
      <Image className={styles.closingPhoto} src={closingGroup} alt="Three professionals moving through the city together" fill sizes="100vw" />
      <div className={styles.closingReveal}><div><span className={styles.brandMark}>D</span><strong>Hei Dingo</strong></div><h1>Let your next job<br /><em>find you.</em></h1><a href="https://heidingo.com/check/v2" target="_blank" rel="noreferrer">See what recruiters see <ArrowUpRight aria-hidden /></a><span>Public data. Private by default. Yours to control.</span></div>
      <a className={styles.closingQr} href="https://heidingo.com/check/v2" target="_blank" rel="noreferrer" aria-label="Open Hei Dingo — scan this QR code or follow the link">
        <Image src={qrCode} alt="QR code for Hei Dingo" sizes="(max-width: 700px) 96px, 180px" />
        <span>Scan to access your data</span>
      </a>
    </div>
  )
}
