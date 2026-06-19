import { type JSX } from 'react';
import styles from './index.module.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps): JSX.Element => {
  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>{title}</h1>
      {subtitle && <p className={styles.header__subtitle}>{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
