import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css';
import plus from '../../../assets/icons/plusButton.png';
import minus from '../../../assets/icons/minusButton.png';
import PageTitle from '../../reuseable/PageTitle';
import { useAcceptUserFlight, useACourseSyllabi } from '../../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';
import DescriptionInput from '../../inputs/DescriptionInput';

const Syllabuses = () => {
    const navigate = useNavigate();
    const { courseId, flightId } = useParams();
    const { data: syllabiDataPractical, isLoading: syllabiDataPracticalLoading, error: syllabiDataPracticalError } = useACourseSyllabi(courseId, 2);
    const { mutate: mutateAccept, isLoading: isSubmitting, error: submitError } = useAcceptUserFlight();

    const [counters, setCounters] = useState([]);
    const [description, setDescription] = useState('');

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
                flightId: flightId,
                syllabi: updatedSyllabi,
                description: description
            };
            if(updatedSyllabi.length > 0) {
            // Submit the data
                mutateAccept(submitData, {
                    onSuccess: () => {
                        toast('پرواز با موفقیت تایید شد', {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: 'dark',
                            style: { width: '90%' }
                        });
                        navigate('/notifications');
                    },
                    onError: (error) => {
                        let errorMessage = 'خطایی رخ داده است';
                        if (error.response && error.response.data && error.response.data.ErrorMessages) {
                            errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                        }
                        toast(errorMessage, {
                            type: 'error',
                            position: 'top-right',
                            autoClose: 3000,
                            theme: 'dark',
                            style: { width: '350px' },
                        });
                    }
                });
            } else {
                toast('لطفا حداقل یک سیلابس را تکمیل کنید', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                    style: { width: '350px' },
                });
            }
        }
    };
    

    return (
        <div className="py-14 flex flex-col justify-center items-center gap-y-6">
            <PageTitle title={'سیلابس‌ها'} />
            <form className="w-[90%] flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-y-2">
                    <h1 className="self-center">توضیحات</h1>
                    <DescriptionInput
                        value={description}
                        onChange={handleDescription}
                        placeholder="توضیحات پرواز را اینجا بنویسید"
                    />
                </div>
                {syllabiDataPractical &&
                    syllabiDataPractical.data.map((syllabus, index) => (
                        <div
                            key={syllabus.id}
                            className="flex h-12 items-center justify-between px-4 rounded-2xl text-xs w-full"
                            style={{ backgroundColor: 'var(--syllabus-data-boxes-bg)' }}
                        >
                            <div className="flex w-full justify-between items-center">
                                <p>{index + 1}.</p>
                                <p className='w-[60%]'>{syllabus.description}</p>
                                <div className="flex items-center justify-between w-24">
                                    <img
                                        src={plus}
                                        alt="icon"
                                        onClick={() => handleIncrement(index)}
                                        className="text-white rounded-lg w-8 cursor-pointer"
                                    />
                                    <input
                                        type="number"
                                        value={counters[index] || 0}
                                        readOnly
                                        style={{ backgroundColor: 'transparent' }}
                                        className="rounded-lg w-4 text-center text-sm"
                                    />
                                    <img
                                        src={minus}
                                        alt="icon"
                                        onClick={() => handleDecrement(index)}
                                        className={`text-white rounded-lg w-8 cursor-pointer ${counters[index] === 0 && 'opacity-35'}`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                <div className="w-full flex justify-around mt-8">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className={`${ButtonStyles.addButton} w-32`}
                    >
                        ثبت نهایی
                    </button>
                    <button
                        disabled={isSubmitting}
                        onClick={handleReset}
                        className={`${ButtonStyles.normalButton} w-32`}
                    >
                        تنظیم مجدد
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Syllabuses;
