// src/api/apiClient.ts
export interface ApiOptions {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean>;
  body?: any;
}

const BASE_URL = "https://localhost:44368";

function buildQuery(query?: ApiOptions["query"]) {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => params.append(key, String(value)));
  return `?${params.toString()}`;
}

async function request<T>(endpoint: string, method: string, options: ApiOptions = {}): Promise<T> {
  const url = BASE_URL + endpoint + buildQuery(options.query);

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json() as Promise<T>;
  } else {
    return response.text() as Promise<T>;
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: ApiOptions) => request<T>(endpoint, "GET", options),
  post: <T>(endpoint: string, body?: any, options?: ApiOptions) =>
    request<T>(endpoint, "POST", { ...options, body }),
  put: <T>(endpoint: string, body?: any, options?: ApiOptions) =>
    request<T>(endpoint, "PUT", { ...options, body }),
  patch: <T>(endpoint: string, body?: any, options?: ApiOptions) =>
    request<T>(endpoint, "PATCH", { ...options, body }),
  delete: <T>(endpoint: string, options?: ApiOptions) => request<T>(endpoint, "DELETE", options),
};
