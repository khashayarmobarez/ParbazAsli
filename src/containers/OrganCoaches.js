import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import gradients from '../styles/gradients/Gradient.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// assets 
import clipboard from '../assets/icons/clipboard.svg'

// components
import SearchInput from '../components/inputs/SearchInput';

const OrganCoaches = () => {

    const navigate = useNavigate()

    return (
        <div className='pt-24 md:pt-32 w-full flex justify-center'>
            <div className='w-[90%] md:w-[65%] flex flex-col gap-y-12'>
                <SearchInput />


                {/* coaches */}
                <div className='flex flex-col gap-y-6'>

                    <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl`}>
                            <span>
                                <PersonOutlineOutlinedIcon />
                            </span>
                            <p>رضا نظری</p>
                            <p>ساعت</p>
                            <button onClick={() => navigate('/education/StudentDetails')} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                                <img src={clipboard} alt='icon' />
                            </button>
                    </div>

                    <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl`}>
                            <span>
                                <PersonOutlineOutlinedIcon />
                            </span>
                            <p>رضا نظری</p>
                            <p>ساعت</p>
                            <button onClick={() => navigate('/education/StudentDetails')} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                                <img src={clipboard} alt='icon' />
                            </button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default OrganCoaches;