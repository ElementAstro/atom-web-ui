// src/components/ChartWrapper.tsx
import React, { useRef } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
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
  ChartOptions,
  ChartData,
} from "chart.js";
import { AiOutlineDownload, AiOutlineSwap } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
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
  type: "line" | "bar" | "pie";
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
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  type,
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
}) => {
  const chartRef = useRef<any>(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = chartRef.current.toBase64Image();
    link.download = "chart.png";
    link.click();
  };

  const handleTypeSwitch = () => {
    // 这里可以实现图表类型切换的逻辑
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
        <button
          onClick={handleTypeSwitch}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="切换图表类型"
          title="切换图表类型"
        >
          <AiOutlineSwap className="transform hover:rotate-12 transition duration-300" />
        </button>
        <button
          onClick={handleDownload}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg p-2 hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="下载图表"
          title="下载图表"
        >
          <AiOutlineDownload className="transform hover:rotate-12 transition duration-300" />
        </button>
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
