import React, { FC, useMemo } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { BookItem } from './BookItem';
import { BookRow } from './BookRow';

interface BookSideProps {
  data: any[];
  header: string[];
  title: string;
}

export const BookSide: FC<BookSideProps> = ({ data, header, title }) => {
  const isLoading = useMemo(() => !data || data.length === 0, [data]);

  const isBids = useMemo(() => title === 'bids', [title]);

  const background = isBids ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)';
  const gradientDirection = isBids ? 'right' : 'left';

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const amount = parseFloat(item.amount);
      return isBids ? amount > 0 : amount < 0;
    });
  }, [data, isBids]);

  return (
    <div
      className={clsx(styles.bookSide, styles.bookPanel)}
      data-testid="book-side"
    >
      <div className={styles.bookHeader}>
        {header.map((item, index) => (
          <div key={index} className={styles.headerItem}>
            {item}
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className={clsx(styles.bookRow, styles.loadingEffect)}>
          {[...Array(40)].map((_, index) => (
            <div key={index} className={clsx(styles.rowItem)}>
              &nbsp;
            </div>
          ))}
        </div>
      ) : (
        filteredData.map((item, index) => (
          <BookRow
            background={background}
            gradientDirection={gradientDirection}
            progress={item.percent}
            key={index}
          >
            {header.map((headerItem, i) => (
              <BookItem key={i}>{item[headerItem.toLowerCase()]}</BookItem>
            ))}
          </BookRow>
        ))
      )}
    </div>
  );
};
