// src/utils/axiosInstance.js
import axios from "axios";
import NProgress from "nprogress"; // 用于显示加载进度条

// 默认错误处理函数
const defaultHandleError = (error) => {
  console.error(error);
  return error;
};

// 默认 Token 刷新函数
const defaultRefreshToken = async () => {
  // 在这里实现你的 Token 刷新逻辑
  // 返回新的 Token
  return "new_token_example";
};

// 创建一个 axios 实例的工厂函数
const createAxiosInstance = ({
  baseURL = "https://jsonplaceholder.typicode.com",
  timeout = 10000,
  headers = {},
  handleError = defaultHandleError,
  refreshToken = defaultRefreshToken,
  requestInterceptors = [],
  responseInterceptors = [],
  showProgress = true,
} = {}) => {
  // 创建一个 axios 实例
  const axiosInstance = axios.create({
    baseURL,
    timeout,
    headers,
  });

  // NProgress配置
  if (showProgress) {
    NProgress.configure({ showSpinner: false });
  }

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config) => {
      if (showProgress) {
        NProgress.start(); // 开始加载进度条
      }

      const token = localStorage.getItem("token"); // 从 localStorage 获取 Token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 执行用户自定义的请求拦截器
      requestInterceptors.forEach((interceptor) => {
        config = interceptor(config);
      });

      return config;
    },
    (error) => {
      if (showProgress) {
        NProgress.done(); // 结束加载进度条
      }
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response) => {
      if (showProgress) {
        NProgress.done(); // 结束加载进度条
      }

      // 执行用户自定义的响应拦截器
      responseInterceptors.forEach((interceptor) => {
        response = interceptor(response);
      });

      return response.data; // 返回响应数据
    },
    async (error) => {
      if (showProgress) {
        NProgress.done(); // 结束加载进度条
      }

      const originalRequest = error.config;

      // 处理错误，并返回错误信息
      const customizedError = handleError(error);

      // 请求重试逻辑
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // 防止重复请求
        try {
          const newToken = await refreshToken(); // 获取新 Token
          localStorage.setItem("token", newToken); // 更新 Token
          axiosInstance.defaults.headers[
            "Authorization"
          ] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest); // 重新发送请求
        } catch (err) {
          return Promise.reject(handleError(err));
        }
      }

      return Promise.reject(customizedError); // 抛出自定义错误信息
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
