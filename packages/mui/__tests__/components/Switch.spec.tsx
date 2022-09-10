import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { fireEvent } from '@testing-library/react';

import { Switch } from '../../lib';
import render from '../utils/RenderTest';

describe('<Switch /> Component', () => {
  it('should render correctly', () => {
    const { container } = render(<Switch name="terms" />);

    const input = container.querySelector('input[name=terms][type=checkbox]');

    expect(!!input).toBe(true);
  });

  it('should render with `defaultChecked` property when exists', () => {
    const { container } = render(<Switch name="terms" defaultChecked />);

    const input: any = container.querySelector('input[name=terms]');
    expect(input.checked).toBe(true);
  });

  it('should render with initial data when `initialData` property exists', () => {
    const { container } = render(<Switch name="terms" />, {
      initialData: { terms: true },
    });

    const input: any = container.querySelector('input[name=terms]');
    expect(input.checked).toBe(true);
  });

  it('should return form data on submit form', () => {
    const submitMock = jest.fn();

    const { container, getByTestId } = render(<Switch name="terms" />, {
      onSubmit: submitMock,
    });

    const input: any = container.querySelector('input[name=terms]');

    fireEvent.change(input, { target: { checked: true } });
    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      { terms: true },
      expect.any(Object),
      expect.any(Object),
    );
  });

  it('should throw an error when `name` property not passed', () => {
    console.error = jest.fn(); // eslint-disable-line no-console

    expect(() => {
      const props = {} as any;
      render(<Switch {...props} />);
    }).toThrow(
      'Switch component must have a `name` property for correctly working.',
    );

    expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
  });
});
