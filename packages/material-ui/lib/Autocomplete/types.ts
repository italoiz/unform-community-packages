import { AutocompleteProps as BaseAutocompleteProps } from '@material-ui/lab';

export interface AutocompleteOption {
  label: string;
  value: string | number;
}

export interface AutocompleteProps
  extends Omit<
    BaseAutocompleteProps<
      any,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined
    >,
    'renderInput'
  > {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  options: AutocompleteOption[];
}
