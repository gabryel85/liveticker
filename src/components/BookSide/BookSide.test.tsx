import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { BookSide } from './BookSide';

describe('BookSide', () => {
  test('renders BookSide component with BookRow and BookItem', () => {
    const data = [
      { amount: '0.5', percent: 50, price: 100 },
      { amount: '0.8', percent: 80, price: 120 },
    ];

    const header = ['Amount', 'Percent', 'Price'];
    const title = 'bids';

    render(<BookSide data={data} header={header} title={title} />);

    const bookSide = screen.getByTestId('book-side');
    expect(bookSide).toBeInTheDocument();

    const bookRows = screen.getAllByTestId('book-row');
    expect(bookRows).toHaveLength(data.length);

    bookRows.forEach((bookRow, index) => {
      const bookItems = within(bookRow).getAllByTestId('book-item');
      expect(bookItems).toHaveLength(header.length);
    });
  });
});
