import React from 'react';

const NumberToPersian = ({ number }) => {
  const persianDigits = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹',
  };

  const convertToPersian = (number) => {
    return number.toString().split('').map(digit => persianDigits[digit]).join('');
  };

  return <>{convertToPersian(number)}</>;
};

export default NumberToPersian;