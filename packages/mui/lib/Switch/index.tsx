import React, { useRef, useEffect } from 'react';

import { Switch as BaseSwitch } from '@mui/material';
import { useField } from '@unform/core';

import { printWarning } from '../debug';
import { SwitchProps } from './types';

const Switch: React.FC<SwitchProps> = ({
  name,
  defaultChecked,
  ...restProps
}) => {
  if (!name) {
    printWarning(
      'Switch component must have a `name` property for correctly working.',
    );
  }

  const inputRef = useRef(null);
  const { fieldName, defaultValue = false, registerField } = useField(name);

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'checked',
      });
    }
  }, [fieldName, registerField]);

  return (
    <BaseSwitch
      {...restProps}
      name={name}
      defaultChecked={Boolean(defaultValue) || Boolean(defaultChecked)}
      inputRef={inputRef}
    />
  );
};

export default Switch;
