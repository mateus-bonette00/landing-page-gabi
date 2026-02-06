'use client';

import React, { useState, useEffect } from 'react';
import styles from './StickyMobileCTA.module.css';
import Button from './Button';

export interface StickyMobileCTAProps {
  text: string;
  onClick: () => void;
}

export default function StickyMobileCTA({ text, onClick }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o CTA após rolar 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.sticky}>
      <Button fullWidth size="large" onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}
