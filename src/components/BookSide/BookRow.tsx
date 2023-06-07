import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface BookRowProps {
  children: ReactNode;
  background?: string;
  progress?: number;
  gradientDirection?: 'left' | 'right';
  animated?: boolean;
}

export const BookRow: FC<BookRowProps> = ({
  children,
  background,
  progress = 100,
  gradientDirection = 'left',
  animated = true,
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const gradientPercentage = `${normalizedProgress}%`;

  const gradientStyle =
    gradientDirection === 'left'
      ? `linear-gradient(to right, ${background} ${gradientPercentage}, transparent 0%)`
      : `linear-gradient(to left, ${background} ${gradientPercentage}, transparent 0%)`;

  const rowStyle = {
    background: background ? gradientStyle : undefined,
  };

  const rowClassName = clsx(styles.bookRow, {
    [styles.animated]: animated,
  });

  return (
    <div className={rowClassName} style={rowStyle}>
      {children}
    </div>
  );
};
