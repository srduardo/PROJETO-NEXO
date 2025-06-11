import type { UserResponse } from "../types/UserResponse";

const API_BASE_URL = 'http://localhost:8080/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  auth?: boolean;
}

const api = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, headers = {}, auth = false } = options;

  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails: UserResponse = JSON.parse(userDetailsString!);

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && userDetails.jwt ? { Authorization: `Bearer ${userDetails.jwt}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro na requisição');
  }

  if (response.status === 204) {
    return null as T;
  }
  
  return response.json();
};

export default api;