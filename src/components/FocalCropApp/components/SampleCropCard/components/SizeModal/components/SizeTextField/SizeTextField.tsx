import React, {useState} from 'react';
import {TextField} from '@shopify/polaris';
import {snakeCase} from 'lodash';

import './SizeTextField.css';

export interface SizeTextFieldProps {
  name: string;
  value: string;
  setValue: (value: string) => void;
}

export function SizeTextField({name, value, setValue}: SizeTextFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <>
          {snakeCase(name)}:
          <span className="size-text-wrapper">
            <input aria-label={name} value={value} onChange={handleChange} autoComplete="false" />
          </span>
        </>;
}
