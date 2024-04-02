import React from 'react';

// assets
import certificateIcon from '../../../assets/icons/certificate-Vector.svg'

// components
import PageTitle from '../../reuseable/PageTitle';
import TextInput from '../../inputs/textInput';

const RenewCertificate = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-full flex flex-col items-center mt-14 gap-y-12'>
                <PageTitle title={'افزودن گواهینامه'} navigateTo={'profile'} paddingRight={'33%'} /> 

                <div className='w-[90%] flex flex-col gap-y-4'>
                    <TextInput placeholder={'نام باشگاه'} Type={'number'}/>
                    <TextInput placeholder={'شماره گواهینامه'} icon={certificateIcon} Type={'number'}/>

                </div>

            </div>
        </div>
    );
};

export default RenewCertificate;