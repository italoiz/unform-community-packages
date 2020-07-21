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

  it('should shrink label when focus on input', () => {
    const { getByTestId } = render(
      <TextField
        name="name"
        label="Name"
        InputLabelProps={{ 'data-testid': 'input-label' } as any}
        inputProps={{ 'data-testid': 'input' }}
      />,
    );

    const input = getByTestId('input');
    const label = getByTestId('input-label');

    act(() => {
      fireEvent.focus(input);
    });
    expect(label).toHaveAttribute('data-shrink', 'true');

    act(() => {
      fireEvent.blur(input);
    });
    expect(label).toHaveAttribute('data-shrink', 'false');
  });

  it('should shrink label when value is change via unform api', () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByTestId } = render(
      <TextField
        name="name"
        label="Name"
        InputLabelProps={{ 'data-testid': 'input-label' } as any}
      />,
      {
        ref: formRef,
      },
    );

    const label = getByTestId('input-label');

    act(() => {
      if (formRef.current) {
        formRef.current.setData({ name: 'foo bar' });
      }
    });

    expect(label).toHaveAttribute('data-shrink', 'true');
  });

  it('should not shrink label when value is empty', () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByTestId } = render(
      <TextField
        name="name"
        label="Name"
        InputLabelProps={{ 'data-testid': 'input-label' } as any}
      />,
      {
        ref: formRef,
      },
    );

    const label = getByTestId('input-label');

    act(() => {
      if (formRef.current) {
        formRef.current.setData({ name: '' });
      }
    });

    expect(label).toHaveAttribute('data-shrink', 'false');
  });

  it('should not shrink label on reset input value', () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByTestId } = render(
      <TextField
        name="name"
        label="Name"
        InputLabelProps={{ 'data-testid': 'input-label' } as any}
      />,
      {
        ref: formRef,
      },
    );

    const label = getByTestId('input-label');

    act(() => {
      if (formRef.current) {
        formRef.current.reset();
      }
    });

    expect(label).toHaveAttribute('data-shrink', 'false');
  });

  it('should put reset value on input when data is passed to the reset function', () => {
    const formRef: RefObject<FormHandles> = { current: null };
    const submitMock = jest.fn();

    const { getByTestId } = render(
      <TextField
        name="name"
        label="Name"
        InputLabelProps={{ 'data-testid': 'input-label' } as any}
        inputProps={{ 'data-testid': 'input' }}
      />,
      {
        ref: formRef,
        onSubmit: submitMock,
      },
    );

    act(() => {
      if (formRef.current) {
        formRef.current.reset({ name: 'foo bar reseted' });
      }
    });

    fireEvent.submit(getByTestId('form'));
    expect(submitMock).toHaveBeenCalledWith(
      { name: 'foo bar reseted' },
      expect.any(Object),
      expect.any(Object),
    );
  });

  it('should use prop `shrink` instead of default shrink behavior when property exists', () => {
    const { getByTestId } = render(
      <TextField
        name="name"
        label="Name"
        InputLabelProps={{ 'data-testid': 'input-label', shrink: true } as any}
      />,
    );

    const label = getByTestId('input-label');
    expect(label).toHaveAttribute('data-shrink', 'true');
  });

  it('should use empty value instead of `undefined` when use the `setData` function with inexistent property value', () => {
    const formRef: RefObject<FormHandles> = { current: null };
    const submitMock = jest.fn();
    const { getByTestId } = render(<TextField name="name" />, {
      ref: formRef,
      onSubmit: submitMock,
    });

    act(() => {
      if (formRef.current) {
        formRef.current.setData({
          email: 'foo@bar.com',
        });
      }
    });

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      { name: '' },
      expect.any(Object),
      expect.any(Object),
    );
  });
});
