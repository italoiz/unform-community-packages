import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  FilledInput,
  OutlinedInput,
} from '@material-ui/core';
import MUISelect, {
  SelectProps as MUISelectProps,
} from '@material-ui/core/Select';
import { useField } from '@rocketseat/unform';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import toString from 'lodash/toString';
import uniqueId from 'lodash/uniqueId';
import React, { useRef, useEffect, ChangeEvent, useState } from 'react';

export interface SelectOption {
  value: string | number | object;
  label: string;
}

export interface SelectProps extends MUISelectProps {
  name: string;
  label?: string;
  options: SelectOption[];
}

type SelectOptionValue = string & number & object;
type NativeOptionValue = string & number;

export default function Select({
  name,
  label,
  options,
  native = false,
  multiple,
  variant,
  ...rest
}: SelectProps) {
  function getDefaultValue(value: string | string[]) {
    /** for multiple select */
    if (multiple) {
      return isEmpty(value) && !isArray(value) ? [] : value;
    }

    return value;
  }

  const ref = useRef<HTMLSelectElement>(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const [value, setValue] = useState(getDefaultValue(defaultValue));

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
      });
    }
  }, [ref.current, fieldName, value]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target) {
      const elmValue = event.target.value;

      /** update state only if controlled component */
      if (!native) {
        setValue(elmValue);
      }
    }
  }

  function getOptionKey(source: string | number | object): string {
    // generate uniqueId if is object.
    if (isObject(source)) {
      return uniqueId();
    }

    return toString(source);
  }

  function renderInputVariant() {
    if (variant === 'outlined') {
      return <OutlinedInput labelWidth={100} name={fieldName} id={fieldName} />;
    }

    if (variant === 'filled') {
      return <FilledInput name={fieldName} id={fieldName} />;
    }

    return undefined;
  }

  const props = {
    ...rest,
    native,
    multiple,
    value: native === false ? value : undefined,
    name: fieldName,
    inputProps: {
      ref,
      name: fieldName,
      id: fieldName,
      'aria-label': fieldName,
    },
    onChange: handleChange,
    input: renderInputVariant(),
  };

  return (
    <FormControl error={!!error} variant={variant}>
      {!!label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>}

      <MUISelect {...props}>
        {native && <option value="" />}

        {options.map(({ value: optionValue, label: optionLabel }) => {
          if (native) {
            return (
              <option
                key={getOptionKey(optionValue)}
                value={optionValue as NativeOptionValue}
              >
                {optionLabel}
              </option>
            );
          }

          return (
            <MenuItem
              key={getOptionKey(optionValue)}
              value={optionValue as SelectOptionValue}
            >
              {optionLabel}
            </MenuItem>
          );
        })}
      </MUISelect>

      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
