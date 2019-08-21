import React from 'react';
import '@testing-library/react/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent, act } from '@testing-library/react';
import { Form } from '@rocketseat/unform';
// import * as Yup from 'yup';

import { Checkbox } from '../../lib';

describe('<Checkbox /> Component', () => {
  it('should display checkbox input', () => {
    const { container, getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Checkbox name="terms" label="Terms" />
      </Form>
    );

    expect(!!container.querySelector('input[type=checkbox][name=terms]')).toBe(
      true
    );
    expect(!!getByText('Terms')).toBe(true);
  });

  it('should not display label when not passed `label` property', () => {
    const { queryByLabelText } = render(
      <Form onSubmit={jest.fn()}>
        <Checkbox name="terms" />
      </Form>
    );

    expect(queryByLabelText('Terms')).not.toBeInTheDocument();
  });

  it('should return data when submit form', () => {
    const submitMock = jest.fn();

    const { getByLabelText, getByTestId } = render(
      <Form onSubmit={submitMock}>
        <Checkbox name="terms" label="Terms" />
      </Form>
    );

    act(() => {
      fireEvent.change(getByLabelText('Terms'), {
        target: {
          checked: true,
        },
      });

      fireEvent.submit(getByTestId('form'));
    });

    expect(submitMock).toHaveBeenCalledWith(
      { terms: true },
      expect.any(Object)
    );
  });

  it('should disable checkbox when passed disabled property', () => {
    const { getByLabelText } = render(
      <Form onSubmit={jest.fn()}>
        <Checkbox name="terms" label="Terms" disabled />
      </Form>
    );

    expect(getByLabelText('Terms')).toHaveAttribute('disabled');
  });

  it('should uncheck field when checked property as true', () => {
    const submitMock = jest.fn();

    const { getByLabelText, getByTestId } = render(
      <Form onSubmit={submitMock}>
        <Checkbox name="terms" label="Terms" checked />
      </Form>
    );

    act(() => {
      fireEvent.click(getByLabelText('Terms'));
      fireEvent.submit(getByTestId('form'));
    });

    expect(submitMock).toHaveBeenCalledWith(
      { terms: false },
      expect.any(Object)
    );
  });

  it('should reset field value when resetForm helper is dispatched', () => {
    const { getByLabelText, getByTestId } = render(
      <Form onSubmit={(_: any, { resetForm }) => resetForm()}>
        <Checkbox name="terms" label="Terms" />
      </Form>
    );

    act(() => {
      fireEvent.click(getByLabelText('Terms'));
      fireEvent.submit(getByTestId('form'));
    });

    expect((getByLabelText('Terms') as HTMLInputElement).checked).toBe(false);
  });
});
