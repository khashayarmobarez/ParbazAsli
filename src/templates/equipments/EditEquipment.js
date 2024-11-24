import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// queries
import { useAnEquipment, useEditEquipment } from '../../Utilities/Services/equipmentQueries';
import { useUserById } from '../../Utilities/Services/queries';

// utilities
import useDateFormat from '../../Utilities/Hooks/useDateFormat';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// assets
import Cube from '../../components/icons/ThreeDCube'
import UserIcon from '../../components/icons/UserIcon'
import SerialNumberIcon from '../../components/icons/SerialNumberIcon'

// comps
import PageTitle from '../../components/reuseable/PageTitle';
import DateLastRepackInput from '../../components/pages/Equipment page comps/inputsForEquipment/DateLastRepackInput';
import TextInput from '../../components/inputs/textInput';
import UploadFileInput from '../../components/inputs/UploadFileInput';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';

const EditEquipment = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const [showPopup, setShowPopup] = useState(false);
    const [packageDate, setPackageDate] = useState('')
    const [lastPackerId, setLastPackerId] = useState('');
    const [equipmentSerial, setEquipmentSerial] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    
    const { data: EquipmentData, isLoading: EquipmentDataLoading, error } = useAnEquipment(id, false)
    const { brand, model, flightHours, equipmentType, flightCount, wingClass, wingType , year , serialNumber, packerFullName, lastPackingDateTime, ownershipType, minimumWeightCapacity, maximumWeightCapacity} = EquipmentData?.data || {};
    const { data: userByIdData } = useUserById(lastPackerId)
    // useEditEquipment for submitting the form
    const { mutate: editEquipment, isLoading } = useEditEquipment()

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

        if((packageDate) || (equipmentSerial && selectedFile)) {
            editEquipment(formData, {
                onSuccess: () => {
                    toast('تغییرات وسیله پروازی شما اعمال شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    if(equipmentType === "Parachute") {
                        navigate('/equipment/parachute');
                    } else if(equipmentType === "Wing") {
                        navigate('/equipment/flightEquipment');
                    } else if(equipmentType === "Harness") {
                        navigate('/equipment/harness');
                    }
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
            })
        } else {
            toast('لطفا اطلاعات مورد نیاز را پر کنید', {
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
        <div className='flex flex-col items-center pt-[3rem] '>
            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle 
                title={EquipmentData && (equipmentType === "Parachute" || EquipmentData.data.serialStatus === 'None' || EquipmentData.data.serialStatus === 'Rejected') ? 'ویرایش وسیله' : 'جزئیات وسیله'} />  

                {
                    EquipmentDataLoading && 
                    <CircularProgressLoader/>
                }

                {
                    error && <h3 className='flex w-full h-[95vh] items-center justify-center'>{error.message}</h3>
                }

                {
                    EquipmentData &&
                    <>

                        <form className={` w-[90%] rounded-xl flex flex-col gap-y-6`}>

                            <div className=' grid grid-cols-2 gap-x-2 gap-y-4 w-full'>

                                {brand &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>برند</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{brand}</p>
                                            </div>
                                    </div>
                                }

                                {
                                    model &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>مدل</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{model}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    flightCount >= 0 && flightCount !== null &&
                                        <div className='flex flex-col items-start gap-y-2'>
                                            <p className=' text-sm'>تعداد پرواز ها</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{flightCount}</p>
                                            </div>
                                        </div>
                                }

                                {
                                flightHours >= 0 && flightHours !== null &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                    <p className=' text-sm'>حدود ساعت پرواز</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{flightHours}</p>
                                    </div>
                                </div>
                                }

                                {wingClass &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>کلاس</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{wingClass}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    wingType && 
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>نوع بال</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>
                                                {wingType === 'Single' && 'تک نفره'}
                                                {wingType === 'Tandem' && 'دو نفره'}
                                            </p>
                                        </div>
                                    </div>
                                }

                                {
                                    year &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>سال ساخت</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{year}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    serialNumber &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>شماره سریال</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{serialNumber}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    packerFullName &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>نام بسته بندی کننده</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{packerFullName}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    lastPackingDateTime &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>تاریخ آخرین بسته بندی</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{lastPackingDateTime}</p>
                                        </div>
                                    </div>
                                }  

                                {
                                    minimumWeightCapacity && maximumWeightCapacity &&
                                    <div className='flex flex-col items-start gap-y-2'>
                                        <p className=' text-sm'>بازه وزن قابل تحمل</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{maximumWeightCapacity} - {minimumWeightCapacity}</p>
                                        </div>
                                    </div>
                                }  


                            </div>

                            {/* to check if the equipment is editable  */}
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
                                                        <p className=' self-start md:self-center'>ثبت سریال  و تمدید چتر کمکی</p>
                                                        <p className=' text-xs self-start text-start'>با پرکردن این فیلد و سینک کردن سریال چتر کمکی به خلبان مربوطه ، امکان ثبت سریال توسط شخص دیگری نمی باشد، مگر در صورت فروش و انتقال شماره سریال به مالک جدید.<br/>
                                                        در صورت مفقودی چتر کمکی ما را از طریق تیکت مطلع سازید.</p>
                                                    </div>
                                                }
                                                {
                                                    EquipmentData.data.equipmentType === 'Wing' &&
                                                    <div className='w-full flex flex-col text-start gap-y-1'>
                                                        <p className=' self-start md:self-center'>ثبت سریال بال </p>
                                                        <p className=' text-xs text-right'>
                                                        با پرکردن این فیلد و سینک کردن سریال بال به خلبان مربوطه ، امکان ثبت سریال توسط شخص دیگری نمی باشد، مگر در صورت فروش و انتقال شماره سریال به مالک جدید.
                                                        <br/>
                                                        در صورت مفقودی بال ما را از طریق تیکت مطلع سازید.
                                                        </p>
                                                    </div>
                                                }
                                                {
                                                    EquipmentData.data.equipmentType === 'Harness' &&
                                                    <div className='w-full flex flex-col text-start gap-y-1'>
                                                        <p className=' self-start md:self-center'>ثبت سریال هارنس</p>
                                                        <p className=' text-xs self-start text-start '>با پرکردن این فیلد و سینک کردن سریال هارنس به خلبان مربوطه ، امکان ثبت سریال توسط شخص دیگری نمی باشد، مگر در صورت فروش و انتقال شماره سریال به مالک جدید.
                                                        <br/>
                                                        در صورت مفقودی هارنس ما را از طریق تیکت مطلع سازید.</p>
                                                    </div>
                                                }


                                                {/* text input to add parachute serial */}
                                                <TextInput
                                                id={'TI1'}
                                                icon={<SerialNumberIcon/>}
                                                className='col-span-1'
                                                value={equipmentSerial}
                                                onChange={handleTextInputEquipmentSerial}
                                                placeholder='سریال وسیله'
                                                />

                                                {/* for uploading pictures */}
                                                {
                                                    equipmentSerial.length > 0 &&
                                                    <>
                                                        <UploadFileInput name={'سریال وسیله'} selectedFile={selectedFile} onFileChange={handleFileChange} />
                                                        <p className=' text-xs mt-[-0.5rem]'>*فرمت‌های مجاز فایل BMP,GIF,JPEG,JPG,PNG تا 10 مگابایت</p>
                                                    </>
                                                }

                                            </>
                                            }
                                            

                                            {equipmentType === "Parachute" && ownershipType !== 'Temporary' && EquipmentData.data.isExpired !== true &&
                                            <>

                                                <h3 className=' text-textDefault text-sm mt-1 mb-[-10px]'>
                                                    تمدید چتر کمکی
                                                </h3>

                                                {/* Last package date input */}
                                                <DateLastRepackInput name={'تاریخ آخرین بسته‌بندی'} defaultValue={packageDate} onChange={handlePackageDate} placeH={'تاریخ اخرین بسته بندی'} />

                                                {/* Last Packer ID input */}
                                                <div className='w-full flex flex-col items-start gap-y-2'>
                                                    <TextInput
                                                    id={'TI2'}
                                                    icon={<UserIcon/>}
                                                    className='col-span-1'
                                                    value={lastPackerId}
                                                    onChange={handleTextInputLastPackerId}
                                                    placeholder='شناسه آخرین بسته‌بندی کننده(اختیاری)'
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

                            <h3 className=' text-textError text-xl mt-[-3rem] '>تاییدیه</h3>

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