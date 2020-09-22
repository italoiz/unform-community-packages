import '@testing-library/jest-dom/extend-expect';
import React from 'react';

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
});
