import type { UserRequest } from "../types/UserRequest";
import type { UserResponse } from "../types/UserResponse";
import api from "./api";

export const alterarNome = async (id: number, novoNome: UserRequest): Promise<UserResponse> => {
    return api<UserResponse>(`/users/${id}/update`, {
        method: 'PUT',
        body: novoNome,
        auth: true
    });
};

export const deletarUsuario = async (id: number) => {
    api<Object>(`/users/${id}/delete`, {
        method: 'DELETE',
        auth: true
    });
    
    return;
};

export const pegarUsuario = async (id: number): Promise<UserResponse> => {
    return api<UserResponse>(`/users/${id}`, {
        method: 'GET',
        auth: true
    });
};
