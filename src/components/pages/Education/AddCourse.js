import React, { useEffect, useState } from 'react';

// bg color styles 
import GradientStyles from '../../../styles/gradients/Gradient.module.css'
import BoxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// assets 
import AddIcon from '@mui/icons-material/Add';
import Cube from '../../../assets/icons/3dCube.svg';

// drop down options
import { courseTypeOptionData } from '../../../Utilities/Providers/dropdownInputOptions'

// components
import PageTitle from '../../reuseable/PageTitle';
import DropdownInput from '../../inputs/DropDownInput';
import MultipleSelect from '../../inputs/MultipleSelect';
import TextInput from '../../inputs/textInput';
import NumberInput from '../../inputs/NumberInput';

const AddCourse = () => {

    // states
    const [selectedClassType, setSelectedClassType] = useState('');
    const [flightCount, setFlightCount] = useState('');

    // text states
    const [guestStudent, setGuestStudent] = useState('');

    // multiOption States
    const [selectedLevels, setSelectedLevels] = useState([]);

    // handle select input states
    const handleSelectClassType = (selectedOption ) => {
        setSelectedClassType(selectedOption);
    }; 

    // handle flight count input state
    const handleFlightCount = (event) => {
        setFlightCount(event.target.value);
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
        <div className='flex flex-col items-center mt-14 gap-y-8'>
            
            <PageTitle title={'افزودن دوره'} navigateTo={'education/theoryClass'} paddingRight={'33%'} /> 

            <form className='w-[90%] flex flex-col items-center gap-y-6'>

                <DropdownInput name={'نوع دوره'} options={courseTypeOptionData} selectedOption={selectedClassType} handleSelectChange={handleSelectClassType} />

                {selectedClassType &&
                    <>
                        <NumberInput icon={Cube} name={'تعداد پرواز'} value={flightCount} onChange={handleFlightCount} placeholder='تعداد پرواز' />

                        <MultipleSelect name={'هنرجویان'} options={courseTypeOptionData} selectedOption={selectedLevels} handleSelectChange={handleSelectChangeLevel} handleRemove={handleRemoveLevel} />

                        <div className='w-full flex justify-between relative items-center'>
                            <div className='w-[86%]'>
                                <TextInput value={guestStudent} onChange={handleGuestStudent} placeholder='کد کاربری هنرجوی مهمان' className='w-full' />
                            </div>
                            <span className={`w-[34px] h-[34px] flex justify-center items-center rounded-lg ${GradientStyles.container}`}>
                                <AddIcon sx={{width:'2.2rem', height:'2.2rem'}} />
                            </span>
                        </div>

                        <button type='submit' className={`${ButtonStyles.addButton} w-36`}>ثبت </button>
                    </>
                }

            </form>

        </div> 
    );
};

export default AddCourse;