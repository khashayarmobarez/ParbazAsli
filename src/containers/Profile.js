import React from 'react';


import boxStyles from '../styles/Boxes/DataBox.module.css'

// queries 
import { useUserDetails } from '../Utilities/hooks/queries';

import { Avatar } from '@mui/material';


const Profile = () => {

    const { data, isLoading, error, isFetching } = useUserDetails();

    console.log(data, isLoading, error);

    return (
        <div>

            {
                isLoading && isFetching && <h3 className=' text-white'>is loading</h3>
            }

            {
                error && <h3>{error.message}</h3>
            }

            {
            data &&
            <div className='flex flex-col mt-20 items-center gap-8'>

                <div className={`${boxStyles.containerDarkmode}`}>
                    <div className=''>

                        {data && <Avatar alt="Remy Sharp" src={data.data.thumbnailUrl} sx={{height:'99px', width:'100px'}}/>}
                        

                    </div>
                </div>

                <div className={`${boxStyles.containerDarkmode}`}>
                </div>

            </div>

                
            }


        </div>
    );
};

export default Profile;