import styled from 'styled-components';

export const FooterContainer = styled.div`
  margin-top: 8rem;
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

export const ContainerHolder = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1568px;
  margin: 0 auto;
`;

export const SocialContainer = styled.div`
  flex: 1;
  margin: 1rem 0;
  width: 100%;
  @media screen and (min-width: 628px) {
    width: 30%;
  }

  h3 {
    color: var(--white);
    font-size: 1rem;
    font-weight: 500;
  }

  p {
    display: none;
    color: var(--gray);
    font-weight: 400;
    font-size: 0.7rem;
    margin: 1.5rem 0 2rem;
    max-width: 80%;

    @media screen and (min-width: 628px) {
      display: block;
    }
  }

  .logo {
    display: flex;
    align-self: center;
    margin: 0.3rem 0 0.5rem;
    cursor: pointer;
    svg {
      height: 2rem;
      color: #fafafc;
      transition: color 0.2s;
    }
    span {
      font-weight: 600;
      font-size: 1.15rem;
      margin-left: 0.5rem;
    }

    img {
      max-height: 48px;
      object-fit: contain;
    }

    @media screen and (min-width: 628px) {
      display: none;
    }
  }

  .row {
    display: flex;
  }
`;

export const ContactContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  width: 100%;
  @media screen and (max-width: 868px) {
    align-items: flex-start;
  }

  h3 {
    color: var(--white);
    font-size: 1rem;
    font-weight: 500;
  }

  p {
    color: var(--gray);
    font-weight: 400;
    font-size: 0.7rem;
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
      font-size: 0.7rem;
      margin-left: 1rem;
      line-height: normal;
    }
  }

  .socialCircle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.8rem;
    margin-top: 1rem;
    width: 32px;
    height: 32px;
    background-color: var(--dark);
    border-radius: 100%;
    cursor: pointer;

    .icon {
      width: 16px;
      height: 16px;
      color: var(--light-text);
    }
  }
`;

export const InformationContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
  width: 100%;
  @media screen and (min-width: 628px) {
    width: 20%;
  }

  h3 {
    color: var(--white);
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .link {
    color: var(--gray);
    font-weight: 400;
    font-size: 0.85rem;
    line-height: normal;
    margin: 0.2rem 0 0;
    cursor: pointer;
    transition: all 0.3s ease;

    :hover {
      color: #eee;
      text-decoration: underline;
    }
  }
`;

export const CopyrightContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 4rem 0 0;
  width: 100%;

  @media screen and (min-width: 628px) {
    justify-content: space-between;
    align-items: center;
    flex-direction: row !important;
  }

  .row {
    display: flex;
    margin-bottom: 1rem;
  }

  .socialCircle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.8rem;
    margin-top: 1rem;
    width: 32px;
    height: 32px;
    background-color: var(--dark);
    border-radius: 100%;
    cursor: pointer;

    .icon {
      width: 16px;
      height: 16px;
      color: var(--light-text);
    }
  }

  h4 {
    color: var(--gray);
    font-size: 14px;
    font-weight: 500;
    /* margin-bottom: 1rem; */
  }

  p {
    color: var(--gray-400);
    font-size: 0.7rem;
    font-weight: 400;

    /* margin-bottom: 1rem; */
  }
`;
