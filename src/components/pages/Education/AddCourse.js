import React, { useEffect, useMemo, useState } from 'react';

// bg color styles 
import GradientStyles from '../../../styles/gradients/Gradient.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// assets 
import AddIcon from '@mui/icons-material/Add';
import Cube from '../../../assets/icons/3dCube.svg';

// mui
import ClearIcon from '@mui/icons-material/Clear';

// drop down options
import { courseTypeOptionData } from '../../../Utilities/Providers/dropdownInputOptions'

// queires
import { useOrganLevels, useOrgansData, useUserLevelById } from '../../../Utilities/Services/queries';

// components
import PageTitle from '../../reuseable/PageTitle';
import DropdownInput from '../../inputs/DropDownInput';
import MultipleSelect from '../../inputs/MultipleSelect';
import TextInput from '../../inputs/textInput';
import NumberInput from '../../inputs/NumberInput';

const AddCourse = () => {

    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();

    // states
    const [selectedClassType, setSelectedClassType] = useState('');
    const [flightCount, setFlightCount] = useState('');

    // states for دوره های مطابق سیلابس
    const [organ, setOrgan] = useState('')

    const [level, setLevel] = useState('')

    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevels(organ.id);
    // text states
    const [studentId, setStudentId] = useState('');
    
    const {data: studentData, error: studentDataError } = useUserLevelById(studentId,level.id,selectedClassType.id);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (studentDataError && studentId.length > 5) {
            const error = studentDataError.response?.data?.ErrorMessages?.[0]?.ErrorMessage;
            setErrorMessage(error || 'An error occurred');
        } else {
            setErrorMessage('');
        }
    }, [studentDataError, studentId]);


    // multiOption States
    // const [selectedLevels, setSelectedLevels] = useState([]);

    const [studentsList, setStudentsList] = useState([]); 


    // handle select input states
    const handleSelectClassType = (selectedOption ) => {
        setSelectedClassType(selectedOption);
    }; 

    // handle flight count input state
    const handleFlightCount = (event) => {
        setFlightCount(event.target.value);
    };

    const handleSelectOrganChange = (selectedOption) => {
        setOrgan(selectedOption);
    };

    const handleSelectLevelChange = (selectedOption) => {
        setLevel(selectedOption);
    };

    // handle text input state
    const handleInputStudent = (event) => {
        setStudentId(event.target.value);
    };

    const handleAddStudent = () => {
        if (studentId.trim()) {
            setStudentsList([...studentsList, studentId]);
            setStudentId('');
        }
    };

    const handleRemoveStudent = (studentToRemove) => {
        setStudentsList(studentsList.filter(student => student !== studentToRemove));
    };

    // multiOptions
    // const handleSelectChangeLevel = (e) => {
    //     const selectedOption = Array.from(e.target.options)
    //       .filter((option) => option.selected)
    //       .map((option) => option.value);
    //     setSelectedLevels(selectedLevels => [ ...selectedLevels, selectedOption]);
    //   };

    // const handleRemoveLevel = (dataToRemove) => {
    // // Filter out the dataToRemove from the state array
    // const updatedState = selectedLevels.filter(data => data !== dataToRemove);
    
    // // Update the state with the filtered array
    // setSelectedLevels(updatedState);
    // };


    return (
        <div className='flex flex-col items-center mt-14 gap-y-8'>
            
            <PageTitle title={'افزودن دوره'} navigateTo={'education/theoryClass'} /> 

            <form className='w-[90%] flex flex-col items-center gap-y-6'>

                <DropdownInput name={'نوع دوره'} options={courseTypeOptionData} selectedOption={selectedClassType} handleSelectChange={handleSelectClassType} />

                {selectedClassType && 
                    <>
                        {
                            organsLoading && 
                            <div className='w-full min-h-[71vh]'>
                                <p> 
                                    در حال دریافت اطلاعات سازمان ها...    
                                </p>
                            </div>
                        }

                        {
                            organsError && 
                            <div className='w-full min-h-[71vh]'>
                                <p> 
                                    خطا در دریافت اطلاعات سازمان ها...
                                </p>
                            </div>
                        }

                        {/* only دوره های مطابق سیلابس */}
                        { organsData && selectedClassType.id === 1 &&
                            <>
                                <DropdownInput
                                options={organsData.data}
                                handleSelectChange={handleSelectOrganChange}
                                selectedOption={organ}
                                name={'ارگان مربوطه'}
                                />
                                {levelsLoading && organ && <p> در حال دریافت مقاطع ...</p>}
                                {
                                    levelsData && organ && !levelsError &&
                                    <>
                                        {levelsLoading && <p>Loading levels...</p>}
                                        {levelsError && <p>Error fetching levels</p>}
                                        {!levelsError && !levelsLoading &&
                                            <>

                                                <DropdownInput
                                                    options={levelsData.data}
                                                    handleSelectChange={handleSelectLevelChange}
                                                    selectedOption={level}
                                                    name={'سطح گواهینامه'}
                                                />
                                            </>
                                        }
                                    </>
                                }

                            </>
                        }

                        {
                            // add or later on add other types of courses
                            (selectedClassType.id === 1 && !levelsLoading && !levelsError && level) &&
                            <>
                                <NumberInput icon={Cube} name={'تعداد پرواز'} value={flightCount} onChange={handleFlightCount} placeholder='تعداد پرواز' />

                                {/* <MultipleSelect name={'هنرجویان'} options={courseTypeOptionData} selectedOption={selectedLevels} handleSelectChange={handleSelectChangeLevel} handleRemove={handleRemoveLevel} /> */}


                                {/* add students */}
                                <div className='w-full flex justify-between relative items-center'>
                                    <div className='w-[86%] flex flex-col '>
                                        { studentData && 
                                            <p>{studentData.data.fullName}</p>
                                        }
                                        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                                        <TextInput value={studentId} onChange={handleInputStudent} placeholder='کد کاربری هنرجو' className='w-full' />
                                    </div>
                                    <span className={`w-[34px] h-[34px] flex justify-center items-center rounded-lg ${GradientStyles.container}`} onClick={handleAddStudent}>
                                        <AddIcon sx={{ width: '2.2rem', height: '2.2rem' }} />
                                    </span>
                                </div>

                                <ul className=' w-full py-0 mt-[-1rem] grid grid-cols-3 gap-2'>
                                    {studentsList.map((student, index) => (
                                        <li key={index} className=' col-span-1 p-1 bg-[#282C4C] rounded-xl flex justify-between w-auto items-center'>
                                            <p className=' text-sm mx-1' >{student}</p>
                                            <ClearIcon onClick={() => handleRemoveStudent(student)} />
                                        </li>
                                    ))}
                                </ul>


                                <button type='submit' className={`${ButtonStyles.addButton} w-36`}>ثبت </button>
                            </>
                        }
                        

                    </>
                }

            </form>

        </div> 
    );
};

export default AddCourse;