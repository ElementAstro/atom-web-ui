// src/components/Alert.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Alert } from './Alert';
import { ThemeProvider } from '../context/ThemeContext';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider initialTheme="light">{ui}</ThemeProvider>
  );
};

describe('Alert Component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    test('renders with default props', () => {
      renderWithTheme(
        <Alert isOpen={true} message="Test message" />
      );
      expect(screen.getByText('Test message')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveClass('bg-blue-50');
    });

    test('renders different alert types', () => {
      const { rerender } = renderWithTheme(
        <Alert isOpen={true} message="Test" type="success" />
      );
      expect(screen.getByRole('alert')).toHaveClass('bg-green-50');

      rerender(
        <ThemeProvider initialTheme="light">
          <Alert isOpen={true} message="Test" type="warning" />
        </ThemeProvider>
      );
      expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50');

      rerender(
        <ThemeProvider initialTheme="light">
          <Alert isOpen={true} message="Test" type="error" />
        </ThemeProvider>
      );
      expect(screen.getByRole('alert')).toHaveClass('bg-red-50');
    });

    test('renders with title', () => {
      renderWithTheme(
        <Alert isOpen={true} message="Message" title="Title" />
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    test('renders with custom icon', () => {
      renderWithTheme(
        <Alert 
          isOpen={true} 
          message="Test" 
          icon={<span data-testid="custom-icon">🔔</span>} 
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    test('renders with actions', () => {
      renderWithTheme(
        <Alert 
          isOpen={true} 
          message="Test" 
          actions={<button>Action</button>} 
        />
      );
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    test('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      renderWithTheme(
        <Alert isOpen={true} message="Test" onClose={onClose} />
      );
      
      fireEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('does not show close button when closable is false', () => {
      renderWithTheme(
        <Alert isOpen={true} message="Test" closable={false} />
      );
      expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    });

    test('auto-closes after duration', () => {
      jest.useFakeTimers();
      const onClose = jest.fn();
      
      renderWithTheme(
        <Alert isOpen={true} message="Test" duration={1000} onClose={onClose} />
      );
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(onClose).toHaveBeenCalledTimes(1);
      jest.useRealTimers();
    });
  });

  // Style Tests
  describe('Style Variations', () => {
    test('applies correct rounded classes', () => {
      const { rerender } = renderWithTheme(
        <Alert isOpen={true} message="Test" rounded="none" />
      );
      expect(screen.getByRole('alert')).toHaveClass('rounded-none');

      rerender(
        <ThemeProvider initialTheme="light">
          <Alert isOpen={true} message="Test" rounded="full" />
        </ThemeProvider>
      );
      expect(screen.getByRole('alert')).toHaveClass('rounded-full');
    });

    test('applies correct shadow classes', () => {
      const { rerender } = renderWithTheme(
        <Alert isOpen={true} message="Test" shadow="none" />
      );
      expect(screen.getByRole('alert')).toHaveClass('shadow-none');

      rerender(
        <ThemeProvider initialTheme="light">
          <Alert isOpen={true} message="Test" shadow="xl" />
        </ThemeProvider>
      );
      expect(screen.getByRole('alert')).toHaveClass('shadow-xl');
    });

    test('merges custom className', () => {
      renderWithTheme(
        <Alert isOpen={true} message="Test" className="custom-class" />
      );
      expect(screen.getByRole('alert')).toHaveClass('custom-class');
    });
  });

  // Animation Tests
  describe('Animations', () => {
    test('applies correct animation preset', () => {
      const { rerender } = renderWithTheme(
        <Alert isOpen={true} message="Test" animationPreset="fade" />
      );
      expect(screen.getByRole('alert')).toHaveStyle({ opacity: 1 });

      rerender(
        <ThemeProvider initialTheme="light">
          <Alert isOpen={true} message="Test" animationPreset="slide" />
        </ThemeProvider>
      );
      expect(screen.getByRole('alert')).toHaveStyle({ transform: 'translateY(0px)' });
    });

    test('handles visibility toggle correctly', () => {
      const { rerender } = renderWithTheme(
        <Alert isOpen={true} message="Test" />
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();

      rerender(
        <ThemeProvider initialTheme="light">
          <Alert isOpen={false} message="Test" />
        </ThemeProvider>
      );
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});