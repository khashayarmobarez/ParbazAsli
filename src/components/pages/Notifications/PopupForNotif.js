import React from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css';

const PopupForNotif = ({popUpData, setPopUpData}) => {

    const navigate = useNavigate()

    return (
        <div className={` w-full fixed inset-0 flex items-center justify-center ${popUpData ? 'visible' : 'invisible'}`}>
            <form
            className={`${boxStyles.containerChangeOwnership} 
            w-[90%] md:w-[454px] h-auto flex flex-col justify-around items-center relative bg-white p-5 rounded-lg shadow-lg gap-y-6 py-8`}
            >
                <CloseIcon
                    sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                    onClick={() => setPopUpData(null)}
                />

                {
                    popUpData &&
                    <>
                        <h1 className='text-xl text-[var(--yellow-text)]' >توضیحات</h1>
                        <p className='text-sm  md:text-base' >{popUpData.description}</p>
                        {   popUpData.type === 'StudentFlightForm' &&
                            (
                                popUpData.status === 'Expired' ?
                                <button 
                                className={`${ButtonStyles.normalButton} w-7 h-10 opacity-55`} >منقضی شده</button>
                                :
                                <button 
                                onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${popUpData.externalId}`)}
                                className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`} >تعیین وضعیت</button>
                            )
                        }
                        {   popUpData.type === 'TandemPassenger' &&
                            (
                                popUpData.status === 'Expired' ?
                                <button 
                                className={`${ButtonStyles.normalButton} w-7 h-10 opacity-55`} >منقضی شده</button>
                                :
                                <button 
                                onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${popUpData.externalId}`)}
                                className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`} >تعیین وضعیت</button>
                            )
                        }
                    </>
                }

            
            </form>
        </div>
    );

};

export default PopupForNotif;