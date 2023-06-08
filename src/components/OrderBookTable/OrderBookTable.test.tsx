import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OrderBookTable from './OrderBookTable';

const mockStore = configureStore([]);

describe('OrderBookTable', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      wss: {
        data: [],
        active: false,
      },
    });
  });

  test('renders OrderBookTable component', () => {
    render(
      <Provider store={store}>
        <OrderBookTable />
      </Provider>,
    );

    const Books = screen.getByTestId('order-book-table');
    expect(Books).toBeInTheDocument();
  });
});
