import '@testing-library/jest-dom/extend-expect';
import React, { RefObject } from 'react';

import { MenuItem } from '@material-ui/core';
import { fireEvent, wait, act } from '@testing-library/react';
import { FormHandles } from '@unform/core';

import { Select } from '../../lib';
import render from '../utils/RenderTest';

describe('<Select /> Component', () => {
  it('should render correctly', () => {
    const { container } = render(<Select name="country" value="" />);

    const input = container.querySelector('input[name=country]');

    expect(!!input).toBe(true);
  });

  it('should render select options correctly', () => {
    const { baseElement, getByRole } = render(
      <Select name="country" value="">
        <MenuItem value="br">Brazil</MenuItem>
        <MenuItem value="us">United State</MenuItem>
      </Select>,
    );

    fireEvent.click(getByRole('button'));

    wait(() => {
      expect(baseElement.querySelectorAll('li[role=option]').length).toBe(2);
    });
  });

  it('should render with `defaultValue` property when exists', () => {
    const { container, getByRole } = render(
      <Select name="country" defaultValue="us">
        <MenuItem value="br">Brazil</MenuItem>
        <MenuItem value="us">United State</MenuItem>
      </Select>,
    );

    const input: any = container.querySelector('input[name=country]');
    const button = getByRole('button');
    expect(input.value).toBe('us');
    expect(button.textContent).toBe('United State');
  });

  it('should render with <label /> element when exists `label` property', () => {
    const { getByText } = render(
      <Select name="country" label="Select a country..." value="">
        <MenuItem value="br">Brazil</MenuItem>
        <MenuItem value="us">United State</MenuItem>
      </Select>,
    );
    expect(!!getByText('Select a country...')).toBe(true);
  });

  it('should return form data on submit form', () => {
    const submitMock = jest.fn();

    const { getByTestId } = render(
      <Select name="country" defaultValue="us">
        <MenuItem value="br">Brazil</MenuItem>
        <MenuItem value="us">United State</MenuItem>
      </Select>,
      {
        onSubmit: submitMock,
      },
    );

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      { country: 'us' },
      expect.any(Object),
    );
  });

  it('should render with initial data when `initialData` property exists', () => {
    const { container } = render(
      <Select name="country">
        <MenuItem value="br">Brazil</MenuItem>
        <MenuItem value="us">United State</MenuItem>
      </Select>,
      {
        initialData: { country: 'us' },
      },
    );

    expect(container.querySelector('input[name=country]')).toHaveAttribute(
      'value',
      'us',
    );
  });

  it('should display the error when the field error exists.', () => {
    const formRef: RefObject<FormHandles> = { current: null };

    const { getByText } = render(
      <Select name="country" value="">
        <MenuItem value="br">Brazil</MenuItem>
        <MenuItem value="us">United State</MenuItem>
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
