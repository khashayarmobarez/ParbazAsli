import React, { useState } from 'react';

// bg color styles 
import GradientStyles from '../../../styles/gradients/Gradient.module.css'
import BoxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// assets 
import AddIcon from '@mui/icons-material/Add';

// components
import PageTitle from '../../reuseable/PageTitle';
import DropdownInput from '../../inputs/DropDownInput';
import MultipleSelect from '../../inputs/MultipleSelect';

// drop down options
import { brandsOptionsData } from '../../../Utilities/Providers/dropdownInputOptions'
import TextInput from '../../inputs/textInput';

const AddClass = () => {

    // states
    const [selectedClassType, setSelectedClassType] = useState('');

    // text states
    const [guestStudent, setGuestStudent] = useState('');

    // multiOption States
    const [selectedLevels, setSelectedLevels] = useState([]);


    // handle select input states
    const handleSelectClassType = (event) => {
        setSelectedClassType(event.target.value);
    };


    // handle text input state
    const handleGuestStudent = (event) => {
        setGuestStudent(event.target.value);
      };


    // multiOptions
    const handleSelectChangeLevel = (e) => {
        const selectedOption = Array.from(e.target.options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        setSelectedLevels(selectedLevels => [ ...selectedLevels, selectedOption]);
      };

    const handleRemoveLevel = (dataToRemove) => {
    // Filter out the dataToRemove from the state array
    const updatedState = selectedLevels.filter(data => data !== dataToRemove);
    
    // Update the state with the filtered array
    setSelectedLevels(updatedState);
    };


    return (
        <div className='flex flex-col items-center mt-14 gap-y-4'>
            
            <PageTitle title={'افزودن کلاس'} navigateTo={'education/theoryClass'} paddingRight={'33%'} /> 

            <div className= {`${BoxStyles.basicDataBoxColor} flex justify-center items-center w-52 h-12 rounded-xl`}>  
                <p>کلاس شماره 12</p>
            </div>

            <form className='w-[90%] flex flex-col items-center space-y-7'>

                <DropdownInput name={'نوع دوره'} options={brandsOptionsData} selectedOption={selectedClassType} handleSelectChange={handleSelectClassType} />

                <DropdownInput name={'تاریخ'} options={brandsOptionsData} selectedOption={selectedClassType} handleSelectChange={handleSelectClassType} />

                <DropdownInput name={'زمان شروع'} options={brandsOptionsData} selectedOption={selectedClassType} handleSelectChange={handleSelectClassType} />

                <DropdownInput name={'زمان پایان'} options={brandsOptionsData} selectedOption={selectedClassType} handleSelectChange={handleSelectClassType} />
                
                <MultipleSelect name={'مقطع'} options={brandsOptionsData} selectedOption={selectedLevels} handleSelectChange={handleSelectChangeLevel} handleRemove={handleRemoveLevel} />

                <MultipleSelect name={'مباحث مطرح شده'} options={brandsOptionsData} selectedOption={selectedLevels} handleSelectChange={handleSelectChangeLevel} handleRemove={handleRemoveLevel} />

                <MultipleSelect name={'هنرجویان'} options={brandsOptionsData} selectedOption={selectedLevels} handleSelectChange={handleSelectChangeLevel} handleRemove={handleRemoveLevel} />

                <div className='w-full flex justify-between relative items-center'>
                    <div className='w-[86%]'>
                        <TextInput value={guestStudent} onChange={handleGuestStudent} placeholder='کد کاربری هنرجوی مهمان' className='w-full' />
                    </div>
                    <span className={`w-[34px] h-[34px] flex justify-center items-center rounded-lg ${GradientStyles.container}`}>
                        <AddIcon sx={{width:'2.2rem', height:'2.2rem'}} />
                    </span>
                </div>

                <button type='submit' className={`${ButtonStyles.addButton} w-36`}>ثبت </button>
                
            </form>

        </div>
    );
};

export default AddClass;