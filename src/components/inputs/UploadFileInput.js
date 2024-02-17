import React from 'react';

const UploadFileInput = ({ selectedFile, onFileChange }) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  return (
    <div className='w-full'>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      <input type="file" onChange={handleFileChange} value={selectedFile ? selectedFile.name : ''} />
    </div>
  );
};

export default UploadFileInput;
