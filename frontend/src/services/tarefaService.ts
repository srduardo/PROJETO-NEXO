import type { TarefaRequest } from "../types/TarefaRequest";
import type { TarefaResponse } from "../types/TarefaResponse";
import api from "./api";

export const getTarefas = async (userId: number, squadId: number): Promise<TarefaResponse[]> => {
    return api<TarefaResponse[]>(`/tasks/${squadId}/${userId}`, {
        method: 'GET',
        auth: true,
    });
};  

export const criarTarefa = async (userId: number, squadId: number, task: TarefaRequest): Promise<TarefaResponse> => {
    return api<TarefaResponse>(`/tasks/${squadId}/${userId}/create`, {
        method: 'POST',
        auth: true,
        body: task
  });
};

export const apagarTarefa = async (taskId: number): Promise<TarefaResponse> => {
    return api<TarefaResponse>(`/tasks/${taskId}/delete`, {
        method: 'DELETE',
        auth: true,
  });
};

export const atualizarTarefa = async (taskId: number, task: TarefaRequest): Promise<TarefaResponse> => {
    return api<TarefaResponse>(`/tasks/${taskId}/update`, {
        method: 'PUT',
        auth: true,
        body: task,
  });
};