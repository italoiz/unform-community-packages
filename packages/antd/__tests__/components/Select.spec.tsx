import '@testing-library/jest-dom/extend-expect';
import React, { RefObject } from 'react';

import { fireEvent, wait, act } from '@testing-library/react';
import { FormHandles } from '@unform/core';

import { Select } from '../../lib';
import render from '../utils/RenderTest';

describe('<Select /> Component', () => {
  it('should render correctly', () => {
    const { getByRole } = render(<Select name="country" />);

    expect(!!getByRole('combobox')).toBe(true);
  });

  it('should render with options', () => {
    const { getByRole, baseElement } = render(
      <Select name="country">
        <Select.Option value="br">Brazil</Select.Option>
        <Select.Option value="us">United State</Select.Option>
      </Select>,
    );

    fireEvent.click(getByRole('combobox'));

    wait(() => {
      expect(baseElement.querySelectorAll('[role=option]').length).toBe(2);
    });
  });

  it('should render with <label /> element when exists `label` property', () => {
    const { getByText } = render(
      <Select name="country" label="Select a country...">
        <Select.Option value="br">Brazil</Select.Option>
        <Select.Option value="us">United State</Select.Option>
      </Select>,
    );

    expect(!!getByText('Select a country...')).toBe(true);
  });

  it('should return form data on submit form', async () => {
    const submitMock = jest.fn();

    const { getByRole, getByTestId, baseElement } = render(
      <Select name="country">
        <Select.Option value="br">Brazil</Select.Option>
        <Select.Option value="us">United State</Select.Option>
      </Select>,
      {
        onSubmit: submitMock,
      },
    );

    fireEvent.click(getByRole('combobox'));

    await wait(() => {
      const option = baseElement.querySelectorAll('[role=option]')[0];
      fireEvent.click(option);
    });

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      { country: 'br' },
      expect.any(Object),
    );
  });

  it('should render with initial data when `initialData` property exists', () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(
      <Select name="country">
        <Select.Option value="br">Brazil</Select.Option>
        <Select.Option value="us">United State</Select.Option>
      </Select>,
      {
        onSubmit: submitMock,
        initialData: { country: 'br' },
      },
    );

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      { country: 'br' },
      expect.any(Object),
    );
  });

  it('should work with `mode` property equal `multiple` or `tags`', async () => {
    const submitMock = jest.fn();

    const { getByRole, getByTestId, baseElement } = render(
      <Select name="country" mode="multiple">
        <Select.Option value="br">Brazil</Select.Option>
        <Select.Option value="us">United State</Select.Option>
      </Select>,
      {
        onSubmit: submitMock,
      },
    );

    fireEvent.click(getByRole('combobox'));

    await wait(() => {
      fireEvent.click(baseElement.querySelectorAll('[role=option]')[0]);
      fireEvent.click(baseElement.querySelectorAll('[role=option]')[1]);
    });

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      { country: expect.arrayContaining(['br', 'us']) },
      expect.any(Object),
    );
  });

  it('should display the error when the field error exists.', () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByText } = render(
      <Select name="country">
        <Select.Option value="br">Brazil</Select.Option>
        <Select.Option value="us">United State</Select.Option>
      </Select>,
      {
        ref: formRef,
      },
    );

    act(() => {
      if (formRef.current) {
        formRef.current.setFieldError('country', 'Country is required');
      }
    });

    expect(!!getByText('Country is required')).toBe(true);
  });

  it('should throw an error when `name` property not passed', () => {
    console.error = jest.fn(); // eslint-disable-line no-console

    expect(() => {
      const props = {} as any;
      render(<Select {...props} />);
    }).toThrow(
      'Select component must have a `name` property for correctly working.',
    );

    expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
  });
});
