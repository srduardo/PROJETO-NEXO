import type { MembroResponse } from "../types/MembroResponse";
import api from "./api";

export const getMembros = async (squadId: number): Promise<MembroResponse[]> => {
    console.log('Get membros')
    return api<MembroResponse[]>(`/collaborations/member/${squadId}`, {
        method: 'GET',
        auth: true,
    });
};  