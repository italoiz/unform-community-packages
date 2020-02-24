import { TextFieldProps as BaseTextFieldProps } from '@material-ui/core/TextField/TextField';

export type TextFieldProps = BaseTextFieldProps & {
  name: string;
};
