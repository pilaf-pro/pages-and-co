import { type JSX } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import styles from './index.module.css';

const slides = [
  {
    id: 1,
    kicker: 'STAFF FAVOURITES',
    title: (
      <>
        The shelves
        <br />
        we keep
        <br />
        coming back to
      </>
    ),
    desc: (
      <>
        Our booksellers pick the titles they can't stop pressing
        <br />
        into customers' hands.
      </>
    ),
    btnText: 'Browse bestsellers',
  },
  {
    id: 2,
    kicker: 'NEW ARRIVALS',
    title: (
      <>
        Discover
        <br />
        your next
        <br />
        favourite book
      </>
    ),
    desc: (
      <>
        Explore the latest additions to our collection
        <br />
        handpicked just for you.
      </>
    ),
    btnText: 'Shop new arrivals',
  },
  {
    id: 3,
    kicker: "EDITOR'S PICKS",
    title: (
      <>
        Stories that
        <br />
        stay with you
        <br />
        long after
      </>
    ),
    desc: (
      <>
        Dive into the most captivating reads
        <br />
        of this season.
      </>
    ),
    btnText: "View editor's picks",
  },
];

const Hero = (): JSX.Element => {
  return (
    <section className="container">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: `.${styles['hero__nav--next']}`,
          prevEl: `.${styles['hero__nav--prev']}`,
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className={styles.hero}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.hero__slide}>
              <div className={styles.hero__content}>
                <p className={styles.hero__kicker}>{slide.kicker}</p>
                <h1 className={styles.hero__title}>{slide.title}</h1>
                <p className={styles.hero__desc}>{slide.desc}</p>
                <button className={styles.hero__btn}>{slide.btnText}</button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button className={`${styles.hero__nav} ${styles['hero__nav--prev']}`}>
          <ChevronLeftIcon />
        </button>
        <button className={`${styles.hero__nav} ${styles['hero__nav--next']}`}>
          <ChevronRightIcon />
        </button>
      </Swiper>
    </section>
  );
};

export default Hero;
