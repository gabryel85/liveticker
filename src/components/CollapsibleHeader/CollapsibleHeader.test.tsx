import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CollapsibleHeader } from './CollapsibleHeader';

describe('CollapsibleHeader', () => {
  test('renders CollapsibleHeader component', () => {
    render(<CollapsibleHeader disconnect={() => {}} />);

    const collapsibleHeader = screen.getByTestId('collapsible-header');
    expect(collapsibleHeader).toBeInTheDocument();
  });

  test('renders NotificationsIcon component', () => {
    render(<CollapsibleHeader disconnect={() => {}} />);

    const notificationsIcon = screen.getByTestId('notifications-icon');
    expect(notificationsIcon).toBeInTheDocument();
  });

  test('renders PowerOffIcon component', () => {
    render(<CollapsibleHeader disconnect={() => {}} />);

    const powerOffIcon = screen.getByTestId('power-off-icon');
    expect(powerOffIcon).toBeInTheDocument();
  });

  test('calls disconnect function when notification button is clicked', () => {
    const disconnectMock = jest.fn();

    render(<CollapsibleHeader isActive={false} disconnect={disconnectMock} />);

    const notificationButton = screen.getByTestId('wss-off');
    fireEvent.click(notificationButton);

    expect(disconnectMock).toHaveBeenCalled();
  });
});
