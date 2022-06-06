import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.scss';

const RoomDetails = () => {
  return (
    <>
      <div className={styles.mainBox}>
        <div className={styles.contentBox}>
          <div className={styles.imgsBox}>
            <Swiper
              pagination={{ clickable: true }}
              spaceBetween={0}
              slidesPerView={'auto'}
              className={styles.swiperImgsBox}
              onSlideChange={(a) => console.log('slide change', a.activeIndex)}
              scrollbar={{ draggable: true }}
              autoplay={true}
              effect="cube"
            >
              <SwiperSlide
                style={{
                  width: '100%',
                  backgroundImage: `url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,

                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  width: '100%',
                  backgroundImage: `url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,

                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></SwiperSlide>
              <SwiperSlide
                style={{
                  width: '100%',
                  backgroundImage: `url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,

                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></SwiperSlide>
            </Swiper>

            <div
              className={styles.imgLeftSide}
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
                backgroundSize: 'cover',
              }}
            ></div>
            <div className={styles.imgRightSide}>
              <div
                className={styles.secondImgBox}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
                  backgroundSize: 'cover',
                }}
              ></div>
              <div
                className={styles.thirdImgBox}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.infoBox}>
              <div style={{ borderBottom: '1px solid #dadada', width: 'auto' }}>
                <h4 style={{ marginTop: '2rem' }}>asdasd</h4>
                <h1>asdasd</h1>

                <p style={{ marginBottom: '2rem', color: '#919191' }}>
                  asdasdasdasd
                </p>
              </div>
              <div style={{ borderBottom: '1px solid #dadada' }}>
                <h3>Regulamento</h3>
                <p>asdasdas</p>
              </div>
            </div>
            <div className={styles.ctaBoxHolder}>
              <div className={styles.ctaBox}>
                <div>
                  <h3>asdasd</h3>
                  <h4>Válido até 23 de Setembro de 2022</h4>
                </div>
                <div>
                  <h5>
                    <span
                      style={{
                        textDecoration: 'line-through',
                        color: '#CFCFCF',
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      de R$2323
                      {/* {FormatterCurrency({
                          num: 4,
                          prefix: 'R$',
                          decimals: 2,
                        })}{' '} */}
                    </span>{' '}
                    por R$2323
                    {/* {FormatterCurrency({
                        num: 2,
                        prefix: 'R$',
                        decimals: 2,
                      })} */}
                  </h5>

                  <button>Gerar vouchear</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
