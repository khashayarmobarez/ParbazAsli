import React from 'react';

// styles
import dataBox from '../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'
import gradientStyles from '../../styles/gradients/Gradient.module.css'

// mui
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

// components
import PageTitle from '../../components/reuseable/PageTitle';
import SearchInput from '../inputs/SearchInput';
import StudentBox from '../../reuseable/StudentBox';


const ClubMemberCoach = () => {
    return (
        <div className='w-full flex flex-col items-center gap-y-10'>

            <PageTitle title={'مدیریت باشگاه'} navigateTo={-1} paddingRight={'33%'} />

            <div className={`${dataBox.containerDarkmode} w-[90%] flex justify-between items-center py-4 px-6 h-20 rounded-[34px]`}>
                <div className=' text-xs flex flex-col items-start gap-y-2'>
                    <p>باشگاه فلای کلاب</p>
                    <p>کد عضویت: 2345</p>
                </div>

                <button className={`${ButtonStyles.normalButton}`}  > پایان همکاری</button>
            </div>

            <div className={` ${gradientStyles.BorderYellow} w-[90%] h-12 rounded-2xl flex items-center justify-center gap-x-2 `}>
                <PeopleAltOutlinedIcon />
                <p>هنرجویان تحت نظر شما</p> 
            </div>

            <div className='w-[90%] flex flex-col gap-y-8'>

                <SearchInput />

                <div className='w-full flex flex-col gap-y-4'>
                    <StudentBox title={'بگینر'} />
                    <StudentBox title={'نوایس'} />
                </div>

            </div>


        </div>
    );
};

export default ClubMemberCoach;