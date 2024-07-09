import { useCallback } from 'react';

const useConvertMinutesToHours = () => {
  const convertToHoursAndMinutes = useCallback((minutes) => {
    if (minutes != null) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} ساعت ${remainingMinutes} دقیقه`;
    }
    return '';
  }, []);

  return convertToHoursAndMinutes;
};

export default useConvertMinutesToHours;