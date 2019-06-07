import styled, { createGlobalStyle } from 'styled-components';

export const Section = styled.section`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  > h1 {
    color: #707070;
    font-style: italic;
    font-size: 32px;
  }

  > div {
    width: 100%;
    max-width: 400px;
    display: inline-grid;
    grid-column-gap: 15px;
  }
`;

export default createGlobalStyle`
html, body {
  margin: 0;
  padding: 0px;
  height: 100%;
  outline: 0;
}
`;
