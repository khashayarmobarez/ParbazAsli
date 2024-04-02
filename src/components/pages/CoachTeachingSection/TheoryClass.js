import React from 'react';
import { Link } from 'react-router-dom';

// styles 
import gradientStyles from '../../../styles/gradients/Gradient.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// components
import SearchInput from '../../inputs/SearchInput';
import ClassesBox from '../../reuseable/ClassesBox';

// icons
import AddIcon from '@mui/icons-material/Add';

const TheoryClass = ({userRole}) => {



    return (
        <div className='w-full flex flex-col space-y-10 pb-8'>

            {
            userRole === 'coach' &&
                <div className='flex w-full justify-between items-center text-border-button-yellow '>
                <div className={` ${gradientStyles.BorderYellow} w-[47%] h-12 rounded-xl flex items-center justify-center`}>
                46 ساعت کلاس 
                </div>
                <div className={` ${gradientStyles.BorderYellow} w-[47%] h-12 rounded-xl flex items-center justify-center`}>
                46 تعداد کلاس 
                </div>
            </div>
            }

            <SearchInput />

            <ClassesBox title={'کلاس‌ها'} />
            <ClassesBox title={'ورک‌شاپ‌ها'} />

            { userRole === 'coach' &&
            <Link to='/education/addClass' className='bg-[#131423] rounded-xl fixed bottom-24 w-[90%]'>
                <button className={`${ButtonStyles.addButton} w-[100%]`} >
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </Link>
            }

            { userRole === 'student' &&
                <div className={` ${gradientStyles.BorderYellow} w-full h-12 rounded-xl flex items-center justify-center `}>
                46 ساعت کلاس 
                </div>
            }

        </div>
    );
};

export default TheoryClass;