import React, { FC } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import NotificationsIcon from '../NotificationsIcon';
import PowerOffIcon from '../PowerOffIcon';
import Button from '../../ui/Button';
import styles from './styles.module.scss';

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
        <div className={styles.realTime}>
          <NotificationsIcon isActive={isActive} />
          <div className={styles.notificationText}>REAL TIME</div>
        </div>
        <Button variant="rounded" onClick={disconnect} transparent>
          <IoIosNotificationsOutline size={16} />
        </Button>
        <Button variant="rounded" onClick={disconnect} transparent>
          <PowerOffIcon isActive={isActive} />
        </Button>
      </div>
    </div>
  );
};
