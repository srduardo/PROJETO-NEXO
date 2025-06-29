import type { MembroResponse } from "../types/MembroResponse";
import api from "./api";

export const getMembros = async (squadId: number): Promise<MembroResponse[]> => {
    console.log('Get membros')
    return api<MembroResponse[]>(`/collaborations/member/${squadId}`, {
        method: 'GET',
        auth: true,
    });
}; 

export const getMembro = async (squadId: number, userId: number): Promise<MembroResponse> => {
    return api<MembroResponse>(`/collaborations/member/${squadId}/${userId}`, {
        method: 'GET',
        auth: true,
    });
};  

export const excluirMembro = async (squadId: number, userId: number): Promise<MembroResponse> => {
    return api<MembroResponse>(`/collaborations/member/${squadId}/${userId}/delete`, {
        method: 'DELETE',
        auth: true,
    });
};  