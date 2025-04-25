import React from 'react';

//@ts-expect-error
import styles from './loader.module.scss';

export const Loader = () => (
  <div className={styles.wrapper}>
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='12' cy='12' r='8' />
    </svg>
  </div>
);
