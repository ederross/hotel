import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  /* font-family: 'DM Sans'; */

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

  .weekdayDot {
    height: 4px;
    width: 4px;
    border-radius: 100%;
    background: var(--primary-color);
    position: absolute;
    top: 2px;
    left: 45%;
  }

  .priceDayIndicator {
    width: 52px;
    height: 8px;
    position: absolute;
    left: 0;
    bottom: -2px;
    padding: 0;
    margin: 0;

    p {
      line-height: 8px;
      font-size: 8px;
      color: yellow;
      margin: 0;
    }

    @media (min-width: 768px) {
      width: 52px;
      height: 8px;
      position: absolute;
      left: 0;
      bottom: -2px;
      padding: 0;
      margin: 0;

      p {
        line-height: 8px;
        font-size: 8px;
        color: gray;
        margin: 0;
      }
    }
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
    /* color: var(--red); */
    border-radius: 99px;
  }

  &.visible {
    transform: translate(-50%, 0);

    .inner {
      opacity: 1;
    }
  }

  .rdrWeekDay {
    font-size: 14px;
  }

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
    margin-top: -46px;
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
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border-radius: 200px;

    transition: all 0.3s ease;

    &:hover {
      background-color: #eff2f7;
    }
  }
  .rdrNextButton i {
    transform: translate(0px, 0px);
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

  .rdrDayDisabled {
    background: transparent;
  }

  .rdrDayNumber {
    font-weight: 500;
    width: 52px;
  }
  .rdrDayNumber span {
    /* color: var(--dark-text); */
  }
  .rdrDayPassive .rdrDayNumber span {
    /* color: var(--dark-text); */
    opacity: 0.33;
  }
  .rdrDayToday .rdrDayNumber span:after {
    /* background: var(--primary-color); */
    background: #eff2f7;
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
