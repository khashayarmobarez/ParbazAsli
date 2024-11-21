import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { postIsUserAuthenticated } from '../../../../Utilities/Services/AuthenticationApi';
import {  useNavigate } from 'react-router-dom';

// assets 
import CertificateIcon from '../../../../components/icons/CertificateIcon'

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// mui
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, CircularProgress } from '@mui/material';

// queries
import { useAddCertificate, useOrganLevelsForCourse, useOrgansData } from '../../../../Utilities/Services/queries'

// utilities
import useDateFormat from '../../../../Utilities/Hooks/useDateFormat';

// components
import UserDataBox from '../../Profile/UserDataBox';
import DropdownInput from '../../../inputs/DropDownInput';
import TextInput from '../../../inputs/textInput';
import DateLastRepackInput from '../../Equipment page comps/inputsForEquipment/DateLastRepackInput';
import DigilogbookLoading from '../../../Loader/DigilogbookLoading';
import { toast } from 'react-toastify';


const AddCertificate = () => {

    const navigate = useNavigate();

    const isUserAuthenticated = Cookies.get('isUserAuthenticated')
    const appTheme = Cookies.get('theme') || 'dark';

    const { formatDate } = useDateFormat();

    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/jpg'];
    const maxFileSize = 10485760;
    
    
    const [organ, setOrgan] = useState('')
    
    const [level, setLevel] = useState('')
    
    const [certificateId, setCertificateId] = useState('');
    
    const [dateStartValue, setDateStartValue] = useState('')    
    
    const [dateEndValue, setDateEndValue] = useState('')
    
    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);
    
    const [errMsg, setErrMsg] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [isStarter, setIsStarter] = useState('notAnsweredYet')
    
    useEffect(() => {
        if(organ) {
            console.log(organ)
        }
    },[organ])
    
    
    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevelsForCourse(organ && organ.id);
    const { mutate: mutateCertificate, isLoading: isSubmitting, isError: SubmitIsError, error: SubmitError, isSuccess: SubmitSuccess } = useAddCertificate();
    
    if(isUserAuthenticated !== 'noCertificate') {
        // reload
        window.location.reload();
    }
    
    // clear the other states if organ changes
    useEffect(() => {
        setLevel('')
        setCertificateId('')
        setDateStartValue('')
        setDateEndValue('')
        setUploadedFile(null)
    }, [organ])


    const handleSelectOrganChange = (selectedOption) => {
        setOrgan(selectedOption);
    };

    const handleSelectLevelChange = (selectedOption) => {
        setLevel(selectedOption);
    };

    const handleCertificateIdChange = (event) => {
        setCertificateId(event.target.value);
    };

    const handleCertificateStartDateChange = (value) => {
        setDateStartValue(value)

        // function to close the datePicker
        clickOnRightSide()
    }

    const handleCertificateEndDateChange = (value) => {
        setDateEndValue(value)

        // function to close the datePicker
        clickOnRightSide()
    }
    
    // user is starter
    const handleUserIsStarter = (userSituation, event) => {
        event.preventDefault();
        setIsStarter(userSituation);
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

    // mutate, post data
    const handleSubmit = (event) => {

        setIsSubmitted(true)
        event.preventDefault();

        if(
            !organ || ((isStarter === 'false') && ( !level || !certificateId || !dateStartValue || !dateEndValue || !uploadedFile))
        ) {
            toast("فرم را کامل کنید", {
                type: 'error',
                position: 'top-right',
                autoClose: 3000,
                theme: appTheme,
                style: { width: "90%" }
            }); 
            return
        }

        const formattedStartDate = formatDate(dateStartValue);
        const formattedEndDate = formatDate(dateEndValue);

        console.log(level,certificateId,formattedStartDate,formattedEndDate,dateStartValue,uploadedFile)
        
        const formData = new FormData();
        if(isStarter === 'true') {
            formData.append('LevelId', organ.starterLevelId);
        } else {
            formData.append('LevelId', level.id);
            formData.append('Number', certificateId);
    
            if (dateStartValue && dateEndValue) {
                formData.append('IssueDate', formattedStartDate)
                formData.append('ExpirationDate', formattedEndDate)
            } else 
                {
                formData.append('IssueDate', dateStartValue)
                formData.append('ExpirationDate', dateEndValue)
            }
    
            if (uploadedFile) {
                formData.append('File', uploadedFile);
            }
        }
        
        mutateCertificate(formData, {
                onSuccess: async (data) => {
                console.log(data);
                toast('گواهینامه با موفقیت اضافه شد', {
                    type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: appTheme,
                    style: { width: "350px" }
                });
                setTimeout(() => {
                    window.location.reload();
                    navigate('/adminPending');
                }, 1000);
                },
                onError: (error) => {
                    console.error('Error adding certificate:', error);
                },
            }
        );

    };


    return (
        <div className='flex flex-col items-center pt-20 pb-[4rem]'>
            {
                organsLoading &&
                <DigilogbookLoading />
            }
            <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%] md:w-[65%]'>


                <UserDataBox />
                
                <div className='w-full flex flex-col gap-y-2'>
                    <p className='text-textWarning text-start'>برای دسترسی به پنل کاربری احراز موارد زیر الزامی است.</p>
                </div>


                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-full'>
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[98%] text-xs'>

                        <p className='' style={{color:'var(--icon-disable)'}}>تاییدیه</p>

                        <p className='mr-3 md:mr-0' style={{color:'var(--text-accent)'}}>گواهینامه</p>

                        <p className='' style={{color:'var(--text-accent)'}}>احراز ایمیل</p>

                    </div>

                    {
                        organsLoading && 
                        <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'3rem' }}>
                            <CircularProgress /> 
                        </Box>
                    }

                    {
                        organsError && 
                        <div className='w-full min-h-[71vh]'>
                            <p>مشکلی رخ داده است</p>
                        </div>
                    }
                    {
                        organsData &&
                        <>
                            <form className='w-full flex flex-col md:w-[50%] gap-y-5'>


                                <div className='w-full flex flex-col items-center py-4 px-5 bg-bgOutputDefault rounded-2xl gap-y-4' >

                                    <p className='self-start text-base '>آیا تابحال گواهینامه پروازی گرفته‌اید؟</p>

                                    <div className={`${ButtonStyles.ThreeStickedButtonCont} w-full`}>

                                        {/* booleans identified as a string for more precision */}
                                        <button 
                                            className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${ isStarter === 'false' ? ButtonStyles.activeYellow : ''} `} 
                                            style={{boxShadow:'var(--shadow-button-dark), var(--shadow-button-white)'}}
                                            onClick={(event) => handleUserIsStarter('false', event)}
                                        >
                                            بله
                                        </button> 

                                        <button 
                                            className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl ${ isStarter === 'true' ? ButtonStyles.activeYellow : ''} `}
                                            style={{boxShadow:'var(--shadow-button-dark), var(--shadow-button-white)'}}
                                            onClick={(event) => handleUserIsStarter('true', event)}
                                        >
                                            خیر
                                        </button>

                                    </div>
                                    
                                    {
                                        isStarter === 'false' &&
                                        <p 
                                            className='self-start text-xs text-start text-textWarning'
                                        >
                                            *اگر گواهینامه شما منقضی شده‌است، برای تکمیل ثبت نام لطفا ابتدا نسبت به تمدید آن اقدام فرمایید
                                        </p>
                                    }
                                    
                                </div>

                                {
                                    isStarter !== 'notAnsweredYet' &&
                                        <DropdownInput
                                            id={'ddi1'}
                                            options={organsData.data}
                                            handleSelectChange={handleSelectOrganChange}
                                            selectedOption={organ}
                                            name={
                                                isStarter === 'false' ?
                                                'گواهینامه صادر شده از'
                                                :
                                                'صدور گواهینامه از'
                                            }
                                            icon={<CertificateIcon/>}
                                        />
                                }
                                
                                {
                                    organ && isStarter === 'false' &&
                                    <>
                                        {levelsLoading && 
                                        <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'6rem' }}>
                                            <CircularProgress /> 
                                        </Box>}
                                        {levelsError && <p>مشکلی پیش آمده</p>}
                                        {!levelsError && !levelsLoading &&
                                            <>

                                                <DropdownInput
                                                    id={'ddi2'}
                                                    options={levelsData.data}
                                                    handleSelectChange={handleSelectLevelChange}
                                                    selectedOption={level}
                                                    name={'مقطع گواهینامه'}
                                                    icon={<CertificateIcon/>}
                                                    isDeselectDeactivated={true}
                                                />
                                                
                                                {/* removing other fill options for starters */}
                                                {
                                                    !(level.id === 1) && !(level.id === 7) && level && 
                                                    <>

                                                        <TextInput
                                                            id={'TI1'}
                                                            value={certificateId}
                                                            onChange={handleCertificateIdChange}
                                                            placeholder={'شماره گواهینامه'}
                                                            Type={'text'}
                                                            icon={<CertificateIcon/>} // You can replace `null` with a specific icon if you have one
                                                            isSubmitted={isSubmitted}
                                                            isRequired={true}
                                                            RequiredMessage='شماره گواهینامه الزامی می باشد'
                                                        />

                                                        {/* the date picker component comes from equipment section, try moving it into this component */}
                                                        <DateLastRepackInput icon={<CertificateIcon/>} name={'تاریخ صدور'}  onChange={handleCertificateStartDateChange} placeH={'تاریخ صدور'}  />

                                                        {/* the date picker component comes from equipment section, try moving it into this component */}
                                                        <DateLastRepackInput icon={<CertificateIcon/>} name={'تاریخ انقضا'}  onChange={handleCertificateEndDateChange} placeH={'تاریخ انقضا'} />

                                                        {/* upload picture */}
                                                        <p className='text-sm mt-3'>آپلود عکس گواهینامه</p>
                                                        <div onClick={handleUploadClick} 
                                                        className='w-[320px] md:w-[370px] bg-bgUploadFile text-textUploadFile h-40 self-center flex justify-center items-center border-dashed border-2 border-textDefault rounded-3xl -mt-1'>

                                                            <input
                                                                type="file"
                                                                ref={fileInputRef}
                                                                style={{ display: 'none' }}
                                                                onChange={handleFileChange}
                                                            />

                                                            <AddCircleOutlineOutlinedIcon sx={{width:'2rem', height:'2rem'}} />

                                                            
                                                            {uploadedFile && (
                                                                <div className="w-[315px] md:w-[365px] h-[150px] absolute flex-col items-center self-center">
                                                                    {uploadedFile.type.startsWith('image/') && (
                                                                    <img
                                                                        src={URL.createObjectURL(uploadedFile)}
                                                                        alt="Uploaded Preview"
                                                                        className=" rounded-3xl w-full h-full object-cover"
                                                                    />
                                                                    )}
                                                                </div>
                                                            )}   
                                                        </div>


                                                        <p className='text-sm w-[85%] self-center -mt-3'>فرمت عکس باید jpeg, jpg, gif, bmp یا png باشد
                                                        حجم عکس نباید بیشتر از 10 مگابایت باشد</p>

                                                    </>
                                                }

                                            </>
                                        }


                                    </>
                                }

                                {
                                    (isStarter === 'true' || level) &&
                                    <>
                                        <button type="submit" className={`${ButtonStyles.addButton} ${isSubmitting && 'opacity-45'} w-24 self-center mt-0`}
                                        onClick={handleSubmit}
                                        disabled={isSubmitting} >
                                            ثبت
                                        </button>

                                        {SubmitIsError && <p style={{ color: 'red' }}>{SubmitError.response.data.ErrorMessages[0].ErrorMessage}</p>}
                                    </>
                                }

                            </form>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default AddCertificate;