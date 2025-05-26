import type { ReactNode } from "react"

export type ButtonProps = {
    width: number,
    height: number,
    color: string,
    onClick: () => void,
    children: ReactNode
}