import api from './api';
import type { EquipeResponse } from '../types/EquipeResponse';
import type { EquipeRequest } from '../types/EquipeRequest';

export const getEquipes = async (userId: number): Promise<EquipeResponse[]> => {
    return api<EquipeResponse[]>(`/squads/user/${userId}`, {
        method: 'GET',
        auth: true,

    });
};

export const apagarEquipe = async (userId: number, squadId: number): Promise<EquipeResponse[]> => {
    return api<EquipeResponse[]>(`/squads/${squadId}/${userId}/delete`, {
        method: 'DELETE',
        auth: true,

    });
};

export const criarEquipe = async (id: number, name: string): Promise<EquipeResponse> => {
    const equipe: EquipeRequest = {id: id, name: name};
    return api<EquipeResponse>(`/squads/${id}/create`, {
        method: 'POST',
        auth: true,
        body: equipe
  });
};

