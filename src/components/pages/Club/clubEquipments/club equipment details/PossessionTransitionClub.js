import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import ButtonStyles from '../../../../../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../../../../../styles/Boxes/DataBox.module.css'

// assets
import userIcon from '../../../../../assets/icons/user-Icon.svg'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// utilities and Queries
import { useAnEquipment, usePossessionTransition } from '../../../../../Utilities/Services/equipmentQueries';
import { useUserById } from '../../../../../Utilities/Services/queries';
import useDateFormat from '../../../../../Utilities/Hooks/useDateFormat';

// comps
import PageTitle from '../../../../reuseable/PageTitle';
import TextInput from '../../../../inputs/textInput';
import DateLastRepackInput from './../../../Equipment page comps/inputsForEquipment/DateLastRepackInput';
import CircularProgressLoader from '../../../../Loader/CircularProgressLoader';


const PossessionTransitionClub = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    
    const { data: EquipmentData, isLoading, error } = useAnEquipment(id,true)

    useEffect(() => {
        if (EquipmentData && EquipmentData.data) {
            console.log(EquipmentData);
        }
    }, [EquipmentData]);


    const { mutate: mutateTransitionData, loading:possessionLoading } = usePossessionTransition();

    const { formatDate } = useDateFormat();

    
    // Ref to the button element
    const buttonRef = useRef(null);
    
    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('temporary');
    
    const [receiverId, setReceiverId] = useState('');

    const [showPopup, setShowPopup] = useState(false);

    // getting the receiver name
    const { data: userByIdData, error: userByIdError } = useUserById(receiverId)

    // date state
    const [expirationDate, setExpirationDate] = useState('')

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

        if(activeLink === 'temporary') {
            if(!userByIdData) {
                toast('کاربر مورد نظر یافت نشد', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else if(!expirationDate) {
                toast('تاریخ پایان انتقال را وارد کنید', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else if(!expirationDate > new Date()) {
                toast('تاریخ پایان انتقال باید بعد از امروز باشد ', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
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
            formData.append('isForClub', true);
    
            mutateTransitionData(formData, {
                onSuccess: () => {
                    // Code to execute after successful mutation
                    toast('انتقال مالکیت با موفقیت انجام شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    setShowPopup(false);
                    navigate('/club/clubEquipment/flightEquipments')
                },
                onError: (error) => {
                    // Code to execute when mutation encounters an error
                    const errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
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

            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center gap-y-2 '>

                <PageTitle title={'انتقال مالکیت وسیله'}/>

                {isLoading && <CircularProgressLoader/>}

                {error && <p>مشکلی رخ داده است، دوباره تلاش کنید</p>}

                {EquipmentData && EquipmentData.data && EquipmentData.data.serialStatus === 'Accepted' &&
                    <>
                        <div className={`${ButtonStyles.ThreeStickedButtonCont}  sticky top-[6.6rem] z-10`}>
                            <button ref={buttonRef} className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'temporary' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('temporary')}>انتقال موقت</button>
                            <button  className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${activeLink === 'permanent' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('permanent')} >انتقال دائمی</button>
                        </div>

                        <form className='w-[90%] flex flex-col items-center mt-4  gap-y-4'>

                            {/* {activeLink === 'temporary' ? 
                                <h1 className=' text-xl font-medium text-[var(--yellow-text)]'>انتقال موقت</h1>
                                :
                                <h1 className=' text-xl font-medium text-[var(--red-text)]'>انتقال دائمی</h1>
                            } */}
                            
                            {/* Serial Number input */}
                            <TextInput
                            icon={userIcon}
                            className='col-span-1'
                            value={receiverId}
                            onChange={handleTextInputReceiverId}
                            placeholder={activeLink === 'temporary' ? 'کد کاربر مقصد' : 'کد کاربر یا باشگاه مقصد را وارد کنید'}
                            />
                            {userByIdData &&
                                <div className='flex gap-x-1 text-[#A5E65E] self-start mt-[-12px]'>
                                    <PersonOutlineOutlinedIcon />
                                    <p>{userByIdData.data.fullName}</p>
                                </div>
                            }
                            {receiverId && receiverId.length > 5 && !userByIdData &&
                                <div className='flex gap-x-1 text-[var(--red-text)] self-start'>
                                    <PersonOutlineOutlinedIcon />
                                    <p>کاربر یافت نشد</p>
                                </div>
                            }

                            {activeLink === 'temporary' && 
                                <DateLastRepackInput name={'تاریخ آخرین بسته‌بندی'} defaultValue={expirationDate} onChange={handleExpirationDate} placeH={'تاریخ پایان انتقال قرضی'} />
                            }

                            <button type="submit" onClick={handlePopUp} className={`${ButtonStyles.addButton} w-36 mt-6`}>ثبت</button>


                        </form>

                        {/* popup */}
                        <div className={` ${showPopup ? '' : 'hidden'}  backdrop-blur-lg absolute w-full h-full flex justify-center items-center z-10`}>
                            <div className={`${boxStyles.containerChangeOwnership}   w-[304px] h-auto py-10 gap-y-10 mt-48  flex flex-col justify-around items-center z-10 md:z-[50]`}>
                                <h3 className=' text-[#ED553B] w-[80%] text-base font-medium '>ایا از انتقال مالکیت {activeLink === 'temporary' ? 'موقت' : 'دائم'} دستگاه خود به {userByIdData && userByIdData.data.fullName} اطمینان دارید!</h3>
                            
                                <div className='w-[80%] flex justify-between'>
                                    <button type="submit" className={`${ButtonStyles.addButton} w-24`} onClick={handleSubmit} >بله</button>
                                    <button className={`${ButtonStyles.normalButton} w-24`} onClick={() => setShowPopup(false)}>خیر</button>
                                </div>
                            
                            </div>
                        </div>
                    </>
                    }
                    {EquipmentData && EquipmentData.data && EquipmentData.data.serialStatus === 'Pending' &&
                        <div className='w-[90%] mt-10 flex flex-col items-center gap-y-4'>
                            <h1 className=' text-xl font-medium text-[var(--red-text)]'>شماره سریال وسیله شما در حال حاضر در انتظار تایید است</h1>
                            <h1 >بعد از تایید شما میتوانید مالکیت وسیله خود را انتقال دهید</h1>
                        </div>
                    }
                    {(EquipmentData && EquipmentData.data && (EquipmentData.data.serialStatus === 'None' || EquipmentData.data.serialStatus === 'Rejected')) &&
                        <h1 className=' w-[90%] mt-10 text-xl font-medium text-[var(--notification-red)]'>برای انتقال مالکیت, اول سریال وسیله پروازی خود را در قسمت ویرایش وارد کنید</h1>
                    }

            </div>
            
        </div>
    );
};

export default PossessionTransitionClub;