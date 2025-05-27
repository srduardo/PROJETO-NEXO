import api from './api';
import type { LoginRequest } from '../types/LoginRequest';
import type { LoginResponse } from '../types/LoginResponse';

export const logar = async (dados: LoginRequest): Promise<LoginResponse | string> => {
    return api<LoginResponse>('/users/login', {
        method: 'POST',
        body: dados,
    });
};

export const autenticado = (): boolean => {
    return !!localStorage.getItem('userDetails');
}   

export function getUserDetails(): LoginResponse | undefined {
  const data = localStorage.getItem('userDetails');

  if (data) return JSON.parse(data);
}
