import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../styles/ButtonsBox.module.css'

// mui
import { CircularProgress } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

// assets
import checkIcon from '../assets/icons/bigCheckIcon.svg'

// queries
import { useIsSurveyAvailabe, useSubmitSurvey } from '../Utilities/Services/notificationAndSurveyQueries';
import DescriptionInput from '../elements/inputs/DescriptionInput';
import { toast } from 'react-toastify';
import StarRating from '../elements/reuseable/StarRating';
import { useTranslation } from '../Utilities/context/TranslationContext';

const TandemSurvey = () => {

    // language
    const { t } = useTranslation();

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
          toast(t("tandemSurvey.invalidFileMessage"), {
            type: 'error',
            position: 'top-center',
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
            toast(t("tandemSurvey.ratingError"), {
                type: 'error',
                position: 'top-center',
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
                        toast(t("tandemSurvey.successMessage"), {
                            type: 'success',
                            position: 'top-center',
                            autoClose: 5000,
                            theme: appTheme,
                            style: { width: "90%" }
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    },
                    onError: (error) => {
                        let errorMessage = t("tandemSurvey.errorMessage");
                        if (error.response && error.response.data && error.response.data.ErrorMessages) {
                            errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                        }
                        toast(errorMessage, {
                            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
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
                    <div className='flex flex-col py-16 justify-center items-center w-[90%] md:w-[40%]'>

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
                                <p className=' text-textDefault text-xl' >{t("tandemSurvey.thankYouMessage")}</p>
                                <button onClick={() => navigate('/profile')} type="submit" className={`${ButtonStyles.addButton} w-32 h-12`}>{t("tandemSurvey.thankYouMessage")}</button>
                            </div>
                        }

                        {
                            IsSurveyAvailable &&
                            <form className='w-full flex flex-col gap-y-4 items-center pt-16' onSubmit={handleSubmit}>

                                <p className='text-center px-4 text-sm'>{t("tandemSurvey.feedbackMessage")}</p>

                                {/* star rating */}
                                <div className='w-[70%]'>
                                    <StarRating rate={rating} setRate={setRating} />
                                </div>

                                {/* description input */}
                                <div className='w-full flex flex-col gap-y-2 '>
                                    <DescriptionInput
                                        value={description}
                                        onChange={handleDescription}
                                        placeholder={t("tandemSurvey.rateReason")}
                                    />
                                </div>

                                <p className='text-center px-4 text-base mt-6 mb-2 text-[var(--text-accent)]'>{t("tandemSurvey.uploadVideo")}</p>

                                
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
                                        {t("tandemSurvey.uploadvideoSection")}
                                    </label>

                                    <p className=' text-xs mt-2 text-start'>{t("tandemSurvey.allowedFormats")}</p>

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
