/**
 * Centralized, strongly-typed API client for communicating with the Django REST backend.
 */

const BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
).replace(/\/$/, '');

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  headers?: Record<string, string>;
  token?: string | null;
  skipAuth?: boolean;
}

// Token storage (in-memory with client-side localStorage fallback)
const TOKEN_KEY = 'django_access_token';
const REFRESH_TOKEN_KEY = 'django_refresh_token';

let inMemoryToken: string | null = null;
let inMemoryRefreshToken: string | null = null;

export const tokenStorage = {
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return inMemoryToken || localStorage.getItem(TOKEN_KEY);
    }
    return inMemoryToken;
  },

  setAccessToken(token: string | null): void {
    inMemoryToken = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  },

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return inMemoryRefreshToken || localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return inMemoryRefreshToken;
  },

  setRefreshToken(token: string | null): void {
    inMemoryRefreshToken = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    }
  },

  clearTokens(): void {
    inMemoryToken = null;
    inMemoryRefreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },
};

/**
 * Format endpoint to ensure proper path structure
 */
function buildUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${BASE_URL}${cleanEndpoint}`;
}

/**
 * Core request dispatcher
 */
async function request<T = unknown>(
  endpoint: string,
  options: RequestOptions & { body?: unknown } = {}
): Promise<T> {
  const { headers = {}, token, skipAuth = false, body, ...customConfig } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };

  // Attach JWT Bearer token if available
  if (!skipAuth) {
    const activeToken = token !== undefined ? token : tokenStorage.getAccessToken();
    if (activeToken) {
      requestHeaders['Authorization'] = `Bearer ${activeToken}`;
    }
  }

  const config: RequestInit = {
    ...customConfig,
    headers: requestHeaders,
  };

  if (body !== undefined) {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const url = buildUrl(endpoint);

  let response: Response;
  try {
    response = await fetch(url, config);
  } catch (networkError: unknown) {
    const message = networkError instanceof Error ? networkError.message : 'Network error';
    throw new ApiError(
      message || `Failed to connect to backend server at ${url}`,
      0,
      { originalError: networkError }
    );
  }

  // Handle No Content (204)
  if (response.status === 204) {
    return {} as T;
  }

  let responseData: unknown = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
  } else {
    try {
      responseData = await response.text();
    } catch {
      responseData = null;
    }
  }

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;

    if (responseData && typeof responseData === 'object') {
      const record = responseData as Record<string, unknown>;
      if (typeof record.detail === 'string') {
        errorMessage = record.detail;
      } else if (typeof record.message === 'string') {
        errorMessage = record.message;
      } else if (typeof record.error === 'string') {
        errorMessage = record.error;
      }
    }

    throw new ApiError(errorMessage, response.status, responseData);
  }

  return responseData as T;
}

/**
 * Main API client object
 */
export const api = {
  get<T = unknown>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T = unknown>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'POST', body: data });
  },

  put<T = unknown>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'PUT', body: data });
  },

  patch<T = unknown>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'PATCH', body: data });
  },

  delete<T = unknown>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: 'DELETE' });
  },

  // Token management helpers
  setToken(token: string | null): void {
    tokenStorage.setAccessToken(token);
  },

  getToken(): string | null {
    return tokenStorage.getAccessToken();
  },

  setRefreshToken(token: string | null): void {
    tokenStorage.setRefreshToken(token);
  },

  getRefreshToken(): string | null {
    return tokenStorage.getRefreshToken();
  },

  clearAuth(): void {
    tokenStorage.clearTokens();
  },

  // Built-in JWT Auth integration with Django SimpleJWT endpoints
  auth: {
    async obtainToken(credentials: { username: string; password: string }): Promise<{ access: string; refresh: string }> {
      const tokens = await api.post<{ access: string; refresh: string }>('/auth/token/', credentials, { skipAuth: true });
      if (tokens.access) {
        tokenStorage.setAccessToken(tokens.access);
      }
      if (tokens.refresh) {
        tokenStorage.setRefreshToken(tokens.refresh);
      }
      return tokens;
    },

    async refreshToken(): Promise<{ access: string }> {
      const refresh = tokenStorage.getRefreshToken();
      if (!refresh) {
        throw new ApiError('No refresh token available', 400);
      }
      const data = await api.post<{ access: string }>('/auth/token/refresh/', { refresh }, { skipAuth: true });
      if (data.access) {
        tokenStorage.setAccessToken(data.access);
      }
      return data;
    },

    logout(): void {
      tokenStorage.clearTokens();
    },
  },
};

/**
 * Backwards compatibility helper
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = buildUrl(endpoint);
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(`API Error: ${response.status}`, response.status);
  }

  return response.json();
}

export default api;
