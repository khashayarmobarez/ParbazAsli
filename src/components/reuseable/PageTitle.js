import React from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

import ArrowButton from '../icons/ArrowButton';

const PageTitle = (props) => {

    const dir = Cookies.get('dir') || 'ltr';

    const {title, navigateTo} = props;

    const navigate = useNavigate();

    return (
        <>
            <div className={`sticky top-[56px] md:top-16 lg:top-20 z-[70] 0 bg-bgHeader w-[90%] h-16 flex justify-center items-center py-2 rounded-b-2xl `}
            style={{boxShadow:'var(--shadow-all)'}}>
                <p className=' text-base font-medium'>{title}</p>
                <span className={`w-8 h-8 flex justify-center items-center  absolute
                ${dir === 'ltr' ? 'left-4 mr-2' : 'right-4 ml-2'}`} 
                onClick={() => navigate(navigateTo ? navigateTo : -1)}>
                    <ArrowButton isRight={dir !== 'ltr' && true} />
                </span>
            </div>
        </>
    );
};

export default PageTitle;

// first one redirects to the previous page
// <PageTitle title={''}  />
//  or  
// <PageTitle title={''} navigateTo={''}  />  