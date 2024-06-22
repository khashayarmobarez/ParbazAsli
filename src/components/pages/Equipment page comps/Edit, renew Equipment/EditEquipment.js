import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// queries
import { useAnEquipment } from '../../../../Utilities/Services/equipmentQueries';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// inputData
import { brandsOptionsData } from '../../../../Utilities/Providers/dropdownInputOptions'

// comps
import PageTitle from '../../../reuseable/PageTitle';
import DropdownInput from '../../../inputs/DropDownInput'
import Loader from '../../../Loader/Loader';

const EditEquipment = () => {

    const navigate = useNavigate()

    const { id } = useParams();

    const { data: EquipmentData, loading, error } = useAnEquipment(id)

    useEffect(() => {
        console.log(EquipmentData)
    },[EquipmentData])

    const { brand, model, size, flightHours, equipmentType, flightCount, wingClass } = EquipmentData?.data || {};

    const [selectedClassType, setSelectedClassType] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    // for dropdown
    const handleSelectClassType = (event) => {
        setSelectedClassType(event.target.value);
    };

    return (
        <div className='flex flex-col items-center pt-[4rem] '>
            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle title={'ویرایش وسیله'} navigateTo={'profile'} />  
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
                        <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                        و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                        <form className={` w-[90%] rounded-xl flex flex-col gap-y-6`}>

                            <div className=' grid grid-cols-2 gap-x-2 gap-y-4 w-full '>

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

                            <div id='no grid list' className='flex flex-col gap-y-5'>

                                <div className='flex flex-col items-start gap-y-5'>
                                        <p className=' text-sm'>سریال {equipmentType}</p>
                                        
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>لورم ایپسوم</p>
                                        </div>

                                        <DropdownInput name={'تاریخ آخرین بسته‌بندی'} options={brandsOptionsData} selectedOption={selectedClassType} handleSelectChange={handleSelectClassType} />

                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>بسته‌بندی شده توسط(کد کاربری)</p>
                                        </div>
                                </div>


                            </div>


                            <div className='w-full flex justify-center items-center'>
                                <button onClick={(e) => {setShowPopup(true); e.preventDefault();} } className={`${ButtonStyles.addButton} w-36 `}>ثبت </button>
                            </div>


                        </form>

                        {/* submit pop up */}
                        <form  className={` ${boxStyles.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}  w-[304px] h-[280px] flex flex-col justify-around items-center top-52`}>

                            <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                            <h3 className=' text-[#ED553B] text-xl mt-[-3rem] '>تاییدیه</h3>

                            <p className='text-base w-[90%]' >ایا از صحت تمدید خود اطمینان دارید؟</p>

                            <div className='w-full flex justify-around items-center'>
                                <button type="reset" className={`${ButtonStyles.normalButton} w-24`} onClick={() => setShowPopup(false)}>لغو</button>
                                <button type="submit" className={`${ButtonStyles.addButton} w-24`} onClick={() => setShowPopup(false)}>تایید</button>
                            </div>

                        </form>
                    </>
                }
                
            </div>
        </div>
    );
};

export default EditEquipment;