// src/components/Link.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Link from "./Link";
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

describe("Link", () => {
    test("renders Link with default props", () => {
        renderWithProviders(<Link>Default Link</Link>);
        expect(screen.getByText("Default Link")).toBeInTheDocument();
    });

    test("renders Link with specific color", () => {
        renderWithProviders(<Link color="success">Success Link</Link>);
        expect(screen.getByText("Success Link")).toHaveClass("text-green-600");
    });

    test("renders Link with underline styles", () => {
        renderWithProviders(<Link underline="hover">Hover Underline Link</Link>);
        expect(screen.getByText("Hover Underline Link")).toHaveClass("hover:underline");
    });

    test("renders Link with different variants", () => {
        renderWithProviders(<Link variant="h1">H1 Link</Link>);
        expect(screen.getByText("H1 Link")).toHaveClass("text-4xl font-bold");
    });

    test("handles onClick event", () => {
        const handleClick = jest.fn();
        renderWithProviders(<Link onClick={handleClick}>Clickable Link</Link>);
        fireEvent.click(screen.getByText("Clickable Link"));
        expect(handleClick).toHaveBeenCalled();
    });

    test("renders disabled Link", () => {
        renderWithProviders(<Link disabled>Disabled Link</Link>);
        expect(screen.getByText("Disabled Link")).toHaveClass("text-gray-400 cursor-not-allowed");
    });

    test("displays tooltip", () => {
        renderWithProviders(<Link tooltip="Tooltip Text">Link with Tooltip</Link>);
        expect(screen.getByText("Link with Tooltip")).toHaveAttribute("title", "Tooltip Text");
    });

    test("applies custom styles", () => {
        renderWithProviders(<Link sx={{ color: "red" }}>Custom Styled Link</Link>);
        expect(screen.getByText("Custom Styled Link")).toHaveStyle("color: red");
    });
});