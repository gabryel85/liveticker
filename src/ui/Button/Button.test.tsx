import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  test('renders Button component with default styles', () => {
    render(<Button>Hello</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Hello');
    expect(button).not.toHaveClass('rounded');
    expect(button).not.toHaveClass('transparent');
  });

  test('renders Button component with rounded variant', () => {
    render(<Button variant="rounded">Click me</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('rounded');
    expect(button).not.toHaveClass('default');
    expect(button).not.toHaveClass('transparent');
  });

  test('renders Button component with transparent style', () => {
    render(<Button transparent>Submit</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
    expect(button).toHaveClass('transparent');
    expect(button).not.toHaveClass('default');
    expect(button).not.toHaveClass('rounded');
  });

  test('calls onClick function when button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
