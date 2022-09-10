import { TextFieldProps as BaseTextFieldProps } from '@mui/material/TextField';

export type TextFieldProps = BaseTextFieldProps & {
  name: string;
};
