import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;

  width: 100%;
  background-color: var(--gray-300);
  width: 100%;
  min-height: 122px;
  padding: 24px 24px 16px 24px;

  font-family: 'DM Sans' !important;
`;

export const FooterHolder = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  h4 {
    margin-left: 4px;
    align-self: center;
    font-size: 14px;
    font-weight: 500;
  }

  @media screen and (min-width: 868px) {
    justify-content: center;
    flex-direction: row-reverse;
  }

  @media screen and (min-width: 1468px) {
    padding: 0 6rem;
    max-width: 1468px;
    margin: 0 auto;
  }
`;

export const GlobeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;

  h4 {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LinksAndCopyrightContainer = styled.div`
  flex: 1;
  padding: 1rem 0;
  flex-direction: column;
  align-items: flex-start;
  display: flex;

  h4 {
    align-self: flex-start;
    margin: 0;
  }
`;

export const LinksContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  font-weight: normal;

  > a:first-child {
    margin-right: 8px;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const TranslateSocialMediaContainer = styled.div`
  display: flex;
  flex-direction: row;

  .textWithHover {
    margin-right: 1rem;
  }

  .textWithHover:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
