import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

interface BookItemProps {
  children: ReactNode;
}

export const BookItem: FC<BookItemProps> = ({ children }) => {
  return (
    <div className={styles.bookItem} data-testid="book-item">
      {children}
    </div>
  );
};
