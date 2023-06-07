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
        <RxDotFilled
          size={24}
          className={styles.active}
          data-testid={'active-dot'}
        />
      ) : (
        <RxDot size={24} className={styles.dot} data-testid={'inactive-dot'} />
      )}
    </div>
  );
};
