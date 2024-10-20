import React from 'react';
import { useTheme } from '../../../Utilities/Hooks/useTheme';
import DropdownInput from '../../inputs/DropDownInput';

// assets
import ColorTagsIcon from '../../../components/icons/ColorTagsIcon';

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
      className="w-full flex justify-between items-center py-0 rounded-3xl"
    >
      <DropdownInput
        name="حالت اپلیکیشن"
        icon={<ColorTagsIcon/>}
        options={options}
        selectedOption={currentMode}
        handleSelectChange={handleSelectColor}
      />
    </div>
  );
};

export default WebColorMode;