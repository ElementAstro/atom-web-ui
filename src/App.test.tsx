// src/App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MainApp from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>{ui}</DndProvider>
    </ThemeProvider>
  );
};

describe("MainApp", () => {
  test("renders MainApp with default props", () => {
    renderWithProviders(<MainApp />);
    expect(screen.getByText("AccordionExample")).toBeInTheDocument();
  });

  test("renders all example components", () => {
    renderWithProviders(<MainApp />);
    const examples = [
      "AccordionExample",
      "AlertExample",
      "AvatarExample",
      "BreadcrumbsExample",
      "ButtonExample",
      "ButtonGroupExample",
      "CalendarExample",
      "CardExample",
      "CarouselExample",
      "ChartWrapperExample",
      "CheckBoxExample",
      "CodeBlockExample",
      "CollapseButtonGroupExample",
      "CollapsibleSidebarExample",
      "ConfirmDialogExample",
      "DateInputExample",
      "DividerExample",
      "DraggableModalExample",
      "DrawerExample",
      "DropdownExample",
      "FeedbackExample",
      "FlowLayoutExample",
      "FluidLayoutExample",
      "FormExample",
      "GridExample",
      "IconExample",
      "IconSelectorExample",
      "ImagesExample",
      "ImageSliderExample",
      "ImageUploaderExample",
      "InputExample",
      "ListGroupExample",
      "LoadingOverlayExample",
      "LoadingSpinnerExample",
      "LoadMoreExample",
      "MasonryExample",
      "MenuExample",
      "ModalExample",
      "NavExample",
      "NavbarExample",
      "NotificationExample",
      "NumberInputExample",
      "OffcanvasExample",
      "PaginationExample",
      "PhoneInputExample",
      "ProgressExample",
      "ProgressBarExample",
      "RatingExample",
      "RichTextEditorExample",
      "SearchBoxExample",
      "SidebarExample",
      "SkeletonScreenExample",
      "SlidesExample",
      "StepperExample",
      "SwitchExample",
      "TableExample",
      "TabsExample",
      "TagExample",
      "TagInputExample",
      "TimeInputExample",
      "ToastExample",
      "TooltipExample",
      "ValidatedFormExample",
      "VerticalMenuExample",
    ];

    examples.forEach((example) => {
      expect(screen.getByText(example)).toBeInTheDocument();
    });
  });

  test("renders Divider component between each example component", () => {
    renderWithProviders(<MainApp />);
    const dividers = screen.getAllByText("Divider");
    expect(dividers.length).toBeGreaterThan(0);
  });
});