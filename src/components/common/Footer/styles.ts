import styled from 'styled-components';

export const FooterContainer = styled.div`
  .topContainer {
    display: flex;
    flex-direction: column;
  }

  background-color: #0b0d17;
  width: 100%;
  min-height: 400px;
  padding: 2rem 1.5rem;

  @media screen and (min-width: 524px) {
    padding: 2rem 2rem;
  }
  @media screen and (min-width: 628px) {
    padding: 3rem 2rem;
    .topContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  @media screen and (min-width: 1024px) {
    padding: 3rem 4rem;
  }
  @media screen and (min-width: 1280px) {
    padding: 3rem 8rem;
  }
`;

export const SocialContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
  @media screen and (min-width: 628px) {
    width: 30%;
  }

  h1 {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 500;
  }

  p {
    color: var(--gray);
    font-weight: 400;
    font-size: 1rem;
    margin: 1.5rem 0 2rem;
  }

  .row {
    display: flex;
  }

  .socialCircle {
    margin-right: 0.8rem;
    width: 32px;
    height: 32px;
    background-color: var(--dark);
    border-radius: 100%;
    cursor: pointer;
  }
`;

export const ContactContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
  @media screen and (min-width: 628px) {
    width: 30%;
  }

  h1 {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 500;
  }

  p {
    color: var(--gray);
    font-weight: 400;
    font-size: 1rem;
    margin: 1.5rem 0 2rem;
  }

  .row {
    display: flex;
    margin: 1rem 0;
    align-items: center;
    justify-content: flex-start;

    p {
      margin: 0;
      color: var(--gray);
      font-size: 1rem;
      margin-left: 1rem;
      line-height: normal;
    }
  }

  .socialCircle {
    margin-right: 0.8rem;
    width: 32px;
    height: 32px;
    background-color: var(--dark);
    border-radius: 100%;
    cursor: pointer;
  }
`;

export const InformationContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
  @media screen and (min-width: 628px) {
    width: 20%;
  }

  h1 {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .link {
    color: var(--gray);
    font-weight: 400;
    font-size: 1rem;
    line-height: normal;
    margin: 0.2rem 0 0;
    cursor: pointer;
  }
`;
