import React, { FC, ReactNode, CSSProperties } from "react";
import clsx from "clsx";

interface StackProps {
  children: ReactNode;
  component?: React.ElementType;
  direction?:
    | "row"
    | "row-reverse"
    | "column"
    | "column-reverse"
    | { [key: string]: "row" | "row-reverse" | "column" | "column-reverse" };
  divider?: ReactNode;
  spacing?: number | string | { [key: string]: number | string };
  sx?: CSSProperties;
  useFlexGap?: boolean;
  className?: string;
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  [key: string]: any;
}

const Stack: FC<StackProps> = ({
  children,
  component = "div",
  direction = "row",
  divider = null,
  spacing = 0,
  sx = {},
  useFlexGap = false,
  className = "",
  alignItems = "stretch",
  justifyContent = "flex-start",
  wrap = "nowrap",
  ...props
}) => {
  const Component = component;

  // Flex direction classes based on direction prop
  const directionClasses: Record<string, string> = {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    column: "flex-col",
    "column-reverse": "flex-col-reverse",
  };

  // Function to handle spacing; apply gap if `useFlexGap` is true
  const spacingStyles = useFlexGap
    ? { gap: typeof spacing === "number" ? `${spacing * 0.25}rem` : spacing }
    : {};

  // Manual margin styles if not using flex gap
  const spacingMargin =
    !useFlexGap && typeof spacing === "number"
      ? `space-${
          typeof direction === "string" && direction.includes("row") ? "x" : "y"
        }-${spacing}`
      : "";

  return (
    <Component
      className={clsx(
        "flex",
        typeof direction === "string" ? directionClasses[direction] : "",
        spacingMargin,
        className,
        sx // Apply additional custom styles if provided
      )}
      style={{
        ...spacingStyles,
        alignItems,
        justifyContent,
        flexWrap: wrap,
      }} // Inline style for gap if useFlexGap is true
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>
          {index > 0 && divider ? <span>{divider}</span> : null}
          {child}
        </React.Fragment>
      ))}
    </Component>
  );
};

export default Stack;
