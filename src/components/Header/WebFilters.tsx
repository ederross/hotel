import React from 'react';
import { Container } from './styles';
import styles from './webFilters.module.scss';
import { DateRangePicker } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Add, RemoveOutlined } from '@mui/icons-material';

interface IWebFilters {
  closeDatePickerWeb: () => void;
  customDayContent: (day: any) => JSX.Element;
  dateState: {
    startDate: Date;
    endDate: Date;
    key: string;
    adults: number;
    children: number;
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

  const handleUpdateState = (props: Object) =>
    setDateState([{ ...dateState[0], ...props }]);

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
            transform: inputGuest && 'translate(-8%, 8%)',
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
                      onChange={(item) =>
                        setDateState([
                          { ...dateState[0], ...item.selection },
                        ] as any)
                      }
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
                <>
                  <div className={styles.guestsContainer}>
                    <h4>{t('adult_many')}</h4>
                    <div className={styles.addButtons}>
                      <button
                        disabled={dateState[0].adults < 2}
                        onClick={() =>
                          handleUpdateState({ adults: dateState[0].adults - 1 })
                        }
                      >
                        <RemoveOutlined className={styles.removeIcon} />
                      </button>
                      <h5>{dateState[0].adults}</h5>
                      <button
                        onClick={() =>
                          handleUpdateState({ adults: dateState[0].adults + 1 })
                        }
                      >
                        <Add className={styles.addIcon} />
                      </button>
                    </div>
                  </div>
                  <div
                    className={styles.guestsContainer}
                    style={{ marginTop: '1.5rem', border: 'none' }}
                  >
                    <h4>{t('children_many')}</h4>
                    <div className={styles.addButtons}>
                      <button
                        disabled={dateState[0].children <= 0}
                        onClick={() =>
                          handleUpdateState({
                            children: dateState[0].children - 1,
                          })
                        }
                      >
                        <RemoveOutlined className={styles.removeIcon} />
                      </button>
                      <h5>{dateState[0].children}</h5>
                      <button
                        onClick={() =>
                          handleUpdateState({
                            children: dateState[0].children + 1,
                          })
                        }
                      >
                        <Add className={styles.addIcon} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.childrenAgeContainer}>
                    <h4 className={styles.title}>{t('selectAge')}</h4>
                    <div className={styles.sideToSideAgeControllerContainer}>
                      <h4>{t('kid')}</h4>
                      <select name="pets" id="pet-select">
                        <option value="">Idade</option>
                        <option value="one">1</option>
                      </select>
                    </div>
                  </div>
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
          background: 'rgba(0,0,0,0.6)',
        }}
      ></div>
    </>
  );
};

export default WebFilters;
