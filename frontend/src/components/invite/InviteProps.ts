import type { ConviteResponse } from "../../types/ConviteResponse"

export type InviteProps = {
    invite: ConviteResponse,
    isVisible: boolean,
    onAccept: () => void,
    onRecuse: () => void,
}