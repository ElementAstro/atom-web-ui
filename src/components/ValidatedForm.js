// src/components/ValidatedForm.js
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

const schema = yup.object().shape({
  username: yup.string().required("用户名是必填的"),
  password: yup.string().min(6, "密码至少为6个字符").required("密码是必填的"),
});

const ValidatedForm = ({ onSubmitSuccess, onSubmitFailure }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      // 模拟异步操作，例如 API 提交
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      if (onSubmitSuccess) onSubmitSuccess(data);
    } catch (error) {
      setLoading(false);
      if (onSubmitFailure) onSubmitFailure(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border border-gray-700 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black transition-transform duration-300 hover:scale-105 hover:shadow-neon"
    >
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="用户名"
            {...field}
            darkMode={true} // 使用暗色风格
            className="transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        )}
      />
      {errors.username && (
        <span className="text-red-500 mt-1 animate-pulse">
          {errors.username.message}
        </span>
      )}

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="密码"
            type="password"
            {...field}
            darkMode={true} // 使用暗色风格
            className="transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        )}
      />
      {errors.password && (
        <span className="text-red-500 mt-1 animate-pulse">
          {errors.password.message}
        </span>
      )}

      <div className="mt-4">
        <Button
          type="submit"
          disabled={loading}
          className={`w-full transition-transform duration-300 transform hover:scale-105 ${
            loading ? "bg-gray-600 cursor-wait" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {loading ? <LoadingSpinner /> : "提交"}
        </Button>
      </div>
    </form>
  );
};

export default ValidatedForm;