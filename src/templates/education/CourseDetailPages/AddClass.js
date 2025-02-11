import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../../styles/ButtonsBox.module.css'

// assets
import ADressTag from '../../../components/icons/ADressTag';
import ListIcon from '../../../components/icons/ListIcon';
import UsersIcon from '../../../components/icons/UsersIcon';
import RemoveIcon from '@mui/icons-material/Remove';

// queries
import {  useACourseSyllabi, useAddCourseClass, useAllStudents } from '../../../Utilities/Services/coursesQueries';
import { useUserById } from '../../../Utilities/Services/queries';


// components
import PageTitle from '../../../components/reuseable/PageTitle';
import TextInput from '../../../components/inputs/textInput';
import SearchMultipleSelectStudent from '../../../components/inputs/SearchMultipleSelectStudent';
import DescriptionInput from '../../../components/inputs/DescriptionInput';
import SelectMultiplePopUp from '../../../components/reuseable/SelectMultiplePopUp';
import { TimePicker } from '../../../components/inputs/TimePicker';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const AddClass = () => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate();
    const { id } = useParams();

    const appTheme = Cookies.get('themeApplied') || 'dark';

    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 1000

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

    const [isSubmitted, setIsSubmitted] = useState(false)
    
    // all student ids together(studentIds, guestStudentIds)
    const allStudentIds = [...studentIds, ...guestStudentIds];


    const {  data: syllabiDataTheory } = useACourseSyllabi(id,1);
    const {  data: courseStudents } = useAllStudents(1, pageNumber, pageSize );
    const { data: userByIdData } = useUserById(guestStudentId)
    const { mutate: addCourseClass } = useAddCourseClass();
    


    // a use effect to check the endSelectedTime is after StartSelectedTime when the endSelectedTime is changed
    useEffect(() => {
        if (StartSelectedTime && endSelectedTime) {
            if (StartSelectedTime > endSelectedTime) {
                toast(t("education.aCourseDetails.classes.addClassPage.endTimeBeforeStartTime"), {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            }
        }
    }, [endSelectedTime]);

    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }


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
        if (guestStudentIds.includes(guestStudentId)) {
            setGuestStudentId('')
            return;
        }
        if (userByIdData) {
            setGuestStudentDatas([...guestStudentDatas, userByIdData]);
            setGuestStudentIds([...guestStudentIds, guestStudentId]);
        }
        setGuestStudentId('')
    }

    const handleRemoveGuestStudents = (index) => {
        setGuestStudentDatas(guestStudentDatas.filter((_, i) => i !== index));
        setGuestStudentIds(guestStudentIds.filter((_, i) => i !== index));
    }



    const handleSubmit = (e) => {

        setIsSubmitted(true)
        e.preventDefault();

        if(!id || !ClassName || !StartSelectedTime || !endSelectedTime || syllabusIds.length === 0 ){
            return toast(t("education.aCourseDetails.classes.addClassPage.fillAllFields"), {
                        type: 'error',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
        } else if (StartSelectedTime > endSelectedTime) {
            return toast(t("education.aCourseDetails.classes.addClassPage.endTimeBeforeStartTime"), {
                type: 'error',
                position: 'top-center',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
        }


        // turn the startSelectedTime and end selected time into HH:mm format
        

        const classData = {
            "courseId": id,
            "Name": ClassName,
            "Description": description,
            "startTime": StartSelectedTime,
            "endTime": endSelectedTime,
            "classSyllabusIds": syllabusIds,
            // student ids with the guest student ids
            "studentUserIds": allStudentIds,
        };

        addCourseClass(classData, {
            onSuccess: () => {
                toast(t("education.aCourseDetails.classes.addClassPage.classAddedSuccessfully"), {
                    type: 'success',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                navigate(`/education/courseDetails/${id}/classes`)
            }, onError: (error) => {
                let errorMessage = t("education.aCourseDetails.classes.addClassPage.errorOccurred");
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            }
        });
            


    }

        


    return (
        <div className='w-full pt-14 flex flex-col justify-center items-center gap-y-8'>

            <div  className='w-full flex flex-col items-center gap-y-4 lg:gap-y-12 md:w-[70%]'>
            
                <PageTitle title={t("education.aCourseDetails.classes.addClassPage.addClass")} />

                <div className='w-[90%] flex flex-col gap-y-6'>


                    {
                        syllabiDataTheory && courseStudents &&

                        <form className='w-full flex flex-col items-center gap-y-6'>

                            <TextInput
                                id={'TI1'}
                                value={ClassName}
                                onChange={handleClassName}
                                placeholder={t("education.aCourseDetails.classes.addClassPage.className")}
                                icon={<ADressTag/>}
                                isSubmitted={isSubmitted}
                                ErrorCondition={!ClassName}
                                ErrorText={t("education.aCourseDetails.classes.addClassPage.classNameRequired")}
                            />

                            <div className='w-full flex flex-col gap-y-2'>
                                <TimePicker
                                    value={StartSelectedTime}
                                    onChange={handleStartTimeChange}
                                    placeholder={t("education.aCourseDetails.classes.addClassPage.startTime")}
                                    isSubmitted={isSubmitted}
                                />
                                {
                                    isSubmitted && !StartSelectedTime &&
                                    <p className='text-textError self-start text-xs -mt-1'>{t("education.aCourseDetails.classes.addClassPage.startTimeRequired")}</p>
                                }
                            </div>

                            <div className='w-full flex flex-col gap-y-2'>
                                <TimePicker
                                    value={endSelectedTime}
                                    onChange={handleEndTimeChange}
                                    placeholder={t("education.aCourseDetails.classes.addClassPage.endTime")}
                                    isSubmitted={isSubmitted}
                                />
                                {
                                    (StartSelectedTime > endSelectedTime) &&
                                    <p className='text-start text-sm text-textError' >{t("education.aCourseDetails.classes.addClassPage.endTimeBeforeStartTime")}</p>
                                }
                                {
                                    isSubmitted && !StartSelectedTime &&
                                    <p className='text-textError self-start text-xs -mt-1'>{t("education.aCourseDetails.classes.addClassPage.endTimeRequired")}</p>
                                }
                            </div>

                            {/* < SearchMultipleSelect
                                name={'مباحث مورد نظر'}
                                options={syllabiDataTheory.data}
                                selectedOptions={selectedSyllabi}
                                handleSelectChange={handleSelectChangeSyllabi}
                                handleRemove={handleRemoveSyllabi}
                                Icon={<ListIcon/>}
                            /> */}

                            <SelectMultiplePopUp
                                name={t("education.aCourseDetails.classes.addClassPage.topics")}
                                options={syllabiDataTheory.data}
                                selectedOptions={selectedSyllabi}
                                handleSelectChange={handleSelectChangeSyllabi}
                                handleRemove={handleRemoveSyllabi}
                                Icon={<ListIcon/>}
                            />
                            {
                                isSubmitted && selectedSyllabi.length < 1 &&
                                <p className='text-textError self-start text-xs -mt-3'>{t("education.aCourseDetails.classes.addClassPage.selectSyllabi")}</p>
                            }

                            
                            <DescriptionInput
                                value={description}
                                onChange={handleDescription}
                                placeholder={t("education.aCourseDetails.classes.addClassPage.classDescription")}
                                isSubmitted={isSubmitted}
                                ErrorCondition={!description}
                                ErrorText={t("education.aCourseDetails.classes.addClassPage.descriptionRequired")}
                            />

                            <SearchMultipleSelectStudent
                                name={t("education.aCourseDetails.classes.addClassPage.students")}
                                options={courseStudents.data}
                                selectedOptions={selectedStudents}
                                handleSelectChange={handleSelectChangeStudents}
                                handleRemove={handleRemoveStudents}
                                Icon={<UsersIcon/>}
                            />
                            {
                                isSubmitted && !(selectedStudents.length > 0 || guestStudentDatas.length > 0) &&
                                <p className='text-textError self-start text-xs -mt-3'>{t("education.aCourseDetails.classes.addClassPage.selectStudents")}</p>
                            }
                            

                            <div className='w-full flex flex-col items-center relative'>
                                <div className='w-full flex flex-col'>
                                    <TextInput id={'TI2'} value={guestStudentId} onChange={handleGuestStudentId} placeholder={t("education.aCourseDetails.classes.addClassPage.guestStudents")} className='w-full' />
                                </div>
                                {userByIdData?.data && (
                                    <ul className="absolute z-20 w-full bg-bgOutputDefault mt-12 rounded-xl shadow-lg max-h-60 overflow-auto" >
                                    
                                        <div className='flex flex-col w-full items-center justify-center '>
                                            <li
                                                key={userByIdData.data.id}
                                                className="px-4 py-2 w-full cursor-pointer"
                                                onClick={() => handleAddguestStudent(userByIdData.data)}
                                            >
                                                {userByIdData.data.fullName}
                                            </li>
                                        </div>

                                    </ul>
                                )}
                                {
                                    isSubmitted && !(selectedStudents.length > 0 || guestStudentDatas.length > 0) &&
                                    <p className='text-textError self-start text-xs mt-2'>{t("education.aCourseDetails.classes.addClassPage.selectGuestStudents")}</p>
                                }
                            </div>

                            {
                                guestStudentDatas &&
                                <ul className=' w-full py-0 grid grid-cols-1 gap-y-2 -mt-4'>
                                    {guestStudentDatas.map((student, index) => (
                                        <li key={student.order} className='w-full px-4 py-3 rounded-2xl flex justify-between items-center mt-4'
                                        style={{background:  'var(--bg-output-default)',
                                            boxShadow: 'var(--shadow-all)'}}>
                                            <p className=' text-sm mx-1' >{index + 1}</p>
                                            <p className='text-sm px-6 w-full text-start'>{student.data.fullName} </p>
                                            <RemoveIcon sx={{background:  'var(--bg-input-dropdown)',
                                            boxShadow: 'var(--shadow-all)',
                                            borderRadius:'0.5rem',
                                            color:'var(--text-error)'}}
                                            onClick={() => handleRemoveGuestStudents(index)} />
                                        </li>
                                    ))}
                                </ul>
                            }

                            <button type='submit' onClick={handleSubmit} className={`${ButtonStyles.addButton} w-32 mt-2`}>{t("education.aCourseDetails.classes.addClassPage.submit")}</button>

                        </form>
                    }

                </div>
            </div>
        </div>
    );
};

export default AddClass;