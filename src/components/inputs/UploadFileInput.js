import React, { useState } from 'react';

import inputStyles from '../../styles/Inputs.module.css'

const UploadFileInput = ({ selectedFile, onFileChange, name }) => {

  const [filled, setFilled] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
    setFilled(event.target.value.trim() !== ''); // Check if the input is filled
  };

  return (
    <>
  {/* 
        {selectedFile && <p>Selected file: {selectedFile.name}</p>} */}

      <label className={`${inputStyles.customFileUpload} ${filled && inputStyles.inputFilledBorder}`}>
          { !selectedFile && <h3>عکس شناسه {name}</h3>}
          {selectedFile && <h3 className=''>عکس شما: {selectedFile.name}</h3>}
          <input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png"/>
          <p className=' min-w-20'>آپلود فایل</p> 
      </label>

    </>
  );
};

export default UploadFileInput;
