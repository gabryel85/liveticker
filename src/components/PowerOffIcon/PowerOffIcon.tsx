import React, { FC } from 'react';
import { FaPowerOff } from 'react-icons/fa';
import clsx from 'clsx';
import styles from './styles.module.scss';

type Props = {
  isActive?: boolean;
};

export const PowerOffIcon: FC<Props> = ({ isActive }) => {
  return (
    <FaPowerOff
      className={clsx('active', { [styles.inactive]: isActive })}
      data-testid={'power-off-icon'}
    />
  );
};
