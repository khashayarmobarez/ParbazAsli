import React, { useEffect, useMemo, useState } from 'react';

// styles
import styles from '../../../../styles/Inputs/Inputs.module.css'

// queries
import { useOrganLevels, useOrgansData } from '../../../../Utilities/Services/queries'

// components
import UserDataBox from '../../Profile/UserDataBox';
import DropdownInput from '../../../inputs/DropDownInput';
import TextInput from '../../../inputs/textInput';

// zaman
import { DatePicker } from "zaman";
import DateInput from '../Inputs/DateInput';


const AddCertificate = () => {

    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    
    const [organ, setOrgan] = useState('')
    const [organId, setOrganId] = useState('')

    const [level, setLevel] = useState('')
    const [levelId, setLevelId] = useState('')
    const [roleName, setRoleName] = useState('');

    const [certificateId, setCertificateId] = useState('');

    const [dateStartValue, setDateStartValue] = useState(new Date())

    const [dateEndValue, setDateEndValue] = useState(new Date())
    
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevels(organId);
    
    useEffect(() => {
        console.log(organId)
    }, [organId]);

    const handleSelectOrganChange = (selectedOption) => {
        setOrgan(selectedOption.label);
        setOrganId(selectedOption.value);
    };

    const handleSelectLevelChange = (selectedOption) => {
        setRoleName(selectedOption.roleName);
        setLevel(selectedOption.label);
        setLevelId(selectedOption.value);
    };

    const handleCertificateIdChange = (event) => {
        setCertificateId(event.target.value);
    };

    const handleCertificateStartDateChange = (value) => {
        setDateStartValue(value)
        console.log(dateStartValue)
    }

    const handleCertificateEndDateChange = (value) => {
        setDateEndValue(value)
        console.log(dateEndValue)
    }

    const organOptions = useMemo(() => organsData?.data.map(organ => ({
        value: organ.id,
        label: organ.name
    })), [organsData]);

    const levelOptions = useMemo(() => levelsData?.data.map(level => ({
        value: level.id,
        label: level.name,
        roleName: level.roleName
    })), [levelsData]);

    return (
        <div className='flex flex-col items-center pt-24 pb-[4rem]'>
            <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%] md:w-[65%]'>

                <UserDataBox />
                
                <div className='w-full flex flex-col gap-y-2'>
                    <p style={{color:'var(--red-text)'}}>برای دسترسی به پنل کاربری اهراز موارد زیر الزامی است.</p>
                    <p className='text-sm text-right' style={{color:'var(--yellow-text)'}}>اول ارگان خود را انتخاب کرده سپس اطلاعات گواهینامه ی خود را کامل کنید.</p>
                </div>


                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-full'>
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[98%]'>

                        <p className='' style={{color:'var(--soft-white)'}}>تاییدیه</p>

                        <p className='mr-3 md:mr-0' style={{color:'var(--yellow-text)'}}>گواهینامه</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>اهراز ایمیل</p>

                    </div>

                    {
                        organsLoading && 
                        <div className='w-full min-h-[71vh]'>
                            <p>Loading authentication settings...</p>
                        </div>
                    }

                    {
                        organsError && 
                        <div className='w-full min-h-[71vh]'>
                            <p>Error fetching organization settings</p>
                        </div>
                    }
                    {
                        organsData &&
                        <>
                            <form className='w-full flex flex-col md:w-[50%] gap-y-4'>
                                
                                <DropdownInput
                                options={organOptions}
                                handleSelectChange={handleSelectOrganChange}
                                selectedOption={organ}
                                name={'صدور گواهینامه از'}
                                />

                                {
                                    organId && 
                                    <>
                                        {levelsLoading && <p>Loading levels...</p>}
                                        {levelsError && <p>Error fetching levels</p>}
                                        {levelsData &&
                                            <>

                                                <DropdownInput
                                                    options={levelOptions}
                                                    handleSelectChange={handleSelectLevelChange}
                                                    selectedOption={level}
                                                    name={'سطح گواهینامه'}
                                                />
                                                
                                                {/* removing other fill options for starters */}
                                                {
                                                    !(roleName === 'Starter') &&
                                                    <>

                                                        <TextInput
                                                        value={certificateId}
                                                        onChange={handleCertificateIdChange}
                                                        placeholder={'شماره گواهینامه'}
                                                        Type={'text'}
                                                        icon={null} // You can replace `null` with a specific icon if you have one
                                                        />

                                                        {/* the date picker styles comes from signUp.module.css , it is a bug, if you want to make changes to the code i recommend removing this code */}
                                                        <DateInput 
                                                        onChange={handleCertificateStartDateChange}
                                                        inputAttributes={{ placeholder: "تاریخ صدور" }}
                                                        />

                                                        {/* the date picker styles comes from signUp.module.css , it is a bug, if you want to make changes to the code i recommend removing this code */}
                                                        <DateInput 
                                                        onChange={handleCertificateEndDateChange}
                                                        inputAttributes={{ placeholder: "تاریخ انقضا" }}
                                                        />


                                                    </>
                                                }

                                            </>
                                        }
                                    </>
                                }

                            </form>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default AddCertificate;