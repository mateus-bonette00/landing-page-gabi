import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  const classNames = [
    styles.container,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {children}
    </div>
  );
}
