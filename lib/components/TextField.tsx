import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from '@rocketseat/unform';
import React, { useRef, useEffect } from 'react';

export default function UnformTextField({
  name,
  helperText,
  ...rest
}: TextFieldProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(
    name as string
  );

  useEffect(() => {
    /* istanbul ignore next  */
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
      });
    }
  }, [ref.current, fieldName]);

  const props: TextFieldProps = {
    ...rest,
    defaultValue,
    name: fieldName,
    error: !!error,
    helperText: error || helperText,
    inputRef: ref,
    inputProps: {
      id: fieldName,
      'aria-label': fieldName,
    },
  };

  return <TextField {...props} />;
}
