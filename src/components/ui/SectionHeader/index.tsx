import { type JSX } from 'react';
import styles from './index.module.css';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  linkText?: string;
  linkHref?: string;
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  hideLinkOnMobile?: boolean;
}

const SectionHeader = ({
  kicker,
  title,
  linkText,
  linkHref,
  onLinkClick,
  hideLinkOnMobile,
}: SectionHeaderProps): JSX.Element => {
  return (
    <div className={styles.header}>
      <div>
        <p className={styles.kicker}>{kicker}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {linkText && (linkHref || onLinkClick) && (
        <a
          href={linkHref || '#'}
          onClick={onLinkClick}
          className={`${styles.link} ${hideLinkOnMobile ? styles.hideOnMobile : ''}`}
        >
          {linkText} &rarr;
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
