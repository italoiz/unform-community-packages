import React from 'react';

import { render as rtlRender } from '@testing-library/react';
import { Form } from '@unform/web';

export default function RenderTest(
  children: React.ReactNode,
  props: Record<string, any> = {},
): any {
  const mockFunction = jest.fn();
  return rtlRender(
    <Form data-testid="form" onSubmit={mockFunction} {...props}>
      {children}
    </Form>,
  );
}
