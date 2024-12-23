import axiosInstance from "@/config/apiConfig";
import { AxiosRequestConfig, Method } from "axios";

async function request<T>(
  method: Method,
  endpoint: string,
  data?: any,
  params?: any,
  headers?: any
): Promise<T> {
  const request: AxiosRequestConfig = {
    method,
    url: endpoint,
    data,
    params,
    headers: { ...headers, authorization: localStorage.getItem(`authToken`) },
  };

  console.log("request", request);
  try {
    const response = await axiosInstance.request<T>(request);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function fetchData<T>(endpoint: string, params?: any, headers?: any): Promise<T> {
  return request<T>("get", endpoint, undefined, params, headers);
}

export async function sendData<T>(endpoint: string, data: any, headers?: any): Promise<T> {
  return request<T>("post", endpoint, data, undefined, headers);
}

export async function updateItem<T>(endpoint: string, data: any, headers?: any): Promise<T> {
  return request<T>("put", endpoint, data, undefined, headers);
}

export async function patchItem<T>(endpoint: string, params?: any, headers?: any): Promise<T> {
  return request<T>("patch", endpoint, undefined, params, headers);
}

export async function deleteItem<T>(endpoint: string, id?: string, headers?: any): Promise<T> {
  return request<T>("delete", id ? `${endpoint}/${id}` : endpoint, undefined, undefined, headers);
}
