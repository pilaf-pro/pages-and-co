import { type JSX, type ReactNode, useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

interface FadeInSectionProps {
  children: ReactNode;
}

const FadeInSection = ({ children }: FadeInSectionProps): JSX.Element => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${styles.fadeIn} ${isVisible ? styles.isVisible : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
