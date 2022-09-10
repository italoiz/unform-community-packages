import { CheckboxProps as BaseCheckboxProps } from '@mui/material/Checkbox';

export type CheckboxProps = Omit<BaseCheckboxProps, 'name'> & { name: string };
