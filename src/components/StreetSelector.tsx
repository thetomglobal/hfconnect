import React, { useMemo } from 'react';
import Select from 'react-select';
import { FellowshipCenter } from '../types';

interface StreetSelectorProps {
  fellowshipCenters: FellowshipCenter[];
  onSelect: (street: string) => void;
}

interface GroupedOption {
  label: string;
  options: {
    value: string;
    label: string;
    center: FellowshipCenter;
  }[];
}

export default function StreetSelector({ fellowshipCenters, onSelect }: StreetSelectorProps) {
  const groupedOptions = useMemo(() => {
    return fellowshipCenters.map(center => ({
      label: center.name,
      options: center.streets.map(street => ({
        value: street,
        label: street,
        center: center
      }))
    }));
  }, [fellowshipCenters]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        Select Your Street
      </label>
      <Select
        options={groupedOptions}
        onChange={(option: any) => option && onSelect(option.value)}
        className="street-select"
        classNamePrefix="street-select"
        placeholder="Type or select your street..."
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#E50914',
            primary25: '#2F2F2F',
            neutral0: '#1F1F1F',
            neutral80: '#FFFFFF',
          },
        })}
        styles={{
          input: (base) => ({
            ...base,
            color: '#FFFFFF'
          }),
          option: (base) => ({
            ...base,
            color: '#FFFFFF'
          }),
          groupHeading: (base) => ({
            ...base,
            color: '#E50914',
            fontWeight: 600,
            fontSize: '0.9rem',
            textTransform: 'none',
            padding: '8px 12px'
          })
        }}
      />
    </div>
  );
}