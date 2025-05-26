import api from './api';

interface LoginRequest {
    username: string;
    email: string;
    password: string;
}

export const login = async (dados: LoginRequest): Promise<String> => {
    return api<String>('/users/login', {
        method: 'POST',
        body: dados,
    });
};