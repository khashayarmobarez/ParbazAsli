import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// styles
import gradients from '../../../styles/gradients/Gradient.module.css'

// mui

// assets
import AddIcon from '@mui/icons-material/Add';

// queries
import { useUserById } from '../../../Utilities/Services/queries';
import { useAddCoachToClub, useGetClubCoaches } from '../../../Utilities/Services/clubQueries';

// components
import DropDownLine from '../../reuseable/DropDownLine';
import ClubCoachBox from './ClubCoachBox';
import TextInput from '../../inputs/textInput';

const ClubCoaches = () => {

    
    const [DropDown, setDropDown] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    // State to hold the value of the input
    const [coachId, setCoachId] = useState('');
    
    const {  data: clubCoachesData, isLoading: coachesDataLoading, error: coachesDataError } = useGetClubCoaches(pageNumber,5);
    const {  data: coachData, isLoading: coachDataLoading, error: coachDataError } = useUserById(coachId);
    const { mutate: addCoachToClub, isLoading: addCoachToClubLoading } = useAddCoachToClub();

    useEffect(() => {
        if(clubCoachesData) {
        console.log(clubCoachesData)
        }
    } , [ clubCoachesData])

    useEffect(() => {
        setDropDown('activeCoaches')
    } , [])

    // Function to handle the dropdown click
    const handleDropDownClick = (dropDown) => {
        setDropDown(dropDown);
        if (DropDown === dropDown) {
            setDropDown('');
        }
    }

    // Function to handle the input value
    const handleInputCoachId = (event) => {
        setCoachId(event.target.value);
    }


    const handleAddCoachToClub = () => {

        if (coachId.length > 5) {
            addCoachToClub( coachId , {
                onSuccess: () => {
                    toast('درخواست عضویت شما به مربی ارسال شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });

                    // reload after 1 second
                    setTimeout(() => {
                        window.location.reload();
                    }, 800);
                },
                onError: (error) => {
                    let errorMessage = 'خطایی رخ داده است';
                    if (error.response && error.response.data && error.response.data.ErrorMessages) {
                        errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    }
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                }
            })
        } else {
            toast('لطفا کد عضویت را به درستی وارد کنید', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
        }
    }

    return (
        <div className='w-full flex flex-col justify-center items-center pt-16'>
            <div className='w-[90%] flex flex-col items-center gap-y-4'>

                <DropDownLine  
                    onClick={() => handleDropDownClick('activeCoaches')}
                    title={'مربیان'} 
                    dropDown={'activeCoaches'} 
                    isActive={DropDown === `activeCoaches`}  
                />

                {DropDown === `activeCoaches` && 
                    <div className='w-full flex flex-col gap-y-4'>
                    {/* map clubCoachesData */}
                        {clubCoachesData && clubCoachesData.data.map((coach) => (
                            <ClubCoachBox key={coach.id} coachData={coach} />
                        ))}
                    </div>
                }

                <DropDownLine  
                    onClick={() => handleDropDownClick('PreviousCoaches')}
                    title={'مربیان سابق'} 
                    dropDown={'PreviousCoaches'} 
                    isActive={DropDown === `PreviousCoaches`}  
                />

                {DropDown === `PreviousCoaches` && 
                    'PreviousCoaches'
                }

                <div className='flex flex-col w-full gap-y-2'>
                    { coachData && 
                        <p className=' self-start text-[var(--yellow-text)]'>{coachData.data.fullName}</p>
                    }
                    {/* {studentDataError &&
                        <p className='text-[var(--red-text)] self-start'>{studentDataError}</p>
                    } */}
                    <div className='w-full flex justify-between relative items-center'>
                        <div className='w-[86%] flex flex-col'>
                            <TextInput value={coachId} onChange={handleInputCoachId} placeholder='افزودن هنرجو' className='w-full' />
                        </div>
                        <span
                            className={` w-[34px] h-[34px] flex justify-center items-center rounded-lg ${gradients.container}`}
                            onClick={handleAddCoachToClub}
                            disabled={false}
                        >
                            <AddIcon sx={{ width: '2.2rem', height: '2.2rem' }} />
                        </span>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default ClubCoaches;