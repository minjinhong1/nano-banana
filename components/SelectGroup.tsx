
import React from 'react';
import type { Option } from '../types';

interface SelectGroupProps<T extends string> {
  label: string;
  options: Option<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
}

export const SelectGroup = <T extends string,>({ label, options, selectedValue, onChange }: SelectGroupProps<T>): React.ReactElement => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-purple-300 mb-2">{label}</label>
      <select
        id={label}
        name={label}
        value={selectedValue}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-gray-200 p-3 transition"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
