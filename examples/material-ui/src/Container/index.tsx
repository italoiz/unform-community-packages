import React from 'react';

import { ContainerWrapper } from './styles';

const Container: React.FC = ({ children }) => (
  <ContainerWrapper>{children}</ContainerWrapper>
);

export default Container;
