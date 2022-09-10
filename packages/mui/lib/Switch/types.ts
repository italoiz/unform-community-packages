import { SwitchProps as BaseSwitchProps } from '@mui/material/Switch';

export type SwitchProps = Omit<BaseSwitchProps, 'name'> & { name: string };
