import type { LoginResponse } from "../types/LoginResponse";
import api from "./api";

export const alterarNome = async (id: number, novoNome: string | LoginResponse): Promise<LoginResponse | string> => {
    return api<string>(`/users/${id}/update`, {
        method: 'PUT',
        body: novoNome,
        auth: true
    });
};