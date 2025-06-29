import type { AceiteRequest } from "../types/AceiteRequest";
import type { ConviteRequest } from "../types/ConviteRequest";
import type { ConviteResponse } from "../types/ConviteResponse";
import type { ErroResponse } from "../types/ErroResponse";
import api from "./api";

export const convidar = async (squadId: number | string, receiverEmail: string): Promise<ConviteResponse | ErroResponse> => {
    const convite: ConviteRequest = {receiverEmail: receiverEmail, squadId: squadId};
    return api<ConviteResponse | ErroResponse>('/invites/send', {
        method: 'POST',
        auth: true,
        body: convite
  });
};  

export const aceitar = async (squadId: number | string): Promise<ConviteResponse> => {
    const solicitacao: AceiteRequest = {squadId: squadId};
    return api<ConviteResponse>(`/invites/accept`, {
        method: 'POST',
        auth: true,
        body: solicitacao
  });
};  