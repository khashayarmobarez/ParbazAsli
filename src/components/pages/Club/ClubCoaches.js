import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// styles
import gradients from '../../../styles/gradients/Gradient.module.css'


// assets
import AddIcon from '@mui/icons-material/Add';
import ArrowButton from '../../../components/icons/ArrowButton';

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
    const [pageNumber, setPageNumber] = useState(1);
    const [pageNumberPrevious, setPageNumberPrevious] = useState(1);
    // State to hold the value of the input
    const [coachId, setCoachId] = useState('');
    
    const {  data: clubCoachesData, isLoading: coachesDataLoading, error: coachesDataError } = useGetClubCoaches(pageNumber,4);
    const {  data: clubCoachesPreviousData, isLoading: coachesPreviousDataLoading, error: coachesPreviousDataError } = useGetClubCoachesHistory(pageNumberPrevious,5);
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

    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }

    const handleNextPageNumberPrevious = () => {
        setPageNumberPrevious(prev => prev + 1)
    }

    const handleLastPageNumberPrevious = () => {
        setPageNumberPrevious(prev => prev - 1)
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

            <div className='w-full flex flex-col items-center gap-y-6 md:w-[70%] '>

            <PageTitle  title='مربیان' navigateTo={'/club'} />

                <div className='w-[90%] flex flex-col gap-y-2'>


                    <DropDownLine  
                        onClickActivation={() => handleDropDownClick('activeCoaches')}
                        title={'مربیان'} 
                        dropDown={'activeCoaches'} 
                        isActive={DropDown === `activeCoaches`}  
                    />

                    <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2'>
                        {DropDown === `activeCoaches` &&  clubCoachesData &&
                            <div className='w-full flex flex-col gap-y-4 mt-[-1rem] py-4'>
                            {/* map clubCoachesData */}
                                {(clubCoachesData && clubCoachesData.data.length > 0 && !coachesDataLoading) ?
                                    <>
                                        {clubCoachesData.data.map((coach) => (
                                        <ClubCoachBox key={coach.id} coachData={coach} />   
                                        ))}

                                        {clubCoachesData && clubCoachesData.totalPagesCount > 1 &&
                                            <div className='w-full flex justify-between px-10 items-center'>
                                                <button
                                                    className={`  w-6 h-6 justify-self-end ${pageNumber === 1 && 'opacity-60'}`}
                                                    disabled={pageNumber === 1}
                                                    onClick={handleLastPageNumber}
                                                >
                                                    <ArrowButton isRight={true} />
                                                </button>

                                                <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                                                    صفحه ی {pageNumber}
                                                </p>

                                                <button
                                                    className={`w-6 h-6 justify-self-start ${(clubCoachesData.totalPagesCount === 1 || clubCoachesData.totalPagesCount === pageNumber) && 'opacity-60'}`}
                                                    disabled={clubCoachesData.totalPagesCount === 1 || clubCoachesData.totalPagesCount === pageNumber}
                                                    onClick={handleNextPageNumber}
                                                >
                                                    <ArrowButton/>
                                                </button>
                                            </div>
                                        }
                                    </>
                                : 
                                <p style={{color:' var(--text-error)'}}>مربی فعالی در باشگاه وجود ندارد</p>
                                }
                            </div>
                        }
                    </div>

                    <DropDownLine  
                        onClickActivation={() => handleDropDownClick('PreviousCoaches')}
                        title={'مربیان سابق'} 
                        dropDown={'PreviousCoaches'} 
                        isActive={DropDown === `PreviousCoaches`}  
                    />

                    <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                        {DropDown === `PreviousCoaches` && clubCoachesPreviousData &&
                            <div className='w-full flex flex-col gap-y-4 mt-[-1rem] py-4'>
                            {/* map clubCoachesData */}
                                {(clubCoachesPreviousData && clubCoachesPreviousData.data.length > 0 && !coachesPreviousDataLoading) ?
                                    <>
                                        {clubCoachesPreviousData.data.map((coach) => (
                                        <ClubCoachBox key={coach.id} coachData={coach} />
                                        ))}

                                        {clubCoachesPreviousData && clubCoachesPreviousData.totalPagesCount > 1 &&
                                            <div className={`w-full flex justify-between px-10 items-center ${pageNumberPrevious === 1 && 'opacity-60'}`}>
                                                <button
                                                    className=' w-6 h-6 justify-self-end'
                                                    disabled={pageNumberPrevious === 1}
                                                    onClick={handleLastPageNumberPrevious}
                                                >
                                                    <ArrowButton isRight={true}/>
                                                </button>

                                                <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                                                    صفحه ی {pageNumberPrevious}
                                                </p>

                                                <button
                                                    className={`w-6 h-6 justify-self-start ${pageNumberPrevious === 1 && 'opacity-60'}`}
                                                    disabled={clubCoachesPreviousData.totalPagesCount === 1 || clubCoachesPreviousData.totalPagesCount === pageNumberPrevious}
                                                    onClick={handleNextPageNumberPrevious}
                                                >
                                                    <ArrowButton/>
                                                </button>
                                            </div>
                                        }
                                    </>
                                    :
                                    <p style={{color:' var(--text-error)'}}>مربی سابقی در این باشکاه وجود ندارد</p>
                                }
                            </div>
                        }
                    </div>    

                    <div className='flex flex-col w-full gap-y-2 mt-2'>
                        { coachData && 
                            <p className=' self-start text-[var(--text-accent)]'>{coachData.data.fullName}</p>
                        }
                        { coachDataLoading && coachId.length > 5 &&
                            <p className=' self-start text-[var(--text-error)]'>...در حال جستجوی مربی</p>
                        }
                        { coachDataError && coachId.length > 5 &&
                            <p className=' self-start text-[var(--text-error)]'>مربی یافت نشد!</p>
                        }
                        <div className='w-full flex justify-between relative items-center'>
                            <div className='w-[70%] flex flex-col'>
                                <TextInput value={coachId} onChange={handleInputCoachId} placeholder='افزودن مربی' className='w-full' />
                            </div>
                            <span
                                className={` w-24 h-12 flex justify-center text-[#eee] items-center rounded-2xl font-medium  cursor-pointer bg-bgButtonMainDefault hover:bg-bgButtonMainHover`}
                                onClick={handleAddCoachToClub}
                                disabled={addCoachToClubLoading}
                            >
                                افزودن
                            </span>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ClubCoaches;