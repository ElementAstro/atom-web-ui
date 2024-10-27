// src/components/Carousel.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Carousel from "./Carousel";
import { ThemeProvider } from "../context/ThemeContext";

describe("Carousel Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const items = [
    { content: <div>Slide 1</div>, imageUrl: "image1.jpg" },
    { content: <div>Slide 2</div>, imageUrl: "image2.jpg" },
    { content: <div>Slide 3</div>, imageUrl: "image3.jpg" },
  ];

  test("renders with default props", () => {
    renderWithTheme(<Carousel items={items} />, "light");
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  test("auto plays slides", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <Carousel items={items} autoPlay autoPlayInterval={1000} />,
      "light"
    );
    expect(screen.getByText("Slide 1")).toBeVisible();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Slide 2")).toBeVisible();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Slide 3")).toBeVisible();
    jest.useRealTimers();
  });

  test("pauses on hover", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <Carousel items={items} autoPlay autoPlayInterval={1000} pauseOnHover />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("Slide 1"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Slide 1")).toBeVisible();
    fireEvent.mouseLeave(screen.getByText("Slide 1"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Slide 2")).toBeVisible();
    jest.useRealTimers();
  });

  test("handles next and previous controls", () => {
    renderWithTheme(<Carousel items={items} showControls />, "light");
    fireEvent.click(screen.getByLabelText("Next Slide"));
    expect(screen.getByText("Slide 2")).toBeVisible();
    fireEvent.click(screen.getByLabelText("Previous Slide"));
    expect(screen.getByText("Slide 1")).toBeVisible();
  });

  test("handles keyboard navigation", () => {
    renderWithTheme(<Carousel items={items} keyboardNavigation />, "light");
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByText("Slide 2")).toBeVisible();
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText("Slide 1")).toBeVisible();
  });

  test("renders with custom theme", () => {
    renderWithTheme(<Carousel items={items} theme="dark" />, "dark");
    expect(screen.getByText("Slide 1").parentElement).toHaveClass(
      "bg-gray-900"
    );
  });

  test("renders with indicators", () => {
    renderWithTheme(<Carousel items={items} showIndicators />, "light");
    expect(screen.getAllByRole("button", { name: /Slide/i })).toHaveLength(3);
  });

  test("renders with thumbnails", () => {
    renderWithTheme(<Carousel items={items} showThumbnails />, "light");
    expect(screen.getAllByRole("img", { name: /Thumbnail/i })).toHaveLength(3);
  });

  test("renders with captions", () => {
    renderWithTheme(<Carousel items={items} showCaptions />, "light");
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  test("renders with progress bar", () => {
    renderWithTheme(<Carousel items={items} showProgressBar />, "light");
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("handles fullscreen mode", () => {
    const requestFullscreen = jest.fn();
    const exitFullscreen = jest.fn();
    document.documentElement.requestFullscreen = requestFullscreen;
    document.exitFullscreen = exitFullscreen;

    renderWithTheme(<Carousel items={items} fullscreen />, "light");
    fireEvent.click(screen.getByText("Slide 1"));
    expect(requestFullscreen).toHaveBeenCalled();
  });

  test("handles touch events", () => {
    renderWithTheme(<Carousel items={items} />, "light");
    fireEvent.touchStart(screen.getByText("Slide 1"), {
      touches: [{ clientX: 100 }],
    });
    fireEvent.touchMove(screen.getByText("Slide 1"), {
      touches: [{ clientX: 50 }],
    });
    expect(screen.getByText("Slide 2")).toBeVisible();
  });
});
