// src/components/SpeedDial.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SpeedDial, SpeedDialAction } from "./SpeedDial";
import { ThemeProvider } from "../context/ThemeContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>{ui}</DndProvider>
    </ThemeProvider>
  );
};

describe("SpeedDial", () => {
  test("renders SpeedDial with default props", () => {
    renderWithProviders(
      <SpeedDial ariaLabel="SpeedDial" icon={<div>Icon</div>}>
        <SpeedDialAction
          icon={<div>Action1</div>}
          tooltipTitle="Action 1"
          onClick={() => {}}
        />
      </SpeedDial>
    );
    expect(screen.getByLabelText("SpeedDial")).toBeInTheDocument();
  });

  test("renders SpeedDial with floating position", () => {
    renderWithProviders(
      <SpeedDial ariaLabel="SpeedDial" icon={<div>Icon</div>} floating>
        <SpeedDialAction
          icon={<div>Action1</div>}
          tooltipTitle="Action 1"
          onClick={() => {}}
        />
      </SpeedDial>
    );
    const container = screen.getByLabelText("SpeedDial").parentElement;
    expect(container).toHaveStyle("position: fixed");
  });

  test("handles onOpen and onClose events", () => {
    const handleOpen = jest.fn();
    const handleClose = jest.fn();
    renderWithProviders(
      <SpeedDial
        ariaLabel="SpeedDial"
        icon={<div>Icon</div>}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <SpeedDialAction
          icon={<div>Action1</div>}
          tooltipTitle="Action 1"
          onClick={() => {}}
        />
      </SpeedDial>
    );
    const fab = screen.getByLabelText("SpeedDial");
    fireEvent.click(fab);
    expect(handleOpen).toHaveBeenCalled();
    fireEvent.click(fab);
    expect(handleClose).toHaveBeenCalled();
  });

  test("toggles open and close states on button click", () => {
    renderWithProviders(
      <SpeedDial ariaLabel="SpeedDial" icon={<div>Icon</div>}>
        <SpeedDialAction
          icon={<div>Action1</div>}
          tooltipTitle="Action 1"
          onClick={() => {}}
        />
      </SpeedDial>
    );
    const fab = screen.getByLabelText("SpeedDial");
    fireEvent.click(fab);
    expect(screen.getByText("Action 1")).toBeVisible();
    fireEvent.click(fab);
    expect(screen.getByText("Action 1")).not.toBeVisible();
  });

  test("closes when clicking outside", () => {
    renderWithProviders(
      <div>
        <SpeedDial ariaLabel="SpeedDial" icon={<div>Icon</div>}>
          <SpeedDialAction
            icon={<div>Action1</div>}
            tooltipTitle="Action 1"
            onClick={() => {}}
          />
        </SpeedDial>
        <div data-testid="outside">Outside</div>
      </div>
    );
    const fab = screen.getByLabelText("SpeedDial");
    fireEvent.click(fab);
    expect(screen.getByText("Action 1")).toBeVisible();
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.getByText("Action 1")).not.toBeVisible();
  });

  test("closes when pressing the Escape key", () => {
    renderWithProviders(
      <SpeedDial ariaLabel="SpeedDial" icon={<div>Icon</div>}>
        <SpeedDialAction
          icon={<div>Action1</div>}
          tooltipTitle="Action 1"
          onClick={() => {}}
        />
      </SpeedDial>
    );
    const fab = screen.getByLabelText("SpeedDial");
    fireEvent.click(fab);
    expect(screen.getByText("Action 1")).toBeVisible();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByText("Action 1")).not.toBeVisible();
  });

  test("renders SpeedDialAction with tooltip", () => {
    renderWithProviders(
      <SpeedDial ariaLabel="SpeedDial" icon={<div>Icon</div>}>
        <SpeedDialAction
          icon={<div>Action1</div>}
          tooltipTitle="Action 1"
          onClick={() => {}}
        />
      </SpeedDial>
    );
    expect(screen.getByText("Action 1")).toBeInTheDocument();
  });

  test("handles SpeedDialAction onClick event", () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <SpeedDial ariaLabel="SpeedDial" icon={<div>Icon</div>}>
        <SpeedDialAction
          icon={<div>Action1</div>}
          tooltipTitle="Action 1"
          onClick={handleClick}
        />
      </SpeedDial>
    );
    const actionButton = screen.getByText("Action1").parentElement;
    if (actionButton) {
      fireEvent.click(actionButton);
      expect(handleClick).toHaveBeenCalled();
    }
  });

  test("renders disabled SpeedDialAction", () => {
    renderWithProviders(
      <SpeedDial ariaLabel="SpeedDial" icon={<div>Icon</div>}>
        <SpeedDialAction
          icon={<div>Action1</div>}
          tooltipTitle="Action 1"
          onClick={() => {}}
          disabled
        />
      </SpeedDial>
    );
    const actionButton = screen.getByText("Action1").parentElement;
    expect(actionButton).toHaveStyle("cursor: not-allowed");
    expect(actionButton).toHaveStyle("opacity: 0.5");
  });
});
