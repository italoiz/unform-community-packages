import React from 'react';
import '@testing-library/react/cleanup-after-each';
import 'jest-dom/extend-expect';

import { act, fireEvent, render, wait } from '@testing-library/react';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { TextField } from '../../lib';

describe('<TextField /> Component', () => {
  it('should display input', () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <TextField name="name" label="Name" />
      </Form>
    );

    expect(!!container.querySelector('input[name=name]')).toBe(true);
  });

  it('should display error', async () => {
    const schema = Yup.object().shape({
      name: Yup.string().required('name is required'),
    });

    const { container, getByTestId, getByText } = render(
      <Form onSubmit={jest.fn()} schema={schema}>
        <TextField name="name" label="Name" />
      </Form>
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });

    // const container = await waitForElement(() => getByTestId('form'));
    await wait(() => {
      expect(
        !!container.querySelector('input[name=name][aria-invalid=true]')
      ).toBe(true);
      expect(!!getByText('name is required')).toBe(true);
    });
  });

  it('should return data on submit form', async () => {
    const submitMock = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <Form onSubmit={submitMock}>
        <TextField name="name" label="Name" />
      </Form>
    );

    fireEvent.change(getByLabelText('name'), {
      target: { value: 'foo bar' },
    });

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      {
        name: 'foo bar',
      },
      expect.any(Object)
    );
  });
});
