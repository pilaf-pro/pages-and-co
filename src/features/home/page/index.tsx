import { type JSX } from 'react';
import Hero from '@/features/home/components/Hero';
import Categories from '@/features/home/components/Categories';
import FeaturedGrid from '@/features/home/components/FeaturedGrid';
import PromoBanner from '@/features/home/components/PromoBanner';
import FadeInSection from '@/components/ui/FadeInSection';
import books from '@/data/books.json';
import styles from './index.module.css';

const HomePage = (): JSX.Element => {
  const editorsPicks = books.filter((b) => b.isEditorsPick);
  const bestsellers = books.filter((b) => b.isBestseller);
  const newArrivals = books.filter((b) => b.isNewArrival);

  return (
    <div className={styles.page}>
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <Categories />
      </FadeInSection>
      <FadeInSection>
        <FeaturedGrid
          kicker="EDITOR'S PICKS"
          title="Featured this month"
          books={editorsPicks}
        />
      </FadeInSection>
      <FadeInSection>
        <PromoBanner />
      </FadeInSection>
      <FadeInSection>
        <FeaturedGrid
          kicker="MOST LOVED"
          title="Bestsellers"
          books={bestsellers}
        />
      </FadeInSection>
      <FadeInSection>
        <FeaturedGrid
          kicker="HOT OFF THE PRESS"
          title="New arrivals"
          books={newArrivals}
        />
      </FadeInSection>
    </div>
  );
};

export default HomePage;
