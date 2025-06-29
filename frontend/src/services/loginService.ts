import api from './api';
import type { UserRequest } from '../types/UserRequest';
import type { UserResponse } from '../types/UserResponse';

export const logar = async (dados: UserRequest): Promise<UserResponse> => {
    console.log('1');
    return api<UserResponse>('/users/login', {
        method: 'POST',
        body: dados,
    });
};

export const autenticado = (): boolean => {
    return !!localStorage.getItem('userDetails');
}   

export function getUserDetails(): UserResponse {
  const data = localStorage.getItem('userDetails')!;
  const dataJson: UserResponse = JSON.parse(data);

  return dataJson;
}

export function getJwt(): string | null {
    const user: UserResponse = getUserDetails();
    return user.jwt;
}
