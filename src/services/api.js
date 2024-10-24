// src/services/api.js
import createAxiosInstance from "../utils/axiosInstance";

// 自定义错误处理函数
const customHandleError = (error) => {
  console.error("Custom Error:", error);
  return error;
};

// 自定义 Token 刷新函数
const customRefreshToken = async () => {
  // 自定义的 Token 刷新逻辑
  return "custom_new_token";
};

// 自定义请求拦截器
const customRequestInterceptor = (config) => {
  console.log("Custom Request Interceptor:", config);
  return config;
};

// 自定义响应拦截器
const customResponseInterceptor = (response) => {
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
  cacheOptions: { maxAge: 10 * 60 * 1000 }, // 缓存 10 分钟
  retryOptions: { retries: 5 }, // 重试 5 次
  logRequests: true, // 记录日志
});

// 通用请求函数
const request = async (method, url, data = null, config = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      ...config,
    });
    return response;
  } catch (error) {
    customHandleError(error);
    throw error;
  }
};

export const getRequest = async (url, config = {}) => {
  return await request("get", url, null, config);
};

export const postRequest = async (url, data, config = {}) => {
  return await request("post", url, data, config);
};

export const putRequest = async (url, data, config = {}) => {
  return await request("put", url, data, config);
};

export const deleteRequest = async (url, config = {}) => {
  return await request("delete", url, null, config);
};

export const patchRequest = async (url, data, config = {}) => {
  return await request("patch", url, data, config);
};

// 请求取消功能
export const createCancelToken = () => {
  const source = axios.CancelToken.source();
  return source;
};
