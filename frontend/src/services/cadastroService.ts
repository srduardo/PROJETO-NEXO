import api from './api';
import type {UserRequest} from '../types/UserRequest';
import type {UserResponse} from '../types/UserResponse';

export const cadastrar = async (dados: UserRequest): Promise<UserResponse | string> => {
  return api<UserResponse>('/users/register', {
    method: 'POST',
    body: dados,
  });
};