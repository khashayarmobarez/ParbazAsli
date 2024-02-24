import React from 'react';
import { useNavigate } from 'react-router-dom';

import gradients from '../../styles/gradients/Gradient.module.css'

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

import clipboard from '../../assets/icons/clipboard.svg'

const ClassesBox = (props) => {

    const navigate = useNavigate();

    const {title} = props

    return (
        <div className='flex flex-col space-y-4'>

                {/* group name of data */}
                <div className='flex justify-between items-center'>
                    <h2>{title}</h2>
                    <div id='line' className='w-[80%] h-[1px] rounded-xl bg-[#D9D9D9]'></div>
                </div>

                {/* classesInput */}
                <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl`}>
                    <span>
                        <AutoStoriesOutlinedIcon />
                    </span>
                    <p>مقدماتی</p>
                    <p>ساعت</p>
                    <button onClick={() => navigate('/education/ClassDetails')} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                        <img src={clipboard} alt='icon' />
                    </button>
                </div>

                <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl`}>
                    <span>
                        <AutoStoriesOutlinedIcon />
                    </span>
                    <p>مقدماتی</p>
                    <p>ساعت</p>
                    <button onClick={() => navigate('/education/ClassDetails')} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                        <img src={clipboard} alt='icon' />
                    </button>
                </div>

        </div>
    );
};

export default ClassesBox;