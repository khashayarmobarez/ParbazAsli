import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// hooks
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// reqs and queries
import { useAddCertificate } from '../../Utilities/Services/queries';

// components
import PageTitle from '../../elements/reuseable/PageTitle';
import { CircularProgress } from '@mui/material';
import FixedInput from '../../elements/inputs/FixedInput';
import { useACertificate } from '../../Utilities/Services/userQueries';
import CertificateIcon from '../../elements/icons/CertificateIcon';
import TextInput from '../../elements/inputs/textInput';
import DateInput from '../../elements/inputs/DateInput';
import UploadPicture from '../../elements/inputs/UploadPicture';
import { useTranslation } from '../../Utilities/context/TranslationContext';



const RenewCertificate = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

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
                toast(t("editUser.renewCertificate.fillAllFields"), {
                    type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: appTheme,
                    style: { width: "350px" }
                });
                return
            }

            if (!isValidFileFormat(uploadedFile)) {
                toast(t("editUser.renewCertificate.invalidFileFormat"), {
                    type: 'error',
                    position: 'top-center',
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
                        toast(t("editUser.renewCertificate.certificateRenewed"), {
                            type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                            autoClose: 3000,
                            theme: appTheme,
                            style: { width: "350px" }
                        });
                        setTimeout(() => {
                            navigate('/editProfile/changeCertificate')
                        }, 500);
                    },
                    onError: (error) => {
                        let errorMessage = t("editUser.renewCertificate.errorOccurred");
                        if (error.response && error.response.data && error.response.data.ErrorMessages) {
                            errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                        }
                        toast(errorMessage, {
                            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
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

                <PageTitle title={t("editUser.renewCertificate.title")} />

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
                            placeholder={t("editUser.renewCertificate.certificateId")}
                            value={certificateId} 
                            onChange={handleCertificateInputChange} 
                            icon={<CertificateIcon anotherColor={'var(--text-input-default)'} />}
                            isSubmitted={isSubmitted}
                            isRequired={true}
                            RequiredMessage={t("editUser.renewCertificate.certificateIdRequired")}
                            ErrorCondition={!certificateId}
                            ErrorText={t("editUser.renewCertificate.certificateIdRequired")}
                            ErrorCondition2={certificateId.length > 99}
                            ErrorText2={t("editUser.renewCertificate.certificateIdLength")}
                        />

                        {/* the date picker component comes from equipment section, try moving it into this component */}
                        <DateInput
                            name={t("editUser.renewCertificate.startDate")}
                            onChange={handleCertificateStartDateChange} 
                            placeH={t("editUser.renewCertificate.startDate")}
                            ErrorCondition={!dateStartValue}
                            ErrorText={t("editUser.renewCertificate.startDateRequired")}
                            ErrorCondition2={new Date(dateStartValue) >= new Date()}
                            ErrorText2={t("editUser.renewCertificate.startDateFuture")}
                            isSubmitted={isSubmitted}
                            />

                        {/* the date picker component comes from equipment section, try moving it into this component */}
                        <DateInput 
                            name={t("editUser.renewCertificate.endDate")}
                            onChange={handleCertificateEndDateChange} 
                            placeH={t("editUser.renewCertificate.endDate")}
                            ErrorCondition={!dateEndValue}
                            ErrorText={t("editUser.renewCertificate.endDateRequired")}
                            ErrorCondition2={new Date(dateEndValue) <= new Date()}
                            ErrorText2={t("editUser.renewCertificate.endDatePast")}
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
                        {t("editUser.renewCertificate.submit")}
                    </button>
                </>
                } 

            </div>
            
        </div>
    );
};

export default RenewCertificate;