import api from './api';
import type {CadastroRequest} from '../types/CadastroRequest';
import type {CadastroResponse} from '../types/CadastroResponse';

export const cadastrar = async (dados: CadastroRequest): Promise<CadastroResponse | string> => {
  return api<CadastroResponse>('/users/register', {
    method: 'POST',
    body: dados,
  });
};