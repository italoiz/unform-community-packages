import '@testing-library/jest-dom/extend-expect';
import React from 'react';
// import React, { RefObject } from 'react';

// act, screen
// import { fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { FormHandles } from '@unform/core';

import { Autocomplete } from '../../lib';
import { AutocompleteOption } from '../../lib/Autocomplete/types';
import render from '../utils/RenderTest';

describe('<Autocomplete /> Component', () => {
  it('should render correctly', () => {
    const countries: AutocompleteOption[] = [
      { value: 'BR', label: 'Brazil' },
      { value: 'US', label: 'United States' },
    ];
    const loadingCountries = false;

    const { container } = render(
      <Autocomplete
        id="country"
        name="country"
        label="Autocomplete Countries"
        noOptionsText="No Records Found"
        options={countries}
        loading={loadingCountries}
      />,
    );

    const input = container.querySelector('input[name=country]');

    expect(!!input).toBe(true);
  });

  // it('should render options correctly', () => {
  //   const countries: AutocompleteOption[] = [
  //     { value: 'BR', label: 'Brazil' },
  //     { value: 'US', label: 'United States' },
  //   ];
  //   const loadingCountries = false;

  //   const { getByRole, getAllByRole } = render(
  //     <Autocomplete
  //       id="country"
  //       name="country"
  //       label="Autocomplete Countries"
  //       noOptionsText="No Records Found"
  //       options={countries}
  //       loading={loadingCountries}
  //     />,
  //   );

  //   // MuiButtonBase-root MuiIconButton-root MuiAutocomplete-popupIndicator
  //   fireEvent.mouseDown(getByRole('button'));
  //   const options = getAllByRole();
  //   console.log(options);
  //   expect(options.length).toBe(2);
  // });

  // it('should render with `defaultValue` property when exists', () => {
  //   const { container, getByRole } = render(
  //     <Select name="country" defaultValue="us">
  //       <MenuItem value="br">Brazil</MenuItem>
  //       <MenuItem value="us">United State</MenuItem>
  //     </Select>,
  //   );

  //   const input: any = container.querySelector('input[name=country]');
  //   const button = getByRole('button');
  //   expect(input.value).toBe('us');
  //   expect(button.textContent).toBe('United State');
  // });

  // it('should render with <label /> element when exists `label` property', () => {
  //   const { getByText } = render(
  //     <Select name="country" label="Select a country..." value="">
  //       <MenuItem value="br">Brazil</MenuItem>
  //       <MenuItem value="us">United State</MenuItem>
  //     </Select>,
  //   );
  //   expect(!!getByText('Select a country...')).toBe(true);
  // });

  // it('should return form data on submit form', () => {
  //   const submitMock = jest.fn();

  //   const { getByTestId } = render(
  //     <Select name="country" defaultValue="us">
  //       <MenuItem value="br">Brazil</MenuItem>
  //       <MenuItem value="us">United State</MenuItem>
  //     </Select>,
  //     {
  //       onSubmit: submitMock,
  //     },
  //   );

  //   fireEvent.submit(getByTestId('form'));

  //   expect(submitMock).toHaveBeenCalledWith(
  //     { country: 'us' },
  //     expect.any(Object),
  //     expect.any(Object),
  //   );
  // });

  // it('should render with initial data when `initialData` property exists', () => {
  //   const { container } = render(
  //     <Select name="country">
  //       <MenuItem value="br">Brazil</MenuItem>
  //       <MenuItem value="us">United State</MenuItem>
  //     </Select>,
  //     {
  //       initialData: { country: 'us' },
  //     },
  //   );

  //   expect(container.querySelector('input[name=country]')).toHaveAttribute(
  //     'value',
  //     'us',
  //   );
  // });

  // it('should display the error when the field error exists.', () => {
  //   const formRef: RefObject<FormHandles> = { current: null };

  //   const { getByText } = render(
  //     <Select name="country" value="">
  //       <MenuItem value="br">Brazil</MenuItem>
  //       <MenuItem value="us">United State</MenuItem>
  //     </Select>,
  //     {
  //       ref: formRef,
  //     },
  //   );

  //   act(() => {
  //     if (formRef.current) {
  //       formRef.current.setFieldError('country', 'Country is required');
  //     }
  //   });

  //   expect(!!getByText('Country is required')).toBe(true);
  // });

  // it('should throw an error when `name` property not passed', () => {
  //   console.error = jest.fn(); // eslint-disable-line no-console

  //   expect(() => {
  //     const props = {} as any;
  //     render(<Select {...props} />);
  //   }).toThrow(
  //     'Select component must have a `name` property for correctly working.',
  //   );

  //   expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
  // });

  // it('should call `onChange` on select an option', () => {
  //   const onChange = jest.fn();

  //   const { getByRole, getAllByRole } = render(
  //     <Select name="country" onChange={onChange}>
  //       <MenuItem value="br">Brazil</MenuItem>
  //       <MenuItem value="us">United State</MenuItem>
  //     </Select>,
  //   );

  //   fireEvent.mouseDown(getByRole('button'));
  //   const option = getAllByRole('option')[0];
  //   fireEvent.click(option);
  //   expect(onChange).toHaveBeenCalled();
  // });

  // it('should call `onChange` on select an option via unform api', () => {
  //   const onChange = jest.fn();
  //   const ref: RefObject<FormHandles> = { current: null };

  //   render(
  //     <Select name="country" onChange={onChange}>
  //       <MenuItem value="br">Brazil</MenuItem>
  //       <MenuItem value="us">United State</MenuItem>
  //     </Select>,
  //     {
  //       ref,
  //     },
  //   );

  //   act(() => {
  //     if (ref.current) {
  //       ref.current.setFieldValue('country', 'br');
  //       ref.current.setData({ country: 'us' });
  //     }
  //     expect(onChange).toHaveBeenCalledTimes(2);
  //   });
  // });

  // it('should update internal state on select an option via unform api', () => {
  //   const ref: RefObject<FormHandles> = { current: null };
  //   const submitMock = jest.fn();

  //   const { getByTestId } = render(
  //     <Select name="country">
  //       <MenuItem value="br">Brazil</MenuItem>
  //       <MenuItem value="us">United State</MenuItem>
  //     </Select>,
  //     {
  //       ref,
  //       onSubmit: submitMock,
  //     },
  //   );

  //   act(() => {
  //     if (ref.current) {
  //       ref.current.setFieldValue('country', 'br');
  //     }
  //   });

  //   fireEvent.submit(getByTestId('form'));
  //   expect(submitMock).toHaveBeenCalledWith(
  //     {
  //       country: 'br',
  //     },
  //     expect.any(Object),
  //     expect.any(Object),
  //   );
  // });

  // it('should not update internal state when `onChange` and `value` properties is provided', async () => {
  //   const instance = { called: false, value: 'br' };
  //   const onChange = jest.fn().mockImplementation(() => {
  //     instance.called = true;
  //   });

  //   const { getByRole, getAllByRole } = render(
  //     <Select name="country" value={instance.value} onChange={onChange}>
  //       <MenuItem value="br">Brazil</MenuItem>
  //       <MenuItem value="us">United State</MenuItem>
  //     </Select>,
  //   );

  //   fireEvent.mouseDown(getByRole('button'));
  //   const options = getAllByRole('option');
  //   fireEvent.click(options[1]);

  //   expect(onChange).toHaveBeenCalled();
  //   expect(instance).toEqual({ called: true, value: 'br' });
  // });

  // it('should shrink label when <Select /> is native type', () => {
  //   const { getByTestId } = render(
  //     <Select name="country" label="Country" native>
  //       <option value="br">Brazil</option>
  //       <option value="us">United State</option>
  //     </Select>,
  //   );

  //   const label = getByTestId('select-label');
  //   expect(label).toHaveAttribute('data-shrink', 'true');
  // });

  // it('should shrink label when <Select /> is multiple type and is not empty', () => {
  //   const { getByTestId } = render(
  //     <Select name="country" label="Country" multiple>
  //       <option value="br">Brazil</option>
  //       <option value="us">United State</option>
  //     </Select>,
  //     {
  //       initialData: {
  //         country: ['br'],
  //       },
  //     },
  //   );

  //   const label = getByTestId('select-label');
  //   expect(label).toHaveAttribute('data-shrink', 'true');
  // });

  // it('should return array values on submit form and <Select /> is multiple type', () => {
  //   const onSubmit = jest.fn();

  //   const { getByTestId } = render(
  //     <Select name="country" label="Country" multiple>
  //       <option value="br">Brazil</option>
  //       <option value="us">United State</option>
  //     </Select>,
  //     {
  //       initialData: {
  //         country: ['br'],
  //       },
  //       onSubmit,
  //     },
  //   );

  //   fireEvent.submit(getByTestId('form'));
  //   expect(onSubmit).toHaveBeenCalledWith(
  //     {
  //       country: ['br'],
  //     },
  //     expect.any(Object),
  //     expect.any(Object),
  //   );
  // });

  // it('should return array values on submit form and <Select /> is multiple and native type', () => {
  //   const onSubmit = jest.fn();

  //   const { getByTestId } = render(
  //     <Select
  //       name="country"
  //       label="Country"
  //       native
  //       multiple
  //       inputProps={{ 'data-testid': 'select-input' }}
  //     >
  //       <option value="br">Brazil</option>
  //       <option value="us">United State</option>
  //     </Select>,
  //     {
  //       onSubmit,
  //     },
  //   );

  //   userEvent.selectOptions(screen.getByTestId('select-input'), ['br', 'us']);
  //   fireEvent.submit(getByTestId('form'));

  //   expect(onSubmit).toHaveBeenCalledWith(
  //     {
  //       country: ['br', 'us'],
  //     },
  //     expect.any(Object),
  //     expect.any(Object),
  //   );
  // });
});
