import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// styles
import styles from './TandemSurvey.module.css';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import { CircularProgress } from '@mui/material';

// queries
import { useIsSurveyAvailabe, useSubmitSurvey } from '../../../Utilities/Services/notificationAndSurveyQueries';
import DescriptionInput from '../../inputs/DescriptionInput';
import { toast } from 'react-toastify';

const TandemSurvey = () => {
    const { id } = useParams();

    const [rating, setRating] = useState(0); // Default to 2 stars
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);

    const { data: IsSurveyAvailable, isLoading: availablityLoading, error: availablityError } = useIsSurveyAvailabe(id);
    const { mutate: submitSurvey, isLoading: submitSubmitSurveyLoading } = useSubmitSurvey();

    const handleRatingChange = (event) => {
        setRating(Number(event.target.value));
    };

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        const maxSize = 50 * 1024 * 1024; // 50MB

        if (file && validTypes.includes(file.type) && file.size <= maxSize) {
            setVideoFile(file);
        } else {
            setVideoFile(null);
            toast('Invalid file type or size. Please upload a video file less than 50MB.', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
        }
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        if (!rating) {
            toast('لطفا امتیاز دهید', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
            return;
        } else {

            const formData = new FormData();

            formData.append('file', videoFile);
            formData.append('rate', rating);
            formData.append('id', id);
            formData.append('description', description);

            submitSurvey(formData
                , {
                    onSuccess: () => {
                        toast('امتیاز شما با موفقیت ثبت شد', {
                            type: 'success',
                            position: 'top-right',
                            autoClose: 5000,
                            theme: 'dark',
                            style: { width: "90%" }
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    },
                    onError: (error) => {
                        let errorMessage = 'خطایی رخ داده است';
                        if (error.response && error.response.data && error.response.data.ErrorMessages) {
                            errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                        }
                        toast(errorMessage, {
                            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                            autoClose: 3000,
                            theme: 'dark',
                            style: { width: "350px" }
                        });
                    }
                }
            );

        }


        // Proceed with form submission logic

    };

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='flex flex-col py-16 justify-center items-center w-[90%] md:w-[80%]'>

                {
                    availablityLoading &&
                        <div className='fixed w-[100svh] h-[100svh] z-[110] backdrop-blur-sm flex flex-col justify-center items-center gap-y-2 pt-56'>
                            <CircularProgress sx={{ color:'var(--yellow-text) '}} />
                        </div>
                }

                {
                    !availablityLoading && !IsSurveyAvailable &&
                    <p className='mt-32' style={{ color: 'var(--yellow-text)' }}>این نظرسنجی ثبت شده است</p>
                }

                {
                    IsSurveyAvailable &&
                    <form className='w-full flex flex-col gap-y-4 items-center pt-16' onSubmit={handleSubmit}>

                        <p className='text-center px-4 text-sm'>با نظرات مفید خود از پروازی که انجام دادید ما را در راستای پیشرفت و هر چه بهتر شدن یاری فرمایید</p>

                        <div className={styles.rating}>
                            {[5, 4, 3, 2, 1].map((star) => (
                                <React.Fragment key={star}>
                                    <input 
                                        type="radio" 
                                        id={`star${star}`} 
                                        name="rate" 
                                        value={star} 
                                        checked={rating === star} 
                                        onChange={handleRatingChange} 
                                    />
                                    <label htmlFor={`star${star}`} title={`${star} stars`}></label>
                                </React.Fragment>
                            ))}
                        </div>

                        <p className='text-center px-4 text-sm mt-2'>دلیل نمره خود را بنویسید</p>

                        {/* description input */}
                        <div className='w-full flex flex-col gap-y-2 '>
                            <DescriptionInput
                                value={description}
                                onChange={handleDescription}
                                placeholder='دلیل نمره خود را بنویسید...'
                            />
                        </div>

                        <p className='text-center px-4 text-sm mt-6'>ویدیو پرواز خود را آپلود کنید</p>

                        <div className={`${styles.inputDiv} `}>
                            <input 
                                className={styles.input} 
                                name="file" 
                                type="file" 
                                onChange={handleFileChange} 
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                fill="none"
                                stroke="currentColor"
                                className={styles.icon}
                            >
                                <polyline points="16 16 12 12 8 16" />
                                <line y2="21" x2="12" y1="12" x1="12" />
                                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                <polyline points="16 16 12 12 8 16" />
                            </svg>
                        </div>
                        {
                            videoFile &&
                            <p className='text-xs mt-2'>{videoFile.name}</p>
                        }

                        <button type="submit" disabled={!rating || submitSubmitSurveyLoading} className={`${ButtonStyles.addButton} ${(!rating || submitSubmitSurveyLoading) && 'opacity-45'} w-24 mt-8`}>تایید</button>

                    </form>
                }
            </div>
        </div>
    );
};

export default TandemSurvey;
