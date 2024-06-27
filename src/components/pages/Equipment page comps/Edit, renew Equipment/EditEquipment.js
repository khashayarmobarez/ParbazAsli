import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// queries
import { useAnEquipment, useEditEquipment } from '../../../../Utilities/Services/equipmentQueries';
import { useUserById } from '../../../../Utilities/Services/queries';

// utilities
import useDateFormat from '../../../../Utilities/Hooks/useDateFormat';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// assets
import Cube from '../../../../assets/icons/3dCube.svg'

// comps
import PageTitle from '../../../reuseable/PageTitle';
import Loader from '../../../Loader/Loader';
import DateLastRepackInput from '../inputsForEquipment/DateLastRepackInput';
import TextInput from '../../../inputs/textInput';
import UploadFileInput from '../../../inputs/UploadFileInput';

const EditEquipment = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { data: EquipmentData, loading, error } = useAnEquipment(id)
    const { brand, model, size, flightHours, equipmentType, flightCount, wingClass } = EquipmentData?.data || {};
    const [showPopup, setShowPopup] = useState(false);
    const [packageDate, setPackageDate] = useState('')
    const [lastPackerId, setLastPackerId] = useState('');
    const [equipmentSerial, setEquipmentSerial] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const { data: userByIdData } = useUserById(lastPackerId)

    // useEditEquipment for submitting the form
    const { mutate: editEquipment, isLoading, isSuccess, isError } = useEditEquipment()
    
    useEffect(() => {
        console.log(EquipmentData)
    },[EquipmentData])

    const handlePackageDate = (date) => {
        setPackageDate(date);
        console.log(date)

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
        console.log('submitting')
        
        // Create a new FormData object
        const formData = new FormData();

        const formattedPackedDate = formatDate(packageDate) + " 00:00";
        if(equipmentType === "Parachute" && packageDate && lastPackerId) {
            formData.append('lastPackingDateTime', formattedPackedDate);
            formData.append('lastPackerId', lastPackerId);
        }
        if(equipmentSerial && selectedFile) {
            formData.append('serialNumber', equipmentSerial);
            formData.append('file', selectedFile);
        }
        formData.append('equipmentId', id);

        editEquipment(formData, {
            onSuccess: () => {
                toast('تغییرات وسیله پروازی شما اعمال شد', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                navigate('/equipment');
                },
                onError: (error) => {
                    const errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    console.error(error);
                    setShowPopup(false);
                }
        });

    }




    return (
        <div className='flex flex-col items-center pt-[4rem] '>
            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle 
                title={EquipmentData && (equipmentType === "Parachute" || EquipmentData.data.serialStatus === 'None' || EquipmentData.data.serialStatus === 'Rejected') ? 'ویرایش وسیله' : 'جزئیات وسیله'} 
                navigateTo={'profile'} />  

                {
                loading &&  
                <div className='flex w-full min-h-[95vh] items-center justify-center'>
                    <Loader />
                </div>
                }

                {
                    error && <h3 className='flex w-full h-[95vh] items-center justify-center'>{error.message}</h3>
                }

                {
                    EquipmentData &&
                    <>
                        <p className=' text-sm'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                        و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                        <form className={` w-[90%] rounded-xl flex flex-col gap-y-6`}>

                            <div className=' grid grid-cols-2 gap-x-2 gap-y-4 w-full text-[var(--low-opacity-white) ] '>

                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>برند</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{brand}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>مدل</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{model}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>تعداد پرواز ها</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{flightCount}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>سایز</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{size}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>حدود ساعت پرواز</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{flightHours}</p>
                                    </div>
                                </div>

                                {wingClass &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>کلاس بال پروازی</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{wingClass}</p>
                                        </div>
                                    </div>
                                }

                            </div>

                            {/* to check if the equipment is editable  */}
                            { 
                            (equipmentType === "Parachute" || EquipmentData.data.serialStatus === 'None' || EquipmentData.data.serialStatus === 'Rejected') &&
                            <>  
                                <div id='no grid list' className='flex flex-col gap-y-5'>

                                    <div className='flex flex-col items-start gap-y-5'>

                                            <h3 className=' text-[#ED553B] text-xl'>ویرایش اطلاعات</h3>

                                            {EquipmentData && EquipmentData.data && (EquipmentData.data.serialStatus === 'None' || EquipmentData.data.serialStatus === 'Rejected') &&
                                            <>
                                                {/* text input to add parachute serial */}
                                                <TextInput
                                                icon={Cube}
                                                className='col-span-1'
                                                value={equipmentSerial}
                                                onChange={handleTextInputEquipmentSerial}
                                                placeholder='سریال وسیله'
                                                />

                                                {/* for uploading pictures */}
                                                <UploadFileInput name={'سریال چتر کمکی'} selectedFile={selectedFile} onFileChange={handleFileChange} />
                                            </>
                                            }
                                            

                                            {equipmentType === "Parachute" &&
                                            <>

                                                {/* Last package date input */}
                                                <DateLastRepackInput name={'تاریخ آخرین بسته‌بندی'} defaultValue={packageDate} onChange={handlePackageDate} placeH={'تاریخ اخرین بسته بندی'} />

                                                {/* Last Packer ID input */}
                                                <div className='w-full flex flex-col items-start gap-y-2'>
                                                    <TextInput
                                                    icon={Cube}
                                                    className='col-span-1'
                                                    value={lastPackerId}
                                                    onChange={handleTextInputLastPackerId}
                                                    placeholder='شناسه آخرین بسته‌بندی کننده'
                                                    />
                                                    {userByIdData &&
                                                    <div className='flex gap-x-1 text-[#A5E65E]'>
                                                        <PersonOutlineOutlinedIcon />
                                                        <p>{userByIdData.data.fullName}</p>
                                                    </div>
                                                    }
                                                </div>
                                            </>
                                            }
                                    </div>


                                </div>


                                <div className='w-full flex justify-center items-center'>
                                    <button onClick={handlePopup } className={`${ButtonStyles.addButton} w-36 `}>ثبت </button>
                                </div>
                            </> 
                            }


                        </form>

                        {/* submit pop up */}
                        <form  className={` ${boxStyles.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}  w-[304px] h-[280px] flex flex-col justify-around items-center top-52`}>

                            <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                            <h3 className=' text-[#ED553B] text-xl mt-[-3rem] '>تاییدیه</h3>

                            <p className='text-base w-[90%]' >ایا از صحت تمدید خود اطمینان دارید؟</p>

                            <div className='w-full flex justify-around items-center'>
                                <button type="reset" className={`${ButtonStyles.normalButton} w-24`} onClick={() => setShowPopup(false)}>لغو</button>
                                <button disabled={isLoading} type="submit" className={`${ButtonStyles.addButton} w-24`} onClick={handleSubmit} >{isLoading ? 'صبر کنید ...' : 'تایید'}</button>
                            </div>

                        </form>
                    </>
                }
                
            </div>
        </div>
    );
};

export default EditEquipment;