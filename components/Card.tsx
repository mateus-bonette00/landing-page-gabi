import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  const classNames = [
    styles.card,
    hover ? styles.hover : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {children}
    </div>
  );
}
