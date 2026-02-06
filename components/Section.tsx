import React from 'react';
import styles from './Section.module.css';
import Container from './Container';

export interface SectionProps {
  children: React.ReactNode;
  background?: 'white' | 'light';
  className?: string;
  containerized?: boolean;
  id?: string;
}

export default function Section({
  children,
  background = 'white',
  className,
  containerized = true,
  id
}: SectionProps) {
  const classNames = [
    styles.section,
    styles[background],
    className
  ].filter(Boolean).join(' ');

  return (
    <section id={id} className={classNames}>
      {containerized ? (
        <Container>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
