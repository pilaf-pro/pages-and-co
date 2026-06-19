import { type JSX } from "react";
import styles from "./index.module.css";

const categories = [
  { name: "Fiction", count: 3, color: "var(--card-brown)" },
  { name: "Mystery", count: 2, color: "var(--card-blue)" },
  { name: "Sci-Fi", count: 2, color: "var(--card-teal)" },
  { name: "Poetry", count: 2, color: "var(--card-red)" },
  { name: "Children", count: 2, color: "var(--card-yellow)" },
  { name: "Non-fiction", count: 2, color: "var(--card-purple)" },
];

const Categories = (): JSX.Element => {
  return (
    <section className="container">
      <div className={styles.categories}>
        <div className={styles.categories__header}>
          <p className={styles.categories__kicker}>FIND YOUR SHELF</p>
          <h2 className={styles.categories__title}>Browse by genre</h2>
        </div>

        <div className={styles.categories__grid}>
          {categories.map((cat) => (
            <a
              href="#"
              key={cat.name}
              className={styles.category}
              style={{ backgroundColor: cat.color }}
            >
              <h3 className={styles.category__name}>{cat.name}</h3>
              <p className={styles.category__count}>{cat.count} titles</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
