import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// mui
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// queries
import { useAddCertificate, useOrganLevels, useOrgansData } from '../../../../Utilities/Services/queries'

// utilities
import useDateFormat from '../../../../Utilities/Hooks/useDateFormat';

// components
import UserDataBox from '../../Profile/UserDataBox';
import DropdownInput from '../../../inputs/DropDownInput';
import TextInput from '../../../inputs/textInput';
import DateInput from '../Inputs/DateInput';


const AddCertificate = () => {

    const { formatDate } = useDateFormat();

    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/jpg'];
    const maxFileSize = 10485760;

    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    
    const [organ, setOrgan] = useState('')
    const [organId, setOrganId] = useState('')

    const [level, setLevel] = useState('')
    const [levelId, setLevelId] = useState('')
    const [roleName, setRoleName] = useState('');

    const [certificateId, setCertificateId] = useState('');

    const [dateStartValue, setDateStartValue] = useState(new Date())

    const [dateEndValue, setDateEndValue] = useState(new Date())

    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);

    const [errMsg, setErrMsg] = useState(null)
    
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevels(organId);

    const { mutate: mutateCertificate, isLoading: isSubmitting, isError: SubmitIsError, error: SubmitError, isSuccess: SubmitSuccess } = useAddCertificate();

    const handleSelectOrganChange = (selectedOption) => {
        setOrgan(selectedOption.label);
        setOrganId(selectedOption.value);
    };

    const handleSelectLevelChange = (selectedOption) => {
        setRoleName(selectedOption.roleName);
        setLevel(selectedOption.label);
        setLevelId(selectedOption.value);
    };

    const handleCertificateIdChange = (event) => {
        setCertificateId(event.target.value);
    };

    const handleCertificateStartDateChange = (value) => {
        setDateStartValue(value)
        console.log(value)
    }

    const handleCertificateEndDateChange = (value) => {
        setDateEndValue(value)
    }


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

        const formattedStartDate = formatDate(dateStartValue.value);
        const formattedEndDate = formatDate(dateEndValue.value);

        console.log(levelId,certificateId,formattedStartDate,formattedEndDate,uploadedFile)
        
        const formData = new FormData();
        formData.append('LevelId', levelId);
        formData.append('Number', certificateId);
        formData.append('IssueDate', formattedStartDate);
        formData.append('ExpirationDate', formattedEndDate);
        if (uploadedFile) {
          formData.append('File', uploadedFile);
        }
        
        mutateCertificate(formData);
    };


    // organization options
    const organOptions = useMemo(() => organsData?.data.map(organ => ({
        value: organ.id,
        label: organ.name
    })), [organsData]);

    // levels options
    const levelOptions = useMemo(() => levelsData?.data.map(level => ({
        value: level.id,
        label: level.name,
        roleName: level.roleName
    })), [levelsData]);

    return (
        <div className='flex flex-col items-center pt-20 pb-[4rem]'>
            <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%] md:w-[65%]'>

                <UserDataBox />
                
                <div className='w-full flex flex-col gap-y-2'>
                    <p style={{color:'var(--red-text)'}}>برای دسترسی به پنل کاربری اهراز موارد زیر الزامی است.</p>
                    <p className='text-sm text-right' style={{color:'var(--yellow-text)'}}>اول ارگان خود را انتخاب کرده سپس اطلاعات گواهینامه ی خود را کامل کنید.</p>
                </div>


                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-full'>
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[98%]'>

                        <p className='' style={{color:'var(--soft-white)'}}>تاییدیه</p>

                        <p className='mr-3 md:mr-0' style={{color:'var(--yellow-text)'}}>گواهینامه</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>احراز ایمیل</p>

                    </div>

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
                                options={organOptions}
                                handleSelectChange={handleSelectOrganChange}
                                selectedOption={organ}
                                name={'صدور گواهینامه از'}
                                />

                                {
                                    organId && 
                                    <>
                                        {levelsLoading && <p>Loading levels...</p>}
                                        {levelsError && <p>Error fetching levels</p>}
                                        {!levelsError && !levelsLoading &&
                                            <>

                                                <DropdownInput
                                                    options={levelOptions}
                                                    handleSelectChange={handleSelectLevelChange}
                                                    selectedOption={level}
                                                    name={'سطح گواهینامه'}
                                                />
                                                
                                                {/* removing other fill options for starters */}
                                                {
                                                    !(roleName === 'Starter') &&
                                                    <>

                                                        <TextInput
                                                        value={certificateId}
                                                        onChange={handleCertificateIdChange}
                                                        placeholder={'شماره گواهینامه'}
                                                        Type={'text'}
                                                        icon={null} // You can replace `null` with a specific icon if you have one
                                                        />

                                                        {/* the date picker styles comes from signUp.module.css , it is a bug, if you want to make changes to the code i recommend removing this code */}
                                                        <DateInput 
                                                        onChange={handleCertificateStartDateChange}
                                                        inputAttributes={{ placeholder: "تاریخ صدور" }}
                                                        />

                                                        {/* the date picker get it's styles from signUp.module.css , it is a bug, if you want to make changes to the code i recommend removing this code */}
                                                        <DateInput 
                                                        onChange={handleCertificateEndDateChange}
                                                        inputAttributes={{ placeholder: "تاریخ انقضا" }}
                                                        />

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
                                                onClick={handleSubmit} >
                                                    ارسال
                                                </button>

                                                {SubmitIsError && <p style={{ color: 'red' }}>Error: {SubmitError.message}</p>}
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

export default AddCertificate;