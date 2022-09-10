import { SelectProps as BaseSelectProps } from '@mui/material/Select';

export interface SelectOption {
  value: string | number;
  text: string | React.ReactNode;
}

export interface SelectProps extends Omit<BaseSelectProps, 'name'> {
  name: string;
  options?: SelectOption[];
}
