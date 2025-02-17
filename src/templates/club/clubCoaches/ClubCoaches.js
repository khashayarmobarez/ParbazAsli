import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import gradients from '../../../styles/Gradient.module.css'


// assets
import AddIcon from '@mui/icons-material/Add';
import ArrowButton from '../../../elements/icons/ArrowButton';

// queries
import { useUserById } from '../../../Utilities/Services/queries';
import { useAddCoachToClub, useGetClubCoaches, useGetClubCoachesHistory } from '../../../Utilities/Services/clubQueries';

// components
import DropDownLine from '../../../elements/reuseable/DropDownLine';
import ClubCoachBox from '../../../modules/Club/ClubCoachBox';
import TextInput from '../../../elements/inputs/textInput';
import PageTitle from '../../../elements/reuseable/PageTitle';
import { USER_ID_PATTERN } from '../../../Utilities/Providers/regexProvider';
import { useTranslation } from '../../../Utilities/context/TranslationContext';
import Pagination from '../../../elements/reuseable/Pagination';

const ClubCoaches = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const appTheme = Cookies.get('themeApplied') || 'dark';
    const [DropDown, setDropDown] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageNumberPrevious, setPageNumberPrevious] = useState(1);
    // State to hold the value of the input
    const [coachId, setCoachId] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    const {  data: clubCoachesData, isLoading: coachesDataLoading, refetch: refetchCoaches } = useGetClubCoaches(pageNumber,5);
    const {  data: clubCoachesPreviousData, isLoading: coachesPreviousDataLoading, refetch: refetchPreviousData } = useGetClubCoachesHistory(pageNumberPrevious,5);
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

        setIsSubmitted(true)

        if (coachId.length > 5) {
            addCoachToClub( coachId , {
                onSuccess: () => {
                    toast(t("club.coach.requestSent"), {
                        type: 'success',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });

                    // reload after 1 second
                    setTimeout(() => {
                        window.location.reload();
                    }, 800);
                },
                onError: (error) => {
                    let errorMessage = t("club.coach.errorOccurred")
                    if (error.response && error.response.data && error.response.data.ErrorMessages) {
                        errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    }
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                }
            })
        } else {
            toast(t("club.coach.invalidMembershipCode"), {
                type: 'error',
                position: 'top-center',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
        }
    }

    return (
        <div className='w-full flex flex-col justify-center items-center pt-14'>

            <div className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:w-[55%]'>

            <PageTitle  title={t("club.coach.coaches")} navigateTo={'/club'} />

                <div className='w-[90%] flex flex-col gap-y-2 '>


                    <DropDownLine  
                        onClickActivation={() => handleDropDownClick('activeCoaches')}
                        title={t("club.coach.activeCoaches")} 
                        dropDown={'activeCoaches'}
                        isActive={DropDown === `activeCoaches`}  
                    />

                    <div className='w-full flex flex-col gap-4 '>
                        {DropDown === `activeCoaches` &&  clubCoachesData &&
                            <div className='w-full flex flex-col gap-y-6 mt-[-1rem] py-4'>
                            {/* map clubCoachesData */}
                                {(clubCoachesData && clubCoachesData.data.length > 0 && !coachesDataLoading) ?
                                    <>
                                        <div className='w-full flex flex-col items-center gap-4 md:grid md:grid-cols-2'>
                                            {clubCoachesData.data.map((coach) => (
                                                <ClubCoachBox key={coach.id} coachData={coach} />   
                                            ))}
                                        </div>

                                        <Pagination
                                            totalPagesCount={clubCoachesData?.totalPagesCount} 
                                            totalCount={clubCoachesData?.totalCount}
                                            setPageNumber={setPageNumber}
                                            PageNumber={pageNumber}
                                            refetch={refetchCoaches}
                                        />
                                    </>
                                : 
                                <p className='text-textWarning'>{t("club.coach.noActiveCoaches")}</p>
                                }
                            </div>
                        }
                    </div>

                    <DropDownLine  
                        onClickActivation={() => handleDropDownClick('PreviousCoaches')}
                        title={t("club.coach.previousCoaches")} 
                        dropDown={'PreviousCoaches'} 
                        isActive={DropDown === `PreviousCoaches`}  
                    />

                    <div className='w-full flex flex-col gap-4'>
                        {DropDown === `PreviousCoaches` && clubCoachesPreviousData &&
                            <div className='w-full flex flex-col gap-y-4 mt-[-1rem] py-4'>
                            {/* map clubCoachesData */}
                                {(clubCoachesPreviousData && clubCoachesPreviousData.data.length > 0 && !coachesPreviousDataLoading) ?
                                    <>
                                        <div className='w-full flex flex-col items-center gap-4 md:grid md:grid-cols-2'>
                                            {clubCoachesPreviousData.data.map((coach) => (
                                                <ClubCoachBox key={coach.id} coachData={coach} />
                                            ))}
                                        </div>

                                        <Pagination
                                            totalPagesCount={clubCoachesPreviousData?.totalPagesCount} 
                                            totalCount={clubCoachesPreviousData?.totalCount}
                                            setPageNumber={setPageNumberPrevious}
                                            PageNumber={pageNumberPrevious}
                                            refetch={refetchPreviousData}
                                        />
                                    </>
                                    :
                                    <p className='text-textWarning'>{t("club.coach.noPreviousCoaches")}</p>
                                }
                            </div>
                        }
                    </div>    

                    <div className='flex flex-col w-full gap-y-2 mt-2'>
                        <div className='w-full flex justify-between relative items-start gap-x-2'>
                            <div className='w-[70%] flex flex-col md:w-full'>
                                <TextInput 
                                    id={'TI1'} 
                                    value={coachId} 
                                    onChange={handleInputCoachId} 
                                    placeholder={t("club.coach.addCoach")}
                                    className='w-full' 
                                    isSubmitted={isSubmitted}
                                    ErrorCondition={!USER_ID_PATTERN.test(coachId) && coachId}
                                    ErrorText={t("club.coach.invalidUserIdFormat")}
                                    ErrorCondition2={!coachId}
                                    ErrorText2={t("club.coach.userIdRequired")}
                                />
                            </div>
                            <span
                            className={` w-[26%] h-12 flex justify-center text-[#eee] items-center rounded-2xl cursor-pointer bg-bgButtonMainDefault hover:bg-bgButtonMainHover`}
                            onClick={handleAddCoachToClub}
                            disabled={addCoachToClubLoading}
                            >
                                {t("club.coach.addCoach")}
                            </span>
                        </div>
                        { coachData && 
                            <p className=' self-start text-textAccent -mt-1'>{coachData.data.fullName}</p>
                        }
                        { coachDataLoading && USER_ID_PATTERN.test(coachId) &&
                            <p className=' self-start text-textWarning text-xs -mt-1'>{t("club.coach.searchingCoach")}</p>
                        }
                        { coachDataError && USER_ID_PATTERN.test(coachId) &&
                            <p className=' self-start text-textError text-xs -mt-1'>{t("club.coach.coachNotFound")}</p>
                        }
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ClubCoaches;