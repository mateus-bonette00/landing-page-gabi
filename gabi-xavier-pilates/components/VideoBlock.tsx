import React from 'react';
import styles from './VideoBlock.module.css';

export interface VideoBlockProps {
  title: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

export default function VideoBlock({
  title,
  description,
  videoUrl,
  thumbnailUrl
}: VideoBlockProps) {
  return (
    <div className={styles.videoBlock}>
      <div className={styles.videoContainer}>
        {videoUrl ? (
          <iframe
            className={styles.video}
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className={styles.placeholder}
            style={{
              backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : undefined
            }}
          >
            <div className={styles.playButton}>▶</div>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
