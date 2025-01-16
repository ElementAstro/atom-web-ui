// src/components/Calendar.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Calendar from './Calendar';
import { ThemeProvider } from '../context/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Calendar Component', () => {
  describe('Basic Rendering', () => {
    test('renders with default props', () => {
      renderWithTheme(<Calendar />);
      expect(screen.getByLabelText('Calendar')).toBeInTheDocument();
    });

    test('renders in disabled state', () => {
      renderWithTheme(<Calendar disabled />);
      const button = screen.getByLabelText('Calendar');
      expect(button).toBeDisabled();
    });

    test('shows current date on initial render', () => {
      renderWithTheme(<Calendar />);
      const today = new Date().toLocaleDateString('en-US');
      expect(screen.getByLabelText('Calendar')).toHaveTextContent(today);
    });
  });

  describe('Calendar Toggle', () => {
    test('opens calendar on button click', async () => {
      renderWithTheme(<Calendar />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('calls onCalendarToggle when calendar is opened/closed', async () => {
      const onCalendarToggle = jest.fn();
      renderWithTheme(<Calendar onCalendarToggle={onCalendarToggle} />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      expect(onCalendarToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('Date Selection', () => {
    test('calls onDateChange when date is selected', async () => {
      const onDateChange = jest.fn();
      renderWithTheme(<Calendar onDateChange={onDateChange} />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '2024-01-01');
      expect(onDateChange).toHaveBeenCalled();
    });

    test('respects min date constraint', async () => {
      const minDate = new Date('2024-01-01');
      renderWithTheme(<Calendar minDate={minDate} />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('min', '2024-01-01');
    });
  });

  describe('Time Selection', () => {
    test('shows time select when showTimeSelect is true', async () => {
      renderWithTheme(<Calendar showTimeSelect />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    test('calls onTimeChange when time is selected', async () => {
      const onTimeChange = jest.fn();
      renderWithTheme(<Calendar onTimeChange={onTimeChange} showTimeSelect />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      
      const select = screen.getByRole('combobox');
      await userEvent.selectOptions(select, '13:00');
      expect(onTimeChange).toHaveBeenCalled();
    });
  });

  describe('Theme and Position', () => {
    test('applies correct theme classes', async () => {
      renderWithTheme(<Calendar theme="dark" />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      expect(screen.getByRole('textbox').parentElement).toHaveClass('bg-gray-900');
    });

    test('applies correct position classes', async () => {
      renderWithTheme(<Calendar position="top-right" />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      expect(screen.getByRole('textbox').parentElement).toHaveClass('top-0 right-0');
    });
  });

  describe('Clear Functionality', () => {
    test('clears selected date when clear button is clicked', async () => {
      const onDateChange = jest.fn();
      renderWithTheme(<Calendar clearable onDateChange={onDateChange} />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      
      const clearButton = screen.getByText('清除');
      await userEvent.click(clearButton);
      expect(onDateChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Event Handlers', () => {
    test('calls onFocus when calendar receives focus', async () => {
      const onFocus = jest.fn();
      renderWithTheme(<Calendar onFocus={onFocus} />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      const calendar = screen.getByRole('textbox').parentElement;
      fireEvent.focus(calendar!);
      expect(onFocus).toHaveBeenCalled();
    });

    test('calls onKeyDown when key is pressed', async () => {
      const onKeyDown = jest.fn();
      renderWithTheme(<Calendar onKeyDown={onKeyDown} />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      const calendar = screen.getByRole('textbox').parentElement;
      fireEvent.keyDown(calendar!, { key: 'Escape' });
      expect(onKeyDown).toHaveBeenCalled();
    });
  });

  describe('Month and Year Navigation', () => {
    test('navigates months correctly', async () => {
      renderWithTheme(<Calendar showMonthDropdown />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      
      const nextMonth = screen.getByLabelText('Next Month');
      await userEvent.click(nextMonth);
      const currentMonth = new Date();
      currentMonth.setMonth(currentMonth.getMonth() + 1);
      expect(screen.getByText(currentMonth.toLocaleString('en-US', { month: 'long' }))).toBeInTheDocument();
    });

    test('navigates years correctly', async () => {
      renderWithTheme(<Calendar />);
      const button = screen.getByLabelText('Calendar');
      await userEvent.click(button);
      
      const nextYear = screen.getByLabelText('Next Year');
      await userEvent.click(nextYear);
      const currentYear = new Date().getFullYear() + 1;
      expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
    });
  });
});