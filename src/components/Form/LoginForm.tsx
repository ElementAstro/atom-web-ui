// src/components/LoginForm.tsx
import React, { useState, FormEvent, ChangeEvent } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub } from "react-icons/fa";

interface LoginFormProps {
  onLoginSuccess?: (email: string, password: string) => void;
  onGoogleLoginSuccess?: (response: CredentialResponse) => void;
  onGoogleLoginFailure?: () => void;
  primaryColor?: string;
  secondaryColor?: string;
  maxAttempts?: number;
  blockTime?: number;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onGoogleLoginSuccess,
  onGoogleLoginFailure,
  primaryColor = "indigo-500",
  secondaryColor = "purple-500",
  maxAttempts = 3,
  blockTime = 5000,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);

  // 表单校验逻辑
  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("邮箱格式不正确");
      return false;
    }

    if (password.length < 6) {
      setError("密码长度不能少于6位");
      return false;
    }
    return true;
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    // 限流逻辑
    if (attemptCount >= maxAttempts) {
      setError("尝试过多，请稍后再试");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setError("");
    setIsLoading(true);
    setAttemptCount((count) => count + 1);

    // 模拟登录请求
    setTimeout(() => {
      setIsLoading(false);
      console.log("登录成功:", { email, password });
      if (onLoginSuccess) {
        onLoginSuccess(email, password);
      }
      setAttemptCount(0); // 重置计数器
    }, 2000);

    if (attemptCount + 1 >= maxAttempts) {
      setTimeout(() => {
        setAttemptCount(0);
      }, blockTime);
    }
  };

  const handleGoogleLoginSuccess = (response: CredentialResponse) => {
    console.log("Google 登录成功", response);
    if (onGoogleLoginSuccess) {
      onGoogleLoginSuccess(response);
    }
  };

  const handleGoogleLoginFailure = () => {
    setError("Google 登录失败，请重试");
    if (onGoogleLoginFailure) {
      onGoogleLoginFailure();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex min-h-screen items-center justify-center bg-gradient-to-r from-${primaryColor} via-${secondaryColor} to-pink-500`}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">登录</h2>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-2 text-sm text-red-500 bg-red-100 border border-red-400 rounded"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              邮箱
            </label>
            <motion.input
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="请输入邮箱"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <motion.input
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="请输入密码"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={isLoading || attemptCount >= maxAttempts}
            className={`w-full px-4 py-2 font-semibold text-white ${
              isLoading
                ? "bg-gray-400"
                : `bg-${primaryColor} hover:bg-${secondaryColor}`
            } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {isLoading ? "加载中..." : "登录"}
          </motion.button>
        </form>

        <div className="relative my-4">
          <span className="absolute inset-x-0 top-2/4 transform -translate-y-2/4 bg-white px-2 text-sm text-gray-500">
            或者
          </span>
          <hr className="border-gray-300" />
        </div>

        {/* OAuth 登录按钮 */}
        <div className="flex space-x-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap
            text="signin_with"
            shape="rectangular"
            theme="filled_blue"
            size="large"
            logo_alignment="left"
            width="100%"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-gray-900"
          >
            <FaGithub className="mr-2" /> GitHub 登录
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-center text-gray-500"
        >
          没有账号？{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            注册
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
