import React from 'react';
import { render, screen } from '@testing-library/react';
import { RxDot, RxDotFilled } from 'react-icons/rx';
import { NotificationsIcon } from './NotificationsIcon';

jest.mock('react-icons/rx', () => ({
  RxDot: jest.fn().mockReturnValue(null),
  RxDotFilled: jest.fn().mockReturnValue(null),
}));

describe('NotificationsIcon', () => {
  test('renders inactive dot when isActive is false', () => {
    render(<NotificationsIcon isActive={false} />);

    expect(RxDot).toHaveBeenCalledTimes(1);

    const inactiveDot = screen.getByTestId('inactive-dot');
    expect(inactiveDot).toBeInTheDocument();
  });

  test('renders active dot when isActive is true', () => {
    render(<NotificationsIcon isActive={true} />);

    expect(RxDotFilled).toHaveBeenCalledTimes(1);

    const activeDot = screen.getByTestId('active-dot');
    expect(activeDot).toBeInTheDocument();
  });
});
