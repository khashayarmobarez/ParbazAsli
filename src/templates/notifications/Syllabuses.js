import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonStyles from '../../styles/ButtonsBox.module.css';
import PageTitle from '../../components/reuseable/PageTitle';
import { useAcceptUserPracticalActivity, useACourseSyllabi } from '../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';
import DescriptionInput from '../../components/inputs/DescriptionInput';
import TextInput from '../../components/inputs/textInput';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// assets
import SearchIcon from '../../components/icons/SearchIcon';
import { usePracticalActivity } from '../../Utilities/Services/flightHistoriesQueries';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const Syllabuses = () => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate();
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const { courseId, flightId } = useParams();

    
    const [counters, setCounters] = useState([]);
    const [description, setDescription] = useState('');
    const [countersSum, setCountersSum] = useState(0);
    const [syllabiType, setSyllabiType] = useState(2)

    const { data: syllabiDataPractical } = useACourseSyllabi(courseId, syllabiType);
    const { data: fullPracticalActivityData } = usePracticalActivity(flightId);
    const [searchSyllabus, setSearchSyllabus] = useState('');
    const { mutate: mutateAccept, isLoading: isSubmitting} = useAcceptUserPracticalActivity();

    useEffect(() => {
        if(fullPracticalActivityData.data.groundHandling) {
            // 3 for ground handling
            setSyllabiType(3)
        }
    },[fullPracticalActivityData] )


    useEffect(() => {
        let sum = 0;
        counters.forEach((counter) => {
            sum += counter;
        });
        setCountersSum(sum);
    }, [counters])

    useEffect(() => {
        if (syllabiDataPractical && syllabiDataPractical.data) {
            setCounters(new Array(syllabiDataPractical.data.length).fill(0));
        }
    }, [syllabiDataPractical]);

    const handleIncrement = (index) => {
        setCounters((prevCounters) => {
            const newCounters = [...prevCounters];
            newCounters[index] += 1;
            return newCounters;
        });
    };

    const handleDecrement = (index) => {
        setCounters((prevCounters) => {
            const newCounters = [...prevCounters];
            if (newCounters[index] > 0) {
                newCounters[index] -= 1;
            }
            return newCounters;
        });
    };

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    

    const handleReset = (event) => {
        event.preventDefault();
        if (syllabiDataPractical && syllabiDataPractical.data) {
            setCounters(new Array(syllabiDataPractical.data.length).fill(0));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        
        if (syllabiDataPractical && syllabiDataPractical.data) {
            // Filter out syllabi where the counter is 0
            const updatedSyllabi = syllabiDataPractical.data
                .map((syllabus, index) => ({
                    id: syllabus.id,
                    completedTimes: counters[index]
                }))
                .filter(syllabus => syllabus.completedTimes > 0);
    
            // Construct the submit data
            const submitData = {
                practicalActivityId: flightId,
                syllabi: updatedSyllabi,
                description: description
            };
            if(updatedSyllabi.length > 0) {
            // Submit the data
            mutateAccept(submitData, {
                onSuccess: () => {
                    toast(t('notifications.approveStudentFlight.syllabi.flightApproved'), {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: '90%' }
                    });
                    navigate(-2);
                },
                onError: (error) => {
                    let errorMessage = t('notifications.approveStudentFlight.syllabi.errorOccurred');
                    if (error.response && error.response.data && error.response.data.ErrorMessages) {
                        errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    }
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: '350px' },
                    });
                }
            });
            } else {
                toast(t('notifications.approveStudentFlight.syllabi.completeSyllabus'), {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 3000,
                    theme: appTheme,
                    style: { width: '350px' },
                });
            }
        }
    };
    

    const filteredSyllabi = syllabiDataPractical && syllabiDataPractical.data.filter(syllabus => syllabus.description.includes(searchSyllabus));

    return (
        <div className="py-14 flex flex-col justify-center items-center gap-y-6">

            <div className='flex flex-col items-center w-full lg:w-[50%]'>

                <PageTitle title={t('notifications.approveStudentFlight.syllabi.title')} />

                <form className="w-[90%] flex flex-col gap-y-4 pt-4 md:pt-8" onSubmit={handleSubmit}>
                    <p className='flex text-center items-center self-center text-xs'>
                        {t('notifications.approveStudentFlight.syllabi.selectSyllabi')}
                    </p>

                    <TextInput
                        id={'TI1'}
                        value={searchSyllabus}
                        onChange={(e) => setSearchSyllabus(e.target.value)}
                        placeholder={t('notifications.approveStudentFlight.syllabi.searchPlaceholder')}
                        icon={<SearchIcon />}
                    />

                    {filteredSyllabi &&
                        filteredSyllabi.map((syllabus, index) => (
                            <div
                                key={syllabus.id}
                                className="flex h-12 items-center justify-between px-4 rounded-2xl text-xs w-full bg-bgOutputDefault"
                                style={{ boxShadow: 'var(--shadow-all)' }}
                            >
                                <div className="flex w-full justify-between items-center gap-x-3">
                                    <div className='flex items-center justify-start gap-x-2'>
                                        <p>{index + 1}.</p>
                                        <p className='w-full text-start'>{syllabus.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-x-2">
                                        <span className={`text-white rounded-lg w-6 h-6 cursor-pointer bg-bgButtonProfileDefault`}
                                            style={{ boxShadow: 'var(--shadow-all)' }}
                                            onClick={() => handleIncrement(index)}>
                                            <AddIcon
                                                sx={{ color: 'var(--text-accent)' }}
                                            />
                                        </span>
                                        <p className='p-1'>
                                            {counters[index]}
                                        </p>
                                        <span className={`text-white rounded-lg w-6 h-6 cursor-pointer ${counters[index] === 0 ? 'bg-bgButtonProfileDisabled' : 'bg-bgButtonProfileDefault'}`}
                                            onClick={() => handleDecrement(index)}
                                            style={{ boxShadow: counters[index] !== 0 && 'var(--shadow-all)' }}>
                                            <RemoveIcon
                                                sx={{ color: counters[index] === 0 ? 'var(--text-disabled)' : 'var(--text-error)' }}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    <div className="w-full flex flex-col gap-y-2">
                        <h1 className="self-center">{t('notifications.approveStudentFlight.syllabi.description')}</h1>
                        <DescriptionInput
                            value={description}
                            onChange={handleDescription}
                            placeholder={t('notifications.approveStudentFlight.syllabi.descriptionPlaceholder')}
                        />
                    </div>

                    <div className="w-full flex justify-between gap-x-[6%]">
                        <button
                            disabled={isSubmitting}
                            onClick={handleReset}
                            className={`${ButtonStyles.normalButton} w-full`}
                        >
                            {t('notifications.approveStudentFlight.syllabi.reset')}
                        </button>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className={`${ButtonStyles.addButton} w-full`}
                        >
                            {countersSum > 0 ? t('notifications.approveStudentFlight.syllabi.submitWithCount', { countersSum }) : t('notifications.approveStudentFlight.syllabi.submit')}
                        </button>
                    </div>
                </form>
                
            </div>

        </div>
    );
};

export default Syllabuses;
