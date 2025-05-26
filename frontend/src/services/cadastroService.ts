import api from './api';

interface CadastroRequest {
    username: string;
    email: string;
    password: string;
}

interface CadastroResponse {
  id: number;
  username: string;
  email: string;
}

export const cadastro = async (dados: CadastroRequest): Promise<CadastroResponse> => {
  return api<CadastroResponse>('/users/register', {
    method: 'POST',
    body: dados,
  });
};