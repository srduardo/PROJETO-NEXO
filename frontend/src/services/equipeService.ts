import api from './api';
import type { EquipeResponse } from '../types/EquipeResponse';
import type { EquipeRequest } from '../types/EquipeRequest';
import type { MembroResponse } from '../types/MembroResponse';

export const getEquipe = async (squadId: number): Promise<EquipeResponse> => {
    console.log('Get dados equipe')
    return api<EquipeResponse>(`/squads/${squadId}`, {
        method: 'GET',
        auth: true,
    });
};

export const getEquipes = async (userId: number): Promise<EquipeResponse[]> => {
    return api<EquipeResponse[]>(`/collaborations/squad/${userId}`, {
        method: 'GET',
        auth: true,
    });
};

export const apagarEquipe = async (squadId: number | string): Promise<EquipeResponse[]> => {
    return api<EquipeResponse[]>(`/squads/${squadId}/delete`, {
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

export const editarEquipe = async (id: number | string, equipeEditada: EquipeRequest): Promise<EquipeResponse> => {
    return api<EquipeResponse>(`/squads/${id}/update`, {
        method: 'PUT',
        auth: true,
        body: equipeEditada
  });
};

export const getLider = async (idEquipe: number): Promise<MembroResponse> => {
    return api<MembroResponse>(`/collaborations/squad/${idEquipe}/owner`, {
        method: 'GET',
        auth: true,
  });
}



