import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


// providers
import {flightTypeOptionsEquipment} from '../../Utilities/Providers/dropdownInputOptions'
import { EQUIPMENT_SERIAL_NUMBER_PATTERN, USER_ID_PATTERN } from '../../Utilities/Providers/regexProvider';

// hooks
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// req and queries
import { useEquipmentBrands, useWingClasses } from '../../Utilities/Services/dataQueries';
import { useAddEquipment } from '../../Utilities/Services/equipmentQueries';
import { useUserById } from '../../Utilities/Services/queries';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// assets
import ClothesTag from '../../components/icons/ClothesTag';
import Cube from '../../components/icons/ThreeDCube';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// comps
import PageTitle from '../../components/reuseable/PageTitle';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import BrandsSearchInputWithDropdown from '../../modules/Equipment page comps/BrandsSearchInputWithDropdown';
import TextInput from '../../components/inputs/textInput';
import NumberInput from '../../components/inputs/NumberInput';
import DropdownInput from '../../components/inputs/DropDownInput';
import WingIcon from '../../components/icons/WingIcon';
import ColorTagsIcon from '../../components/icons/ColorTagsIcon';
import CalenderIcon from '../../components/icons/CalenderIcon';
import ClockIcon from '../../components/icons/ClockIcon';
import UploadFileInput from '../../components/inputs/UploadFileInput';
import SerialNumberIcon from '../../components/icons/SerialNumberIcon';
import SubmitForm from '../../components/reuseable/SubmitForm';
import DateInput from '../../components/inputs/DateInput';
import UserIcon from '../../components/icons/UserIcon';


