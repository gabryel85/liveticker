import React, { FC } from 'react';
import { RxDot, RxDotFilled } from 'react-icons/rx';
import styles from './styles.module.scss';

type Props = {
  isActive?: boolean;
};

export const NotificationsIcon: FC<Props> = ({ isActive }) => {
  return (
    <div>
      {isActive ? (
        <span data-testid={'active-dot'}>
          <RxDotFilled size={24} className={styles.active} />
        </span>
      ) : (
        <span data-testid={'inactive-dot'}>
          <RxDot size={24} className={styles.dot} />
        </span>
      )}
    </div>
  );
};
