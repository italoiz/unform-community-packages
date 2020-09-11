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

function getOptionsCollectionArray(
  options: HTMLOptionsCollection,
): HTMLOptionElement[] {
  const arr: HTMLOptionElement[] = [];
  for (let i = 0; i < options.length; i += 1) {
    arr.push(options[i]);
  }
  return arr;
}

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
  multiple,
  variant,
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
    if (multiple) {
      return defaultFieldValue || defaultValue || [];
    }
    return defaultFieldValue || defaultValue || '';
  }, [defaultFieldValue, defaultValue, multiple]);
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const _handleChange = useCallback(
    e => {
      const el = e.target;
      let value: number | number[] | string | string[];

      if (native && multiple) {
        value = getOptionsCollectionArray(el.options)
          .filter(opt => opt.selected)
          .map(opt => opt.value);
      } else {
        value = el.value;
      }

      if (valueProp === undefined && onChange === undefined) {
        setInputValue(() => value);
      }

      if (valueProp === undefined && typeof onChange === 'function') {
        setInputValue(() => value);
        onChange(e, null);
      }

      if (valueProp !== undefined && typeof onChange === 'function') {
        onChange(e, null);
      }
    },
    [valueProp, onChange, setInputValue, multiple, native],
  );

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        getValue() {
          return valueProp || inputValue;
        },
        setValue(_, newValue: string | string[] | number[]) {
          _handleChange({
            target: { value: newValue },
          });
        },
      });
    }
  }, [fieldName, registerField, _handleChange, native, valueProp, inputValue]);

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
      multiple,
      label,
      ...restProps,
    }),
    [
      inputValue,
      defaultInputValue,
      name,
      restProps,
      _handleChange,
      valueProp,
      multiple,
      label,
    ],
  );

  const shrink = useMemo<boolean>(() => {
    if (native) {
      return true;
    }

    if (multiple) {
      return !!(valueProp || inputValue).length;
    }

    return !!valueProp || !!inputValue;
  }, [native, multiple, inputValue, valueProp]);

  return (
    <FormControl
      style={{ minWidth: 200, ...style }}
      className={className}
      error={!!error}
      variant={variant}
    >
      {!!label && (
        <InputLabel shrink={shrink} {...{ 'data-testid': 'select-label' }}>
          {label}
        </InputLabel>
      )}

      <BaseSelect {...baseSelectProps} native={native}>
        {children}
      </BaseSelect>

      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default React.memo(Select);
