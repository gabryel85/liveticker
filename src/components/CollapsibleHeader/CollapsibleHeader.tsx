import React, { FC } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { RxDot, RxDotFilled } from 'react-icons/rx';
import { FaPowerOff } from 'react-icons/fa';

type Props = {
  isActive?: boolean;
  disconnect: () => void;
};

export const CollapsibleHeader: FC<Props> = ({ isActive, disconnect }) => {
  return (
    <div className={styles.collapsibleHeader}>
      <div>
        <span className={styles.collapsibleTitle}>ORDER BOOK</span>
      </div>
      <div className={styles.notifications}>
        <IoIosNotificationsOutline size={24} />
        <div>
          {isActive ? (
            <RxDotFilled size={16} className={styles.active} />
          ) : (
            <RxDot size={16} className={styles.dot} />
          )}
        </div>
        <span className={clsx(styles.notificationText)}>REAL TIME</span>
        <button onClick={disconnect}>
          <FaPowerOff
            className={clsx(styles.active, {
              [styles.deactive]: isActive,
            })}
          />
        </button>
      </div>
    </div>
  );
};
