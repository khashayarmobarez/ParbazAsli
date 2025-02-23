import React, { useRef, useState } from 'react';

// queries
import { useDeleteProfilePicture, useUploadProfilePicture } from '../../../Utilities/Services/userQueries';

// mui
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// styles
import boxStyles from '../../../styles/DataBox.module.css';
import ButtonStyles from '../../../styles/ButtonsBox.module.css'


const ChangePicPopUp = ({setShowPopup, showPopup, isUserPhotoAvailable}) => {

    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/jpg'];
    const maxFileSize = 10485760;

    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);

    // add or change picture
    const { mutate: uploadPicture, isLoading, error: submitError } = useUploadProfilePicture();

    // delete picture
    const { mutate: deletePicture, isLoading: isDeleting, error: deleteError } = useDeleteProfilePicture();
    

    const [errMsg, setErrMsg] = useState(null)

    const handleUploadClick = () => {
        fileInputRef.current.click();
      };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check file format
            if (!allowedFormats.includes(file.type)) {
                setErrMsg('فرمت تصویر اشتباه است. لطفاً یک فایل تصویری معتبر انتخاب کنید.')
                return;
            }
    
            // Check file size
            if (file.size > maxFileSize) {
                setErrMsg('اندازه فایل از حد مجاز بیشتر است. لطفا یک فایل تصویری کوچکتر انتخاب کنید')
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
            setErrMsg('لطفا یک فایل تصویری انتخاب کنید.');
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
        <div className={` w-full h-full backdrop-blur-sm fixed inset-0 flex items-center justify-center z-[50] ${showPopup ? 'visible' : 'invisible'}`}>
            <form
                className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[324px] gap-y-4 flex flex-col z-[50] justify-around items-center relative bg-white p-4 rounded-[34px] shadow-lg`}
            >
                <CloseIcon
                onClick={() => setShowPopup(false)}
                sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                />

                {/* upload picture */}
                <p className='text-xl text-textAccent mt-4'>آپلود عکس پروفایل</p>
                
                <div onClick={handleUploadClick} className='w-28 h-28 self-center flex justify-center items-center border-dashed border-2 rounded-full'
                style={{borderColor:'var(--text-default)', backgroundColor:'var(--bg-upload-file)'}}>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    <AddCircleOutlineOutlinedIcon sx={{width:'2rem', height:'2rem', zIndex: '10'}} />

                    
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
                
                <p className='text-xs'>فرمت عکس ها باید bmp, gif, jpg, jpeg یا png باشد</p>
                <p className='text-xs -mt-4'>حجم عکس ها نباید بیشتر از 10 مگابایت باشد</p>
                
                <div className='w-full flex justify-center items-center gap-x-10'>

                    {
                        isUserPhotoAvailable &&
                            <button type="reset" disabled={isDeleting}  className={`${ButtonStyles.normalButton} w-[108px] text-sm `} onClick={handleRemove} >
                                {isDeleting ? 'در حال حذف...' : 'حذف عکس فعلی'}
                            </button>
                    }
                    
                    <button type="submit" disabled={isLoading} className={`${ButtonStyles.addButton} w-[108px] self-center text-sm`}
                    onClick={handleSubmit} >
                        {isLoading ? 'در حال بارگذاری...' : 'ثبت تغییرات'}
                    </button>

                </div>

                {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
                {submitError && <p style={{ color: 'red' }}>{submitError.message}</p>}
                {/* {SubmitSuccess && <p style={{ color: 'green' }}>گواهینامه با موفقیت اضافه شد</p>} */}
            </form>
        </div>
    );
};

export default ChangePicPopUp;