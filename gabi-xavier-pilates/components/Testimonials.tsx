import React from 'react';
import styles from './Testimonials.module.css';
import Card from './Card';

export interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  location?: string;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className={styles.grid}>
      {testimonials.map((testimonial, index) => (
        <Card key={index} className={styles.testimonialCard}>
          <div className={styles.rating}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < testimonial.rating ? styles.starFilled : styles.starEmpty}
              >
                ★
              </span>
            ))}
          </div>
          <p className={styles.comment}>&ldquo;{testimonial.comment}&rdquo;</p>
          <div className={styles.author}>
            <p className={styles.name}>{testimonial.name}</p>
            {testimonial.location && (
              <p className={styles.location}>{testimonial.location}</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
