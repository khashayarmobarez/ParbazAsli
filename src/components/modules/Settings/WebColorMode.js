import React from 'react';
import { useTheme } from '../../../Utilities/Hooks/useTheme';
import DropdownInput from '../../inputs/DropDownInput';

// assets
import ColorTagsIcon from '../../../components/icons/ColorTagsIcon';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import PhonelinkSetupOutlinedIcon from '@mui/icons-material/PhonelinkSetupOutlined';

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
      className="w-full flex justify-around items-center py-0 rounded-3xl text-textAccent "
    >
      <div className={`flex flex-col justify-center items-center gap-y-2 w-[84px] h-[84px] border border-textAccent rounded-2xl transition-all duration-700 ${currentMode === 'light' && 'bg-textAccent text-[#eee]'}`} 
      onClick={() => handleSelectColor({ id: 'light', name: 'حالت روز' })}>
        <WbSunnyOutlinedIcon sx={{width:'2rem', height:'2rem'}} />
        <p>روشن</p>
      </div>

      <div className={`flex flex-col justify-center items-center gap-y-2 w-[84px] h-[84px] border border-textAccent rounded-2xl transition-all duration-700 ${currentMode === 'dark' && 'bg-textAccent text-[#eee]'}`} 
      onClick={() => handleSelectColor({ id: 'dark', name: 'حالت شب' })}>
        <BedtimeOutlinedIcon sx={{width:'2rem', height:'2rem'}} />
        <p>تیره</p>
      </div>

      <div className={`flex flex-col justify-center items-center gap-y-2 w-[84px] h-[84px] border border-textAccent rounded-2xl transition-all duration-700 ${currentMode === 'auto' && 'bg-textAccent text-[#eee]'}`} 
      onClick={() => handleSelectColor({ id: 'auto', name: 'خودکار' })}>
        <PhonelinkSetupOutlinedIcon sx={{width:'2rem', height:'2rem'}} />
        <p>خودکار</p>
      </div>

      {/* <DropdownInput
        name="حالت اپلیکیشن"
        icon={<ColorTagsIcon/>}
        options={options}
        selectedOption={currentMode}
        handleSelectChange={handleSelectColor}
      /> */}
    </div>
  );
};

export default WebColorMode;