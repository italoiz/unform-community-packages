import { CheckboxProps as BaseCheckboxProps } from '@material-ui/core/Checkbox/Checkbox';

export type CheckboxProps = Omit<BaseCheckboxProps, 'name'> & { name: string };
