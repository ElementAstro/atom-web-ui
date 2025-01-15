import React from "react";

interface GridProps {
  columns: {
    base: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  rowGap?: number;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
  autoFit?: boolean;
  layout?: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({
  columns,
  gap = 4,
  rowGap,
  alignItems = "stretch",
  justifyItems = "stretch",
  autoFit = false,
  layout = "horizontal",
  children,
}) => {
  const getGridTemplateColumns = () => {
    if (autoFit) {
      return `grid-cols-auto-fit`;
    }
    const base = `grid-cols-${columns.base}`;
    const sm = columns.sm ? `sm:grid-cols-${columns.sm}` : "";
    const md = columns.md ? `md:grid-cols-${columns.md}` : "";
    const lg = columns.lg ? `lg:grid-cols-${columns.lg}` : "";
    const xl = columns.xl ? `xl:grid-cols-${columns.xl}` : "";
    return `${base} ${sm} ${md} ${lg} ${xl}`;
  };

  const layoutClass = layout === "vertical" ? "flex flex-col" : "grid";

  return (
    <div
      className={`${layoutClass} gap-${gap} ${
        rowGap ? `row-gap-${rowGap}` : ""
      } ${getGridTemplateColumns()}`}
      style={{ alignItems, justifyItems }}
    >
      {children}
    </div>
  );
};

export default Grid;