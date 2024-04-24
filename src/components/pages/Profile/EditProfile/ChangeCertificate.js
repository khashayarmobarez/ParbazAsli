import React from 'react';
import { Link } from 'react-router-dom';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// mui 
import AddIcon from '@mui/icons-material/Add';

// components
import Certificate from '../../Settings/Certificate';

const ChangeCertificate = () => {
    return (
            <div className='w-[90%] flex flex-col items-center gap-y-6 mt-4'>
                <Certificate title='ثبت تغییرات' />
                <Certificate title='ثبت تغییرات' />
                <Link to='/equipment/addFlightEquipment' className='fixed bottom-24 w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4  '>
                <button className={`${ButtonStyles.addButton} w-[100%]`} >
                    <AddIcon />
                    <p>افزودن گواهینامه</p>
                </button>
                </Link>
            </div>
    );
};

export default ChangeCertificate;