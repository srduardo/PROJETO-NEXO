import type { LoginResponse } from "../types/LoginResponse";

const API_BASE_URL = 'http://localhost:8080/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  auth?: boolean;
}

const api = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T | string> => {
  const { method = 'GET', body, headers = {}, auth = false } = options;

  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails: LoginResponse = JSON.parse(userDetailsString!);

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && userDetails.token ? { Authorization: `Bearer ${userDetails.token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro na requisição');
  }

  return response.json ? response.json() : response.text();
};

export default api;