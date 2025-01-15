import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
import { ThemeProvider } from '../context/ThemeContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider initialTheme="light">
      {ui}
    </ThemeProvider>
  );
};

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    test('renders with default props', () => {
      renderWithProviders(<Button>Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-blue-500', 'rounded-md');
    });

    test('renders different sizes', () => {
      const { rerender } = renderWithProviders(<Button size="sm">Small</Button>);
      expect(screen.getByText('Small')).toHaveClass('px-3', 'py-1.5', 'text-sm');

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByText('Large')).toHaveClass('px-6', 'py-3', 'text-lg');
    });

    test('renders different colors', () => {
      const { rerender } = renderWithProviders(<Button color="success">Success</Button>);
      expect(screen.getByText('Success')).toHaveClass('bg-green-500');

      rerender(<Button color="danger">Danger</Button>);
      expect(screen.getByText('Danger')).toHaveClass('bg-red-500');
    });

    test('renders different shapes', () => {
      const { rerender } = renderWithProviders(<Button shape="pill">Pill</Button>);
      expect(screen.getByText('Pill')).toHaveClass('rounded-full');

      rerender(<Button shape="square">Square</Button>);
      expect(screen.getByText('Square')).toHaveClass('rounded-none');
    });
  });

  describe('Interactive States', () => {
    test('handles click events', () => {
      const handleClick = jest.fn();
      renderWithProviders(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('respects disabled state', () => {
      const handleClick = jest.fn();
      renderWithProviders(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      
      const button = screen.getByText('Disabled');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('shows loading state', () => {
      renderWithProviders(<Button loading>Loading</Button>);
      
      expect(screen.getByRole('button')).toHaveClass('cursor-wait');
      expect(screen.queryByText('Loading')).not.toBeInTheDocument();
      expect(screen.getByRole('button').querySelector('.animate-spin')).toBeInTheDocument();
    });
  });

  describe('Icon Functionality', () => {
    const TestIcon = () => <span data-testid="test-icon">★</span>;

    test('renders icon in left position', () => {
      renderWithProviders(
        <Button icon={{ position: 'left', element: <TestIcon /> }}>
          With Icon
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('flex-row');
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    test('renders icon in right position', () => {
      renderWithProviders(
        <Button icon={{ position: 'right', element: <TestIcon /> }}>
          With Icon
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('flex-row-reverse');
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  describe('Style Classes', () => {
    test('combines custom classes with default classes', () => {
      renderWithProviders(
        <Button className="custom-class" color="primary">
          Custom
        </Button>
      );
      
      const button = screen.getByText('Custom');
      expect(button).toHaveClass('custom-class', 'bg-blue-500');
    });

    test('applies focus styles', () => {
      renderWithProviders(<Button>Focus</Button>);
      
      const button = screen.getByText('Focus');
      expect(button).toHaveClass('focus:ring-2', 'focus:ring-offset-2');
    });
  });

  describe('Animation Properties', () => {
    test('has correct animation attributes', () => {
      renderWithProviders(<Button>Animate</Button>);
      
      const button = screen.getByText('Animate');
      expect(button).toHaveClass('transition-colors', 'duration-200');
    });

    test('disables animations when loading', () => {
      renderWithProviders(<Button loading>Loading</Button>);
      
      const button = screen.getByRole('button');
      const motionProps = button.getAttribute('style');
      expect(motionProps).not.toContain('scale');
    });
  });

  describe('Accessibility', () => {
    test('maintains button semantics', () => {
      renderWithProviders(<Button>Accessible</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type');
      expect(button).toBeInTheDocument();
    });

    test('handles keyboard interaction', () => {
      const handleClick = jest.fn();
      renderWithProviders(<Button onClick={handleClick}>Press</Button>);
      
      const button = screen.getByText('Press');
      button.focus();
      fireEvent.keyDown(button, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalled();
    });

    test('maintains focus outline', () => {
      renderWithProviders(<Button>Focus Ring</Button>);
      
      const button = screen.getByText('Focus Ring');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });
});