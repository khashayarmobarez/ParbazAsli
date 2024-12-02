import React, {  useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// mui
import { CircularProgress } from '@mui/material';

// assets
import CertificateIcon from '../../components/icons/CertificateIcon'

// queries
import { useAddCertificate, useLevelsByOrganizationId, useOrgansData } from '../../Utilities/Services/queries'

// utilities
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// components
import DropdownInput from '../../components/inputs/DropDownInput';
import TextInput from '../../components/inputs/textInput';
import DateLastRepackInput from '../../components/inputs/DateInput';
import PageTitle from '../../components/reuseable/PageTitle';
import UploadPicture from '../../components/inputs/UploadPicture';


const RenewCertificate = () => {

    const navigate = useNavigate()
    const { formatDate } = useDateFormat();
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/jpg'];
    const maxFileSize = 10485760;

    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    
    const [organ, setOrgan] = useState('')

    const [level, setLevel] = useState('')

    const [certificateId, setCertificateId] = useState('');

    const [dateStartValue, setDateStartValue] = useState('')    

    const [dateEndValue, setDateEndValue] = useState('')

    const [uploadedFile, setUploadedFile] = useState(null);

    const fileInputRef = useRef(null);

    const [errMsg, setErrMsg] = useState(null)

    const [isSubmitted, setIsSubmitted] = useState(false)
    
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useLevelsByOrganizationId(organ.id);

    const { mutate: mutateCertificate, isLoading: isSubmitting, isError: SubmitIsError, error: SubmitError, isSuccess: SubmitSuccess } = useAddCertificate();

    // reset level after changing certificateId
    useEffect(() => {
        setLevel('')
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


    const handleFileUpload = (file) => {
        setUploadedFile(file);
    };

    // mutate, post data
    const handleSubmit = (event) => {
        
        event.preventDefault();
        setIsSubmitted(true)

        if(!organ || !level || !certificateId || !dateStartValue || !dateEndValue || !uploadedFile) {
            toast('اطلاعات گواهینامه را کامل وارد کنید', {
                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
            });
            return
        }

        const formattedStartDate = formatDate(dateStartValue);
        const formattedEndDate = formatDate(dateEndValue);

        console.log(level,certificateId,formattedStartDate,formattedEndDate,dateStartValue,uploadedFile)
        
        const formData = new FormData();
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
        
        mutateCertificate(formData,
            {
                onSuccess: () => {
                    toast('گواهینامه اضافه شد', {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                    setTimeout(() => {
                        navigate('/editProfile/changeCertificate')
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
            });

    };

    return (
        <div className='flex flex-col items-center pt-14 pb-[4rem] gap-y-4'>

            <PageTitle title={'افزودن گواهینامه'} />

            <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%] md:w-[65%]'>

                {
                    isSubmitting &&
                        <div className='fixed w-[100svh] h-[100svh] z-[110] backdrop-blur-sm flex flex-col justify-center items-center gap-y-2'>
                            <CircularProgress sx={{ color:'var(--text-accent) '}} /> 
                            <p>در حال ثبت اطلاعات</p>
                        </div>
                }


                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center pt-4'>

                    {
                        organsLoading && 
                        <div className='w-full min-h-[71vh]'>
                            <p>Loading authentication settings...</p>
                        </div>
                    }

                    {
                        organsError && 
                        <div className='w-full min-h-[71vh]'>
                            <p>Error fetching organization settings</p>
                        </div>
                    }

                    {
                        organsData &&
                        <>
                            <form className='w-full flex flex-col md:w-[50%] gap-y-4'>
                                
                                <DropdownInput
                                    id={'ddi1'}
                                    icon={<CertificateIcon/>}
                                    options={organsData.data}
                                    handleSelectChange={handleSelectOrganChange}
                                    selectedOption={organ}
                                    name={'صدور گواهینامه از'}
                                    isDeselectDeactivated={true}
                                    ErrorContdition={!organ}
                                    ErrorText={'ارگان مربوطه را انتخاب کنید'}
                                    isSubmitted={isSubmitted}
                                />
                                {
                                    organ && 
                                    <>
                                        {levelsLoading && <p>Loading levels...</p>}
                                        {levelsError && <p>Error fetching levels</p>}
                                        {!levelsError && !levelsLoading &&
                                            <>

                                                <DropdownInput
                                                    id={'ddi2'}
                                                    icon={<CertificateIcon/>}
                                                    options={levelsData.data}
                                                    handleSelectChange={handleSelectLevelChange}
                                                    selectedOption={level}
                                                    name={'مقطع گواهینامه'}
                                                    isDeselectDeactivated={true}
                                                />
                                                
                                                {/* removing other fill options for starters */}
                                                {
                                                    !(level.id === 1) && !(level.id === 7) &&
                                                    <>

                                                        <TextInput
                                                        id={'TI1'}
                                                        value={certificateId}
                                                        onChange={handleCertificateIdChange}
                                                        placeholder={'شماره گواهینامه'}
                                                        Type={'text'}
                                                        icon={<CertificateIcon/>}
                                                        isSubmitted={isSubmitted}
                                                        isRequired={true}
                                                        RequiredMessage='شماره گواهینامه الزامی می باشد'
                                                        ErrorContdition={!certificateId}
                                                        ErrorText={'شماره گواهینامه الزامی می باشد'}
                                                        ErrorContdition2={certificateId.length > 99}
                                                        ErrorText2={'شماره گواهینامه باید کمتر از 100 کارکتر باشد'}
                                                        />

                                                        {/* the date picker component comes from equipment section, try moving it into this component */}
                                                        <DateLastRepackInput 
                                                            name={'تاریخ آخرین بسته‌بندی'}  
                                                            onChange={handleCertificateStartDateChange} 
                                                            placeH={'تاریخ صدور'} 
                                                            ErrorContdition={!dateStartValue}
                                                            ErrorText={'تاریخ صدور الزامی می باشد'}
                                                            ErrorContdition2={new Date(dateStartValue) >= new Date()}
                                                            ErrorText2={'تاریخ صدور نباید بعد از امروز باشد'}
                                                            isSubmitted={isSubmitted}
                                                        />

                                                        {/* the date picker component comes from equipment section, try moving it into this component */}
                                                        <DateLastRepackInput 
                                                            name={'تاریخ آخرین بسته‌بندی'}  
                                                            onChange={handleCertificateEndDateChange} 
                                                            placeH={'تاریخ انقضا'} 
                                                            ErrorContdition={!dateEndValue}
                                                            ErrorText={'تاریخ انقضا الزامی می باشد'}
                                                            ErrorContdition2={new Date(dateEndValue) <= new Date()}
                                                            ErrorText2={'تاریخ انقضا نباید قبل از امروز باشد'}
                                                            isSubmitted={isSubmitted}
                                                        />

                                                        {/* upload picture */}
                                                        <UploadPicture onFileUpload={handleFileUpload} isSubmitted={isSubmitted} />

                                                    </>
                                                }

                                                <button type="submit" className={`${ButtonStyles.addButton} w-24 self-center mt-4`}
                                                onClick={handleSubmit}
                                                disabled={isSubmitting} >
                                                    تایید
                                                </button>

                                                {SubmitIsError && <p style={{ color: 'red' }}>{SubmitError.response?.data.ErrorMessages[0].ErrorMessage}</p>}
                                                {errMsg && <p style={{ color: 'red' }}>Error: {errMsg}</p>}
                                                {SubmitSuccess && <p style={{ color: 'green' }}>گواهینامه با موفقیت اضافه شد</p>}

                                            </>
                                        }
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

export default RenewCertificate;