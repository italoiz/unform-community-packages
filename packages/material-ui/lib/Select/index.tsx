import React, { useEffect, useRef } from 'react';

import {
  Select as BaseSelect,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import { useField } from '@unform/core';

import { printWarning } from '../debug';
import { SelectProps } from './types';

const Select: React.FC<SelectProps> = ({
  name,
  label,
  style,
  className,
  defaultValue,
  children,
  native,
  ...restProps
}) => {
  if (!name) {
    printWarning(
      'Select component must have a `name` property for correctly working.',
    );
  }

  const inputRef = useRef(null);

  const {
    fieldName,
    registerField,
    defaultValue: defaultFieldValue,
    error,
  } = useField(name);

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: native === true ? 'value' : 'node.value',
      });
    }
  }, [fieldName, registerField, native]);

  const baseSelectProps: SelectProps = {
    ...restProps,
    inputProps: {
      ...restProps.inputProps,
      ref: inputRef,
    },
    defaultValue: defaultFieldValue || defaultValue,
    name,
  };

  return (
    <FormControl style={style} className={className} error={!!error}>
      {!!label && <InputLabel>{label}</InputLabel>}

      <BaseSelect {...baseSelectProps} native={native}>
        {children}
      </BaseSelect>

      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
