import { type JSX } from 'react';
import styles from './index.module.css';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  linkText?: string;
  linkHref?: string;
}

const SectionHeader = ({
  kicker,
  title,
  linkText,
  linkHref,
}: SectionHeaderProps): JSX.Element => {
  return (
    <div className={styles.header}>
      <div>
        <p className={styles.kicker}>{kicker}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {linkText && linkHref && (
        <a href={linkHref} className={styles.link}>
          {linkText} &rarr;
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
