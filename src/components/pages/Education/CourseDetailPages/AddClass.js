import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import GradientStyles from '../../../../styles/gradients/Gradient.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// assets
import singleTag from '../../../../assets/icons/ADressTag.svg';
import listIcon from '../../../../assets/icons/listIcon.svg';
import usersIcon from '../../../../assets/icons/users-Icon.svg';
import RemoveIcon from '@mui/icons-material/Remove';

// queries
import { useACourseStudents, useACourseSyllabi, useAddCourseClass, useAllActiveCourseStudents, useAllActiveStudents } from '../../../../Utilities/Services/coursesQueries';
import { useUserById } from '../../../../Utilities/Services/queries';

// mui
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

// components
import PageTitle from '../../../reuseable/PageTitle';
import TextInput from '../../../inputs/textInput';
import TimeInput from '../../../inputs/TimeInput';
import SearchMultipleSelectStudent from '../../../inputs/SearchMultipleSelectStudent';
import SearchMultipleSelect from '../../../inputs/SearchMultipleSelect';
import DescriptionInput from '../../../inputs/DescriptionInput';
import SelectMultiplePopUp from '../../../reuseable/SelectMultiplePopUp';

const AddClass = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [ClassName, setClassName] = useState('');

    const [StartSelectedTime, setStartSelectedTime] = useState('');
    const [endSelectedTime, setEndSelectedTime] = useState('');

    const [selectedSyllabi, setSelectedSyllabi] = useState([]);
    const [syllabusIds, setSyllabusIds] = useState([]);

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [studentIds, setStudentIds] = useState([]);
    const [guestStudentId, setGuestStudentId] = useState('');
    const [guestStudentIds, setGuestStudentIds] = useState([]);
    const [guestStudentDatas, setGuestStudentDatas] = useState([]);

    const [description, setDescription] = useState('');
    
    // all student ids together(studentIds, guestStudentIds)
    const allStudentIds = [...studentIds, ...guestStudentIds];


    const {  data: syllabiDataTheory, isLoading: syllabiDataTheoryLoading, error: syllabiDataTheoryError } = useACourseSyllabi(id,1);
    const {  data: courseStudents, isLoading: courseStudentsLoading, error: courseStudentsError } = useAllActiveStudents(id);
    const { data: userByIdData, loading: userByIdLoad, error: userByIdError } = useUserById(guestStudentId)
    const { mutate: addCourseClass, isLoading: addCourseClassLoading } = useAddCourseClass();
    



    useEffect(() => {
        console.log(StartSelectedTime, endSelectedTime)
    }, [StartSelectedTime, endSelectedTime]);


    // a use effect to check the endSelectedTime is after StartSelectedTime when the endSelectedTime is changed
    useEffect(() => {
        if (StartSelectedTime && endSelectedTime) {
            if (StartSelectedTime > endSelectedTime) {
                toast('تایم پایان کلاس نباید قبل از تایم شروع کلاس باشد.', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            }
        }
    }, [endSelectedTime]);


    const handleClassName = (event) => {
        setClassName(event.target.value);
    };

    const handleSelectChangeSyllabi = (newSelectedOptions) => {
        setSelectedSyllabi(newSelectedOptions);
        setSyllabusIds(newSelectedOptions.map(option => option.id));
    };

    const handleRemoveSyllabi = (dataToRemove) => {
        setSelectedSyllabi(selectedSyllabi.filter(data => data.id !== dataToRemove.id));
        setSyllabusIds(prev => prev.filter(id => id !== dataToRemove.id));
    };

    const handleSelectChangeStudents = (newSelectedOptions) => {
        setSelectedStudents(newSelectedOptions);
        setStudentIds(newSelectedOptions.map(option => option.id));
    };

    const handleRemoveStudents = (dataToRemove) => {
        setSelectedStudents(selectedStudents.filter(data => data.id !== dataToRemove.id));
        setStudentIds(prev => prev.filter(id => id !== dataToRemove.id));
    };

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };


    const handleStartTimeChange = (newTime) => {
        setStartSelectedTime(newTime);
        // Do something with the new time value
    };

    const handleEndTimeChange = (newTime) => {
        setEndSelectedTime(newTime);
        // Do something with the new time value
    };

    const handleGuestStudentId = (event) => {
        setGuestStudentId(event.target.value);
    }

    const handleAddguestStudent = () => {
        if (guestStudentId === '') return;
        if (guestStudentIds.includes(guestStudentId)) return;
        if (userByIdData) {
            setGuestStudentDatas([...guestStudentDatas, userByIdData]);
            setGuestStudentIds([...guestStudentIds, guestStudentId]);
        }
    }

    const handleRemoveGuestStudents = (index) => {
        setGuestStudentDatas(guestStudentDatas.filter((_, i) => i !== index));
        setGuestStudentIds(guestStudentIds.filter((_, i) => i !== index));
    }



    const handleSubmit = (e) => {
        e.preventDefault();


        // turn the startSelectedTime and end selected time into HH:mm format
        const startHour = StartSelectedTime.$d.getHours();
        const startMinute = StartSelectedTime.$d.getMinutes();
        const startTime = `${startHour}:${startMinute}`;

        const endHour = endSelectedTime.$d.getHours();
        const endMinute = endSelectedTime.$d.getMinutes();
        const endTime = `${endHour}:${endMinute}`;
        

        const classData = {
            "courseId": id,
            "Name": ClassName,
            "Description": description,
            "startTime": startTime,
            "endTime": endTime,
            "classSyllabusIds": syllabusIds,
            // student ids with the guest student ids
            "studentUserIds": allStudentIds,
        };

        if(!id || !ClassName || !startTime || !endTime || syllabusIds.length === 0 || studentIds.length === 0){
            return toast('لطفا تمامی فیلد ها را پر کنید', {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
        } else if (StartSelectedTime > endSelectedTime) {
            return toast('تایم پایان کلاس نباید قبل از تایم شروع کلاس باشد.', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
        } else {
            addCourseClass(classData, {
                onSuccess: () => {
                    toast('کلاس با موفقیت اضافه شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    navigate(`/education/courseDetails/${id}/classes`)
                }, onError: (error) => {
                    let errorMessage = 'خطایی رخ داده است';
                    if (error.response && error.response.data && error.response.data.ErrorMessages) {
                        errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    }
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                }
            });
        }
            


    }

        


    return (
        <div className='w-full pt-14 flex flex-col justify-center items-center gap-y-8'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>
            
                <PageTitle title={'افزودن کلاس'} />

                <div className='w-[90%] flex flex-col gap-y-6'>


                    {
                        syllabiDataTheory && courseStudents &&

                        <form className='w-full flex flex-col items-center gap-y-4'>

                            <TextInput
                                value={ClassName}
                                onChange={handleClassName}
                                placeholder='نام کلاس'
                                icon={singleTag}
                            />

                            <div className='w-full flex flex-col gap-y-2'>
                                <p className='text-xs text-start self-start'>تایم شروع کلاس</p>
                                <TimeInput
                                value={StartSelectedTime}
                                onChange={handleStartTimeChange}
                                placeholder="Select time"
                                />
                            </div>

                            <div className='w-full flex flex-col gap-y-2'>
                                <p className='text-xs text-start self-start'>تایم پایان کلاس</p>
                                <TimeInput
                                value={endSelectedTime}
                                onChange={handleEndTimeChange}
                                placeholder="Select time"
                                />
                                {
                                    (StartSelectedTime > endSelectedTime) &&
                                    <p className='text-start text-sm' style={{color:'var(--red-text)'}} >تایم پایان کلاس نباید قبل از تایم شروع کلاس باشد.</p>
                                }
                            </div>

                            {/* < SearchMultipleSelect
                                name={'مباحث مورد نظر'}
                                options={syllabiDataTheory.data}
                                selectedOptions={selectedSyllabi}
                                handleSelectChange={handleSelectChangeSyllabi}
                                handleRemove={handleRemoveSyllabi}
                                Icon={listIcon}
                            /> */}

                            < SelectMultiplePopUp
                                name={'مباحث مورد نظر'}
                                options={syllabiDataTheory.data}
                                selectedOptions={selectedSyllabi}
                                handleSelectChange={handleSelectChangeSyllabi}
                                handleRemove={handleRemoveSyllabi}
                                Icon={listIcon}
                            />

                            <div className='w-full flex flex-col gap-y-2'>
                                <h1 className=' self-start'>توضیحات کلاس</h1>
                                <DescriptionInput
                                    value={description}
                                    onChange={handleDescription}
                                    placeholder='هر متنی را که دوست دارید تایپ کنید...'
                                />
                            </div>

                            <SearchMultipleSelectStudent
                                name={'هنرجویان'}
                                options={courseStudents.data}
                                selectedOptions={selectedStudents}
                                handleSelectChange={handleSelectChangeStudents}
                                handleRemove={handleRemoveStudents}
                                Icon={usersIcon}
                            />
                            

                            {
                                userByIdData &&
                                <p className=' self-start text-start text-sm mb-[-10px]' style={{color:'var(--yellow-text)'}}>
                                    {userByIdData.data.fullName}
                                </p>
                            }
                            <div className='w-full flex justify-between relative items-center'>
                                <div className='w-[86%] flex flex-col'>
                                    <TextInput value={guestStudentId} onChange={handleGuestStudentId} placeholder='هنرجویان مهمان' className='w-full' />
                                </div>
                                <span
                                    className={` w-[34px] h-[34px] flex justify-center items-center rounded-lg ${GradientStyles.container}`}
                                    onClick={() => handleAddguestStudent()}
                                >
                                    <AddIcon sx={{ width: '2.2rem', height: '2.2rem', color:'var(--yellow-text)' }} />
                                </span>
                            </div>

                            {
                                guestStudentDatas &&
                                <ul className=' w-full py-0 grid grid-cols-1 gap-y-2'>
                                    {guestStudentDatas.map((student, index) => (
                                        <li key={student.order} className='w-full px-4 py-3 rounded-2xl flex justify-between items-center mt-4'
                                        style={{background:  'var(--profile-buttons-background)',
                                            boxShadow: 'var(--profile-buttons-boxShadow)'}}>
                                            <p className=' text-sm mx-1' >{index + 1}</p>
                                            <p className='text-sm px-6 w-full text-start'>{student.data.fullName} </p>
                                            <RemoveIcon sx={{background:  'var(--profile-buttons-background)',
                                            boxShadow: 'var(--profile-buttons-boxShadow)',
                                            borderRadius:'0.5rem',
                                            color:'var(--red-text)'}}
                                            onClick={() => handleRemoveGuestStudents(index)} />
                                        </li>
                                    ))}
                                </ul>
                            }


                            <button type='submit' onClick={handleSubmit} className={`${ButtonStyles.addButton} w-36 mt-2`}>ثبت </button>

                        </form>
                    }

                </div>
            </div>
        </div>
    );
};

export default AddClass;