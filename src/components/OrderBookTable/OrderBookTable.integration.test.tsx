import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  selectWebSocketData,
  selectWebSocketActive,
} from '../../redux/selectors';
import { WebSocketState } from '../../redux/realtimeData/types';

const mockStore = configureStore<Partial<{ wss: WebSocketState }>>([]);

describe('WebSocketSelectors', () => {
  test('selectWebSocketData returns mapped WebSocket data', () => {
    const initialState: { wss: WebSocketState } = {
      wss: {
        data: [
          [100, 5, 0.5],
          [120, 3, 0.8],
        ],
        active: true,
        error: null,
      },
    };

    const store = mockStore(initialState);
    const { container } = render(
      <Provider store={store}>
        <div data-testid="data">
          {JSON.stringify(selectWebSocketData(store.getState() as any))}
        </div>
      </Provider>,
    );

    const dataElement = screen.getByTestId('data');
    expect(dataElement).toHaveTextContent(
      JSON.stringify([
        {
          price: '100',
          count: '5',
          amount: 0.5,
          total: '50',
          percent: 50,
        },
        {
          price: '120',
          count: '3',
          amount: 0.8,
          total: '96',
          percent: 80,
        },
      ]),
    );
  });

  test('selectWebSocketActive returns WebSocket active state', () => {
    const initialState: { wss: WebSocketState } = {
      wss: {
        data: [],
        active: true,
        error: null,
      },
    };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <div data-testid="active">
          {String(selectWebSocketActive(store.getState() as any))}
        </div>
      </Provider>,
    );

    const activeElement = screen.getByTestId('active');
    expect(activeElement).toHaveTextContent('true');
  });
});
