import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    outline: 0;
    box-sizing: border-box;
  }

  code {
    padding: 8px;
    background: #333;
    color: #f4f4f4;
    width: 100%;
    display: block;
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;
    overflow: auto;
  }

  div.action-buttons {
    margin: 20px 0px;
    button + button {
      margin-left: 10px;
    }
  }
`;
