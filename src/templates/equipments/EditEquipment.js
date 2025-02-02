import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// queries
import { useAnEquipment, useEditEquipment } from '../../Utilities/Services/equipmentQueries';
import { useUserById } from '../../Utilities/Services/queries';

// utilities
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// assets
import UserIcon from '../../components/icons/UserIcon'
import SerialNumberIcon from '../../components/icons/SerialNumberIcon'

// comps
import PageTitle from '../../components/reuseable/PageTitle';
import DateInput from '../../components/inputs/DateInput';
import TextInput from '../../components/inputs/textInput';
import UploadFileInput from '../../components/inputs/UploadFileInput';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import { EQUIPMENT_SERIAL_NUMBER_PATTERN } from '../../Utilities/Providers/regexProvider';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const EditEquipment = () => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate()
    const location = useLocation();
    const { pathname } = location;
    const { id } = useParams();
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const isForClub = pathname.includes('EditClubEquipment')

    const [showPopup, setShowPopup] = useState(false);
    const [packageDate, setPackageDate] = useState('')
    const [lastPackerId, setLastPackerId] = useState('');
    const [equipmentSerial, setEquipmentSerial] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    // useEditEquipment for submitting the form
    const { data: EquipmentData, isLoading: EquipmentDataLoading, error } = useAnEquipment(id, isForClub)
    const { brand, model, flightHours, equipmentType, flightCount, wingClass, wingType , year , serialNumber, packerFullName, lastPackingDateTime, ownershipType, minimumWeightCapacity, maximumWeightCapacity, size, estimatedFlightDuration, flightDuration, groundHandlingDuration} = EquipmentData?.data || {};
    const { data: userByIdData } = useUserById(lastPackerId)
    const { mutate: editEquipment, isLoading } = useEditEquipment()

    const backButtonRoute = 
    equipmentType === 'Wing' ? '/equipment/flightEquipment' :
        equipmentType === 'Harness' ? '/equipment/harness' :
            equipmentType === 'Parachute' && '/equipment/parachute'

    const backButtonRouteForClub = 
    equipmentType === 'Wing' ? '/club/clubEquipment/flightEquipments' :
        equipmentType === 'Harness' ? '/club/clubEquipment/harnesses' :
            equipmentType === 'Parachute' && '/club/clubEquipment/parachutes'

    useEffect(() => {
        if(equipmentSerial.length < 1) {
          setSelectedFile(null);
        }
      }, [equipmentSerial])

    const handlePackageDate = (date) => {
        setPackageDate(date);

        clickOnRightSide()
    }

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

    const handleTextInputLastPackerId = (event) => {
        setLastPackerId(event.target.value);
    };

    const handleTextInputEquipmentSerial = (event) => {
        setEquipmentSerial(event.target.value);
    }

    // Event handlers for uplopading file
    const handleFileChange = (file) => {
        setSelectedFile(file);
    };

    const { formatDate } = useDateFormat();

    // Event handler for form submission
    const handlePopup = (event) => {

        event.preventDefault();
        setShowPopup(true);
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        setIsSubmitted(true);
        console.log('submitting')
        
        // Create a new FormData object
        const formData = new FormData();

        const formattedPackedDate = formatDate(packageDate) + " 00:00";
        if(equipmentType === "Parachute" && packageDate) {
            formData.append('lastPackingDateTime', formattedPackedDate);
            lastPackerId && formData.append('lastPackerId', lastPackerId);
        }
        if(equipmentSerial && selectedFile) {
            formData.append('serialNumber', equipmentSerial);
            formData.append('file', selectedFile);
        }
        formData.append('equipmentId', id);

        if ((packageDate) || (equipmentSerial && selectedFile)) {
            editEquipment(formData, {
                onSuccess: () => {
                    toast(t('equipment.editEquipment.success'), {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    navigate(isForClub ? backButtonRouteForClub : backButtonRoute);
                },
                onError: (error) => {
                    const errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    console.error(error);
                    setShowPopup(false);
                }
            });
        } else {
            toast(t('equipment.editEquipment.fillRequiredFields'), {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            setShowPopup(false);
        }

    }




    return (
        <div className='flex flex-col items-center pt-[3rem]'>
            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%] lg:gap-y-16 lg:w-[55%]'>
                <PageTitle
                    title={EquipmentData && (equipmentType === "Parachute" || EquipmentData.data.serialStatus === 'None' || EquipmentData.data.serialStatus === 'Rejected') ? t('equipment.editEquipment.edit') : t('equipment.editEquipment.details')}
                    navigateTo={isForClub ? backButtonRouteForClub : backButtonRoute}
                />
                {
                    EquipmentDataLoading &&
                    <CircularProgressLoader />
                }
                {
                    error && <h3 className='flex w-full h-[95vh] items-center justify-center'>{error.message}</h3>
                }
                {
                    EquipmentData &&
                    <>
                        <form className={`w-[90%] rounded-xl flex flex-col gap-y-6`}>
                            <div className='grid grid-cols-2 gap-x-2 gap-y-4 w-full'>
                                {brand &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.brand')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{brand}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    model &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.model')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{model}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    wingClass &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.wingClass')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{wingClass}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    wingType &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.wingType')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>
                                                {wingType === 'Single' && t('equipment.editEquipment.single')}
                                                {wingType === 'Tandem' && t('equipment.editEquipment.tandem')}
                                            </p>
                                        </div>
                                    </div>
                                }
                                {
                                    estimatedFlightDuration >= 0 &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.flightDuration')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{estimatedFlightDuration}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    year &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.year')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{year}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    minimumWeightCapacity >= 0 && maximumWeightCapacity >= 0 &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.weightCapacity')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{maximumWeightCapacity} - {minimumWeightCapacity}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    size &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.size')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{size}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    serialNumber &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.serialNumber')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{serialNumber}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    flightCount >= 0 && flightCount !== null &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.flightCount')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{flightCount}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    flightDuration &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.totalFlightDuration')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{flightDuration}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    flightHours >= 0 && flightHours !== null &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.flightHours')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{flightHours}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    packerFullName &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.packerFullName')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{packerFullName}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    lastPackingDateTime &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.lastPackingDateTime')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{lastPackingDateTime}</p>
                                        </div>
                                    </div>
                                }
                                {
                                    groundHandlingDuration &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className='text-sm'>{t('equipment.editEquipment.groundHandlingDuration')}</p>
                                        <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                            <p>{groundHandlingDuration}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                            {/* to check if the equipment is editable */}
                            {
                                (equipmentType === "Parachute" || EquipmentData.data.serialStatus === 'None' || EquipmentData.data.serialStatus === 'Rejected') && EquipmentData.data.isExpired !== true &&
                                <>
                                    <div id='no grid list' className='flex flex-col gap-y-5'>
                                        <div className='flex flex-col items-start gap-y-5'>
                                            {EquipmentData && EquipmentData.data && (EquipmentData.data.serialStatus === 'None' || EquipmentData.data.serialStatus === 'Rejected') &&
                                                <>
                                                    {/* parachute serial explanation */}
                                                    {
                                                        EquipmentData.data.equipmentType === 'Parachute' &&
                                                        <div className='w-full flex flex-col text-start gap-y-1'>
                                                            <p className='self-start md:self-center'>{t('equipment.editEquipment.parachuteSerialExplanation')}</p>
                                                            <p className='text-xs self-start text-start'>{t('equipment.editEquipment.parachuteSerialNote')}</p>
                                                        </div>
                                                    }
                                                    {
                                                        EquipmentData.data.equipmentType === 'Wing' &&
                                                        <div className='w-full flex flex-col text-start gap-y-1'>
                                                            <p className='self-start md:self-center'>{t('equipment.editEquipment.wingSerialExplanation')}</p>
                                                            <p className='text-xs text-start'>
                                                                {t('equipment.editEquipment.wingSerialNote')}
                                                            </p>
                                                        </div>
                                                    }
                                                    {
                                                        EquipmentData.data.equipmentType === 'Harness' &&
                                                        <div className='w-full flex flex-col text-start gap-y-1'>
                                                            <p className='self-start md:self-center'>{t('equipment.editEquipment.harnessSerialExplanation')}</p>
                                                            <p className='text-xs self-start text-start'>
                                                                {t('equipment.editEquipment.harnessSerialNote')}
                                                            </p>
                                                        </div>
                                                    }
                                                    {/* text input to add equipment serial */}
                                                    <TextInput
                                                        id={'TI1'}
                                                        icon={<SerialNumberIcon />}
                                                        className='col-span-1'
                                                        value={equipmentSerial}
                                                        onChange={handleTextInputEquipmentSerial}
                                                        placeholder={t('equipment.editEquipment.serialNumber')}
                                                        isSubmitted={isSubmitted}
                                                        errorCondition={!EQUIPMENT_SERIAL_NUMBER_PATTERN.test(equipmentSerial) && equipmentSerial}
                                                        errorText={t('equipment.editEquipment.serialNumberFormatError')}
                                                        errorCondition2={!equipmentSerial}
                                                        errorText2={
                                                            equipmentType !== 'Parachute' ?
                                                                t('equipment.editEquipment.serialNumberRequired')
                                                                :
                                                                t('equipment.editEquipment.fillRequiredFields')
                                                        }
                                                    />
                                                    {/* for uploading pictures */}
                                                    {
                                                        equipmentSerial.length > 0 &&
                                                        <>
                                                            <UploadFileInput name={t('equipment.editEquipment.serialNumber')} selectedFile={selectedFile} onFileChange={handleFileChange} />
                                                            <p className='text-xs mt-[-0.5rem]'>{t('equipment.editEquipment.uploadFileFormats')}</p>
                                                        </>
                                                    }
                                                </>
                                            }
                                            {equipmentType === "Parachute" && ownershipType !== 'Temporary' && EquipmentData.data.isExpired !== true &&
                                                <>
                                                    <h3 className='text-textDefault text-sm mt-1 mb-[-10px]'>
                                                        {t('equipment.editEquipment.parachuteSerialExplanation')}
                                                    </h3>
                                                    {/* Last package date input */}
                                                    <DateInput
                                                        name={t('equipment.editEquipment.lastPackingDateTime')}
                                                        defaultValue={packageDate}
                                                        onChange={handlePackageDate}
                                                        placeH={t('equipment.editEquipment.lastPackingDateTime')}
                                                        isSubmitted={isSubmitted}
                                                        errorCondition={!packageDate}
                                                        errorText={t('equipment.editEquipment.fillRequiredFields')}
                                                        errorCondition2={new Date(packageDate) > new Date()}
                                                        errorText2={t('equipment.editEquipment.fillRequiredFields')}
                                                    />
                                                    {/* Last Packer ID input */}
                                                    {
                                                        packageDate &&
                                                        <div className='w-full flex flex-col items-start gap-y-2'>
                                                            <TextInput
                                                                id={'TI2'}
                                                                icon={<UserIcon />}
                                                                className='col-span-1'
                                                                value={lastPackerId}
                                                                onChange={handleTextInputLastPackerId}
                                                                placeholder={t('equipment.editEquipment.packerFullName')}
                                                            />
                                                            {userByIdData &&
                                                                <div className='flex gap-x-1 text-textAccent'>
                                                                    <PersonOutlineOutlinedIcon />
                                                                    <p>{userByIdData.data.fullName}</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-center items-center'>
                                        <button onClick={handlePopup} className={`${ButtonStyles.addButton} w-32`}>{t('equipment.editEquipment.submit')}</button>
                                    </div>
                                </>
                            }
                        </form>
                        {/* submit pop up */}
                        <form className={`${boxStyles.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'} w-[304px] h-[280px] flex flex-col justify-around items-center top-52`}>
                            <CloseIcon onClick={() => setShowPopup(false)} sx={{ cursor: 'pointer', margin: '-0.8rem 0 0 16rem' }} />
                            <h3 className='text-textError text-xl mt-[-3rem]'>{t('equipment.editEquipment.confirmation')}</h3>
                            <p className='text-base w-[90%]'>{t('equipment.editEquipment.confirmationMessage')}</p>
                            <div className='w-full flex justify-around items-center'>
                                <button type="reset" className={`${ButtonStyles.normalButton} w-24`} onClick={() => setShowPopup(false)}>{t('equipment.editEquipment.cancel')}</button>
                                <button disabled={isLoading} type="submit" className={`${ButtonStyles.addButton} w-32`} onClick={handleSubmit}>{isLoading ? t('equipment.editEquipment.loading') : t('equipment.editEquipment.submit')}</button>
                            </div>
                        </form>
                    </>
                }
            </div>
        </div>
    );
    
};

export default EditEquipment;