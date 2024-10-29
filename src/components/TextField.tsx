import React, { ChangeEvent, CSSProperties, FC } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Textarea from "./Textarea";

interface TextFieldProps {
  autoComplete?: string;
  autoFocus?: boolean;
  color?: "primary" | "secondary" | "error";
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  id?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  label?: React.ReactNode;
  margin?: "dense" | "none" | "normal";
  maxRows?: number | string;
  minRows?: number | string;
  multiline?: boolean;
  name?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number | string;
  size?: "medium" | "small";
  type?: string;
  value?: any;
  variant?: "filled" | "outlined" | "standard";
  sx?: CSSProperties;
  [key: string]: any;
}

const TextField: FC<TextFieldProps> = ({
  autoComplete,
  autoFocus = false,
  color = "primary",
  defaultValue,
  disabled = false,
  error = false,
  fullWidth = false,
  helperText,
  id,
  inputProps = {},
  label,
  margin = "none",
  maxRows,
  minRows,
  multiline = false,
  name,
  onChange,
  placeholder,
  required = false,
  rows,
  size = "medium",
  type = "text",
  value,
  variant = "outlined",
  sx = {},
  ...props
}) => {
  // Define variant styles
  const variantClasses: Record<string, string> = {
    outlined: "border border-gray-300 rounded",
    filled: "bg-gray-100 rounded border-b",
    standard: "border-b",
  };

  // Define color classes
  const colorClasses: Record<string, string> = {
    primary: "text-blue-600 focus:border-blue-600",
    secondary: "text-gray-600 focus:border-gray-600",
    error: "text-red-600 focus:border-red-600",
  };

  // Define size classes
  const sizeClasses: Record<string, string> = {
    small: "p-2 text-sm",
    medium: "p-3 text-base",
  };

  return (
    <div className={clsx("flex flex-col", fullWidth && "w-full", sx)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "mb-1 font-semibold",
            error ? "text-red-600" : "text-gray-700"
          )}
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      {multiline ? (
        <Textarea
          value={value}
          onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
          placeholder={placeholder}
          customClass={clsx(
            variantClasses[variant],
            colorClasses[color],
            sizeClasses[size],
            disabled && "bg-gray-200 cursor-not-allowed",
            error && "border-red-600"
          )}
          rows={typeof rows === "string" ? parseInt(rows, 10) : rows}
          maxLength={inputProps.maxLength}
          disabled={disabled}
          onFocus={
            inputProps.onFocus as unknown as (
              e: React.FocusEvent<HTMLTextAreaElement>
            ) => void
          }
          onBlur={
            inputProps.onBlur as unknown as (
              e: React.FocusEvent<HTMLTextAreaElement>
            ) => void
          }
          {...props}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          {...inputProps}
          className={clsx(
            "outline-none focus:ring-2 w-full",
            variantClasses[variant],
            colorClasses[color],
            sizeClasses[size],
            disabled && "bg-gray-200 cursor-not-allowed",
            error && "border-red-600"
          )}
          style={sx}
          {...props}
        />
      )}
      {helperText && (
        <p
          className={clsx(
            "mt-1 text-sm",
            error ? "text-red-600" : "text-gray-600"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

TextField.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  color: PropTypes.oneOf(["primary", "secondary", "error"]),
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.node,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  label: PropTypes.node,
  margin: PropTypes.oneOf(["dense", "none", "normal"]),
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  multiline: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(["medium", "small"]),
  sx: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.any,
  variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
};

export default TextField;
