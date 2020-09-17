import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CircularProgress, TextField as TextInput } from '@material-ui/core';
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import { useField } from '@unform/core';

import { AutocompleteProps, AutocompleteOption } from './types';

const Autocomplete: React.FC<AutocompleteProps> = ({
  name,
  label,
  options,
  loading,
  helperText,
  value: valueProp,
  multiple,
  required,
  ...restProps
}) => {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(
    valueProp || defaultValue || null,
  );
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [filteredDefaultValue, setFilteredDefaultValue] = useState<
    AutocompleteOption | AutocompleteOption[] | undefined
  >(undefined);

  const _handleChange = useCallback(
    (_, selectedOptions: AutocompleteOption | null) => {
      let value: number | number[] | string | string[];

      if (multiple && Array.isArray(selectedOptions)) {
        value = selectedOptions.map(item => String(item.value));
      } else {
        value = selectedOptions ? selectedOptions.value : '';
      }

      setInputValue(() => value);
    },
    [setInputValue, multiple],
  );

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        getValue() {
          return valueProp || inputValue;
        },
      });
    }
  }, [
    fieldName,
    registerField,
    _handleChange,
    valueProp,
    inputValue,
    inputRef,
  ]);

  useEffect(() => {
    if (!loading && !initialLoaded) {
      const initialDefaultOption =
        multiple && Array.isArray(inputValue)
          ? options.filter(option => inputValue.includes(option.value))
          : options.find(option => option.value === inputValue);

      setFilteredDefaultValue(initialDefaultOption);
      setInitialLoaded(true);
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {initialLoaded ? (
          <MaterialAutocomplete
            {...restProps}
            options={options}
            loading={loading}
            multiple={multiple}
            defaultValue={inputValue ? filteredDefaultValue : undefined}
            onChange={_handleChange}
            getOptionLabel={option => option?.label ?? ''}
            getOptionSelected={(option, value) => option.value === value.value}
            renderInput={params => (
              <TextInput
                {...params}
                error={!!error}
                helperText={error || helperText}
                name={name}
                label={label}
                required={required}
                variant="outlined"
                fullWidth
                ref={params.InputProps.ref}
                inputRef={inputRef}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
      ) : (
        <CircularProgress color="inherit" size={20} />
      )}
    </>
  );
};

export default React.memo(Autocomplete);
