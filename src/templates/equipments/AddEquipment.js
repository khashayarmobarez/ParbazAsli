import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


// providers
import {flightTypeOptionsEquipment, flightTypeOptionsEquipmentEnglish} from '../../Utilities/Providers/dropdownInputOptions'
import { EQUIPMENT_SERIAL_NUMBER_PATTERN, USER_ID_PATTERN, USER_REGEX } from '../../Utilities/Providers/regexProvider';

// hooks
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// req and queries
import { useEquipmentBrands, useWingClasses } from '../../Utilities/Services/dataQueries';
import { useAddEquipment } from '../../Utilities/Services/equipmentQueries';
import { useUserById } from '../../Utilities/Services/queries';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// assets
import ClothesTag from '../../elements/icons/ClothesTag';
import Cube from '../../elements/icons/ThreeDCube';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// comps
import PageTitle from '../../elements/reuseable/PageTitle';
import CircularProgressLoader from '../../elements/Loader/CircularProgressLoader';
import TextInput from '../../elements/inputs/textInput';
import NumberInput from '../../elements/inputs/NumberInput';
import DropdownInput from '../../elements/inputs/DropDownInput';
import WingIcon from '../../elements/icons/WingIcon';
import ColorTagsIcon from '../../elements/icons/ColorTagsIcon';
import CalenderIcon from '../../elements/icons/CalenderIcon';
import ClockIcon from '../../elements/icons/ClockIcon';
import UploadFileInput from '../../elements/inputs/UploadFileInput';
import SerialNumberIcon from '../../elements/icons/SerialNumberIcon';
import DateInput from '../../elements/inputs/DateInput';
import UserIcon from '../../elements/icons/UserIcon';
import StandardPopup from '../../elements/reuseable/StandardPopup';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const AddEquipment = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const location = useLocation(); 
    const { pathname } = location;
    const appTheme = Cookies.get('themeApplied') || 'dark';
    const navigate = useNavigate();
    const { formatDate } = useDateFormat();

    const isForClub = pathname.includes('club')

    const equipmentType = 
    pathname.includes('addFlightEquipment') ? 'Wing' :
        pathname.includes('addHarness') ? 'Harness' : 'Parachute';

    const equipmentTypeName = 
    equipmentType === 'Wing' ? t('equipment.flightEquipment') :
        equipmentType === 'Harness' ? t('equipment.harness')  :
            equipmentType === 'Parachute' && t('equipment.parachute') 

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
        const handlePopUp = (event) => {
            event.preventDefault();
            setSubmitted(true);
            const currentYear = new Date().getFullYear();
        
            // Here you can handle form submission, such as sending data to a backend server
            const isSerialNumberValid = validateSerialNumber(serialNumber);
            const isPackerIdValid = validatePackerId(lastPackerId);
        
            if (
                (equipmentType === 'Wing' && (!(selectedOptionBrand || customBrand) || !aircraft || !minimumWeightCapacity || !maximumWeightCapacity || !flightHour || !year || !selectedOptionClass || !selectedOptionType))
                ||
                (equipmentType === 'Harness' && (!(selectedOptionBrand || customBrand) || !aircraft || !size || !flightHour || !year))
                ||
                (equipmentType === 'Parachute' && (!(selectedOptionBrand || customBrand) || !aircraft || !packageDate || !minimumWeightCapacity || !maximumWeightCapacity || !flightHour || !year))
            ) {
                toast(t('equipment.addEquipment.fillAllFields'), {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                return;
            }
        
            if (year <= 1979 || year > currentYear) {
                toast(t('equipment.addEquipment.validYear'), {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                return;
            }
        
            if (lastPackerId && !isPackerIdValid) {
                toast(t('equipment.addEquipment.validPackerId'), {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                return;
            }
        
            // Validate inputs
            if (!isSerialNumberValid) {
                toast(t('equipment.addEquipment.validSerialNumber'), {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                return;
            }
        
            if ((serialNumber && !selectedFile) || (selectedFile && !serialNumber)) {
                toast(t('equipment.addEquipment.serialAndFileMismatch'), {
                    type: 'error',
                    position: 'top-center',
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
            formData.append('usageHours', flightHour);
            formData.append('year', year);
            equipmentType !== "Harness" && formData.append('minimumWeightCapacity', minimumWeightCapacity);
            equipmentType !== "Harness" && formData.append('maximumWeightCapacity', maximumWeightCapacity);
            equipmentType === "Harness" && formData.append('Size', size);
            equipmentType === "Wing" && formData.append('wingClassId', selectedOptionClass.id);
            equipmentType === "Wing" && formData.append('WingType', selectedOptionType.id);
            packageDate && equipmentType === "Parachute" && formData.append('LastPackingDateTime', formattedPackedDate);
            equipmentType === "Parachute" && formData.append('lastPackerId', lastPackerId);
            isForClub && formData.append('isForClub', true);
        
            console.log(formData);
            console.log('submitting');
        
            mutateWing(formData, {
                onSuccess: () => {
                    toast(t('equipment.addEquipment.success'), {
                        type: 'success',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    setShowPopup(false);
                    navigate(isForClub ? backButtonRouteForClub : backButtonRoute);
                },
                onError: (error) => {
                    console.log('submitError', submitError.message);
                    toast(submitError.response.data.ErrorMessages[0].ErrorMessage, {
                        type: 'error',
                        position: 'top-center',
                        autoClose: 10000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                }
            });
        };


        return (
            <div className='flex flex-col mt-14 items-center'>
                <div className='flex flex-col items-center gap-y-4 w-full md:w-[75%] lg:gap-y-12 lg:w-[55%]'>
                    <PageTitle
                        title={`${t('equipment.addEquipment.add')} ${equipmentTypeName}`}
                        navigateTo={isForClub ? backButtonRouteForClub : backButtonRoute}
                    />
                    {
                        brandsIsLoading &&
                        <CircularProgressLoader />
                    }
                    {
                        brandsData &&
                        <>
                            <p className='text-sm'>
                                {t('equipment.addEquipment.equipmentDetailsNote1')}<br />
                                {t('equipment.addEquipment.equipmentDetailsNote2')}
                            </p>

                            <form className='w-[90%] flex flex-col items-center space-y-6'>
                                <div className='w-full flex flex-col items-center gap-y-4 md:grid md:grid-cols-2 md:gap-6'>
                                    {/* brand input / custom brand input */}
                                    <DropdownInput
                                        className='col-span-1'
                                        options={brandsData.data}
                                        selectedOption={selectedOptionBrand}
                                        handleSelectChange={handleSelectChangeBrand}
                                        name={t('equipment.addEquipment.brand')}
                                        icon={<ClothesTag customColor={!selectedOptionBrand && submitted && 'var(--text-error)'} />}
                                        isEmptyAfterSubmit={submitted && !selectedOptionBrand}
                                        isSubmitted={submitted}
                                        errorCondition={!selectedOptionBrand && selectedOptionBrand?.id !== 0}
                                        errorText={t('equipment.addEquipment.brandRequired')}
                                    />
                                    {/* show custom brand input */}
                                    {
                                        selectedOptionBrand.id === 0 &&
                                        <TextInput
                                            id={'TI1'}
                                            value={customBrand}
                                            onChange={handleCustomBrand}
                                            placeholder={t('equipment.addEquipment.customBrand')}
                                            isSubmitted={submitted}
                                            errorCondition={selectedOptionBrand?.id === 0 && customBrand}
                                            errorText={t('equipment.addEquipment.brandRequired')}
                                        />
                                    }
                                    {/* aircraft model input */}
                                    <TextInput
                                        id={'TI2'}
                                        value={aircraft}
                                        icon={<ClothesTag customColor={!aircraft && submitted && 'var(--text-error)'} />}
                                        onChange={handleTextInputAircraft}
                                        placeholder={t('equipment.addEquipment.aircraftModel')}
                                        isEmptyAfterSubmit={submitted && !aircraft}
                                        isSubmitted={submitted}
                                        errorCondition={!aircraft}
                                        errorText={t('equipment.addEquipment.aircraftModelRequired')}
                                    />
                                    {/* size inputs for wing and parachute */}
                                    {
                                        equipmentType !== 'Harness' &&
                                        <div className='col-span-1 flex flex-col gap-y-2'>
                                            <h1 className='text-[var(--text-default)]'>{t('equipment.addEquipment.size')}</h1>
                                            <div className='flex justify-between gap-x-2'>
                                                <NumberInput
                                                    icon={<Cube customColor={!minimumWeightCapacity && submitted && 'var(--text-error)'} />}
                                                    id={'NI1'}
                                                    className='w-full'
                                                    value={minimumWeightCapacity}
                                                    onChange={handleMinimumWeightCapacity}
                                                    placeholder={t('equipment.addEquipment.minimumWeightCapacity')}
                                                    isEmptyAfterSubmit={submitted && !minimumWeightCapacity}
                                                    isSubmitted={submitted}
                                                    errorCondition={!minimumWeightCapacity}
                                                    errorText={t('equipment.addEquipment.minimumWeightCapacityRequired')}
                                                    errorCondition2={minimumWeightCapacity >= maximumWeightCapacity && maximumWeightCapacity && minimumWeightCapacity}
                                                    errorText2={t('equipment.addEquipment.minimumWeightCapacityError')}
                                                />
                                                <NumberInput
                                                    icon={<Cube customColor={!maximumWeightCapacity && submitted && 'var(--text-error)'} />}
                                                    id={'NI2'}
                                                    className='w-full'
                                                    value={maximumWeightCapacity}
                                                    onChange={handleMaximumWeightCapacity}
                                                    placeholder={t('equipment.addEquipment.maximumWeightCapacity')}
                                                    isEmptyAfterSubmit={submitted && !maximumWeightCapacity}
                                                    isSubmitted={submitted}
                                                    errorCondition={!maximumWeightCapacity}
                                                    errorText={t('equipment.addEquipment.maximumWeightCapacityRequired')}
                                                    errorCondition2={maximumWeightCapacity <= minimumWeightCapacity && minimumWeightCapacity && minimumWeightCapacity}
                                                    errorText2={t('equipment.addEquipment.maximumWeightCapacityError')}
                                                />
                                            </div>
                                        </div>
                                    }
                                    {/* size input for harness */}
                                    {
                                        equipmentType === 'Harness' &&
                                        <TextInput
                                            id={'TI3'}
                                            icon={<Cube customColor={!size && submitted && 'var(--text-error)'} />}
                                            className='col-span-1'
                                            value={size}
                                            onChange={handleTextInputSize}
                                            placeholder={t('equipment.addEquipment.size')}
                                            isEmptyAfterSubmit={submitted && !size}
                                            isSubmitted={submitted}
                                            errorCondition={!size}
                                            errorText={t('equipment.addEquipment.sizeRequired')}
                                        />
                                    }
                                    {/* class input */}
                                    {
                                        equipmentType === 'Wing' && wingsClasses &&
                                        <DropdownInput
                                            id={'ddi1'}
                                            className='col-span-1'
                                            name={t('equipment.addEquipment.class')}
                                            icon={<WingIcon customColor={!selectedOptionClass && submitted && 'var(--text-error)'} />}
                                            options={wingsClasses.data}
                                            selectedOption={selectedOptionClass}
                                            handleSelectChange={handleSelectChangeClass}
                                            isEmptyAfterSubmit={submitted && !selectedOptionClass}
                                            isSubmitted={submitted}
                                            errorCondition={!selectedOptionClass}
                                            errorText={t('equipment.addEquipment.classRequired')}
                                        />
                                    }
                                    {/* wing type input */}
                                    {
                                        equipmentType === 'Wing' &&
                                        <DropdownInput
                                            id={'ddi2'}
                                            className='col-span-1'
                                            icon={<ColorTagsIcon customColor={!selectedOptionType && submitted && 'var(--text-error)'} />}
                                            name={t('equipment.addEquipment.wingType')}
                                            options={dir === "ltr" ? flightTypeOptionsEquipmentEnglish : flightTypeOptionsEquipment}
                                            selectedOption={selectedOptionType}
                                            handleSelectChange={handleSelectChangeType}
                                            isEmptyAfterSubmit={submitted && !selectedOptionType}
                                            isSubmitted={submitted}
                                            errorCondition={!selectedOptionType}
                                            errorText={t('equipment.addEquipment.wingTypeRequired')}
                                        />
                                    }
                                    {/* Year input */}
                                    <NumberInput
                                        id={'NI3'}
                                        icon={<CalenderIcon customColor={!year && submitted && 'var(--text-error)'} />}
                                        className='col-span-1'
                                        value={year}
                                        onChange={handleTextInputYear}
                                        placeholder={t('equipment.addEquipment.year')}
                                        isEmptyAfterSubmit={submitted && !year}
                                        isSubmitted={submitted}
                                        errorCondition={!year}
                                        errorText={t('equipment.addEquipment.yearRequired')}
                                        errorCondition2={year <= 1980 || year > new Date().getFullYear()}
                                        errorText2={t('equipment.addEquipment.yearError', { currentYear: new Date().getFullYear() + 1 })}
                                    />
                                    {
                                        equipmentType === 'Parachute' &&
                                        <>
                                            <DateInput
                                                name={t('equipment.addEquipment.lastPackingDate')}
                                                defaultValue={packageDate}
                                                onChange={handlePackageDate}
                                                placeH={t('equipment.addEquipment.lastPackingDate')}
                                                isEmptyAfterSubmit={submitted && !packageDate}
                                                isSubmitted={submitted}
                                                errorCondition={!packageDate}
                                                errorText={t('equipment.addEquipment.lastPackingDateRequired')}
                                                errorCondition2={packageDate && new Date(packageDate) > new Date()}
                                                errorText2={t('equipment.addEquipment.lastPackingDateError')}
                                            />
                                            {/* Last Packer ID input */}
                                            <div className='w-full flex flex-col items-start gap-y-2'>
                                                <TextInput
                                                    id={'TI3'}
                                                    icon={<UserIcon />}
                                                    className='col-span-1'
                                                    value={lastPackerId}
                                                    onChange={handleTextInputLastPackerId}
                                                    placeholder={t('equipment.addEquipment.lastPackerId')}
                                                    errorCondition={!USER_ID_PATTERN.test(lastPackerId) && lastPackerId}
                                                    errorText={t('equipment.addEquipment.lastPackerIdError')}
                                                />
                                                {
                                                    userByIdData &&
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
                                        icon={<ClockIcon customColor={!flightHour && submitted && 'var(--text-error)'} />}
                                        className='col-span-1'
                                        value={flightHour}
                                        onChange={handleTextInputFlightHour}
                                        placeholder={t('equipment.addEquipment.flightHours')}
                                        isEmptyAfterSubmit={submitted && !flightHour}
                                        isSubmitted={submitted}
                                        errorCondition={!flightHour}
                                        errorText={t('equipment.addEquipment.flightHoursRequired')}
                                        errorCondition2={flightHour <= 0 && flightHour}
                                        errorText2={t('equipment.addEquipment.flightHoursError')}
                                    />
                                </div>
                                <div className='w-full flex flex-col text-start gap-y-1'>
                                    <p className='self-start md:self-center text-[var(--text-default)] text-center'>{t('equipment.addEquipment.serialNumberNote')}</p>
                                    <p className={`text-xs ${dir === 'ltr' ? 'text-left' : 'text-right'}`}>
                                        {t('equipment.addEquipment.serialNumberNotePart2')}
                                    </p>
                                </div>
                                <TextInput
                                    id={'TI4'}
                                    icon={<SerialNumberIcon />}
                                    className='col-span-1'
                                    value={serialNumber}
                                    onChange={handleTextInputSerialNumber}
                                    placeholder={t('equipment.addEquipment.serialNumber')}
                                    isSubmitted={submitted}
                                    errorCondition={!EQUIPMENT_SERIAL_NUMBER_PATTERN.test(serialNumber) && serialNumber}
                                    errorText={t('equipment.addEquipment.serialNumberError')}
                                />
                                {/* for uploading pictures */}
                                {
                                    serialNumber.length > 0 &&
                                    <div className={`w-full flex flex-col items-start space-y-3`}>
                                        <UploadFileInput name={t('equipment.addEquipment.uploadFile')} selectedFile={selectedFile} onFileChange={handleFileChange} />
                                        <p className='text-xs'>*{t('equipment.addEquipment.uploadFileNote')}</p>
                                    </div>
                                }
                                <button onClick={handlePopUp} className={`${ButtonStyles.addButton} w-32`}>{t('equipment.addEquipment.submit')}</button>
                            </form>
                            {/* submit pop up */}
                            <div className={`${showPopup ? 'fixed' : 'hidden'} w-full h-full z-[70] backdrop-blur-sm`}>
                                <StandardPopup
                                    explanationText={t('equipment.addEquipment.submitNote')}
                                    showPopup={showPopup}
                                    setShowPopup={setShowPopup}
                                    handleSubmit={handleSubmit}
                                    loading={isSubmitting}
                                    submitText={t('equipment.addEquipment.submit')}
                                    declineText={t('equipment.addEquipment.cancel')}
                                />
                            </div>
                        </>
                    }
                </div>
            </div>
        );
};

export default AddEquipment;