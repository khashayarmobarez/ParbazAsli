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
import StarRating from '../../reuseable/StarRating';

const TandemSurvey = () => {
    const { id } = useParams();

    const [rating, setRating] = useState(0); // Default to 2 stars
    const [description, setDescription] = useState('');
    const [videoFiles, setVideoFiles] = useState([]);

    const { data: IsSurveyAvailable, isLoading: availablityLoading, error: availablityError } = useIsSurveyAvailabe(id);
    const { mutate: submitSurvey, isLoading: submitSubmitSurveyLoading } = useSubmitSurvey();

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to array
        const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        const maxSize = 50 * 1024 * 1024; // 50MB
    
        const validFiles = files.filter((file) => validTypes.includes(file.type) && file.size <= maxSize);
    
        if (validFiles.length > 0) {
          setVideoFiles(validFiles);
        } else {
          setVideoFiles([]);
          toast('نوع یا اندازه فایل‌ها نامعتبر است. لطفاً فایل‌های ویدیویی کمتر از 50 مگابایت آپلود کنید.', {
            type: 'error',
            position: 'top-right',
            autoClose: 5000,
            theme: 'dark',
            style: { width: '90%' },
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

            videoFiles.forEach((file) => {
                formData.append(`files`, file); // Append each file with a unique key
            });
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

                        {/* star rating */}
                        <div className='w-[70%]'>
                            <StarRating rate={rating} setRate={setRating} />
                        </div>

                        {/* description input */}
                        <div className='w-full flex flex-col gap-y-2 '>
                            <DescriptionInput
                                value={description}
                                onChange={handleDescription}
                                placeholder='دلیل نمره خود را بنویسید...'
                            />
                        </div>

                        <p className='text-center px-4 text-base mt-6 mb-2 text-[var(--yellow-text)]'>در صورت تمایل ویدیو پرواز خود را آپلود کنید</p>

                        
                        <div className="w-full">

                            {/* Hidden file input */}
                            <input
                                id="fileInput"
                                className="hidden" // Hide the default input
                                name="file"
                                type="file"
                                onChange={handleFileChange}
                            />

                            {/* Custom-styled label to act as a button */}
                            <label
                                htmlFor="fileInput"
                                className={`${ButtonStyles.normalButton} w-full h-12 flex items-center justify-center cursor-pointer`} // Custom styles
                            >
                                آپلود  ویدئو
                            </label>

                            <p className=' text-xs mt-2 text-start'>فرمت مجاز: mp4, mov ,webm و mkv تا حجم 4 مگابایت</p>

                        </div>

                        {videoFiles.length > 0 && (
                            <ul className="text-xs mt-2">
                                {videoFiles.map((file, index) => (
                                <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        )}

                        <button type="submit" disabled={!rating || submitSubmitSurveyLoading} className={`${ButtonStyles.addButton} ${(!rating || submitSubmitSurveyLoading) && 'opacity-45'} w-32 h-12 mt-8`}>تایید</button>

                    </form>
                }
            </div>
        </div>
    );
};

export default TandemSurvey;
