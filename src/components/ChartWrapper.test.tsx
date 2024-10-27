// src/components/ChartWrapper.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChartWrapper from "./ChartWrapper";
import { ThemeProvider } from "../context/ThemeContext";
import { Line } from "react-chartjs-2";

jest.mock("react-chartjs-2", () => ({
  Line: jest.fn(() => <canvas />),
  Bar: jest.fn(() => <canvas />),
  Pie: jest.fn(() => <canvas />),
  Doughnut: jest.fn(() => <canvas />),
  Radar: jest.fn(() => <canvas />),
  PolarArea: jest.fn(() => <canvas />),
}));

describe("ChartWrapper Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockData = {
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

  test("renders with default props", () => {
    renderWithTheme(<ChartWrapper type="line" data={mockData} />, "light");
    expect(Line).toHaveBeenCalled();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <ChartWrapper type="line" data={mockData} customClass="custom-class" />,
      "light"
    );
    const wrapper = screen.getByLabelText("图表");
    expect(wrapper).toHaveClass("custom-class");
  });

  test("handles download button click", () => {
    const createElementSpy = jest.spyOn(document, "createElement");
    const linkClickSpy = jest.fn();
    createElementSpy.mockReturnValue({
      click: linkClickSpy,
      href: "",
      download: "",
    } as unknown as HTMLAnchorElement);

    renderWithTheme(<ChartWrapper type="line" data={mockData} />, "light");

    fireEvent.click(screen.getByLabelText("下载图表"));
    expect(linkClickSpy).toHaveBeenCalled();
  });

  test("handles type switch button click", () => {
    renderWithTheme(<ChartWrapper type="line" data={mockData} />, "light");

    fireEvent.click(screen.getByLabelText("切换图表类型"));
    expect(Line).not.toHaveBeenCalled();
  });

  test("handles print button click", () => {
    const openSpy = jest.spyOn(window, "open").mockReturnValue({
      document: {
        write: jest.fn(),
        close: jest.fn(),
        focus: jest.fn(),
        print: jest.fn(),
      },
    } as unknown as Window);

    renderWithTheme(<ChartWrapper type="line" data={mockData} />, "light");

    fireEvent.click(screen.getByLabelText("打印图表"));
    expect(openSpy).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(<ChartWrapper type="line" data={mockData} />, "dark");
    const wrapper = screen.getByLabelText("图表");
    expect(wrapper).toHaveClass("bg-gray-900 text-white");
  });

  test("renders with custom chart class", () => {
    renderWithTheme(
      <ChartWrapper
        type="line"
        data={mockData}
        customChartClass="custom-chart-class"
      />,
      "light"
    );
    const chartContainer = screen.getByLabelText("图表").querySelector(".p-4");
    expect(chartContainer).toHaveClass("custom-chart-class");
  });

  test("handles onHover event", () => {
    const onHover = jest.fn();
    renderWithTheme(
      <ChartWrapper type="line" data={mockData} onHover={onHover} />,
      "light"
    );
    const chartInstance = (Line as jest.Mock).mock.calls[0][0]
      .getDatasetAtEvent;
    chartInstance();
    expect(onHover).toHaveBeenCalled();
  });

  test("handles onClick event", () => {
    const onClick = jest.fn();
    renderWithTheme(
      <ChartWrapper type="line" data={mockData} onClick={onClick} />,
      "light"
    );
    const chartInstance = screen.getByLabelText("图表").querySelector("canvas");
    if (chartInstance) {
      fireEvent.click(chartInstance);
    }
    expect(onClick).toHaveBeenCalled();
  });

  test("handles onLegendClick event", () => {
    const onLegendClick = jest.fn();
    renderWithTheme(
      <ChartWrapper
        type="line"
        data={mockData}
        onLegendClick={onLegendClick}
      />,
      "light"
    );
    const chartInstance = (Line as jest.Mock).mock.calls[0][0].legend.options
      .onClick;
    chartInstance();
    expect(onLegendClick).toHaveBeenCalled();
  });

  test("handles onResize event", () => {
    const onResize = jest.fn();
    renderWithTheme(
      <ChartWrapper type="line" data={mockData} onResize={onResize} />,
      "light"
    );
    const chartInstance = (Line as jest.Mock).mock.calls[0][0].resize;
    chartInstance();
    expect(onResize).toHaveBeenCalled();
  });

  test("handles onAnimationComplete event", () => {
    const onAnimationComplete = jest.fn();
    renderWithTheme(
      <ChartWrapper
        type="line"
        data={mockData}
        onAnimationComplete={onAnimationComplete}
      />,
      "light"
    );
    const chartInstance = (Line as jest.Mock).mock.calls[0][0].animation.options
      .onComplete;
    chartInstance();
    expect(onAnimationComplete).toHaveBeenCalled();
  });
});
