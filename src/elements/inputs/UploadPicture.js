import React, { useState, useRef } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { toast } from 'react-toastify';

import Cookies from 'js-cookie';
import { useTranslation } from '../../Utilities/context/TranslationContext';

const UploadPicture = ({ isSubmitted, setUploadedFile, uploadedFile }) => {

  // language
  const dir = Cookies.get('dir') || 'ltr';
  const { t } = useTranslation();

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
        toast(t("inputs.uploadCertificate.notifications.invalidFileFormat"), {
            type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
            position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
            autoClose: 3000,
            theme: appTheme,
            style: { width: "350px" }
        });
        return;
      }

      if (file.size > maxSizeInBytes) {
        toast(t("inputs.uploadCertificate.notifications.fileSizeExceeded"), {
            type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
            position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
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
        <p className="text-sm mt-2">{t("inputs.uploadCertificate.uploadPicture")}</p>
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
          {t("inputs.uploadCertificate.imageFormatInstruction")}
        </p>

        {!uploadedFile && isSubmitted && (
          <p className="text-textError -mt-3 mb-0">{t("inputs.uploadCertificate.imageRequiredError")}</p>
        )}
      </div>
    );
};

export default UploadPicture;
