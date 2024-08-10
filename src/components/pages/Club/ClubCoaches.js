import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// styles
import gradients from '../../../styles/gradients/Gradient.module.css'

// mui

// assets
import AddIcon from '@mui/icons-material/Add';

// queries
import { useUserById } from '../../../Utilities/Services/queries';
import { useAddCoachToClub, useGetClubCoaches, useGetClubCoachesHistory } from '../../../Utilities/Services/clubQueries';

// components
import DropDownLine from '../../reuseable/DropDownLine';
import ClubCoachBox from './ClubCoachBox';
import TextInput from '../../inputs/textInput';
import PageTitle from '../../reuseable/PageTitle';

const ClubCoaches = () => {

    
    const [DropDown, setDropDown] = useState('');
    const [pageSize, setPageSize] = useState(5);
    const [pageSizePrevious, setPageSizePrevious ] = useState(10);
    // State to hold the value of the input
    const [coachId, setCoachId] = useState('');
    
    const {  data: clubCoachesData, isLoading: coachesDataLoading, error: coachesDataError } = useGetClubCoaches(1,pageSize);
    const {  data: clubCoachesPreviousData, isLoading: coachesPreviousDataLoading, error: coachesPreviousDataError } = useGetClubCoachesHistory(1,pageSize);
    const {  data: coachData, isLoading: coachDataLoading, error: coachDataError } = useUserById(coachId && coachId);
    const { mutate: addCoachToClub, isLoading: addCoachToClubLoading } = useAddCoachToClub();


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
        <div className='w-full flex flex-col justify-center items-center pt-14'>
            <div className='w-[90%] flex flex-col items-center gap-y-6'>

                <PageTitle  title='مربیان' />

                <DropDownLine  
                    onClickActivation={() => handleDropDownClick('activeCoaches')}
                    title={'مربیان'} 
                    dropDown={'activeCoaches'} 
                    isActive={DropDown === `activeCoaches`}  
                />

                {DropDown === `activeCoaches` &&  clubCoachesData &&
                    <div className='w-full flex flex-col gap-y-4 mt-[-1rem]'>
                    {/* map clubCoachesData */}
                        {(clubCoachesData && clubCoachesData.data.length > 0 && !coachesDataLoading) ?
                            <>
                                {clubCoachesData.data.map((coach) => (
                                <ClubCoachBox key={coach.id} coachData={coach} />   
                                ))}

                                {clubCoachesData && clubCoachesData.totalCount > 5 &&
                                <p
                                onClick={() => setPageSize(pageSize + 5)}
                                style={{color:' var(--red-text)'}}>مشاهده ی بیشتر ...</p>}
                            </>
                        : 
                        <p style={{color:' var(--red-text)'}}>مربی فعالی در باشگاه وجود ندارد</p>
                        }
                    </div>
                }

                <DropDownLine  
                    onClickActivation={() => handleDropDownClick('PreviousCoaches')}
                    title={'مربیان سابق'} 
                    dropDown={'PreviousCoaches'} 
                    isActive={DropDown === `PreviousCoaches`}  
                />

                {DropDown === `PreviousCoaches` && clubCoachesPreviousData &&
                    <div className='w-full flex flex-col gap-y-4 mt-[-1rem]'>
                    {/* map clubCoachesData */}
                        {(clubCoachesPreviousData && clubCoachesPreviousData.data.length > 0 && !coachesPreviousDataLoading) ?
                            <>
                                {clubCoachesPreviousData.data.map((coach) => (
                                <ClubCoachBox key={coach.id} coachData={coach} />
                                ))}

                                {clubCoachesPreviousData && clubCoachesPreviousData.totalCount > 5 &&
                                <p onClick={() => setPageSizePrevious(pageSizePrevious + 5)} style={{color:' var(--red-text)'}}>مشاهده ی بیشتر ...</p>}
                            </>
                            :
                            <p style={{color:' var(--red-text)'}}>مربی سابقی در این باشکاه وجود ندارد</p>
                        }
                    </div>
                }

                <div className='flex flex-col w-full gap-y-2 mt-2'>
                    { coachData && 
                        <p className=' self-start text-[var(--yellow-text)]'>{coachData.data.fullName}</p>
                    }
                    { coachDataLoading && coachId.length > 5 &&
                        <p className=' self-start text-[var(--red-text)]'>...در حال جستجوی مربی</p>
                    }
                    { coachDataError && coachId.length > 5 &&
                        <p className=' self-start text-[var(--notification-red)]'>مربی یافت نشد!</p>
                    }
                    <div className='w-full flex justify-between relative items-center'>
                        <div className='w-[86%] flex flex-col'>
                            <TextInput value={coachId} onChange={handleInputCoachId} placeholder='افزودن مربی' className='w-full' />
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