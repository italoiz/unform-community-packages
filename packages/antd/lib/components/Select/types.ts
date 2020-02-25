import { FormItemProps } from 'antd/lib/form/FormItem';
import {
  SelectProps as BaseSelectProps,
  OptionProps,
  OptGroupProps,
} from 'antd/lib/select';

export interface SelectProps extends Omit<BaseSelectProps, 'name'> {
  name: string;
  label?: string;
  FormItemProps?: FormItemProps;
}

export interface SelectComponent<T> extends React.FC<T> {
  Option: React.ClassicComponentClass<OptionProps>;
  OptGroup: React.ClassicComponentClass<OptGroupProps>;
}
