import React, { useRef, useState } from 'react';

// queries
import { useDeleteClubProfilePicture, useUploadClubPicture } from '../../../Utilities/Services/clubQueries';

// mui
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// styles
import boxStyles from '../../../styles/DataBox.module.css';
import ButtonStyles from '../../../styles/ButtonsBox.module.css'
import { useTranslation } from '../../../Utilities/context/TranslationContext';


const ChangeClubPicPopUp = ({setShowPopup, showPopup}) => {

    // language
    const { t } = useTranslation();

    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/jpg'];
    const maxFileSize = 10485760;

    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);

    // add or change picture
    const { mutate: uploadPicture, isLoading, error: submitError } = useUploadClubPicture();

    // delete picture
    const { mutate: deletePicture, isLoading: isDeleting, error: deleteError } = useDeleteClubProfilePicture();
    

    const [errMsg, setErrMsg] = useState(null)

    const handleUploadClick = () => {
        fileInputRef.current.click();
      };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check file format
            if (!allowedFormats.includes(file.type)) {
                setErrMsg(t("club.changeClubPic.invalidFileFormat"))
                return;
            }
    
            // Check file size
            if (file.size > maxFileSize) {
                setErrMsg(t("club.changeClubPic.maxFileSize"))
                return;
            }
    
            // Set the uploaded file if it passes all checks
            setUploadedFile(file);
            console.log('Selected file:', file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (uploadedFile) {
            const formData = new FormData();
            formData.append('file', uploadedFile);
            uploadPicture(formData
                , {
                    onSuccess: () => {
                        window.location.reload();
                    }
                }
            );
            // setShowPopup(false)
        } else {
            setErrMsg(t("club.changeClubPic.selectFile"));
        }
    };

    const handleRemove = (event) => {
        deletePicture(
            null,
            {
                onSuccess: () => {
                    window.location.reload();
                }
            }
        );
        if(!isDeleting && !deleteError) {
            setShowPopup(false)
        }
    }

    return (
        <div className={` w-full h-full backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 ${showPopup ? 'visible' : 'invisible'}`}>
            <form
                className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[454px] gap-y-2 flex flex-col justify-around items-center relative bg-white p-5 rounded-lg shadow-lg`}
            >
                <CloseIcon
                    onClick={() => setShowPopup(false)}
                    sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                />

                {/* upload picture */}
                <p className='text-xl text-textAccent mt-4 mb-2'>{t("club.changeClubPic.uploadProfilePic")}</p>
                
                <div onClick={handleUploadClick} className='w-32 h-32 self-center flex justify-center items-center border-dashed border-2 rounded-full bg-bgUploadFile'
                style={{borderColor:'var(--softer-white)'}}>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    <AddCircleOutlineOutlinedIcon sx={{width:'2rem', height:'2rem'}} />

                    
                    {uploadedFile && (
                        <div className="w-32 h-32 absolute flex-col items-center self-center">
                            {uploadedFile.type.startsWith('image/') && (
                            <img
                                src={URL.createObjectURL(uploadedFile)}
                                alt="Uploaded Preview"
                                className=" rounded-full w-full h-full object-cover"
                            />
                            )}
                        </div>
                    )}
                    
                </div>
                
                <p className='text-xs mt-2'>{t("club.changeClubPic.allowedFormats")}</p>
                <p className='text-xs'>{t("club.changeClubPic.maxFileSize")}</p>
                
                <div className='w-full flex justify-around items-center mt-4'>

                    <button type="reset" disabled={isDeleting}  className={`${ButtonStyles.normalButton} w-28 text-sm `} onClick={handleRemove} >
                        {isDeleting ? t("club.changeClubPic.deleting") : t("club.changeClubPic.removePicture")}
                    </button>

                    <button type="submit" disabled={isLoading} className={`${ButtonStyles.addButton} w-28 self-center text-sm`}
                    onClick={handleSubmit} >
                        {isLoading ? t("club.changeClubPic.uploading") : t("club.changeClubPic.saveChanges")}
                    </button>

                </div>

                {errMsg && <p style={{ color: 'red' }}>Error: {errMsg}</p>}
                {submitError && <p style={{ color: 'red' }}>{submitError.message}</p>}
                {/* {SubmitSuccess && <p style={{ color: 'green' }}>گواهینامه با موفقیت اضافه شد</p>} */}
            </form>
        </div>
    );
};

export default ChangeClubPicPopUp;