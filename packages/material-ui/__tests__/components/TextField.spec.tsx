import '@testing-library/jest-dom/extend-expect';
import React, { RefObject } from 'react';

import { fireEvent, act } from '@testing-library/react';
import { FormHandles } from '@unform/core';

import { TextField } from '../../lib';
import render from '../utils/RenderTest';

describe('<TextField /> Component', () => {
  it('should render correctly', () => {
    const { container } = render(<TextField name="name" />);

    expect(!!container.querySelector('input[name=name]')).toBe(true);
  });

  it('should render with `defaultValue` property when exists', () => {
    const { container } = render(
      <TextField name="name" defaultValue="foo bar" />,
    );

    expect(container.querySelector('input[name=name]')).toHaveAttribute(
      'value',
      'foo bar',
    );
  });

  it('should render with initial data when `initialData` property exists', () => {
    const { container } = render(<TextField name="name" />, {
      initialData: { name: 'foo bar' },
    });

    expect(container.querySelector('input[name=name]')).toHaveAttribute(
      'value',
      'foo bar',
    );
  });

  it('should return form data on submit form', () => {
    const submitMock = jest.fn();

    const { container, getByTestId } = render(<TextField name="name" />, {
      onSubmit: submitMock,
    });

    const input: any = container.querySelector('input[name=name]');

    fireEvent.change(input, { target: { value: 'foo bar' } });
    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      { name: 'foo bar' },
      expect.any(Object),
    );
  });

  it('should display the error when the field error exists.', () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByText } = render(<TextField name="name" />, {
      ref: formRef,
    });

    act(() => {
      if (formRef.current) {
        formRef.current.setFieldError('name', 'Name is required');
      }
    });

    expect(!!getByText('Name is required')).toBe(true);
  });

  it('should throw an error when `name` property not passed', () => {
    console.error = jest.fn(); // eslint-disable-line no-console

    expect(() => {
      const props = {} as any;
      render(<TextField {...props} />);
    }).toThrow(
      'TextField component must have a `name` property for correctly working.',
    );

    expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
  });
});
