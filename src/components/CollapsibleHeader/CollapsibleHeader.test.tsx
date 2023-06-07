import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CollapsibleHeader } from './CollapsibleHeader';

describe('CollapsibleHeader', () => {
  it('should call the disconnect function on button click', () => {
    // Arrange
    const disconnectMock = jest.fn();
    render(<CollapsibleHeader disconnect={disconnectMock} />);

    // Act
    fireEvent.click(screen.getByRole('button'));

    // Assert
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('should render active dot when isActive prop is true', () => {
    const disconnectMock = jest.fn();
    render(<CollapsibleHeader isActive={true} disconnect={disconnectMock} />);

    // Assert
    expect(screen.getByTestId('active-dot')).toBeInTheDocument();
  });

  it('should render inactive dot when isActive prop is false', () => {
    const disconnectMock = jest.fn();
    render(<CollapsibleHeader isActive={false} disconnect={disconnectMock} />);

    // Assert
    expect(screen.getByTestId('inactive-dot')).toBeInTheDocument();
  });
});
