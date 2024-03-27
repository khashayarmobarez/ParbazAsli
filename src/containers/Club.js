import React from 'react';

// redux
import { useSelector } from 'react-redux';
import { selectUser } from '../Utilities/ReduxToolKit/features/userData/userSlice';
import AddClub from '../components/pages/Club/AddClub';

const Club = () => {

    const {club, userRole} = useSelector(selectUser)

    return (
        <div className='py-16'>
            {   
                userRole === 'coach' ? 
                // return for coach
                (club ?
                    // return for coach with club
                    <p>coach with club</p>
                    :
                    // return for coach without club 
                    <AddClub />)
                :
                // return for student
                <p>student</p>
            }
        </div>
    );
};

export default Club;