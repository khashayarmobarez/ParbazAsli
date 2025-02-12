import React from 'react';
import { useTheme } from '../../Utilities/Hooks/useTheme';
import DropdownInput from '../../elements/inputs/DropDownInput';

// assets
import ColorTagsIcon from '../../elements/icons/ColorTagsIcon';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import PhonelinkSetupOutlinedIcon from '@mui/icons-material/PhonelinkSetupOutlined';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const WebColorMode = () => {

  // language
  const { t } = useTranslation();

  const { currentMode, toggleTheme } = useTheme();

  const options = [
    { id: 'light', name: t('settings.appColorMode.lightMode') },
    { id: 'dark', name: t('settings.appColorMode.darkMode') },
    { id: 'auto', name: t('settings.appColorMode.autoMode') },
  ];

  const handleSelectColor = (selectedOption) => {
    toggleTheme(selectedOption.id);
  };

  return (
    <div className="w-full flex justify-around items-center py-0 rounded-3xl text-textAccent">
    <div
      className={`flex flex-col justify-center items-center gap-y-2 w-[84px] h-[84px] border border-textAccent rounded-2xl transition-all duration-700 ${currentMode === 'light' && 'bg-textAccent text-[#eee]'}`}
      onClick={() => handleSelectColor({ id: 'light', name: t('settings.appColorMode.lightMode') })}
    >
      <WbSunnyOutlinedIcon sx={{ width: '2rem', height: '2rem' }} />
      <p>{t('settings.appColorMode.day')}</p>
    </div>

    <div
      className={`flex flex-col justify-center items-center gap-y-2 w-[84px] h-[84px] border border-textAccent rounded-2xl transition-all duration-700 ${currentMode === 'dark' && 'bg-textAccent text-[#eee]'}`}
      onClick={() => handleSelectColor({ id: 'dark', name: t('settings.appColorMode.darkMode') })}
    >
      <BedtimeOutlinedIcon sx={{ width: '2rem', height: '2rem' }} />
      <p>{t('settings.appColorMode.night')}</p>
    </div>

    <div
      className={`flex flex-col justify-center items-center gap-y-2 w-[84px] h-[84px] border border-textAccent rounded-2xl transition-all duration-700 ${currentMode === 'auto' && 'bg-textAccent text-[#eee]'}`}
      onClick={() => handleSelectColor({ id: 'auto', name: t('settings.appColorMode.autoMode') })}
    >
      <PhonelinkSetupOutlinedIcon sx={{ width: '2rem', height: '2rem' }} />
      <p>{t('settings.appColorMode.automatic')}</p>
    </div>
  </div>
  );
};

export default WebColorMode;