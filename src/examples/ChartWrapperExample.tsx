import React from "react";
import ChartWrapper from "../components/ChartWrapper";
import { ChartData, ChartOptions } from "chart.js";

const data: ChartData<"line"> = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const ChartWrapperExample: React.FC = () => {
  return (
    <div className="p-4">
      <ChartWrapper
        type="line"
        data={data}
        options={options}
        theme="light"
        customClass="my-custom-chart-wrapper"
        customChartClass="my-custom-chart"
        ariaLabel="示例图表"
      />
    </div>
  );
};

export default ChartWrapperExample;
