import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  /* font-family: 'DM Sans'; */
  margin-bottom: 1rem;

  .button {
    transition: transform 0.2s;
    cursor: pointer;

    &:hover,
    &:focus {
      transform: scale(0.95);
      box-shadow: 0 0 0 1px currentColor;
    }
    &:disabled {
      opacity: 0.5;
      box-shadow: none;
    }
  }

  .guests {
    width: 100%;
    padding-top: 3rem;
  }
  .inputs {
    display: flex;
    padding-top: 1rem;
  }

  .inner {
    width: 100%;
    max-width: 720px;
    height: fit-content;
    max-height: calc(100vh - 18rem);
    overflow: scroll;
    opacity: 0;
    transition: opacity 0.5s 0.2s;
    position: relative;
    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }
  }

  .close {
    position: absolute;
    top: 0;
    right: 0.5rem;
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    background: #ff585d20;
    color: var(--red);
    border-radius: 99px;
  }

  &.visible {
    transform: translate(-50%, 0);

    .inner {
      opacity: 1;
    }
  }

  .rdrWeekDay  {
    font-size: 14px;
  }

  l

  .rdrCalendarWrapper {
    color: #000000;
    flex: 1;
  }

  .rdrMonth {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .rdrMonths {
    margin-top: -48px;
  }

  .rdrMonthAndYearPickers {
    display: none;
  }

  .rdrMonthName {
    align-self: center;
    text-transform: capitalize;
    color: black;
  }

  .rdrNextPrevButton {
    cursor: pointer;
    background: #eff2f7;
  }

  .rdrDateRangePickerWrapper {
    display: flex;
    justify-content: space-between;
  }
  .rdrDateDisplayWrapper {
    background: none;
  }
  .rdrDayDisabled {
    background-color: var(--light);
  }
  .rdrDateDisplayItem {
    border-radius: 200px;
    background-color: var(--light);
    input {
      color: var(--dark);
    }
  }
  .rdrDefinedRangesWrapper {
    border: none;
    border-radius: 2rem;
  }
  .rdrCalendarWrapper {
    background: none;
    color: var(--dark);
  }
  .rdrStaticRange {
    border: none;
    background: none;
    &:hover,
    &:focus {
      .rdrStaticRangeLabel {
        background: var(--gray);
      }
    }
  }
  .rdrDefinedRangesWrapper {
    display: none;
    margin-right: 1.5rem;
    padding-top: 0.75rem;
    background: var(--dark);
  }

  .rdrDayDisabled{
    background: transparent;
  }

  .rdrDayNumber {
    font-weight: 500;
  }
  .rdrDayNumber span {
    color: var(--dark-text);
  }
  .rdrDayPassive .rdrDayNumber span {
    color: var(--dark-text);
    opacity: 0.33;
  }
  .rdrDayToday .rdrDayNumber span:after {
    /* background: var(--primary-color); */
    background: red;
  }

  @media (min-width: 768px) {
    .rdrDefinedRangesWrapper {
      font-size: 13px;
    }
    .rdrCalendarWrapper {
      font-size: 13px;
    }
  }

  @media (min-width: 1024px) {
    .rdrDefinedRangesWrapper {
      font-size: 14px;
    }
    .rdrCalendarWrapper {
      font-size: 14px;
    }
  }

  /* @media (min-width: 1200px) {
    .rdrDefinedRangesWrapper {
      font-size: 14px;
    }
    .rdrCalendarWrapper {
      font-size: 14px;
    }
  } */
`;
