import { FormControlLabel } from '@material-ui/core';
import MUICheckbox, {
  CheckboxProps as BaseCheckboxProps,
} from '@material-ui/core/Checkbox';
import { useField } from '@rocketseat/unform';
import React, { useRef, useEffect, useState } from 'react';

interface CheckboxProps extends BaseCheckboxProps {
  label?: string;
  labelPlacement?: 'top' | 'start' | 'bottom' | 'end';
}

export default function Checkbox({
  name,
  label = '',
  checked: checkedProp,
  disabled = false,
  labelPlacement,
  ...rest
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue } = useField(name as string);
  const [checked, setChecked] = useState<boolean | undefined>(
    Boolean(defaultValue) || checkedProp
  );

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'checked',
        clearValue: (inputRef: HTMLInputElement) => {
          inputRef.checked = false;
        },
      });
    }
  }, [ref.current, fieldName]);

  function handleChanged(evt: React.ChangeEvent<HTMLInputElement>) {
    const inputRef: HTMLInputElement | null = ref.current;

    if (inputRef && checkedProp) {
      setChecked(evt.target.checked);
    }
  }

  const props = {
    ...rest,
    id: fieldName,
    checked,
    disabled,
    inputProps: {
      ...rest.inputProps,
      ref,
      name: fieldName,
      id: fieldName,
      'aria-label': fieldName,
    },
    onChange: checkedProp ? handleChanged : undefined,
  };

  if (label) {
    return (
      <FormControlLabel
        control={<MUICheckbox {...props} />}
        label={label}
        disabled={disabled}
        labelPlacement={labelPlacement}
      />
    );
  }

  return <MUICheckbox {...props} />;
}
