import React from 'react';

import inputStyles from '../../styles/Inputs/Inputs.module.css'

const UploadFileInput = ({ selectedFile, onFileChange, name }) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  return (
    <>
  {/* 
        {selectedFile && <p>Selected file: {selectedFile.name}</p>} */}

      <label className={inputStyles.customFileUpload}>
          { !selectedFile && <h3>عکس شناسه {name}</h3>}
          {selectedFile && <h3>عکس شما: {selectedFile.name}</h3>}
          <input type="file" onChange={handleFileChange}/>
          <p>آپلود فایل</p> 
      </label>

    </>
  );
};

export default UploadFileInput;
