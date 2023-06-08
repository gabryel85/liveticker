import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { createStore } from 'redux';
import App from './App';
import reducers from './redux/reducers';

test('renders learn react link', () => {
  const store = createStore(reducers);

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  const linkElement = screen.getByText(/ORDER BOOK/i);
  expect(linkElement).toBeInTheDocument();
});
