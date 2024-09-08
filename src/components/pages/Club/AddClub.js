import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// assets
import YellowPlus from '../../../assets/icons/yellowPlus.svg'

// Utilities
import useDateFormat from '../../../Utilities/Hooks/useDateFormat';

// mui
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { CircularProgress } from '@mui/material';

// queries
import { useAddClub } from '../../../Utilities/Services/clubQueries'; 

// components
import PageTitle from '../../reuseable/PageTitle';
import TextInput from '../../inputs/textInput';
import DateLastRepackInput from '../Equipment page comps/inputsForEquipment/DateLastRepackInput';


const AddClub = ({isForSetting}) => {
    
    const { formatDate } = useDateFormat();

    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/jpg'];
    const maxFileSize = 10485760;

    const { mutate: mutateClub, isLoading: mutateClubLoading } = useAddClub();

    const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
    const ProfilePicInputRef = useRef(null);

    const [uploadedLicense, setUploadedLicense] = useState(null);
    const licenseInputRef = useRef(null);

    const [clubName, setClubName] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [foundationDate, setFoundationDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    



    const handleUploadClick = () => {
        ProfilePicInputRef.current.click();
    };

    const handleFileChange = (event) => {
    const file = event.target.files[0];

        if (file) {
            // Check file format
            if (!allowedFormats.includes(file.type)) {
                toast.error('فرمت تصویر اشتباه است. لطفاً یک فایل تصویری معتبر انتخاب کنید.')
                return;
            }
    
            // Check file size
            if (file.size > maxFileSize) {
                toast.error('اندازه فایل از حد مجاز بیشتر است. لطفا یک فایل تصویری کوچکتر انتخاب کنید')
                return;
            }
    
            // Set the uploaded file if it passes all checks
            setUploadedProfilePic(file);
            console.log('Selected file:', file);
        }
    };

    const handleChangeClubName = (event) => {
        setClubName(event.target.value);
    };

    const handleLicenseNumber = (event) => {
        setLicenseNumber(event.target.value);
    }

    const handleFoundationDateChange = (value) => {

        const formattedFromDate = formatDate(value);
        setFoundationDate(formattedFromDate);

        // function to close the datePicker
        clickOnRightSide()
    }

    const handleExpirationDataChange = (value) => {
        const formattedToDate = formatDate(value);
        setExpirationDate(formattedToDate);

        clickOnRightSide()
    }

    // function to close the datePicker
    const clickOnRightSide = () => {
        // Create a new mouse event
        const clickEvent = new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth - 1, // Right edge of the screen
            clientY: window.innerHeight / 2 // Middle of the screen vertically
        });

        // Dispatch the event to the document
        document.dispatchEvent(clickEvent);
    };


    // upload license
    const handleUploadLicenseClick = () => {
        licenseInputRef.current.click();
    }

    const handleLicenseChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check file format
            if (!allowedFormats.includes(file.type)) {
                toast.error('فرمت تصویر اشتباه است. لطفاً یک فایل تصویری معتبر انتخاب کنید.')
                return;
            }
    
            // Check file size
            if (file.size > maxFileSize) {
                toast.error('اندازه فایل از حد مجاز بیشتر است. لطفا یک فایل تصویری کوچکتر انتخاب کنید')
                return;
            }
    
            // Set the uploaded file if it passes all checks
            setUploadedLicense(file);
            console.log('Selected file:', file);
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();


        if(!clubName || !licenseNumber || !foundationDate || !expirationDate || !uploadedLicense) {
            toast('لطفا تمامی فیلد ها را پر کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
            });
        } else {

            const formData = new FormData();

            formData.append('Name', clubName);
            formData.append('LicenseNumber', licenseNumber);
            formData.append('FoundationDate', foundationDate);
            formData.append('ExpirationDate', expirationDate);
            formData.append('licenseImage', uploadedLicense);
            uploadedProfilePic && formData.append('profileImage', uploadedProfilePic);


            mutateClub(formData, {
                onSuccess: (data) => {
                    console.log('Club Added:', data);
                    toast('باشگاه با موفقیت اضافه شد، منتظر تایید ادمین باشید', {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: 'dark',
                        style: { width: "350px" }
                    });

                    // reload function after half a second
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                },
                onError: (error) => {
                    let errorMessage = 'خطایی رخ داده است';
                    if (error.response && error.response.data && error.response.data.ErrorMessages) {
                        errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    }
                    toast(errorMessage, {
                        type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: 'dark',
                        style: { width: "350px" }
                    });
                }
            })
        }

    }



    return (
        <>
            {
                isForSetting !== true &&
                <PageTitle title='باشگاه' />
            }

            {
             mutateClubLoading &&
                <div className='fixed w-[100svh] h-[100svh] z-[110] backdrop-blur-sm flex flex-col justify-center items-center gap-y-2'>
                    <CircularProgress sx={{ color:'var(--yellow-text) '}} /> 
                    <p>در حال ثبت اطلاعات</p>
                </div>
            }

            <form className={`w-[90%] flex flex-col items-center ${isForSetting !== true && 'pt-8'} gap-y-6`}>

                {/* upload picture */}
                <div onClick={handleUploadClick} className='w-28 h-28 self-center flex justify-center items-center border-dashed border-2 rounded-full'
                style={{borderColor:'var(--softer-white)', backgroundColor:'var(--syllabus-data-boxes-bg) '}}>

                    <input
                        type="file"
                        ref={ProfilePicInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    <AddCircleOutlineOutlinedIcon sx={{width:'1.5rem', height:'1.5rem'}} />

                    {uploadedProfilePic && 
                        <>
                            <div className='w-[115px] h-[115px] absolute z-10 rounded-full' style={{border: '2px solid var(--yellow-text)',}}></div>
                            <img className=' w-7 absolute mt-20 ml-20 z-10' src={YellowPlus} alt='icon' />
                        </>
                    }

                    
                    {uploadedProfilePic && (
                        <div className="w-28 h-28 absolute flex-col items-center self-center">
                            {uploadedProfilePic.type.startsWith('image/') && (
                            <img
                                src={URL.createObjectURL(uploadedProfilePic)}
                                alt="Uploaded Preview"
                                className=" rounded-full w-full h-full object-cover"
                            />
                            )}
                        </div>
                    )}

                    
                </div>

                <p className='text-sm mt-[-0.5rem]'>آپلود عکس پروفایل</p>

                {/* aircraft model input */}
                <TextInput placeholder='نام باشگاه' value={clubName} onChange={handleChangeClubName}  />
                
                <TextInput placeholder='شماره مجوز' value={licenseNumber} onChange={handleLicenseNumber}  />

                {/* the date picker component comes from equipment section */}
                <DateLastRepackInput name={'تاریخ تاسیس'}  onChange={handleFoundationDateChange} placeH={'تاریخ تاسیس'} />
                
                {/* the date picker component comes from equipment section */}
                <DateLastRepackInput name={'تاریخ انقضا'}  onChange={handleExpirationDataChange} placeH={'تاریخ انقضا'} />

                {/* upload license */}
                <div className='w-full flex flex-col items-center gap-y-4'>

                    <p className='text-sm'>آپلود عکس مجوز</p>

                    <div onClick={handleUploadLicenseClick} className='w-[340px] md:w-[370px] h-36 self-center flex justify-center items-center border-dashed border-2 rounded-3xl'
                    style={{borderColor:'var(--softer-white)', backgroundColor:'var(--syllabus-data-boxes-bg) '}}>

                        <input
                            type="file"
                            ref={licenseInputRef}
                            style={{ display: 'none' }}
                            onChange={handleLicenseChange}
                        />

                        <AddCircleOutlineOutlinedIcon sx={{width:'2rem', height:'2rem'}} />

                        
                        {uploadedLicense && (
                            <div className="w-[315px] md:w-[365px] h-[150px] absolute flex-col items-center self-center">
                                {uploadedLicense.type.startsWith('image/') && (
                                <img
                                    src={URL.createObjectURL(uploadedLicense)}
                                    alt="Uploaded Preview"
                                    className=" rounded-3xl w-full h-full object-cover"
                                />
                                )}
                            </div>
                        )}   
                    </div>

                    <p className='text-sm w-[85%] self-center'>
                        فرمت عکس باید jpeg, jpg, gif, bmp یا png 
                        باشد حجم عکس نباید بیشتر از 10 مگابایت باشد
                    </p>

                </div>

                <button type="submit" className={`${ButtonStyles.addButton} w-24 self-center mt-4`}
                onClick={handleSubmit}
                disabled={mutateClubLoading} >
                    ثبت
                </button>

            </form>
        </>
    );
};

export default AddClub;