import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';

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
  onChange,
  value: valueProp,
  ...restProps
}) => {
  if (!name) {
    printWarning(
      'Select component must have a `name` property for correctly working.',
    );
  }

  const {
    fieldName,
    registerField,
    defaultValue: defaultFieldValue,
    error,
  } = useField(name);

  const inputRef = useRef(null);
  const defaultInputValue = useMemo(() => {
    return defaultFieldValue || defaultValue || '';
  }, [defaultFieldValue, defaultValue]);
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const _handleChange = useCallback(
    e => {
      if (valueProp === undefined && onChange === undefined) {
        setInputValue(() => e.target.value);
      }

      if (valueProp === undefined && typeof onChange === 'function') {
        setInputValue(() => e.target.value);
        onChange(e, null);
      }

      if (valueProp !== undefined && typeof onChange === 'function') {
        onChange(e, null);
      }
    },
    [valueProp, onChange, setInputValue],
  );

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: native === true ? 'value' : 'node.value',
        setValue(_, newValue: string | string[] | number[]) {
          _handleChange({
            target: { value: newValue },
          });
        },
      });
    }
  }, [fieldName, registerField, _handleChange, native]);

  const baseSelectProps: SelectProps = useMemo(
    () => ({
      value: !valueProp ? inputValue : valueProp,
      inputProps: {
        ...restProps.inputProps,
        ref: inputRef,
      },
      defaultValue: defaultInputValue || inputValue,
      onChange: _handleChange,
      name,
      ...restProps,
    }),
    [inputValue, defaultInputValue, name, restProps, _handleChange, valueProp],
  );

  return (
    <FormControl
      style={{ minWidth: 120, ...style }}
      className={className}
      error={!!error}
    >
      {!!label && (
        <InputLabel shrink={!!inputValue || !!valueProp}>{label}</InputLabel>
      )}

      <BaseSelect {...baseSelectProps} native={native}>
        {children}
      </BaseSelect>

      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default React.memo(Select);
