'use client';

import React, { useState } from 'react';
import styles from './FAQ.module.css';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      {items.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <button
            className={`${styles.question} ${openIndex === index ? styles.open : ''}`}
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
          </button>
          <div
            className={`${styles.answer} ${openIndex === index ? styles.show : ''}`}
            aria-hidden={openIndex !== index}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
