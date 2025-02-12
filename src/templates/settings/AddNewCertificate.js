import React, {  useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// mui
import { CircularProgress } from '@mui/material';

// assets
import CertificateIcon from '../../elements/icons/CertificateIcon'

// queries
import { useAddCertificate, useLevelsByOrganizationId, useOrgansData } from '../../Utilities/Services/queries'

// utilities
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// components
import DropdownInput from '../../elements/inputs/DropDownInput';
import TextInput from '../../elements/inputs/textInput';
import DateInput from '../../elements/inputs/DateInput';
import PageTitle from '../../elements/reuseable/PageTitle';
import UploadPicture from '../../elements/inputs/UploadPicture';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const AddNewCertificate = () => {

    // language
    const dir = Cookies.get('dir') || 'ltr';
    const { t } = useTranslation();

    const navigate = useNavigate()
    const pathname = useLocation()
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



    // mutate, post data
    const handleSubmit = (event) => {
        
        event.preventDefault();
        setIsSubmitted(true)

        if(!organ || !level || !certificateId || !dateStartValue || !dateEndValue || !uploadedFile) {
            toast(t("RegistrationPages.addCertificate.notifications.formIncomplete"), {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
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
                    toast(t("RegistrationPages.addCertificate.notifications.certificateAddedSuccess"), {
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
                    let errorMessage = t("RegistrationPages.addCertificate.notifications.certificateAddedError");
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
                <PageTitle title={t('settings.certificate.addNew.title')} />
                <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%]'>
                    {
                        isSubmitting &&
                        <div className='fixed w-[100svh] h-[100svh] z-[110] backdrop-blur-sm flex flex-col justify-center items-center gap-y-2'>
                            <CircularProgress sx={{ color: 'var(--text-accent)' }} />
                            <p>{t('settings.certificate.addNew.loading')}</p>
                        </div>
                    }
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
                                <form className='w-full flex flex-col gap-y-4'>
                                    <DropdownInput
                                        id={'ddi1'}
                                        icon={<CertificateIcon customColor={!organ && isSubmitted && 'var(--text-error)'} />}
                                        options={organsData.data}
                                        handleSelectChange={handleSelectOrganChange}
                                        selectedOption={organ}
                                        name={t('settings.certificate.addNew.organization')}
                                        isDeselectDeactivated={true}
                                        ErrorCondition={!organ}
                                        ErrorText={t('settings.certificate.addNew.organizationRequired')}
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
                                                        icon={<CertificateIcon customColor={!level && isSubmitted && 'var(--text-error)'} />}
                                                        options={levelsData.data}
                                                        handleSelectChange={handleSelectLevelChange}
                                                        selectedOption={level}
                                                        isSubmitted={isSubmitted}
                                                        name={t('settings.certificate.addNew.level')}
                                                        isDeselectDeactivated={true}
                                                        ErrorCondition={!level}
                                                        ErrorText={t('settings.certificate.addNew.levelRequired')}
                                                    />
                                                    {
                                                        !(level.id === 1) && !(level.id === 7) &&
                                                        <>
                                                            <TextInput
                                                                id={'TI1'}
                                                                value={certificateId}
                                                                onChange={handleCertificateIdChange}
                                                                placeholder={t('settings.certificate.addNew.certificateId')}
                                                                type={'text'}
                                                                icon={<CertificateIcon customColor={!certificateId && isSubmitted && 'var(--text-error)'} />}
                                                                isSubmitted={isSubmitted}
                                                                isRequired={true}
                                                                RequiredMessage={t('settings.certificate.addNew.certificateIdRequired')}
                                                                ErrorCondition={!certificateId}
                                                                ErrorText={t('settings.certificate.addNew.certificateIdRequired')}
                                                                ErrorCondition2={certificateId.length > 99}
                                                                ErrorText2={t('settings.certificate.addNew.certificateIdLengthError')}
                                                            />
                                                            <DateInput
                                                                name={t('settings.certificate.addNew.startDate')}
                                                                onChange={handleCertificateStartDateChange}
                                                                placeH={t('settings.certificate.addNew.startDate')}
                                                                ErrorCondition={!dateStartValue}
                                                                ErrorText={t('settings.certificate.addNew.startDateRequired')}
                                                                ErrorCondition2={new Date(dateStartValue) >= new Date()}
                                                                ErrorText2={t('settings.certificate.addNew.startDateError')}
                                                                isSubmitted={isSubmitted}
                                                            />
                                                            <DateInput
                                                                name={t('settings.certificate.addNew.endDate')}
                                                                onChange={handleCertificateEndDateChange}
                                                                placeH={t('settings.certificate.addNew.endDate')}
                                                                ErrorCondition={!dateEndValue}
                                                                ErrorText={t('settings.certificate.addNew.endDateRequired')}
                                                                ErrorCondition2={new Date(dateEndValue) <= new Date()}
                                                                ErrorText2={t('settings.certificate.addNew.endDateError')}
                                                                isSubmitted={isSubmitted}
                                                            />
                                                            <UploadPicture
                                                                setUploadedFile={setUploadedFile}
                                                                uploadedFile={uploadedFile}
                                                                isSubmitted={isSubmitted}
                                                            />
                                                        </>
                                                    }
                                                    <button
                                                        type="submit"
                                                        className={`${ButtonStyles.addButton} w-32 self-center mt-4`}
                                                        onClick={handleSubmit}
                                                        disabled={isSubmitting}
                                                    >
                                                        {t('settings.certificate.addNew.submit')}
                                                    </button>
                                                    {SubmitIsError && <p style={{ color: 'red' }}>{SubmitError.response?.data.ErrorMessages[0].ErrorMessage}</p>}
                                                    {errMsg && <p style={{ color: 'red' }}>Error: {errMsg}</p>}
                                                    {SubmitSuccess && <p style={{ color: 'green' }}>{t('settings.certificate.addNew.submitSuccess')}</p>}
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
        </div>
    );
    
};

export default AddNewCertificate;