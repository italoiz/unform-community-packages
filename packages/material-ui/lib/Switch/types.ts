import { SwitchProps as BaseSwitchProps } from '@material-ui/core/Switch/Switch';

export type SwitchProps = Omit<BaseSwitchProps, 'name'> & { name: string };
