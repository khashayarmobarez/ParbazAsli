import React, {  useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { CircularProgress } from '@mui/material';

// assets
import certificateIcon from '../../../assets/icons/certificate-Vector.svg'

// queries
import { useAddCertificate, useOrganLevels, useOrgansData } from '../../../Utilities/Services/queries'

// utilities
import useDateFormat from '../../../Utilities/Hooks/useDateFormat';

// components
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import DateLastRepackInput from '../Equipment page comps/inputsForEquipment/DateLastRepackInput';
import PageTitle from '../../reuseable/PageTitle';


const RenewCertificate = () => {

    const navigate = useNavigate()
    const { formatDate } = useDateFormat();

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
    
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevels(organ.id);

    const { mutate: mutateCertificate, isLoading: isSubmitting, isError: SubmitIsError, error: SubmitError, isSuccess: SubmitSuccess } = useAddCertificate();

    // reset all the states after changing certificateId
    // useEffect(() => {

    
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
        

        event.preventDefault();

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
                        theme: 'dark',
                        style: { width: "350px" }
                    });
                    navigate('/profile')
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
            });

    };

    return (
        <div className='flex flex-col items-center pt-14 pb-[4rem] gap-y-4'>

            <PageTitle title={'افزودن گواهینامه'} />

            <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%] md:w-[65%]'>


                {
                    isSubmitting &&
                        <div className='fixed w-[100svh] h-[100svh] z-[110] backdrop-blur-sm flex flex-col justify-center items-center gap-y-2'>
                            <CircularProgress sx={{ color:'var(--yellow-text) '}} /> 
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
                                    icon={certificateIcon}
                                    options={organsData.data}
                                    handleSelectChange={handleSelectOrganChange}
                                    selectedOption={organ}
                                    name={'صدور گواهینامه از'}
                                />
                                {
                                    organ && 
                                    <>
                                        {levelsLoading && <p>Loading levels...</p>}
                                        {levelsError && <p>Error fetching levels</p>}
                                        {!levelsError && !levelsLoading &&
                                            <>



                                                <DropdownInput
                                                    icon={certificateIcon}
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
                                                        value={certificateId}
                                                        onChange={handleCertificateIdChange}
                                                        placeholder={'شماره گواهینامه'}
                                                        Type={'text'}
                                                        icon={certificateIcon}
                                                        />

                                                        {/* the date picker component comes from equipment section, try moving it into this component */}
                                                        <DateLastRepackInput name={'تاریخ آخرین بسته‌بندی'}  onChange={handleCertificateStartDateChange} placeH={'تاریخ صدور'} />

                                                        {/* the date picker component comes from equipment section, try moving it into this component */}
                                                        <DateLastRepackInput name={'تاریخ آخرین بسته‌بندی'}  onChange={handleCertificateEndDateChange} placeH={'تاریخ انقضا'} />

                                                        {/* upload picture */}
                                                        <p className='text-sm mt-4'>آپلود عکس گواهینامه</p>
                                                        <div onClick={handleUploadClick} className='w-[320px] md:w-[370px] h-40 self-center flex justify-center items-center border-dashed border-2 rounded-3xl'
                                                        style={{borderColor:'var(--softer-white)', backgroundColor:'var(--syllabus-data-boxes-bg) '}}>

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



                                                    </>
                                                }

                                                <button type="submit" className={`${ButtonStyles.addButton} w-24 self-center mt-4`}
                                                onClick={handleSubmit}
                                                disabled={isSubmitting} >
                                                    تایید
                                                </button>

                                                {SubmitIsError && <p style={{ color: 'red' }}>{SubmitError.response.data.ErrorMessages[0].ErrorMessage}</p>}
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