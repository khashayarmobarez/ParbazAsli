import React from 'react';
import { useNavigate } from 'react-router-dom';

import gradients from '../../styles/gradients/Gradient.module.css'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import ClipboardIcon from '../../components/icons/ClipboardIcon'

const StudentBox = (props) => {

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
                        <PersonOutlineOutlinedIcon />
                    </span>
                    <p>رضا نظری</p>
                    <p>ساعت</p>
                    <button onClick={() => navigate('/education/StudentDetails')} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                        <ClipboardIcon/>
                    </button>
                </div>

                <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl`}>
                    <span>
                        <PersonOutlineOutlinedIcon />
                    </span>
                    <p>رضا نظری</p>
                    <p>ساعت</p>
                    <button onClick={() => navigate('/education/StudentDetails')} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                        <ClipboardIcon/>
                    </button>
                </div>

        </div>
    );
};

export default StudentBox;