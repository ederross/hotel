import React from 'react';
import { Container } from './styles';
import styles from './styles.module.scss';
import { DateRangePicker } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

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
        <div className={styles.controlsContainerHolder}>
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
