import React from 'react';
import { useTheme } from '../../../Utilities/Hooks/useTheme';
import DropdownInput from '../../inputs/DropDownInput';

// assets
import colorTagsIcon from '../../../assets/icons/colorTagsIcon.svg';

const WebColorMode = () => {
  const { currentMode, toggleTheme } = useTheme();

  const options = [
    { id: 'light', name: 'حالت روز' },
    { id: 'dark', name: 'حالت شب' },
    { id: 'auto', name: 'خودکار' },
  ];

  const handleSelectColor = (selectedOption) => {
    toggleTheme(selectedOption.id);
  };

  return (
    <div
      className="w-full flex justify-between items-center px-4 py-3 rounded-3xl"
      style={{ background: 'var(--button-toggle-bg)', boxShadow: 'var(--button-toggle-boxshadow)' }}
    >
      <DropdownInput
        name="حالت اپلیکیشن"
        icon={colorTagsIcon}
        options={options}
        selectedOption={currentMode}
        handleSelectChange={handleSelectColor}
      />
    </div>
  );
};

export default WebColorMode;