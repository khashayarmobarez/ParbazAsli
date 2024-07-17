import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// queries
import { useGetCoachDetails } from '../../../Utilities/Services/clubQueries';

// mui
import { Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// assets
import flightHour from '../../../assets/icons/flightHour.svg'
import flightQuan from '../../../assets/icons/flightQuantity.svg'

// components

const ClubCoachDetails = () => {

    const { id } = useParams();

    const {  data: coachDetails, isLoading: coachDetailsLoading, error: coachDetailsError } = useGetCoachDetails(id);


    return (
        <div className='w-full flex flex-col items-center pt-20'>
            <div className='w-[90%] flex flex-col items-center'>

                {
                    coachDetailsLoading &&
                    <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'10rem' }}>
                        <CircularProgress /> 
                    </Box>
                }

                {coachDetails &&
                    <div className='flex flex-col w-full justify-between items-center rounded-2xl text-sm min-h-16 p-6 gap-y-6'
                    style={{background:'var(--coachesDetails-bg)', boxShadow:'var(--coachesDetails-BoxShadow)'}}>

                        <div className=' w-full flex items-center justify-between gap-y-4'>
                            <p className='text-base'>{coachDetails.data.fullName}</p>
                            <p className=''>وضعیت: {coachDetails.data.status}</p>
                        </div>

                        <div className='w-full flex items-center justify-between gap-y-4 bg'>
                            <Avatar src={coachDetails.data.profilePicture.path} alt="Remy Sharp" sx={{height:'100px', width:'100px', zIndex:'0'}} />
                            <div className='flex flex-col w-full h-full justify-around items-end gap-y-2'>
                                <div className=' flex justify-start items-start  w-32' >
                                    <img src={flightQuan} alt='icon'/>
                                    <p className=' font-normal text-xs mr-2  text-start'>تعداد هنرجویان: {coachDetails.data.studentsCount}</p>
                                </div> 

                                <div className=' flex justify-start items-start w-32' >
                                    <img src={flightHour} alt='icon'/>
                                    <p className=' font-normal text-xs mr-2  text-start'>{coachDetails.data.coachingHours} ساعت مربیگری</p>
                                </div>

                                <div className=' flex justify-start items-start w-32' >
                                    <img src={flightHour} alt='icon'/>
                                    <p className=' font-normal text-xs mr-2  text-start'>کد عضویت: {coachDetails.data.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ClubCoachDetails;