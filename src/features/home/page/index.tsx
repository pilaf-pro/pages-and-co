import { type JSX } from "react";
import Hero from "@/features/home/components/Hero";
import Categories from "@/features/home/components/Categories";
import FeaturedGrid from "@/features/home/components/FeaturedGrid";
import PromoBanner from "@/features/home/components/PromoBanner";
import homeBooks from "@/data/homeBooks.json";

const HomePage = (): JSX.Element => {
  return (
    <div style={{ paddingTop: "24px" }}>
      <Hero />
      <Categories />
      <FeaturedGrid
        kicker="EDITOR'S PICKS"
        title="Featured this month"
        books={homeBooks.editorsPicks}
      />
      <PromoBanner />
      <FeaturedGrid
        kicker="MOST LOVED"
        title="Bestsellers"
        books={homeBooks.bestsellers}
      />
      <FeaturedGrid
        kicker="HOT OFF THE PRESS"
        title="New arrivals"
        books={homeBooks.newArrivals}
      />
    </div>
  );
};

export default HomePage;
