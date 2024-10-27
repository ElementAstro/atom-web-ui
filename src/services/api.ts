// src/services/api.ts
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  CancelTokenSource,
  InternalAxiosRequestConfig,
} from "axios";
import createAxiosInstance from "../utils/axiosInstance";

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

// 通用请求函数
const request = async (
  method: AxiosRequestConfig["method"],
  url: string,
  data: any = null,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      ...config,
    });
    return response;
  } catch (error) {
    customHandleError(error as AxiosError);
    throw error;
  }
};

export const getRequest = async (
  url: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("get", url, null, config);
};

export const postRequest = async (
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("post", url, data, config);
};

export const putRequest = async (
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("put", url, data, config);
};

export const deleteRequest = async (
  url: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("delete", url, null, config);
};

export const patchRequest = async (
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return await request("patch", url, data, config);
};

// 请求取消功能
export const createCancelToken = (): CancelTokenSource => {
  const source = axios.CancelToken.source();
  return source;
};
