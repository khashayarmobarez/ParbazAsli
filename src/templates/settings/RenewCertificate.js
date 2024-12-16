import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// hooks
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// reqs and queries
import { useAddCertificate } from '../../Utilities/Services/queries';

// components
import PageTitle from '../../components/reuseable/PageTitle';
import { CircularProgress } from '@mui/material';
import FixedInput from '../../components/inputs/FixedInput';
import { useACertificate } from '../../Utilities/Services/userQueries';
import CertificateIcon from '../../components/icons/CertificateIcon';
import TextInput from '../../components/inputs/textInput';
import DateInput from '../../components/inputs/DateInput';
import UploadPicture from '../../components/inputs/UploadPicture';



const RenewCertificate = () => {

    const params = useParams()
    const navigate = useNavigate()
    const appTheme = Cookies.get('themeApplied') || 'dark';
    const { formatDate } = useDateFormat();
    
    const { id } = params

    const { mutate: mutateCertificate, isLoading: isSubmitting, isError: SubmitIsError, error: SubmitError, isSuccess: SubmitSuccess } = useAddCertificate();
    const { data: certificateData, isLoading:certificateDataLoading } = useACertificate(id);

    useEffect(() => {
        if(certificateData) {
            setOrgan(certificateData.data.organization)
            setLevel(certificateData.data.level)
            setCertificateId(certificateData.data.number)
            setLevelId(certificateData.data.levelId)
        } 
    },[certificateData])

    const [organ, setOrgan] = useState('')
    
    const [level, setLevel] = useState('')

    const  [levelId, setLevelId] = useState('')

    const [certificateId, setCertificateId] = useState('');

    const [dateStartValue, setDateStartValue] = useState('')    

    const [dateEndValue, setDateEndValue] = useState('')

    const [uploadedFile, setUploadedFile] = useState(null);

    const [isSubmitted, setIsSubmitted] = useState(false)

    // certificate id
    const handleCertificateInputChange = (e) => {
        setCertificateId(e.target.value)
    }

    // certificate issue date 
    const handleCertificateStartDateChange = (value) => {
        setDateStartValue(value)

        // function to close the datePicker
        clickOnRightSide()
    }

    // certificate final day
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

    const isValidFileFormat = (file) => {
        if (!file) return false;
        
        // Allowed file extensions
        const allowedExtensions = ['jpeg', 'jpg', 'gif', 'bmp', 'png'];
        
        // Get file extension
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        return allowedExtensions.includes(fileExtension);
    }




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

            if (!isValidFileFormat(uploadedFile)) {
                toast('فرمت فایل مجاز نیست. لطفاً فایل با پسوندهای jpg, jpeg, gif, bmp یا png آپلود کنید', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 3000,
                    theme: appTheme,
                    style: { width: "350px" }
                });
                return;
            }
    
            const formattedStartDate = formatDate(dateStartValue);
            const formattedEndDate = formatDate(dateEndValue);
    
            console.log(level,certificateId,formattedStartDate,formattedEndDate,dateStartValue,uploadedFile)
            
            const formData = new FormData();
            formData.append('LevelId', levelId);
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
                        toast('گواهینامه تمدید شد', {
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

            <div className='w-full flex flex-col items-center md:w-[70%] lg:w-[55%]'>

                <PageTitle title={'تمدید گواهینامه'} />

               {
                certificateDataLoading ?
                <div className='fixed w-[100svh] h-[90svh] z-[110] flex flex-col justify-center items-center gap-y-2'>
                    <CircularProgress sx={{ color:'var(--text-accent) '}} /> 
                </div>
                :
                <>
                    <div className='flex flex-col items-center justify-center gap-y-5 md:mt-8 w-[90%] my-6'>

                        {/* organ fixed input */}
                        <FixedInput 
                        textData={organ} 
                        userIcon={<CertificateIcon customColor={'var(--text-input-default)'} />} 
                        />

                        {/* user level fixed input  */}
                        <FixedInput 
                        textData={level} 
                        userIcon={<CertificateIcon customColor={'var(--text-input-default)'} />} 
                        />

                        <TextInput 
                            id={'TI1'}
                            customIconSize={'w-5'}
                            placeholder={'شماره گواهینامه'}
                            value={certificateId} 
                            onChange={handleCertificateInputChange} 
                            icon={<CertificateIcon anotherColor={'var(--text-input-default)'} />}
                            />

                        {/* the date picker component comes from equipment section, try moving it into this component */}
                        <DateInput
                            name={'تاریخ آخرین بسته‌بندی'}  
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
                            name={'تاریخ آخرین بسته‌بندی'}  
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
                            setUploadedFile={setUploadedFile} 
                            uploadedFile={uploadedFile}  
                            isSubmitted={isSubmitted} 
                            />
                        
                        
                    </div>

                    <button type="submit" className={`${ButtonStyles.addButton} w-24 self-center mt-4`}
                    onClick={handleSubmit}
                    disabled={isSubmitting} >
                        تایید
                    </button>
                </>
                } 

            </div>
            
        </div>
    );
};

export default RenewCertificate;