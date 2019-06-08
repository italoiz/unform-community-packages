import React from 'react';
import '@testing-library/react/cleanup-after-each';
import 'jest-dom/extend-expect';

import { render, fireEvent, wait } from '@testing-library/react';
import { Form } from '@rocketseat/unform';
import { act } from 'react-test-renderer';
import * as Yup from 'yup';

import { Select } from '../../lib';

describe('<Select /> Component', () => {
  it('should display select', () => {
    const options = [
      { value: 'react', label: 'React' },
      { value: 'node', label: 'NodeJS' },
    ];

    const { container, getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Select name="tech" label="Tech" options={options} />
      </Form>
    );

    expect(!!container.querySelector('input[type=hidden][name=tech]')).toBe(
      true
    );
    expect(!!getByText('Tech')).toBe(true);
  });

  it('should display native select', () => {
    const options = [
      { value: 'react', label: 'React' },
      { value: 'node', label: 'NodeJS' },
    ];

    const { container, getByText } = render(
      <Form onSubmit={jest.fn()}>
        <Select native name="tech" label="Tech" options={options} />
      </Form>
    );

    expect(!!container.querySelector('select[name=tech]')).toBe(true);
    expect(container.querySelectorAll('select[name=tech] option').length).toBe(
      3
    );
    expect(!!getByText('Tech')).toBe(true);
  });

  it('should return data when submit form', () => {
    const submitMock = jest.fn();

    const options = [
      { value: 'react', label: 'React' },
      { value: 'node', label: 'NodeJS' },
    ];

    const { getByLabelText, getByTestId } = render(
      <Form onSubmit={submitMock}>
        <Select native name="tech" label="Tech" options={options} />
      </Form>
    );

    fireEvent.change(getByLabelText('Tech'), {
      target: {
        value: 'node',
      },
    });

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      { tech: 'node' },
      expect.any(Object)
    );
  });

  it('should return default data when submit form', () => {
    const submitMock = jest.fn();

    const options = [
      { value: 'react', label: 'React' },
      { value: 'node', label: 'NodeJS' },
    ];

    const { getByTestId } = render(
      <Form onSubmit={submitMock} initialData={{ tech: 'node' }}>
        <Select name="tech" label="Tech" options={options} />
      </Form>
    );

    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      { tech: 'node' },
      expect.any(Object)
    );
  });

  it('should display error', async () => {
    const schema = Yup.object().shape({
      tech: Yup.string().required('tech is required'),
    });

    const { getByText, getByTestId } = render(
      <Form onSubmit={jest.fn()} schema={schema}>
        <Select
          name="tech"
          label="Tech"
          options={[{ value: 'node', label: 'NodeJS' }]}
        />
      </Form>
    );

    act(() => {
      fireEvent.submit(getByTestId('form'));
    });

    await wait(() => {
      expect(!!getByText('tech is required')).toBe(true);
    });
  });

  it('should return multiple values when is multiple select', async () => {
    const submitMock = jest.fn();

    const options = [
      { value: 'react', label: 'React' },
      { value: 'node', label: 'NodeJS' },
      { value: 'angular', label: 'Angular' },
      { value: 'vuejs', label: 'VueJS' },
    ];

    const { getByTestId, getByRole, baseElement } = render(
      <Form onSubmit={submitMock}>
        <Select multiple name="tech" label="Tech" options={options} />
      </Form>
    );

    // click to open select options
    fireEvent.click(getByRole('button'));

    // select option
    fireEvent.click(baseElement.querySelectorAll('li[role=option]')[0]);
    fireEvent.click(baseElement.querySelectorAll('li[role=option]')[1]);

    // send form.
    fireEvent.submit(getByTestId('form'));

    expect(submitMock).toHaveBeenCalledWith(
      {
        tech: expect.arrayContaining(['node', 'react']),
      },
      expect.any(Object)
    );
  });
});
