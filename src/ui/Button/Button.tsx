import React, { FC, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  variant?: 'default' | 'rounded';
  transparent?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  children,
  variant = 'default',
  transparent = false,
  ...rest
}) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.rounded]: variant === 'rounded',
        [styles.transparent]: transparent,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};
