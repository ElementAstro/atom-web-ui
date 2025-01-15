import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

export interface AvatarProps extends HTMLMotionProps<"div"> {
  /**
   * 头像尺寸
   * @default 'md'
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * 颜色方案
   * @default 'primary'
   */
  colorScheme?: "primary" | "secondary" | "success" | "warning" | "danger";
  /**
   * 边框样式
   * @default 'solid'
   */
  borderStyle?: "solid" | "dashed" | "none";
  /**
   * 头像内容（文字或图标）
   */
  children?: React.ReactNode;
  /**
   * 图片URL
   */
  src?: string;
  /**
   * 替代文本
   */
  alt?: string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
};

const colorClasses = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-black",
  danger: "bg-red-500 text-white",
};

const borderClasses = {
  solid: "border-2",
  dashed: "border-2 border-dashed",
  none: "border-0",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = "md",
      colorScheme = "primary",
      borderStyle = "solid",
      children,
      src,
      alt,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const avatarClasses = clsx(
      "rounded-full",
      "flex items-center justify-center",
      "overflow-hidden",
      "select-none",
      "transition-all duration-200",
      "hover:scale-105",
      "active:scale-95",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      sizeClasses[size],
      colorClasses[colorScheme],
      borderClasses[borderStyle],
      disabled && "opacity-50 cursor-not-allowed",
      className
    );

    const content = src ? (
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    ) : (
      <motion.span
        className="font-medium"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {children}
      </motion.span>
    );

    return (
      <motion.div
        ref={ref}
        className={avatarClasses}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        aria-disabled={disabled}
        {...props}
      >
        {content}
      </motion.div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
