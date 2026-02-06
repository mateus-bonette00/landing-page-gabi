import React from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
      <span className={styles.label}>
        {current} de {total}
      </span>
    </div>
  );
}
