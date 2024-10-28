import React, { useState, FormEvent, ChangeEvent } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub } from "react-icons/fa";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 表单校验逻辑
  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username.trim().length < 3) {
      setError("用户名至少需要 3 个字符");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("邮箱格式不正确");
      return false;
    }
    if (password.length < 6) {
      setError("密码长度不能少于 6 位");
      return false;
    }
    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return false;
    }
    return true;
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError("");
    setIsLoading(true);

    // 模拟注册请求
    setTimeout(() => {
      setIsLoading(false);
      console.log("注册成功:", { username, email, password });
      // 重置输入框
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }, 2000);
  };

  const handleGoogleRegisterSuccess = (response: CredentialResponse) => {
    console.log("Google 注册成功", response);
    // 在这里可以处理 OAuth 返回的 token 等信息
  };

  const handleGoogleRegisterFailure = () => {
    setError("Google 注册失败，请重试");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">注册</h2>

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

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <motion.input
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="请输入用户名"
              required
            />
          </div>

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
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="请输入密码"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              确认密码
            </label>
            <motion.input
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="请再次输入密码"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className={`w-full px-4 py-2 font-semibold text-white ${
              isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
          >
            {isLoading ? "注册中..." : "注册"}
          </motion.button>
        </form>

        <div className="relative my-4">
          <span className="absolute inset-x-0 top-2/4 transform -translate-y-2/4 bg-white px-2 text-sm text-gray-500">
            或者
          </span>
          <hr className="border-gray-300" />
        </div>

        {/* OAuth 注册按钮 */}
        <div className="flex space-x-4">
          <GoogleLogin
            onSuccess={handleGoogleRegisterSuccess}
            onError={handleGoogleRegisterFailure}
            useOneTap
            text="signup_with"
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
            <FaGithub className="mr-2" /> GitHub 注册
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-center text-gray-500"
        >
          已有账号？{" "}
          <a href="#" className="text-green-500 hover:underline">
            登录
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;
