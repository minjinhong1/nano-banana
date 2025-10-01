
import React from 'react';
import type { Option } from '../types';

interface OptionGroupProps<T extends string> {
  label: string;
  options: Option<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
}

export const OptionGroup = <T extends string,>({ label, options, selectedValue, onChange }: OptionGroupProps<T>): React.ReactElement => {
  return (
    <div>
      <label className="block text-sm font-medium text-purple-300 mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center rounded-md transition ${
              selectedValue === option.value
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {option.icon && <i className={`${option.icon} w-4 text-center`}></i>}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};