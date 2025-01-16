import { motion } from "framer-motion";
import { forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps {
  /**
   * 按钮内容
   */
  children: ReactNode;

  /**
   * 按钮大小
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * 按钮颜色
   * @default 'primary'
   */
  color?: "primary" | "secondary" | "success" | "warning" | "danger";

  /**
   * 按钮形状
   * @default 'rounded'
   */
  shape?: "square" | "rounded" | "pill";

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 加载状态
   * @default false
   */
  loading?: boolean;

  /**
   * 图标位置
   */
  icon?: {
    position: "left" | "right";
    element: ReactNode;
  };

  /**
   * 主题
   * @default 'light'
   */
  theme?: "light" | "dark";

  /**
   * 点击事件处理函数
   */
  onClick?: () => void;

  /**
   * 自定义类名
   */
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "md",
      color = "primary",
      shape = "rounded",
      disabled = false,
      loading = false,
      icon,
      className,
      theme = "light",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const colorClasses = {
      primary:
        theme === "dark"
          ? "bg-blue-700 hover:bg-blue-800 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white",
      secondary:
        theme === "dark"
          ? "bg-gray-700 hover:bg-gray-800 text-white"
          : "bg-gray-500 hover:bg-gray-600 text-white",
      success:
        theme === "dark"
          ? "bg-green-700 hover:bg-green-800 text-white"
          : "bg-green-500 hover:bg-green-600 text-white",
      warning:
        theme === "dark"
          ? "bg-yellow-700 hover:bg-yellow-800 text-black"
          : "bg-yellow-500 hover:bg-yellow-600 text-black",
      danger:
        theme === "dark"
          ? "bg-red-700 hover:bg-red-800 text-white"
          : "bg-red-500 hover:bg-red-600 text-white",
    };

    const shapeClasses = {
      square: "rounded-none",
      rounded: "rounded-md",
      pill: "rounded-full",
    };

    const iconClasses = icon
      ? `flex items-center gap-2 ${
          icon.position === "left" ? "flex-row" : "flex-row-reverse"
        }`
      : "";

    return (
      <motion.button
        ref={ref}
        className={twMerge(
          "font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          sizeClasses[size],
          colorClasses[color],
          shapeClasses[shape],
          iconClasses,
          disabled && "opacity-50 cursor-not-allowed",
          loading && "cursor-wait",
          className
        )}
        whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {icon?.element}
            {children}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
