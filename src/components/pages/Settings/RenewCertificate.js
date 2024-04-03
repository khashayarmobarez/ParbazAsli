import React, { useState } from 'react';

// assets
import certificateIcon from '../../../assets/icons/certificate-Vector.svg'
import calender from '../../../assets/icons/calender-Icon.svg'
import clipboardCheck from '../../../assets/icons/clipboardCheck.svg'

// input options
import {brandsOptionsData} from '../../../Utilities/Providers/dropdownInputOptions'

// components
import PageTitle from '../../reuseable/PageTitle';
import TextInput from '../../inputs/textInput';
import DropdownInput from '../../inputs/DropDownInput';

const RenewCertificate = () => {

    // State to manage input values
    const [clubName, setClubName] = useState('');
    const [certificateNumber, setCertificateNumber] = useState('');
    // State for selected option
    const [selectedOptionOrganization, setSelectedOptionOrganization] = useState('');
    const [selectedOptionStartDate, setSelectedOptionStartDate] = useState('');
    const [selectedOptionEndDate, setSelectedOptionEndDate] = useState('');
    const [selectedOptionLevel, setSelectedOptionLevel] = useState('');

    // onChange event handler functions
    const handleClubNameChange = (event) => {
        setClubName(event.target.value);
    };

    const handleCertificateNumberChange = (event) => {
        setCertificateNumber(event.target.value);
    };

    // Event handler for option selection
    const handleSelectChangeOrganization = (event) => {
        setSelectedOptionOrganization(event.target.value);
    };

    const handleSelectChangeStartDate = (event) => {
        setSelectedOptionStartDate(event.target.value);
    };
    
    const handleSelectChangeEndDate = (event) => {
        setSelectedOptionEndDate(event.target.value);
    };

    const handleSelectChangeLevel = (event) => {
        setSelectedOptionLevel(event.target.value);
    };

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-full flex flex-col items-center mt-14 gap-y-12'>
                <PageTitle title={'افزودن گواهینامه'} navigateTo={'profile'} paddingRight={'33%'} /> 

                <div className='w-[90%] flex flex-col gap-y-4'>
                    <TextInput placeholder={'نام باشگاه'} Type={'text'} onChange={handleClubNameChange}/>
                    <TextInput placeholder={'شماره گواهینامه'} icon={certificateIcon} Type={'number'} onChange={handleCertificateNumberChange}/>
                    <DropdownInput name={'انتخاب ارگان'} options={brandsOptionsData} selectedOption={selectedOptionOrganization} handleSelectChange={handleSelectChangeOrganization} />
                    <DropdownInput name={'تاریخ صدور'} icon={calender} options={brandsOptionsData} selectedOption={selectedOptionStartDate} handleSelectChange={handleSelectChangeStartDate} />
                    <DropdownInput name={'تاریخ انقضا'} icon={calender} options={brandsOptionsData} selectedOption={selectedOptionEndDate} handleSelectChange={handleSelectChangeEndDate} />
                    <DropdownInput name={'مقطع'} icon={clipboardCheck} options={brandsOptionsData} selectedOption={selectedOptionLevel} handleSelectChange={handleSelectChangeLevel} />
                </div>

            </div>
        </div>
    );
};

export default RenewCertificate;