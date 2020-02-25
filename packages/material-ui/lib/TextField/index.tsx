import React, { useRef, useEffect } from 'react';

import { TextField as BaseTextField } from '@material-ui/core';
import { useField } from '@unform/core';

import { printWarning } from '../debug';
import { TextFieldProps } from './types';

const TextField: React.FC<TextFieldProps> = ({
  name,
  helperText,
  defaultValue,
  ...restProps
}) => {
  if (!name) {
    printWarning(
      'TextField component must have a `name` property for correctly working.',
    );
  }

  const inputRef = useRef(null);
  const {
    fieldName,
    defaultValue: fieldDefaultValue,
    registerField,
    error,
  } = useField(name);

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }
  }, [fieldName, registerField]);

  return (
    <BaseTextField
      {...restProps}
      name={fieldName}
      error={!!error}
      helperText={error || helperText}
      inputRef={inputRef}
      defaultValue={fieldDefaultValue || defaultValue}
    />
  );
};

export default TextField;
