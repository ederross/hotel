import styled from 'styled-components';

export const CarouselHolderStyles = styled.div`
  transition: all 0.2s ease-in-out;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  z-index: 2;

  &:hover {
    .arrowBtnLeft {
      display: flex;
    }
    .arrowBtnRight {
      display: flex;
    }
  }

  .arrowBtnLeft {
    z-index: 5;
    cursor: pointer;
    position: absolute;
    display: none;
    top: 50%;
    left: 5%;
    align-items: center;
    justify-content: center;
    width: fit-content;

    transition: 0.2s ease-in-out;
    box-shadow: 0 0.2rem 0.2rem rgb(165, 165, 165);
    width: 28px;
    height: 28px;
    border-radius: 100%;

    background-color: var(--light-text);
    opacity: 0.8;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 0.2rem 0.2rem rgb(135, 135, 135);
    }
  }

  .arrowBtnRight {
    z-index: 5;
    cursor: pointer;
    position: absolute;
    display: none;
    top: 50%;
    right: 5%;
    align-items: center;
    justify-content: center;
    width: fit-content;

    transition: 0.2s ease-in-out;
    box-shadow: 0 0.2rem 0.2rem rgb(165, 165, 165);
    width: 28px;
    height: 28px;
    border-radius: 100%;

    background-color: var(--light-text);
    opacity: 0.8;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 0.2rem 0.2rem rgb(135, 135, 135);
    }
  }

  .carousel {
    position: relative;
    width: 100%;
    min-height: 232px;
    height: 100%;
    display: fixed;

    /* background-color: rgb(135, 135, 135, 0.2); */

    overflow-x: scroll;
    overflow-y: hidden;
    transition: all 0.2s;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }

    img {
      transition: transform 0.2s;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .fade {
    position: absolute;
    bottom: -8px;
    width: 100%;
    height: 42px;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0)
    );
  }

  .scroller {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    width: fit-content;
    left: 50%;
    margin-top: -2rem;
    transform: translate(-50%, 0);

    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }
    span {
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      background: #fff;
      opacity: 0.5;
      transition: all 0.2s;
      margin: 1rem 0.25rem 0;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0.1rem 0.2rem #002;
    }
    span.active {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  .discountPercentage {
    font-family: 'DM Sans' !important;
    z-index: 1;
    top: 16px;
    right: 16px;
    border-radius: 32px;
    position: absolute;
    padding: 12px 20px;
    background: #2ab59c;

    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
    h4 {
      font-weight: bold;
      font-size: 12px;
      /* color: var(--gray-with-blue-400); */
      color: var(--light-text);
    }
  }
`;
