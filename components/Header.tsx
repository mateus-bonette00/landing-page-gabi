import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import Container from './Container';

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Image
              src="/logo-gabi-xavier.png"
              alt="Gabi Xavier - Studio de Pilates e Fisioterapia"
              width={80}
              height={80}
              className={styles.logoImage}
              priority
            />
            <div className={styles.logoTextContainer}>
              <h1 className={styles.logoText}>Gabi Xavier</h1>
              <p className={styles.logoSubtext}>Studio de Pilates e Fisioterapia</p>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
