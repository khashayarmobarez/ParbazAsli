import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// assets
import PlusWithCircularBorderIcon from '../../components/icons/PlusWithCircularBorderIcon';

// Utilities
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// mui
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { CircularProgress } from '@mui/material';

// queries
import { useAddClub } from '../../Utilities/Services/clubQueries'; 

// components
import PageTitle from '../../components/reuseable/PageTitle';
import TextInput from '../../components/inputs/textInput';
import DateInput from '../../components/inputs/DateInput';


const AddClub = ({isForSetting}) => {
    
    const { formatDate } = useDateFormat();
    const appTheme = Cookies.get('themeApplied') || 'dark';

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
    const [isSubmitted, setIsSubmitted ] = useState(false)
    



    const handleUploadClick = () => {
        ProfilePicInputRef.current.click();
    };

    const handleFileChange = (event) => {
    const file = event.target.files[0];

        if (file) {
            // Check file format
            if (!allowedFormats.includes(file.type)) {
                toast('فرمت تصویر اشتباه است. لطفاً یک فایل تصویری معتبر انتخاب کنید.', {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                }); 
                return;
            }
    
            // Check file size
            if (file.size > maxFileSize) {
                toast('حداکثر حجم برای آپلود عکس 10 مگابایت است', {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                }); 
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

        console.log(foundationDate)

        // function to close the datePicker
        clickOnRightSide()
    }

    const handleExpirationDataChange = (value) => {
        const formattedToDate = formatDate(value);
        setExpirationDate(formattedToDate);

        console.log(expirationDate)

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

        setIsSubmitted(true)
        event.preventDefault();


        if(!clubName || !licenseNumber || !foundationDate || !expirationDate || !uploadedLicense) {
            toast('لطفا تمامی فیلد ها را پر کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
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
                        theme: appTheme,
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
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                }
            })
        }

    }



    return (
        <>

            {
             mutateClubLoading &&
                <div className='fixed w-[100svh] h-[100svh] z-[110] backdrop-blur-sm flex flex-col justify-center items-center gap-y-2'>
                    <CircularProgress sx={{ color:'var(--text-accent) '}} /> 
                    <p>در حال ثبت اطلاعات</p>
                </div>
            }

            <form className={`w-[90%] flex flex-col items-center ${isForSetting !== true && 'pt-8'} gap-y-6`}>

                {/* upload picture */}
                <div onClick={handleUploadClick} className='w-28 h-28 self-center flex justify-center items-center border-dashed border-2 rounded-full bg-bgUploadFile'
                style={{borderColor:'var(--softer-white)'}}>

                    <input
                        type="file"
                        ref={ProfilePicInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}

                        
                    />

                    <AddCircleOutlineOutlinedIcon sx={{width:'1.5rem', height:'1.5rem'}} />

                    {uploadedProfilePic && 
                        <>
                            <div className='w-[115px] h-[115px] absolute z-10 rounded-full' style={{border: '2px solid var(--text-accent)',}}></div>
                            <span className='w-7 absolute mt-20 ml-16 z-20' >
                                <PlusWithCircularBorderIcon />
                            </span>
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

                <p className='text-xl text-textAccent mt-[-0.5rem] mb-2'>آپلود عکس پروفایل</p>

                {/* aircraft model input */}
                <TextInput 
                id={'TI1'} 
                placeholder='نام باشگاه'
                value={clubName} 
                onChange={handleChangeClubName}  
                isSubmitted={isSubmitted}
                ErrorCondition={!clubName}
                ErrorText={'نام باشگاه الزامی می باشد'}
                />
                
                <TextInput 
                id={'TI2'} 
                placeholder='شماره مجوز'
                value={licenseNumber}
                onChange={handleLicenseNumber}
                isSubmitted={isSubmitted}
                ErrorCondition={!licenseNumber}
                ErrorText={'شماره مجوز الزامی می باشد'}
                />

                {/* the date picker component comes from equipment section */}
                <DateInput 
                    name={'تاریخ تاسیس'}
                    onChange={handleFoundationDateChange}
                    placeH={'تاریخ تاسیس'}
                    isSubmitted={isSubmitted}
                    ErrorCondition={!foundationDate}
                    ErrorText={'تاریخ تاسیس الزامی می باشد'}
                    ErrorCondition2={new Date(foundationDate) > new Date(expirationDate) && foundationDate && expirationDate}
                    ErrorText2={'تاریخ تاسیس باید قبل از تاریخ انقضا باشد'}
                />
                
                {/* the date picker component comes from equipment section */}
                <DateInput 
                    name={'تاریخ انقضا'}  
                    onChange={handleExpirationDataChange} 
                    placeH={'تاریخ انقضا'} 
                    isSubmitted={isSubmitted}
                    ErrorCondition={!expirationDate}
                    ErrorText={'تاریخ انقضا الزامی می باشد'}
                    ErrorCondition2={new Date(expirationDate) < new Date(foundationDate) && foundationDate && expirationDate}
                    ErrorText2={'تاریخ انقضا باید بعد از تاریخ تاسیس باشد'}
                />

                {/* upload license */}
                <div className='w-full flex flex-col items-center gap-y-4'>

                    <p className='text-sm'>آپلود عکس مجوز</p>

                    <div onClick={handleUploadLicenseClick} className='bg-bgUploadFile w-[340px] md:w-[370px] h-36 self-center flex justify-center items-center border-dashed border-2 rounded-3xl'
                    style={{borderColor:'var(--text-default)'}}>

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

                    {
                        !uploadedLicense && isSubmitted &&
                        <p className='text-sm text-textError self-center -mt-1'>عکس الزامی میباشد</p>
                    }

                </div>

                <button type="submit" className={`${ButtonStyles.addButton} w-32 self-center mt-6`}
                onClick={handleSubmit}
                disabled={mutateClubLoading} >
                    ثبت
                </button>

            </form>
        </>
    );
};

export default AddClub;