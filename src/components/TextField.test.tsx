// src/components/TextField.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TextField from "./TextField";
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

describe("TextField", () => {
    test("renders TextField with default props", () => {
        renderWithProviders(<TextField value="" onChange={() => {}} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("renders TextField with label", () => {
        renderWithProviders(<TextField value="" onChange={() => {}} label="Test Label" />);
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    test("renders TextField with custom class, border color, and background color", () => {
        renderWithProviders(
            <TextField
                value=""
                onChange={() => {}}
                customClass="custom-class"
                color="error"
                variant="outlined"
            />
        );
        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("custom-class");
        expect(input).toHaveClass("border-red-600");
    });

    test("handles onChange event", () => {
        const handleChange = jest.fn();
        renderWithProviders(<TextField value="" onChange={handleChange} />);
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "New Value" } });
        expect(handleChange).toHaveBeenCalled();
    });

    test("handles onFocus and onBlur events", () => {
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        renderWithProviders(
            <TextField value="" onChange={() => {}} onFocus={handleFocus} onBlur={handleBlur} />
        );
        const input = screen.getByRole("textbox");
        fireEvent.focus(input);
        expect(handleFocus).toHaveBeenCalled();
        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalled();
    });

    test("displays helper text", () => {
        renderWithProviders(<TextField value="" onChange={() => {}} helperText="Helper text" />);
        expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    test("displays error state", () => {
        renderWithProviders(<TextField value="" onChange={() => {}} error helperText="Error text" />);
        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("border-red-600");
        expect(screen.getByText("Error text")).toHaveClass("text-red-600");
    });
});