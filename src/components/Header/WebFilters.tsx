import React from 'react';
import { Container } from './styles';
import styles from './webFilters.module.scss';
import { DateRangePicker } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Add } from '@mui/icons-material';

interface IWebFilters {
  closeDatePickerWeb: () => void;
  customDayContent: (day: any) => JSX.Element;
  dateState: {
    startDate: Date;
    endDate: Date;
    key: string;
  }[];
  setDateState: any;
  isCalendarVisible: boolean;
  inputGuest: boolean;
}

const WebFilters = ({
  closeDatePickerWeb,
  customDayContent,
  setDateState,
  dateState,
  isCalendarVisible,
  inputGuest,
}: IWebFilters) => {
  const { locale } = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <div className={styles.controlsFullContainer}>
        <div
          className={styles.controlsContainerHolder}
          style={{
            minWidth: inputGuest && 500,
            left: inputGuest && '50%',
            height: inputGuest && 'auto',
            paddingTop: inputGuest && '4rem',
            transform: inputGuest && 'translate(-16%, 16%)'
          }}
        >
          <div
            style={{
              position: 'relative',
            }}
          >
            <div
              style={{
                flex: 1,
                width: '100%',
                paddingBottom: 50,
              }}
            >
              {isCalendarVisible && (
                <>
                  <Container>
                    <DateRangePicker
                      onChange={(item) => setDateState([item.selection] as any)}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={dateState}
                      direction="horizontal"
                      showDateDisplay={false}
                      editableDateInputs={false}
                      showMonthAndYearPickers={false}
                      locale={locales[locale === 'ptBR' ? 'pt' : locale]}
                      inputRanges={[]}
                      staticRanges={[]}
                      dayContentRenderer={customDayContent}
                      minDate={new Date()}
                      rangeColors={['var(--primary-color)']}
                    />
                  </Container>

                  <h4>{t('NEXT-EVENTS')}</h4>
                  <div
                    style={{
                      flex: 1,
                      width: '100%',
                      minHeight: 200,
                      height: 'auto',
                      paddingTop: '1rem',
                    }}
                  ></div>
                </>
              )}

              {inputGuest && (
                <div className={styles.adultsContainer}>
                  <h4>Adultos</h4>
                  <div className={styles.addButtons}>
                    <button disabled>-</button>
                    <h5>0</h5>
                    <button>
                      <Add className={styles.addIcon} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={closeDatePickerWeb}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          background: 'rgba(0,0,0,0.5)',
        }}
      ></div>
    </>
  );
};

export default WebFilters;
