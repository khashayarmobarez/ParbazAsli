import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'
import boxStyles from '../../styles/DataBox.module.css'

// assets
import UserIcon from '../../components/icons/UserIcon'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// utilities and Queries
import { useAnEquipment, usePossessionTransition } from '../../Utilities/Services/equipmentQueries';
import { useUserById } from '../../Utilities/Services/queries';
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// comps
import PageTitle from '../../components/reuseable/PageTitle';
import TextInput from '../../components/inputs/textInput';
import DateInput from '../../components/inputs/DateInput';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import { USER_ID_PATTERN } from '../../Utilities/Providers/regexProvider';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const PossessionTransitionEquipment = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const { id } = useParams();
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const isForClub = pathname.includes('possessionTransitionEquipmentClub');
    
    const { data: EquipmentData, isLoading, error } = useAnEquipment(id, isForClub)

    const { mutate: mutateTransitionData, loading:possessionLoading } = usePossessionTransition();

    const { formatDate } = useDateFormat();
    
    // Ref to the button element
    const buttonRef = useRef(null);
    
    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('temporary');
    
    const [receiverId, setReceiverId] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [ isSubmitted, setIsSubmitted ] = useState(false)

    // getting the receiver name
    const { data: userByIdData, error: userByIdError } = useUserById(receiverId)

    // date state
    const [expirationDate, setExpirationDate] = useState('')

    const backButtonRoute = EquipmentData ? (
        EquipmentData.equipmentType === 'Wing' ? '/equipment/flightEquipment' :
        EquipmentData.equipmentType === 'Harness' ? '/equipment/harness' :
        EquipmentData.equipmentType === 'Parachute' ? '/equipment/parachute' :
        ''
    ) : '';
    
    const backButtonRouteForClub = EquipmentData ? (
        EquipmentData.equipmentType === 'Wing' ? '/club/clubEquipment/flightEquipments' :
        EquipmentData.equipmentType === 'Harness' ? '/club/clubEquipment/harnesses' :
        EquipmentData.equipmentType === 'Parachute' ? '/club/clubEquipment/parachutes' :
        ''
    ) : '';

    const handleTextInputReceiverId = (event) => {
        setReceiverId(event.target.value);
    };

    // Event handler for expiration date selection
    const handleExpirationDate = (date) => {
        setExpirationDate(date);

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


    const handlePopUp = (event) => {
        event.preventDefault()
        setIsSubmitted(true)

        if(activeLink === 'temporary') {
            if(!userByIdData) {
                toast(t('equipment.transitionEquipment.noUserData'), {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            } else if(!expirationDate) {
                toast(t('equipment.transitionEquipment.noExpirationDate'), {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            } else if(!expirationDate > new Date()) {
                toast(t('equipment.transitionEquipment.invalidExpirationDate'), {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            } else {
                setShowPopup(true)
            }
        } else {
            setShowPopup(true)
        }
    }



    const handleSubmit = (event) => {
            event.preventDefault();
    
            var formData = new FormData();
            // formatData function
            const formattedDate = formatDate(expirationDate) + ' 23:00';
    
    
            formData.append("equipmentId", id);
            formData.append("receiverId", receiverId);
            formData.append("type", activeLink);
            if(activeLink === 'temporary') {
                formData.append("expirationDateTime", formattedDate);
            }
    
            mutateTransitionData(formData, {
                onSuccess: () => {
                    // Code to execute after successful mutation
                    toast(t('equipment.transitionEquipment.success'), {
                        type: 'success',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    setShowPopup(false);
                    navigate(isForClub ? backButtonRouteForClub : backButtonRoute)
                },
                onError: (error) => {
                    // Code to execute when mutation encounters an error
                    const errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    console.error(error);
                }
            });
        }

        

    // Effect to click the button when the page is mounted
    useEffect(() => {
        // Check if the button ref exists and it has a current property
        if (buttonRef.current) {
        // Programmatically click the button
        buttonRef.current.click();
        }
    }, []);


    return (
        <div className='w-full flex flex-col justify-start items-center'>

            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center gap-y-2 lg:gap-y-8 lg:w-[55%]'>

                <PageTitle title={t('equipment.transitionEquipment.title')}/>

                {isLoading && <CircularProgressLoader/>}

                {error && <p>{t('equipment.transitionEquipment.error')}</p>}

                {EquipmentData && EquipmentData.data && EquipmentData.data.serialStatus === 'Accepted' &&
                    <>
                        <div dir='rtl' className={`${ButtonStyles.ThreeStickedButtonCont}  sticky top-[8.2rem] lg:top-[9rem] z-50`}>
                            <button ref={buttonRef} className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'temporary' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('temporary')}>{t('equipment.transitionEquipment.temporary')}</button>
                            <button  className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${activeLink === 'permanent' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('permanent')} >{t('equipment.transitionEquipment.permanent')}</button>
                        </div>

                        <form className='w-[90%] flex flex-col items-center mt-4  gap-y-4'>
                            
                            {/* Serial Number input */}
                            <TextInput
                                id={'TI1'}
                                icon={<UserIcon/>}
                                className='col-span-1'
                                value={receiverId}
                                onChange={handleTextInputReceiverId}
                                placeholder={activeLink === 'temporary' ? t('equipment.transitionEquipment.receiverId') : t('equipment.transitionEquipment.receiverIdRequired')}
                                isSubmitted={isSubmitted}
                                ErrorCondition={!receiverId}
                                ErrorText={t('equipment.transitionEquipment.receiverIdRequired')}
                                ErrorCondition2={!USER_ID_PATTERN.test(receiverId) && receiverId}
                                ErrorText2={t('equipment.transitionEquipment.receiverIdFormatError')}
                            />
                            
                            {
                            userByIdData &&
                                <div className='flex gap-x-1 text-textAccent self-start mt-[-12px] items-center'>
                                    <PersonOutlineOutlinedIcon />
                                    <p>{userByIdData.data.fullName}</p>
                                </div>
                            }

                            {
                            receiverId && USER_ID_PATTERN.test(receiverId) && !userByIdData &&
                                <div className='flex gap-x-1 text-textError self-start -mt-2.5 items-center'>
                                    <PersonOutlineOutlinedIcon />
                                    <p>{t('equipment.transitionEquipment.noUserData')}</p>
                                </div>
                            }

                            {
                            activeLink === 'temporary' && 
                                <DateInput 
                                    name={t('equipment.transitionEquipment.noExpirationDate')} 
                                    defaultValue={expirationDate} 
                                    onChange={handleExpirationDate} 
                                    placeH={t('equipment.transitionEquipment.noExpirationDate')} 
                                    ErrorCondition={!expirationDate}
                                    ErrorText={t('equipment.transitionEquipment.noExpirationDate')}
                                    ErrorCondition2={new Date(expirationDate) <= new Date() && expirationDate}
                                    ErrorText2={t('equipment.transitionEquipment.invalidExpirationDate')}
                                />
                            }

                            <button type="submit" onClick={handlePopUp} className={`${ButtonStyles.addButton} w-32 h-12 mt-6`}>ثبت</button>


                        </form>

                        {/* popup */}
                        <div className={` ${showPopup ? 'fixed' : 'hidden'}  backdrop-blur-lg absolute w-full h-[100vh] flex justify-center items-center z-[120]`}>
                            <div className={`${boxStyles.containerChangeOwnership}   w-[88vw] md:w-[324px] h-auto py-10 gap-y-10 mt-48  flex flex-col justify-around items-center z-10 md:z-[50]`}>
                                
                                <h1 className='text-xl text-textWarning'>{t('equipment.transitionEquipment.confirmation')}</h1>

                                <h3 className=' w-[90%] text-base font-normal'>{t('equipment.transitionEquipment.confirmationMessage', { activeLink: activeLink === 'temporary' ? 'temporary' : 'permanent', userByIdData: userByIdData && userByIdData.data.fullName })}</h3>
                            
                                <div className='w-[90%] flex justify-between'>
                                    <button className={`${ButtonStyles.normalButton} w-32`} onClick={() => setShowPopup(false)}>{t('equipment.transitionEquipment.cancel')}</button>
                                    <button type="submit" className={`${ButtonStyles.addButton} w-32`} onClick={handleSubmit} >{isLoading ? t('equipment.transitionEquipment.loadingSubmit') : t('equipment.transitionEquipment.submit')}</button>
                                </div>
                            
                            </div>
                        </div>
                    </>
                    }
                    {
                    EquipmentData && EquipmentData.data && EquipmentData.data.serialStatus === 'Pending' &&
                        <div className='w-[90%] mt-10 flex flex-col items-center gap-y-4'>
                            <h1 className=' text-xl text-textWarning'>{t('equipment.transitionEquipment.pendingSerial')}</h1>
                            <h1 >{t('equipment.transitionEquipment.pendingSerialNote')}</h1>
                        </div>
                    }
                    {
                    (EquipmentData && EquipmentData.data && (EquipmentData.data.serialStatus === 'None' || EquipmentData.data.serialStatus === 'Rejected')) &&
                        <h1 className=' w-[90%] mt-10 text-xl text-textWarning'>{t('equipment.transitionEquipment.noSerial')}</h1>
                    }

            </div>
            
        </div>
    );
};

export default PossessionTransitionEquipment;