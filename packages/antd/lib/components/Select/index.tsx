import React, { useRef, useEffect, useMemo } from 'react';

import { Select as BaseSelect, Form } from 'antd';

import { useField } from '@unform/core';

import { printWarning } from '../../debug';
import { SelectProps, SelectComponent } from './types';

const Select: SelectComponent<SelectProps> = ({
  children,
  label,
  FormItemProps,
  name,
  mode,
  ...restProps
}) => {
  if (!name) {
    printWarning(
      'Select component must have a `name` property for correctly working.',
    );
  }

  const ref = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'rcSelect.state.value',
        getValue(fieldRef) {
          const { value } = fieldRef.rcSelect.state;

          if (['multiple', 'tags'].includes(mode as string)) {
            return value || undefined;
          }

          return value[0] || undefined;
        },
      });
    }
  }, [fieldName, registerField, mode]);

  const validateStatusProp = useMemo(() => {
    if (error) return 'error';

    return FormItemProps?.validateStatus || undefined;
  }, [error, FormItemProps]);

  const helpProp = useMemo(() => {
    if (error) return error;

    return FormItemProps?.help || undefined;
  }, [error, FormItemProps]);

  return (
    <Form.Item
      label={label}
      {...FormItemProps}
      validateStatus={validateStatusProp as 'error'}
      help={helpProp}
    >
      <BaseSelect
        {...restProps}
        ref={ref}
        defaultValue={defaultValue}
        mode={mode}
      >
        {children}
      </BaseSelect>
    </Form.Item>
  );
};

/* re-export <Option /> component */
Select.Option = BaseSelect.Option;

/* re-export <OptGroup /> component */
Select.OptGroup = BaseSelect.OptGroup;

export default Select;