const AddEquipment = () => {

    const location = useLocation(); 
    const { pathname } = location;
    const appTheme = Cookies.get('themeApplied') || 'dark';
    const navigate = useNavigate();
    const { formatDate } = useDateFormat();

    const isForClub = pathname.includes('club')

    const equipmentType = 
    pathname.includes('addFlightEquipment') ? 'Wing' :
        pathname.includes('addHarness') ? 'Harness' : 'Parachute';

    const equipmentTypeInPersian = 
    equipmentType === 'Wing' ? 'بال' :
        equipmentType === 'Harness' ? 'هارنس' :
            equipmentType === 'Parachute' && 'چتر کمکی'

    const backButtonRoute = 
    equipmentType === 'Wing' ? '/equipment/flightEquipment' :
        equipmentType === 'Harness' ? '/equipment/harness' :
            equipmentType === 'Parachute' && '/equipment/parachute'

    const backButtonRouteForClub = 
    equipmentType === 'Wing' ? '/club/clubEquipment/flightEquipments' :
        equipmentType === 'Harness' ? '/club/clubEquipment/harnesses' :
            equipmentType === 'Parachute' && '/club/clubEquipment/parachutes'

    const [lastPackerId, setLastPackerId] = useState('');
           
    // reqs and queries
    const { data: brandsData, isLoading: brandsIsLoading } = useEquipmentBrands(equipmentType);
    const { data: wingsClasses } = useWingClasses();
    const { data: userByIdData } = useUserById(lastPackerId)
    const { mutate: mutateWing , isLoading: isSubmitting, error: submitError} = useAddEquipment();
            
    
    // states 
    const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
    const [customBrand, setCustomBrand] = useState('')
    const [aircraft, setAircraft] = useState('');
    const [minimumWeightCapacity, setMinimumWeightCapacity] = useState('');
    const [maximumWeightCapacity, setMaximumWeightCapacity] = useState('');
    const [size, setSize] = useState('');
    const [selectedOptionClass, setSelectedOptionClass] = useState('');
    const [selectedOptionType, setSelectedOptionType] = useState('');
    const [year, setYear] = useState('');
    const [flightHour, setFlightHour] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [packageDate, setPackageDate] = useState('')

    const [showCustomBrandInput, setShowCustomBrandInput] = useState('');
    
    const [showPopup, setShowPopup] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    
    // hooks and use effects
        // if serial number gets cleared, delete the file
        useEffect(() => {
            if(serialNumber.length < 1) {
                setSelectedFile(null);
            }
        }, [serialNumber])

        // Validation functions
        const validateSerialNumber = (serialNumber) => {
            if (!EQUIPMENT_SERIAL_NUMBER_PATTERN.test(serialNumber)) {
            // setSerialNumberError('Invalid serial number format.');
            return false;
            } else {
            // setSerialNumberError('');
            return true;
            }
        };

        const validatePackerId = (lastPackerId) => {
            if (!USER_ID_PATTERN.test(lastPackerId)) {
              return false;
            } else {
              return true;
            }
        };


    // handler functions
        // Event handler for option selection
        const handleSelectChangeBrand = (selectedOption) => {
            setSelectedOptionBrand(selectedOption);
            setCustomBrand('');
        };

        // Event handler for custom brand input
        const handleCustomBrand = (event) => {
            setCustomBrand(event.target.value);
        };

        const handleTextInputAircraft = (event) => {
            setAircraft(event.target.value);
        };

        // Event handlers for weight capacity
        const handleMinimumWeightCapacity = (event) => {
            setMinimumWeightCapacity(event.target.value);
        };

        const handleMaximumWeightCapacity = (event) => {
            setMaximumWeightCapacity(event.target.value);
        };

        // harness size
        const handleTextInputSize = (event) => {
            setSize(event.target.value);
        };

        // Event handler for class selection for wwing
        const handleSelectChangeClass = (selectedOption) => {
            setSelectedOptionClass(selectedOption);
        };

        // Event handler for type
        const handleSelectChangeType = (selectedOption) => {
            setSelectedOptionType(selectedOption);
        };

        // Event handler for year
        const handleTextInputYear = (event) => {
            setYear(event.target.value);
        };

        // Event handler for flight hour
        const handleTextInputFlightHour = (event) => {
            setFlightHour(event.target.value);
        };

        // Event handler for serial number
        const handleTextInputSerialNumber = (event) => {
            setSerialNumber(event.target.value);
        };

        // Event handler for file upload
        const handleFileChange = (file) => {
            setSelectedFile(file);
        };

        // last packer id for parachute
        const handleTextInputLastPackerId = (event) => {
            setLastPackerId(event.target.value);
        };
        
        // Event handler for package date selection
        const handlePackageDate = (date) => {
        setPackageDate(date);
    
        clickOnRightSide()
        };  
    
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


    // submission handlers
        //Event handler for pop up
        const handlePopUp= (event) => {
            event.preventDefault();
            setSubmitted(true);
            const currentYear = new Date().getFullYear();
            
            // Here you can handle form submission, such as sending data to a backend server
            const isSerialNumberValid = validateSerialNumber(serialNumber);
            const isPackerIdValid = validatePackerId(lastPackerId);
    
            if (
            (equipmentType === 'Wing' && (!(selectedOptionBrand || customBrand) || !aircraft || !minimumWeightCapacity || !maximumWeightCapacity  || !flightHour || !year || !selectedOptionClass || !selectedOptionType))
            ||
            (equipmentType === 'Harness' && (!(selectedOptionBrand || customBrand) || !aircraft || !size || !flightHour || !year))
            ||
            (equipmentType === 'Parachute' && (!(selectedOptionBrand || customBrand) || !aircraft || !packageDate || !minimumWeightCapacity || !maximumWeightCapacity  || !flightHour || !year))
            ) {
                toast('تمامی فیلدها را پر کنید', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                return;
            }
    
            
            if (year <= 1979 || year > currentYear) {
            toast('سال تولید را درست وارد کنید', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
                return;
            }

            if (lastPackerId && !isPackerIdValid) {
                toast('فرمت کد بسته بندی کننده اشتباه است', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                return;
            }
            
            // Validate inputs
            if (!isSerialNumberValid) {
            toast('فرمت شماره سریال اشتباه است', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
            }
            
            if ((serialNumber && !selectedFile) || (selectedFile && !serialNumber)) {
                toast('در صورت تمایل به وارد کردن شماره سریال , شماره سریال و عکس از شماره سریال را با هم وارد کنید', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 10000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                return;
            }
        
            setShowPopup(true);
        };

        const handleSubmit = (event) => {

            event.preventDefault();
            const formattedPackedDate = formatDate(packageDate) + " 00:00";
    
            const formData = new FormData();
            // type 1 for Hamutate Harness
            formData.append('Type', equipmentType);
            selectedOptionBrand.id !== 0 && formData.append('brandId', selectedOptionBrand.id);
            selectedOptionBrand.id === 0 && formData.append('brandName', customBrand);
            formData.append('file', selectedFile);
            formData.append('serialNumber', serialNumber);
            formData.append('Model', aircraft);
            formData.append('flightHours', flightHour);
            formData.append('year', year);
            equipmentType !== "Harness" && formData.append('minimumWeightCapacity', minimumWeightCapacity);
            equipmentType !== "Harness" && formData.append('maximumWeightCapacity', maximumWeightCapacity);
            equipmentType === "Harness" && formData.append('Size', size);
            equipmentType === "Wing" && formData.append('wingClassId', selectedOptionClass.id);
            equipmentType === "Wing" && formData.append('WingType', selectedOptionType.id);
            packageDate && equipmentType === "Parachute" && formData.append('LastPackingDateTime', formattedPackedDate);
            equipmentType === "Parachute" && formData.append('lastPackerId', lastPackerId);
            isForClub && formData.append('isForClub', true);
    
            console.log(formData)
            console.log('submitting')
    
            mutateWing(formData, {
                onSuccess: () => {
                toast('وسیله پروازی با موفقیت ثبت شد', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                setShowPopup(false);
                navigate(isForClub ? backButtonRouteForClub : backButtonRoute)
                },
                onError: (error) => {
                console.log('submitError', submitError.message);
                toast(submitError.response.data.ErrorMessages[0].ErrorMessage , {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 10000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                }
            })
            
        }


    return (
        <div className='flex flex-col mt-14 items-center'>

            <div className='flex flex-col items-center gap-y-4 w-full md:w-[75%]'>

                <PageTitle 
                    title={`افزودن ${equipmentTypeInPersian}`}
                    navigateTo={isForClub ? backButtonRouteForClub : backButtonRoute}
                />

                {
                    brandsIsLoading &&
                    <CircularProgressLoader/>
                }


                {
                    brandsData &&
                    <>
                        <p className=' text-sm'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                        و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                        <form className='w-[90%] flex flex-col items-center space-y-6'>

                            <div className=' w-full flex flex-col items-center gap-y-4 md:grid md:grid-cols-2 md:gap-6'>

                                {/* brand input / custom brand input */}
                                <DropdownInput
                                    className='col-span-1'
                                    options={brandsData.data}
                                    selectedOption={selectedOptionBrand}
                                    handleSelectChange={handleSelectChangeBrand}
                                    name={'برند'}
                                    icon={<ClothesTag/>}
                                    IsEmptyAfterSubmit={submitted && !selectedOptionBrand}
                                    isSubmitted={submitted}
                                    ErrorContdition={(!selectedOptionBrand && selectedOptionBrand?.id !== 0)}
                                    ErrorText={'برند دستگاه الزامی می باشد'}
                                />

                                {/* show custom brand input */}
                                {
                                selectedOptionBrand.id === 0 &&
                                    <TextInput 
                                        id={'TI1'} 
                                        value={customBrand} 
                                        onChange={handleCustomBrand} 
                                        placeholder='نام برند خود را وارد کنید' 
                                        isSubmitted={submitted}
                                        ErrorContdition={selectedOptionBrand?.id === 0 && customBrand} 
                                        ErrorText={'برند دستگاه الزامی می باشد'}
                                    />
                                }

                                {/* aircraft model input */}
                                <TextInput 
                                    id={'TI2'} 
                                    value={aircraft} 
                                    icon={<ClothesTag/>} 
                                    onChange={handleTextInputAircraft} 
                                    placeholder='نام مدل' 
                                    IsEmptyAfterSubmit={submitted && !aircraft} 
                                    isSubmitted={submitted}
                                    ErrorContdition={!aircraft }
                                    ErrorText={'نام مدل دستگاه الزامی می باشد'}
                                />

                                {/* size inputs for wing and parachute */}
                                {
                                    equipmentType !== 'Harness' &&
                                    <div className='col-span-1 flex flex-col gap-y-2'>
                                        <h1 className='text-[var(--text-default)]'>بازه وزن قابل تحمل وسیله</h1>
                                        <div className='flex justify-between gap-x-2'>
                                            <NumberInput 
                                                icon={<Cube/>} 
                                                id={'NI1'} 
                                                className='w-full' 
                                                value={minimumWeightCapacity} 
                                                onChange={handleMinimumWeightCapacity} 
                                                placeholder='حداقل وزن' 
                                                IsEmptyAfterSubmit={submitted && !minimumWeightCapacity} 
                                                isSubmitted={submitted}
                                                ErrorContdition={!minimumWeightCapacity}
                                                ErrorText={'حداقل وزن الزامی میباشد'}
                                                ErrorContdition2={minimumWeightCapacity >= maximumWeightCapacity && minimumWeightCapacity}
                                                ErrorText2={'حداقل وزن باید از حداکثر کمتر باشد'}
                                            />
                                            <NumberInput 
                                                icon={<Cube/>} 
                                                id={'NI2'} 
                                                className='w-full' 
                                                value={maximumWeightCapacity} 
                                                onChange={handleMaximumWeightCapacity} 
                                                placeholder='حداکثر وزن' 
                                                IsEmptyAfterSubmit={submitted && !maximumWeightCapacity} 
                                                isSubmitted={submitted}
                                                ErrorContdition={!maximumWeightCapacity}
                                                ErrorText={'حداکثر وزن الزامی میباشد'}
                                                ErrorContdition2={maximumWeightCapacity <= minimumWeightCapacity && maximumWeightCapacity}
                                                ErrorText2={'حداکثر وزن باید از حداقل بیشتر باشد'}
                                            />
                                        </div>
                                    </div>
                                }

                                {/* size input for harness */}
                                {
                                    equipmentType === 'Harness' &&
                                    <TextInput 
                                        id={'TI3'} 
                                        icon={<Cube/>} 
                                        className='col-span-1' 
                                        value={size} 
                                        onChange={handleTextInputSize} 
                                        placeholder='سایز' 
                                        IsEmptyAfterSubmit={submitted && !size} 
                                        isSubmitted={submitted}
                                        ErrorContdition={!size}
                                        ErrorText={'سایز دستگاه الزامی میباشد'}
                                    />
                                }

                                {/* class input */}
                                {
                                    equipmentType === 'Wing' && wingsClasses &&
                                    <DropdownInput
                                        id={'ddi1'}
                                        className='col-span-1'
                                        name={'کلاس'}
                                        icon={<WingIcon />}
                                        options={wingsClasses.data}
                                        selectedOption={selectedOptionClass}
                                        handleSelectChange={handleSelectChangeClass}
                                        IsEmptyAfterSubmit={submitted && !selectedOptionClass}
                                        isSubmitted={submitted}
                                        ErrorContdition={!selectedOptionClass}
                                        ErrorText={'کلاس دستگاه الزامی میباشد'}
                                    />
                                }

                                {/* wing type input */}
                                {
                                equipmentType === 'Wing' &&
                                <DropdownInput
                                id={'ddi2'}
                                className='col-span-1'
                                icon={<ColorTagsIcon/>}
                                name={'نوع بال'}
                                options={flightTypeOptionsEquipment}
                                selectedOption={selectedOptionType} 
                                handleSelectChange={handleSelectChangeType}
                                IsEmptyAfterSubmit={submitted && !selectedOptionType}
                                isSubmitted={submitted}
                                ErrorContdition={!selectedOptionType}
                                ErrorText={'نوع بال الزامی میباشد'}
                                />
                                }   

                                {/* Year input */}
                                <NumberInput
                                id={'NI3'}
                                icon={<CalenderIcon/>}
                                className='col-span-1'
                                value={year}
                                onChange={handleTextInputYear}
                                placeholder='سال ساخت (میلادی)'
                                IsEmptyAfterSubmit={submitted && !year}
                                isSubmitted={submitted}
                                ErrorContdition={!year}
                                ErrorText={'سال ساخت الزامی میباشد'}
                                ErrorContdition2={year <= 1980}
                                ErrorText2={'سال ساخت باید بعد از 1980 باشد'}
                                />

                                {   
                                equipmentType === 'Parachute' &&
                                <>
                                    <DateInput 
                                        name={'تاریخ آخرین بسته‌بندی '} 
                                        defaultValue={packageDate} 
                                        onChange={handlePackageDate} 
                                        placeH={'تاریخ اخرین بسته بندی'} 
                                        IsEmptyAfterSubmit={submitted && !packageDate} 
                                        isSubmitted={submitted}
                                        ErrorContdition={!packageDate}
                                        ErrorText={'سال ساخت الزامی میباشد'}
                                    />

                                    {/* Last Packer ID input */}
                                    <div className='w-full flex flex-col items-start gap-y-2'>
                                        <TextInput
                                            id={'TI3'}
                                            icon={<UserIcon/>}
                                            className='col-span-1'
                                            value={lastPackerId}
                                            onChange={handleTextInputLastPackerId}
                                            placeholder='شناسه آخرین بسته‌بندی کننده (اختیاری)'
                                        />
                                        {userByIdData &&
                                            <div className='flex gap-x-1 text-textAccent'>
                                            <PersonOutlineOutlinedIcon />
                                            <p>{userByIdData.data.fullName}</p>
                                            </div>
                                        }
                                    </div>
                                </>
                                }

                                {/* total of functioning hours model input */}
                                <NumberInput 
                                id={'NI4'}
                                icon={<ClockIcon/>} 
                                className='col-span-1' 
                                value={flightHour} 
                                onChange={handleTextInputFlightHour} 
                                placeholder='حدود ساعت کارکرد وسیله'  
                                IsEmptyAfterSubmit={submitted && !flightHour}
                                isSubmitted={submitted}
                                ErrorContdition={!flightHour}
                                ErrorText={'حدود ساعت کارکرد الزامی میباشد'}
                                ErrorContdition2={flightHour <= 0 && flightHour}
                                ErrorText2={'ساعت کارکرد باید بزرگتر یا مساوی 0 باشد'}
                                />

                            </div>

                            <div className='w-full flex flex-col text-start gap-y-1'>
                                <p className=' self-start md:self-center text-[var(--text-default)]'>ثبت سریال بال (اختیاری)</p>
                                <p className=' text-xs text-right'>
                                با پرکردن این فیلد و سینک کردن سریال بال به خلبان مربوطه ، امکان ثبت سریال توسط شخص دیگری نمی باشد، مگر در صورت فروش و انتقال شماره سریال به مالک جدید.
                                <br/>
                                در صورت مفقودی بال ما را از طریق تیکت مطلع سازید.
                                </p>
                            </div>
                            
                            <TextInput
                            id={'TI4'}
                            icon={<SerialNumberIcon/>}
                            className='col-span-1'
                            value={serialNumber}
                            onChange={handleTextInputSerialNumber}
                            placeholder='شماره سریال (اختیاری)'
                            isSubmitted={submitted}
                            ErrorContdition={EQUIPMENT_SERIAL_NUMBER_PATTERN.test(serialNumber) && serialNumber}
                            ErrorText={'فرمت شماره سریال درست نمیباشد '}
                            />

                            {/* for uploading pictures */}
                            {
                                serialNumber.length > 0 &&
                                <div className={`w-full flex flex-col items-start space-y-3`}>
                                    <UploadFileInput name={'بال'} selectedFile={selectedFile} onFileChange={handleFileChange} />
                                    <p className=' text-xs'>*فرمت‌های مجاز فایل BMP,GIF,JPEG,JPG,PNG تا 10 مگابایت</p>
                                </div>
                            }

                            <button onClick={handlePopUp} className={`${ButtonStyles.addButton} w-36 `}>ثبت</button>

                        </form>

                        {/* submit pop up */}
                        <SubmitForm 
                            showPopup={showPopup}
                            setShowPopup={setShowPopup} 
                            handlePost={handleSubmit} 
                            text={'در صورت تایید کردن وسیله مورد نظر قابل ویرایش نمی‌باشد دقت کنید'} 
                            isLoading={isSubmitting}
                        />

                    </>
                }

            </div>
            
        </div>
    );
};

export default AddEquipment;