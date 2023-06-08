import React from 'react';
import { render, screen } from '@testing-library/react';
import clsx from 'clsx';
import { PowerOffIcon } from './PowerOffIcon';
import mocked = jest.mocked;

jest.mock('clsx');

describe('PowerOffIcon', () => {
  test('renders PowerOffIcon component', () => {
    render(<PowerOffIcon />);

    const powerOffIcon = screen.getByTestId('power-off');
    expect(powerOffIcon).toBeInTheDocument();
  });

  test('applies active class when isActive is true', () => {
    mocked(clsx).mockReturnValueOnce('active');

    render(<PowerOffIcon isActive={true} />);

    const powerOffIcon = screen.getByTestId('power-off-icon');
    expect(powerOffIcon).toHaveClass('active');
  });

  test('applies inactive class when isActive is false', () => {
    mocked(clsx).mockReturnValueOnce('inactive');

    render(<PowerOffIcon isActive={false} />);

    const powerOffIcon = screen.getByTestId('power-off-icon');
    expect(powerOffIcon).toHaveClass('inactive');
  });
});
