import type { MouseEventHandler, ReactNode } from "react"

export type ButtonProps = {
    width: number | string,
    height: number,
    color?: string,
    mouseDownColor?: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode,
    colorText?: string,
    margin: string | number,
}