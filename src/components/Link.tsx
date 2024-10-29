import React, { FC, MouseEventHandler, CSSProperties } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

interface LinkProps {
  children: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "textPrimary"
    | "textSecondary"
    | "textDisabled";
  component?: React.ElementType;
  underline?: "always" | "hover" | "none";
  variant?:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2";
  sx?: CSSProperties;
  disabled?: boolean;
  tooltip?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  [key: string]: any;
}

const Link: FC<LinkProps> = ({
  children,
  color = "primary",
  component = "a",
  underline = "always",
  variant = "inherit",
  sx = {},
  disabled = false,
  tooltip = "",
  onClick,
  ...props
}) => {
  const Component = component;

  // Tailwind CSS classes for various colors and styles
  const colorClasses: Record<string, string> = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    error: "text-red-600",
    info: "text-sky-600",
    warning: "text-yellow-600",
    textPrimary: "text-gray-900",
    textSecondary: "text-gray-700",
    textDisabled: "text-gray-400 cursor-not-allowed",
  };

  const underlineClasses: Record<string, string> = {
    always: "underline",
    hover: "hover:underline",
    none: "no-underline",
  };

  // Typography styles based on variant
  const variantClasses: Record<string, string> = {
    body1: "text-base",
    body2: "text-sm",
    button: "text-sm font-semibold uppercase",
    caption: "text-xs",
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold",
    h5: "text-lg font-bold",
    h6: "text-base font-bold",
    overline: "text-xs uppercase tracking-wider",
    subtitle1: "text-lg",
    subtitle2: "text-base",
    inherit: "", // inherit from parent
  };

  return (
    <Component
      className={clsx(
        colorClasses[disabled ? "textDisabled" : color] || colorClasses.primary,
        underlineClasses[underline],
        variantClasses[variant],
        sx // Apply additional styles if provided
      )}
      onClick={disabled ? undefined : onClick}
      title={tooltip}
      {...props}
    >
      {children}
    </Component>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
    "textPrimary",
    "textSecondary",
    "textDisabled",
  ]),
  underline: PropTypes.oneOf(["always", "hover", "none"]),
  variant: PropTypes.oneOf([
    "body1",
    "body2",
    "button",
    "caption",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "inherit",
    "overline",
    "subtitle1",
    "subtitle2",
  ]),
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
};

export default Link;
