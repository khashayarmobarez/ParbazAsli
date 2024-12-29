import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { postIsUserAuthenticated } from '../../Utilities/Services/AuthenticationApi';
import {  useNavigate } from 'react-router-dom';

// assets 
import CertificateIcon from '../../components/icons/CertificateIcon'

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// mui
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, CircularProgress } from '@mui/material';

// queries
import { useAddCertificate, useOrganLevelsForCourse, useOrgansData } from '../../Utilities/Services/queries'

// utilities
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// components
import UserDataBox from '../../modules/Profile/UserDataBox';
import DropdownInput from '../../components/inputs/DropDownInput';
import TextInput from '../../components/inputs/textInput';
import DateInput from '../../components/inputs/DateInput';
import DigilogbookLoading from '../../components/Loader/DigilogbookLoading';
import { toast } from 'react-toastify';
import UploadPicture from '../../components/inputs/UploadPicture';


const AddCertificate = () => {

    const navigate = useNavigate();

    const isUserAuthenticated = Cookies.get('isUserAuthenticated')
    const appTheme = Cookies.get('themeApplied') || 'dark';

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
        } else if (new Date(dateEndValue) <= new Date() || new Date(dateStartValue) >= new Date()) {
            toast("تاریخ انقضا نباید قبل از امروز باشد و تاریخ صدور نباید بعد از امروز باشد", {
                type: 'error',
                position: 'top-right',
                autoClose: 3000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
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
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='border-2 rounded-full w-5 h-5  border-textAccent flex items-center justify-center'>
                            <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>
                        </div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[97%] text-xs'>

                        <p className='' style={{color:'var(--text-accent)'}}>احراز ایمیل</p>

                        <p className='ml-2 md:ml-0' style={{color:'var(--text-accent)'}}>گواهینامه</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>تاییدیه</p>

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


                                <div className='w-full flex flex-col items-center p-4 bg-bgOutputDefault rounded-2xl gap-y-4' >

                                    <p className='self-start text-base'>آیا تابحال گواهینامه پروازی گرفته‌اید؟</p>

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
                                            ErrorCondition={!organ}
                                            ErrorText={'ارگان مربوطه را انتخاب کنید'}
                                            isSubmitted={isSubmitted}
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
                                                            ErrorCondition={!certificateId}
                                                            ErrorText={'شماره گواهینامه الزامی می باشد'}
                                                            ErrorCondition2={certificateId.length > 99}
                                                            ErrorText2={'شماره گواهینامه باید کمتر از 100 کارکتر باشد'}
                                                        />

                                                        {/* the date picker component comes from equipment section, try moving it into this component */}
                                                        <DateInput 
                                                            icon={<CertificateIcon/>} 
                                                            name={'تاریخ صدور'}  
                                                            onChange={handleCertificateStartDateChange} 
                                                            placeH={'تاریخ صدور'}  
                                                            ErrorCondition={!dateStartValue}
                                                            ErrorText={'تاریخ صدور الزامی می باشد'}
                                                            ErrorCondition2={new Date(dateStartValue) >= new Date()}
                                                            ErrorText2={'تاریخ صدور نباید بعد از امروز باشد'}
                                                            isSubmitted={isSubmitted}
                                                        />

                                                        {/* the date picker component comes from equipment section, try moving it into this component */}
                                                        <DateInput 
                                                            icon={<CertificateIcon/>} 
                                                            name={'تاریخ انقضا'}  
                                                            onChange={handleCertificateEndDateChange}
                                                            placeH={'تاریخ انقضا'} 
                                                            ErrorCondition={!dateEndValue}
                                                            ErrorText={'تاریخ انقضا الزامی می باشد'}
                                                            ErrorCondition2={new Date(dateEndValue) <= new Date()}
                                                            ErrorText2={'تاریخ انقضا نباید قبل از امروز باشد'}
                                                            isSubmitted={isSubmitted}
                                                        />

                                                        {/* upload picture */}
                                                        <UploadPicture 
                                                            isSubmitted={isSubmitted} 
                                                            setUploadedFile={setUploadedFile} 
                                                            uploadedFile={uploadedFile} 
                                                        />

                                                    </>
                                                }

                                            </>
                                        }


                                    </>
                                }

                                {
                                    (isStarter === 'true' || level) &&
                                    <>
                                        <button type="submit" className={`${ButtonStyles.addButton} ${isSubmitting && 'opacity-45'} w-32 self-center mt-0`}
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