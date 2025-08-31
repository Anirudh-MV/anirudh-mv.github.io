import { ForwardRefExoticComponent, RefAttributes } from "react"
import { LucideIcon } from "lucide-react"

export interface SocialItem {
  href: string
  label: string
  SocialIcon: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>> | LucideIcon
  action?: string
  visible: boolean
}
