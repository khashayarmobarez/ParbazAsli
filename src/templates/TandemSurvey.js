import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// mui
import { CircularProgress } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

// assets
import checkIcon from '../assets/icons/bigCheckIcon.svg'

// queries
import { useIsSurveyAvailabe, useSubmitSurvey } from '../Utilities/Services/notificationAndSurveyQueries';
import DescriptionInput from '../components/inputs/DescriptionInput';
import { toast } from 'react-toastify';
import StarRating from '../components/reuseable/StarRating';

const TandemSurvey = () => {

    const appTheme = Cookies.get('themeApplied') || 'dark';

    const navigate = useNavigate()
    const { id } = useParams();

    const [rating, setRating] = useState(0); // Default to 2 stars
    const [description, setDescription] = useState('');
    const [videoFiles, setVideoFiles] = useState([]);

    const [ surveyIsSubmited, setSurveyIsSubmited ] = useState(false)

    const { data: IsSurveyAvailable, isLoading: availablityLoading, error: availablityError } = useIsSurveyAvailabe(id);
    const { mutate: submitSurvey, isLoading: submitSubmitSurveyLoading } = useSubmitSurvey();

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to array
        const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
        const maxSize = 150 * 1024 * 1024; // 150MB
    
        const validFiles = files.filter((file) => validTypes.includes(file.type) && file.size <= maxSize);
    
        if (validFiles.length > 0) {
            setVideoFiles((prevFiles) => [...prevFiles, ...validFiles]);
        } else {
          setVideoFiles([]);
          toast('نوع یا اندازه فایل‌ها نامعتبر است. لطفاً فایل‌های ویدیویی کمتر از 50 مگابایت آپلود کنید.', {
            type: 'error',
            position: 'top-right',
            autoClose: 5000,
            theme: appTheme,
            style: { width: '90%' },
          });
        }
    };

    const handleRemoveVideo = (file) => {
        setVideoFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        if (!rating) {
            toast('لطفا امتیاز دهید', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        } else {

            const formData = new FormData();

            console.log()

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
                            theme: appTheme,
                            style: { width: "90%" }
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
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
                            theme: appTheme,
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
                                    <CircularProgress sx={{ color:'var(--text-accent) '}} />
                                </div>
                        }

                        {
                            !availablityLoading && !IsSurveyAvailable &&
                            <div className='mt-40 flex flex-col items-center justify-center gap-y-6 w-full'>
                                <img src={checkIcon} alt='check icon' className='w-16 h-w-16' />
                                <p className=' text-textDefault text-xl' >با تشکر از همکاری شما...</p>
                                <button onClick={() => navigate('/profile')} type="submit" className={`${ButtonStyles.addButton} w-32 h-12`}>صفحه اصلی</button>
                            </div>
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

                                <p className='text-center px-4 text-base mt-6 mb-2 text-[var(--text-accent)]'>در صورت تمایل ویدیو پرواز خود را آپلود کنید</p>

                                
                                <div className="w-full">

                                    {/* Hidden file input */}
                                    <input
                                        id="fileInput"
                                        className="hidden" // Hide the default input
                                        name="file"
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                    />

                                    {/* Custom-styled label to act as a button */}
                                    <label
                                        htmlFor="fileInput"
                                        className={`${ButtonStyles.normalButton} w-full h-12 flex items-center justify-center cursor-pointer`} // Custom styles
                                    >
                                        آپلود  ویدئو
                                    </label>

                                    <p className=' text-xs mt-2 text-start'>فرمت مجاز: mp4, mov ,webm و mkv تا حجم 150 مگابایت</p>

                                </div>

                                {videoFiles.length > 0 && (
                                    <ul className="w-full text-xs mt-2">
                                        {videoFiles.map((file, index) => (
                                            <li key={index} className='w-full px-4 py-3 gap-x-4 rounded-2xl flex justify-between items-center mt-4 bg-bgCard shadow-lg'>
                                                    <p>{index + 1}</p>
                                                    <p>{file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}</p> 
                                                    <RemoveIcon sx={{
                                                        background:  'var(--bg-button-secondary-default)',
                                                        boxShadow: 'var(--shadow-all)',
                                                        borderRadius:'0.5rem',
                                                        color:'var(--text-error)'}}
                                                        onClick={() => handleRemoveVideo(file)}
                                                    />
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <button type="submit" disabled={!rating || submitSubmitSurveyLoading} className={`${ButtonStyles.addButton} ${(!rating || submitSubmitSurveyLoading) && 'opacity-45'} w-32 h-12 mt-8`}>ثبت</button>

                            </form>
                        }
                    </div>
        </div>
    );
};

export default TandemSurvey;
