import React from 'react';

// styles
import gradientStyles from '../../../styles/gradients/Gradient.module.css'

// assets 
import checkBadge from '../../../assets/icons/check-badge.svg'

// mui
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';


// components
import SearchInput from '../../inputs/SearchInput';
import StudentBox from '../../reuseable/StudentBox';

const Students = () => {
    return (
        <div className='flex flex-col justify-center w-full gap-y-8'>

            <div className={` ${gradientStyles.BorderYellow} w-full h-12 rounded-xl flex items-center justify-center gap-x-2 `}>
                <PeopleAltOutlinedIcon />
                <p>هنرجویان تحت نظر شما</p> 
            </div>

            <SearchInput />

            <StudentBox title={'بگینر'} />
            <StudentBox title={'نوایس'} />

            <div className={` ${gradientStyles.BorderYellow} w-full h-12 rounded-xl flex items-center justify-center gap-x-2 `}>
                <img src={checkBadge} alt='icon' />
                <p>هنرجویان باشگاه</p> 
            </div>

            <div className={` ${gradientStyles.BorderYellow} w-full h-12 rounded-xl flex items-center justify-center gap-x-2 `}>
                <GroupsOutlinedIcon/>
                <p>هنرجویان سابق</p> 
            </div>

        </div>
    );
};

export default Students;