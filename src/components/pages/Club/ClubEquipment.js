import React from 'react';

// styles
import GradientStyles from '../../../styles/gradients/Gradient.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import dataBox from '../../../styles/Boxes/DataBox.module.css'

// assets
import pencil from '../../../assets/icons/pencil-alt.svg'

const ClubEquipment = () => {
    return (
        <div className='w-full flex flex-col items-center gap-y-8 mt-4'>

            <div className='flex justify-between w-[90%] px-4 md:w-[47%] md:self-start'>

                <button to='/equipment' className={`${GradientStyles.container2} w-[80px] h-[80px] rounded-3xl flex flex-col justify-between items-center py-5 text-[#A5E65E] text-xs`} >
                    <img src={pencil} alt='icon'/>
                    <p>وسیله پروازی</p>
                </button>

                <button  to='/education' className={`${GradientStyles.container2} w-[80px] h-[80px] rounded-3xl flex flex-col justify-between items-center py-5 text-[#A5E65E] text-xs`}>
                    <img src={pencil} alt='icon'/>
                    <p>چتر کمکی</p>
                </button>


                <button to='/club' className={`${GradientStyles.container2} w-[80px] h-[80px] rounded-3xl flex flex-col justify-between items-center py-5 text-[#A5E65E] text-xs`} >
                    <img src={pencil} alt='icon'/>
                    <p>هارنس</p>
                </button>

            </div>

            <div className='flex flex-col space-y-4 w-[90%] items-center'>

                {/* group name of data */}
                <div className='flex justify-between items-center w-full'>
                    <h2>هارنس‌ ها</h2>
                    <div id='line' className='w-[75%] h-[1px] rounded-xl bg-[#D9D9D9]'></div>
                </div>

                {/* equipments */}
                <div className={`${dataBox.containerDarkmode} w-full flex justify-between items-center py-4 px-6 h-20 rounded-3xl`}>

                    <div className=' text-xs flex flex-col items-start gap-y-1'>
                        <p>کلاسB / مدل / برندNiviuk</p>
                        <p>77 پرواز / 24 ساعت</p>
                    </div>

                    <button className={`${ButtonStyles.normalButton}`}  > مشاهده</button>

                </div>

                <div className={`${dataBox.containerDarkmode} w-full flex justify-between items-center py-4 px-6 h-20 rounded-3xl`}>

                    <div className=' text-xs flex flex-col items-start gap-y-1'>
                        <p>کلاسB / مدل / برندNiviuk</p>
                        <p>77 پرواز / 24 ساعت</p>
                    </div>

                    <button className={`${ButtonStyles.normalButton}`}  > مشاهده</button>

                </div>

            </div>


        </div>
    );
};

export default ClubEquipment;