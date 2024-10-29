// src/services/api.ts
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  CancelTokenSource,
  InternalAxiosRequestConfig,
} from "axios";
import createAxiosInstance from "../utils/axiosInstance";
import { LRUCache } from "lru-cache";

// 自定义错误处理函数
const customHandleError = (error: AxiosError): AxiosError => {
  console.error("Custom Error:", error);
  return error;
};

// 自定义 Token 刷新函数
const customRefreshToken = async (): Promise<string> => {
  // 自定义的 Token 刷新逻辑
  return "custom_new_token";
};

// 自定义请求拦截器
const customRequestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  console.log("Custom Request Interceptor:", config);
  return config;
};

// 自定义响应拦截器
const customResponseInterceptor = (response: AxiosResponse): AxiosResponse => {
  console.log("Custom Response Interceptor:", response);
  return response;
};

// 创建自定义的 axios 实例
const axiosInstance = createAxiosInstance({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: { "Custom-Header": "CustomValue" },
  handleError: customHandleError,
  refreshToken: customRefreshToken,
  requestInterceptors: [customRequestInterceptor],
  responseInterceptors: [customResponseInterceptor],
  showProgress: true,
});

// 缓存配置
const cache = new LRUCache<string, AxiosResponse>({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
});

// 扩展 AxiosRequestConfig 接口
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  cache?: boolean;
  retry?: number;
  retryDelay?: number;
}

// 通用请求函数
const request = async (
  method: AxiosRequestConfig["method"],
  url: string,
  data: any = null,
  config: CustomAxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  const cacheKey = `${method}:${url}:${JSON.stringify(data)}`;
  if (config.cache && cache.has(cacheKey)) {
    return cache.get(cacheKey) as AxiosResponse;
  }

  const makeRequest = async (retryCount: number): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance({
        method,
        url,
        data,
        ...config,
      });
      if (config.cache) {
        cache.set(cacheKey, response);
      }
      return response;
    } catch (error) {
      if (retryCount > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, config.retryDelay || 1000)
        );
        return makeRequest(retryCount - 1);
      }
      customHandleError(error as AxiosError);
      throw error;
    }
  };

  return makeRequest(config.retry || 0);
};

export const getRequest = async (
  url: string,
  config: CustomAxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("get", url, null, config);
};

export const postRequest = async (
  url: string,
  data: any,
  config: CustomAxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("post", url, data, config);
};

export const putRequest = async (
  url: string,
  data: any,
  config: CustomAxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("put", url, data, config);
};

export const deleteRequest = async (
  url: string,
  config: CustomAxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("delete", url, null, config);
};

export const patchRequest = async (
  url: string,
  data: any,
  config: CustomAxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("patch", url, data, config);
};

// 请求取消功能
export const createCancelToken = (): CancelTokenSource => {
  const source = axios.CancelToken.source();
  return source;
};
