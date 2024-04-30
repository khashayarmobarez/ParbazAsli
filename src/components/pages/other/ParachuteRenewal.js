import React, { useState } from 'react';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// inputData
import { brandsOptionsData } from '../../../Utilities/Providers/dropdownInputOptions'

// components
import PageTitle from '../../reuseable/PageTitle';
import DropdownInput from '../../inputs/DropDownInput'
import { useNavigate } from 'react-router-dom';

const ParachuteRenewal = () => {

    const navigate = useNavigate()


    const [selectedClassType, setSelectedClassType] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    // for dropdown
    const handleSelectClassType = (event) => {
        setSelectedClassType(event.target.value);
    };

    const handleSubmit = () => {
         setShowPopup(false)

    };





    return (
        <div className='flex flex-col items-center pt-[4rem] '>
            <div className='w-[90%] flex flex-col items-center gap-y-6 md:w-[70%]'>

                <PageTitle title={'تمدید زود هنگام'} navigateTo={'profile'} paddingRight={'33%'} />  

                <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                <form className={` w-[90%] rounded-xl flex flex-col py-8 gap-y-6`}>

                    <div className=' grid grid-cols-2 gap-x-4 gap-y-7 w-full  px-4'>

                        <div className='flex flex-col items-start gap-y-2'>
                            <p className=' text-sm'>برند</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-2'>
                            <p className=' text-sm'>مدل</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-2'>
                            <p className=' text-sm'>سایز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-2'>
                            <p className=' text-sm'>حدود ساعت پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                    </div>

                    <div id='no grid list' className='flex flex-col gap-y-5 mt-6'>

                        <div className='flex flex-col items-start gap-y-5 mx-4'>
                                <p className=' text-sm'>سریال چتر کمکی</p>
                                
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
                
            </div>
        </div>
    );
};

export default ParachuteRenewal;