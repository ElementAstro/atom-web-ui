// src/components/ChartWrapper.tsx
import React, { useRef, useState } from "react";
import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ChartData,
  ChartOptions,
} from "chart.js";
import {
  AiOutlineDownload,
  AiOutlineSwap,
  AiOutlinePrinter,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button"; // 导入Button组件

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const themeClasses = {
  light: "bg-white text-gray-900",
  dark: "bg-gray-900 text-white",
  astronomy:
    "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
  eyeCare: "bg-green-100 text-green-900",
  astronomyDarkRed:
    "bg-gradient-to-r from-red-900 via-black to-black text-white",
};

interface ChartWrapperProps {
  type: "line" | "bar" | "pie" | "doughnut" | "radar" | "polarArea";
  data: ChartData<any>;
  options?: ChartOptions<any>;
  onHover?: (event: MouseEvent, activeElements: any[]) => void;
  onClick?: (event: MouseEvent, activeElements: any[]) => void;
  onLegendClick?: (event: MouseEvent, legendItem: any) => void;
  onResize?: (newSize: { width: number; height: number }) => void;
  onAnimationComplete?: () => void;
  theme?: keyof typeof themeClasses;
  customClass?: string;
  customChartClass?: string;
  ariaLabel?: string;
  showDownloadButton?: boolean;
  showTypeSwitchButton?: boolean;
  showPrintButton?: boolean;
  customButtonClass?: string;
  customIconClass?: string;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  type: initialType,
  data,
  options,
  onHover,
  onClick,
  onLegendClick,
  onResize,
  onAnimationComplete,
  theme,
  customClass = "",
  customChartClass = "",
  ariaLabel = "图表",
  showDownloadButton = true,
  showTypeSwitchButton = true,
  showPrintButton = true,
  customButtonClass = "",
  customIconClass = "",
}) => {
  const chartRef = useRef<any>(null);
  const { theme: currentTheme } = useTheme();
  const [type, setType] = useState(initialType);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = chartRef.current.toBase64Image();
    link.download = "chart.png";
    link.click();
  };

  const handleTypeSwitch = () => {
    const chartTypes = ["line", "bar", "pie", "doughnut", "radar", "polarArea"];
    const currentIndex = chartTypes.indexOf(type);
    const nextType = chartTypes[(currentIndex + 1) % chartTypes.length];
    setType(nextType as ChartWrapperProps["type"]);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "PRINT", "height=600,width=800");
    printWindow?.document.write(
      `<img src="${chartRef.current.toBase64Image()}" />`
    );
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
    printWindow?.close();
  };

  const renderChart = () => {
    const chartProps = {
      data,
      options: {
        ...options,
        onHover,
        onClick,
        onResize,
        onAnimationComplete,
        plugins: {
          legend: {
            onClick: onLegendClick,
          },
        },
      },
      ref: chartRef,
    };

    switch (type) {
      case "line":
        return <Line {...chartProps} />;
      case "bar":
        return <Bar {...chartProps} />;
      case "pie":
        return <Pie {...chartProps} />;
      case "doughnut":
        return <Doughnut {...chartProps} />;
      case "radar":
        return <Radar {...chartProps} />;
      case "polarArea":
        return <PolarArea {...chartProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`chart-wrapper relative ${
        themeClasses[(theme as keyof typeof themeClasses) || currentTheme]
      } ${customClass}`}
      aria-label={ariaLabel}
    >
      <div className="absolute top-2 right-2 flex space-x-2">
        {showTypeSwitchButton && (
          <Button
            onClick={handleTypeSwitch}
            customClass={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="切换图表类型"
            title="切换图表类型"
          >
            <AiOutlineSwap
              className={`transform hover:rotate-12 transition duration-300 ${customIconClass}`}
            />
          </Button>
        )}
        {showDownloadButton && (
          <Button
            onClick={handleDownload}
            customClass={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="下载图表"
            title="下载图表"
          >
            <AiOutlineDownload
              className={`transform hover:rotate-12 transition duration-300 ${customIconClass}`}
            />
          </Button>
        )}
        {showPrintButton && (
          <Button
            onClick={handlePrint}
            customClass={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            aria-label="打印图表"
            title="打印图表"
          >
            <AiOutlinePrinter
              className={`transform hover:rotate-12 transition duration-300 ${customIconClass}`}
            />
          </Button>
        )}
      </div>
      <div className={`p-4 ${customChartClass}`}>{renderChart()}</div>
      <style>{`
        @media (max-width: 768px) {
          .p-4 {
            padding: 1rem;
          }
          .absolute {
            position: absolute;
          }
          .top-2 {
            top: 0.5rem;
          }
          .right-2 {
            right: 0.5rem;
          }
          .space-x-2 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(0.5rem * var(--tw-space-x-reverse));
            margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
          }
        }
      `}</style>
    </div>
  );
};

export default ChartWrapper;
