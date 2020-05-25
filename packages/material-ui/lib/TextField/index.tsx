import React, { useRef, useEffect, useState, useCallback } from 'react';

import { TextField as BaseTextField } from '@material-ui/core';
import { useField } from '@unform/core';

import { printWarning } from '../debug';
import { TextFieldProps } from './types';

const TextField: React.FC<TextFieldProps> = ({
  name,
  helperText,
  defaultValue,
  InputLabelProps,
  ...restProps
}) => {
  if (!name) {
    printWarning(
      'TextField component must have a `name` property for correctly working.',
    );
  }

  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    fieldName,
    defaultValue: fieldDefaultValue,
    registerField,
    error,
  } = useField(name);
  const defaultInputValue = fieldDefaultValue || defaultValue;
  const [shrink, setShrink] = useState<boolean>(!!defaultInputValue);

  const _handleShrinkLabel = useCallback(
    (value: string) => {
      setShrink(oldShrink => {
        return (value && !oldShrink) || (!value && oldShrink)
          ? !oldShrink
          : oldShrink;
      });
    },
    [setShrink],
  );

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
        setValue(ref: HTMLInputElement, value: string) {
          if (ref) {
            ref.value = value;
            _handleShrinkLabel(value);
          }
        },
      });
    }
  }, [fieldName, registerField, _handleShrinkLabel]);

  useEffect(() => {
    const input = inputRef.current;

    const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
      _handleShrinkLabel(e.currentTarget.value);
    };

    if (input) {
      input.addEventListener('input', handler as any);
    }

    return () => {
      if (input) {
        input.removeEventListener('input', handler as any);
      }
    };
  }, [inputRef, _handleShrinkLabel]);

  return (
    <BaseTextField
      {...restProps}
      name={fieldName}
      error={!!error}
      helperText={error || helperText}
      inputRef={inputRef}
      defaultValue={defaultInputValue}
      InputLabelProps={{
        ...InputLabelProps,
        shrink,
      }}
    />
  );
};

export default React.memo(TextField);
