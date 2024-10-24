// src/components/ValidatedForm.js
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import ProgressBar from "./ProgressBar";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const schema = yup.object().shape({
  username: yup.string().required("用户名是必填的"),
  password: yup.string().min(6, "密码至少为6个字符").required("密码是必填的"),
  fields: yup.array().of(
    yup.object().shape({
      fieldName: yup.string().required("字段名是必填的"),
    })
  ),
});

const ValidatedForm = ({
  onSubmitSuccess,
  onSubmitFailure,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition-transform duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
  draggable = false, // 新增属性
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const onSubmit = async (data) => {
    setLoading(true);
    setProgress(0);
    try {
      console.log(data);
      // 模拟异步操作，例如 API 提交
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              resolve();
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      });
      setLoading(false);
      if (onSubmitSuccess) onSubmitSuccess(data);
    } catch (error) {
      setLoading(false);
      if (onSubmitFailure) onSubmitFailure(error);
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleDragStart = (e) => {
    if (draggable) {
      const rect = e.target.getBoundingClientRect();
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          offsetX: e.clientX - rect.left,
          offsetY: e.clientY - rect.top,
        })
      );
    }
  };

  const handleDrop = (e) => {
    if (draggable) {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      e.target.style.left = `${e.clientX - data.offsetX}px`;
      e.target.style.top = `${e.clientY - data.offsetY}px`;
    }
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`p-6 border-${borderWidth} rounded-lg shadow-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black ${animation} max-w-lg mx-auto ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[theme || currentTheme]}`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
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
          disabled={loading || !isValid}
          className={`w-full ${animation} ${
            loading
              ? "bg-gray-600 cursor-wait"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          title={tooltip}
        >
          {loading ? <LoadingSpinner /> : icon || "提交"}
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          className={`w-full mt-2 ${animation} bg-red-500 hover:bg-red-700`}
          title={tooltip}
        >
          {icon || "重置"}
        </Button>
      </div>

      {isSubmitting && (
        <div className="mt-4">
          <ProgressBar progress={progress} />
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-white">动态字段</h3>
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Controller
              name={`fields[${index}].fieldName`}
              control={control}
              defaultValue={item.fieldName}
              render={({ field }) => (
                <Input
                  label={`字段 ${index + 1}`}
                  {...field}
                  darkMode={true} // 使用暗色风格
                  className="transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              )}
            />
            <Button
              type="button"
              onClick={() => remove(index)}
              className={`bg-red-500 hover:bg-red-700 ${animation}`}
              title={tooltip}
            >
              {icon || "删除"}
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ fieldName: "" })}
          className={`mt-2 bg-green-500 hover:bg-green-700 ${animation}`}
          title={tooltip}
        >
          {icon || "添加字段"}
        </Button>
      </div>
    </form>
  );
};

export default ValidatedForm;
