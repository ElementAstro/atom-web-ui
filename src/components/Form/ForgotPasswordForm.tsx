import React, { useState } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 表单校验逻辑
  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("邮箱格式不正确");
      return false;
    }
    return true;
  };

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError("");
    setIsLoading(true);

    // 模拟找回密码请求
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("重置密码的链接已发送到您的邮箱，请检查。");
      setEmail(""); // 清空邮箱输入框
    }, 2000);
  };

  const handleGoogleLoginSuccess = (response: CredentialResponse): void => {
    console.log("Google 登录成功", response);
    // 在这里可以处理 OAuth 返回的 token 等信息
  };

  const handleGoogleLoginFailure = (): void => {
    setError("Google 登录失败，请重试");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          找回密码
        </h2>

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

        {successMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-2 text-sm text-green-500 bg-green-100 border border-green-400 rounded"
          >
            {successMessage}
          </motion.div>
        )}

        <form onSubmit={handleForgotPassword} className="space-y-4">
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="请输入注册邮箱"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className={`w-full px-4 py-2 font-semibold text-white ${
              isLoading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
            } rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
          >
            {isLoading ? "发送中..." : "发送重置链接"}
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
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
          >
            <FaGoogle className="mr-2" /> 使用 Google 登录
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-center text-gray-500"
        >
          记得密码了？{" "}
          <a href="#" className="text-teal-500 hover:underline">
            登录
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordForm;
