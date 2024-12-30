import React, { useState, useRef } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';

const UploadPicture = ({ isSubmitted, setUploadedFile, uploadedFile }) => {

  const appTheme = Cookies.get('themeApplied') || 'dark';

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
      const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

      if (!validTypes.includes(file.type)) {
        toast('فرمت فایل نامعتبر است', {
            type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
            autoClose: 3000,
            theme: appTheme,
            style: { width: "350px" }
        });
        return;
      }

      if (file.size > maxSizeInBytes) {
        toast('حجم فایل بیش از حد مجاز است.', {
            type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
            autoClose: 3000,
            theme: appTheme,
            style: { width: "350px" }
        });
        return;
      }

      setUploadedFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <p className="text-sm mt-2">آپلود عکس گواهینامه</p>
      <div
        onClick={handleUploadClick}
        className="w-[320px] md:w-[370px] bg-bgUploadFile text-textUploadFile h-40 self-center flex justify-center items-center border-dashed border-2 border-textDefault rounded-3xl -mt-1 -mb-3 relative cursor-pointer"
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {!uploadedFile && <AddCircleOutlineOutlinedIcon sx={{ width: '2rem', height: '2rem' }} />}

        {uploadedFile && uploadedFile.type.startsWith('image/') && (
          <div className="w-[315px] md:w-[365px] h-[150px] absolute flex-col items-center self-center">
            <img
              src={URL.createObjectURL(uploadedFile)}
              alt="Uploaded Preview"
              className="rounded-3xl w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <p className="text-sm w-[85%] self-center">
        فرمت عکس باید jpeg, jpg, gif, bmp یا png باشد
        حجم عکس نباید بیشتر از 10 مگابایت باشد
      </p>

      {!uploadedFile && isSubmitted && (
        <p className="text-textError -mt-3 mb-0">عکس گواهینامه الزامی می باشد</p>
      )}
    </div>
  );
};

export default UploadPicture;
