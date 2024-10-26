// src/examples/ChartWrapperExample.tsx
import React from "react";
import ChartWrapper from "../components/ChartWrapper";
import { ChartData, ChartOptions } from "chart.js";

// Line Chart Data and Options
const lineData: ChartData<"line"> = {
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

const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Line Chart",
    },
  },
};

// Bar Chart Data and Options
const barData: ChartData<"bar"> = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const barOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bar Chart",
    },
  },
};

// Pie Chart Data and Options
const pieData: ChartData<"pie"> = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: [
        "rgba(255,99,132,0.2)",
        "rgba(54,162,235,0.2)",
        "rgba(255,206,86,0.2)",
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54,162,235,1)",
        "rgba(255,206,86,1)",
      ],
      data: [300, 50, 100],
    },
  ],
};

const pieOptions: ChartOptions<"pie"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Pie Chart",
    },
  },
};

// Radar Chart Data and Options
const radarData: ChartData<"radar"> = {
  labels: [
    "Eating",
    "Drinking",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running",
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      data: [65, 59, 90, 81, 56, 55, 40],
    },
  ],
};

const radarOptions: ChartOptions<"radar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Radar Chart",
    },
  },
};

const ChartWrapperExample: React.FC = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ChartWrapper
        type="line"
        data={lineData}
        options={lineOptions}
        theme="light"
        customClass="my-custom-chart-wrapper"
        customChartClass="my-custom-chart"
        ariaLabel="Line Chart"
      />
      <ChartWrapper
        type="bar"
        data={barData}
        options={barOptions}
        theme="light"
        customClass="my-custom-chart-wrapper"
        customChartClass="my-custom-chart"
        ariaLabel="Bar Chart"
      />
      <ChartWrapper
        type="pie"
        data={pieData}
        options={pieOptions}
        theme="light"
        customClass="my-custom-chart-wrapper"
        customChartClass="my-custom-chart"
        ariaLabel="Pie Chart"
      />
      <ChartWrapper
        type="radar"
        data={radarData}
        options={radarOptions}
        theme="light"
        customClass="my-custom-chart-wrapper"
        customChartClass="my-custom-chart"
        ariaLabel="Radar Chart"
      />
    </div>
  );
};

export default ChartWrapperExample;
