'use client';

import React, { useState, useEffect } from 'react';
import styles from './TestimonialsCarousel.module.css';

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return parts[0][0];
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`${styles.testimonialCard} ${
              index === currentIndex ? styles.active : ''
            }`}
          >
            <div className={styles.testimonialHeader}>
              <div className={styles.avatar}>
                {getInitials(testimonial.name)}
              </div>
              <div className={styles.nameAndRating}>
                <h4 className={styles.name}>{testimonial.name}</h4>
                <div className={styles.rating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className={styles.comment}>{testimonial.comment}</p>
          </div>
        ))}
      </div>

      <button className={styles.navButton} onClick={goToPrevious}>
        ‹
      </button>
      <button className={`${styles.navButton} ${styles.navButtonNext}`} onClick={goToNext}>
        ›
      </button>

      <div className={styles.dots}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
