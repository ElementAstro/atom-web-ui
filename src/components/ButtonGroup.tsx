import { motion, Variants } from "framer-motion";
import { ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import Button, { ButtonProps } from "./Button";
import { Icon as LucideIcon } from "lucide-react";
import React from "react";

export interface ButtonGroupProps {
  /**
   * 按钮组内容
   */
  children: ReactNode;

  /**
   * 图标配置
   * @default undefined
   */
  icon?: {
    /** 图标组件 */
    component: typeof LucideIcon;
    /** 图标位置 */
    position?: "left" | "right";
    /** 图标大小 */
    size?: number;
    /** 图标颜色 */
    color?: string;
    /** 图标动画 */
    animation?: "none" | "spin" | "pulse" | "bounce";
  };

  /**
   * 布局方向
   * @default 'horizontal'
   */
  direction?: "horizontal" | "vertical";

  /**
   * 响应式布局配置
   * 例如：{ sm: 'vertical', md: 'horizontal' }
   */
  responsiveDirection?: Partial<
    Record<"sm" | "md" | "lg" | "xl", "horizontal" | "vertical">
  >;

  /**
   * 按钮间距
   * @default 'md'
   */
  spacing?: "none" | "sm" | "md" | "lg";

  /**
   * 响应式间距配置
   * 例如：{ sm: 'sm', md: 'md' }
   */
  responsiveSpacing?: Partial<
    Record<"sm" | "md" | "lg" | "xl", "none" | "sm" | "md" | "lg">
  >;

  /**
   * 是否包裹按钮
   * @default false
   */
  wrap?: boolean;

  /**
   * 动画预设
   * @default 'fade'
   */
  animation?: "none" | "fade" | "slide" | "scale";

  /**
   * 主题
   * @default 'light'
   */
  theme?: "light" | "dark";

  /**
   * 动画持续时间（秒）
   * @default 0.3
   */
  animationDuration?: number;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 按钮组对齐方式
   * @default 'start'
   */
  align?: "start" | "center" | "end" | "stretch";

  /**
   * 是否显示分隔线
   * @default false
   */
  showDivider?: boolean;

  /**
   * 分隔线样式
   */
  dividerClassName?: string;
}

const spacingClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const animationVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  slide: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } },
  },
};

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      icon,
      direction = "horizontal",
      spacing = "md",
      wrap = false,
      animation = "fade",
      theme = "light",
      className,
      ...props
    },
    ref
  ) => {
    const IconComponent = icon?.component;
    const iconClasses = twMerge(
      icon?.animation === "spin" && "animate-spin",
      icon?.animation === "pulse" && "animate-pulse",
      icon?.animation === "bounce" && "animate-bounce"
    );

    const renderChildren = () => {
      if (!children) return null;

      return React.Children.map(children, (child) => {
        if (!React.isValidElement<ButtonProps>(child)) return child;

        return React.cloneElement(child, {
          ...child.props,
          className: twMerge(
            child.props.className,
            icon?.position === "left" && "ml-2",
            icon?.position === "right" && "mr-2"
          ),
        });
      });
    };
    const directionClasses =
      direction === "horizontal" ? "flex-row" : "flex-col";

    const themeClasses = theme === "dark" ? "bg-gray-800" : "bg-white";

    return (
      <motion.div
        ref={ref}
        className={twMerge(
          "flex",
          directionClasses,
          spacingClasses[spacing],
          wrap && "flex-wrap",
          themeClasses,
          className
        )}
        variants={
          animation !== "none" ? animationVariants[animation] : undefined
        }
        initial="hidden"
        animate="visible"
        {...props}
      >
        {renderChildren()}
        {IconComponent && (
          <IconComponent
            size={icon?.size || 16}
            color={icon?.color || "currentColor"}
            className={iconClasses}
            {...({} as React.ComponentProps<typeof LucideIcon>)}
          />
        )}
      </motion.div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
