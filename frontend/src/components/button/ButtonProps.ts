import type { ReactNode } from "react"

export type ButtonProps = {
    width: number | string,
    height: number,
    color?: string,
    mouseDownColor?: string,
    onClick: () => void,
    children: ReactNode,
    colorText?: string
    margin: string | number
}