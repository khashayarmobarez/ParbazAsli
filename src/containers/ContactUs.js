import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// queries
import { addGeneralComment } from '../Utilities/Services/queries';

// react-toastify
import { toast } from 'react-toastify';

// assets
import contactUs from '../assets/ApiData Temporary/picture/contacUs.jpg'
import MailIcon from '../components/icons/MailIcon'

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// mui
import useMediaQuery from '@mui/material/useMediaQuery';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import PageTitle from '../components/reuseable/PageTitle';
import TextInput from '../components/inputs/textInput';
import LongTextInput from '../components/inputs/LongTextInput';

const ContactUs = () => {

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [comment, setComment] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [errorMessages, setErrorMessages] = useState({ fullName: null, email: null, comment: null });
    
    const queryClient = useQueryClient();

    useEffect(() => {
        const errors = {};
    
        if (!email.trim()) {
          errors.email = 'لطفا ایمیل را وارد کنید.';
        }
    
        if (!fullName.trim()) {
          errors.fullName = 'لطفا نام را وارد کنید.';
        }
    
        if (comment.trim().length < 4 || comment.trim().length > 500) {
          errors.comment = 'نظر باید بین 4 تا 500 کاراکتر باشد.';
        }
    
        console.log(errors)
        setErrorMessages(errors);
    }, [email, fullName, comment]);

    const sendEmailHandler = () => {
        window.location.href = "mailto: info@digilogbook.ir";
    }

    const callHandler = () => {
        window.location.href = "tel:09965089408";
    }

    const contactViaTelegramHandler = () => {
        window.open('https://t.me/digilogbook', '_blank');
    }


    const mutation = useMutation(addGeneralComment, {
        onSuccess: (data) => {
            // Log the response data
            console.log('Success:', data);

            // Clear error messages
            setErrorMessages('');

            // Invalidate and refetch any queries that could be affected by this mutation
            queryClient.invalidateQueries(['comments']);
            setEmail('');
            setFullName('');
            setComment('');

            toast('نظر شما ثبت شده و به بخش مدیریت ارسال شد.', {
                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
              });
        },
        onError: (error) => {
            console.error('Error adding comment:', error);
          
            if (error.response && error.response.data && error.response.data.errorMessages) {
              setErrorMessages(error.response.data.errorMessages);
            } else {
              setErrorMessages([{ errorMessage: 'An unexpected error occurred. Please try again later.' }]);
              toast('مشکلی وجود دارد, دوباره تلاش کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
              });
            }
          },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const commentData = {
          email,
          fullName,
          comment,
        };

        const hasErrors = Object.values(errorMessages).some(
            (value) => value !== null && value !== undefined && value !== ''
        );
    
        if (!hasErrors) {
            mutation.mutate(commentData, {
              onSuccess: () => {
                setShowErrors(false);
                setEmail('');
                setFullName('');
                setComment('');
              },
            });
          } else {
            setShowErrors(true);
            toast('فرم صحیح پر نشده', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
              });
          }
      };

    const isBelow768px = useMediaQuery('(max-width:768px)');

    return (
        <div className=' w-full flex flex-col items-center pb-20 md:pb-0' 
        style={{ backgroundImage: `url(${contactUs})`, backgroundSize: 'cover', backgroundPosition: 'top left' }}>
            
            <div className='w-full flex flex-col items-center mt-16 min-h-[60vh] pb-6 gap-y-10 md:px-8' >

                {
                isBelow768px &&
                <PageTitle title={'راه‌های ارتباطی'} />
                }

                <div className='w-[90%] flex flex-col rounded-3xl py-6 px-8 gap-y-6 mb-8 mt-10 md:w-[50%] md:flex-row md:self-center' 
                style={{background:'var(--bg-card)', boxShadow:'var(--shadow-all)'}}>

                    <div className='w-full flex justify-between gap-y-8 md:py-4 md:flex-col' >

                        <div className='flex flex-col gap-y-10 py-4'>
                            <h1 className=' text-2xl self-start' style={{color:'var(--text-accent)'}}>راه‌های ارتباطی</h1>
                            <div className='flex gap-x-4 cursor-pointer' onClick={sendEmailHandler}>
                                <EmailOutlinedIcon />
                                <p>info@digilogbook.ir</p>
                            </div>
                            <div className='flex gap-x-4 cursor-pointer' onClick={callHandler}>
                                <LocalPhoneOutlinedIcon />
                                <p>09965089408</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-4 md:gap-y-6'>

                            <div className='w-[53px] h-[53px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center cursor-pointer' 
                            style={{background: 'var(--bg-button-secondary-default)',boxShadow: 'var(--shadow-all)'}}>
                                <XIcon sx={{width:'60%', height:'60%', color:'var(--text-accent)'}} />
                            </div>
                            <div className='w-[53px] h-[53px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center cursor-pointer' 
                            style={{background: 'var(--bg-button-secondary-default)',boxShadow: 'var(--shadow-all)'}}>
                                <InstagramIcon sx={{width:'60%', height:'60%', color:'var(--text-accent)'}} />
                            </div>
                            <div className='w-[53px] h-[53px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center cursor-pointer'
                            style={{background: 'var(--bg-button-secondary-default)',boxShadow: 'var(--shadow-all)'}}
                            onClick={contactViaTelegramHandler}>
                                <TelegramIcon sx={{width:'60%', height:'60%', color:'var(--text-accent)'}} />
                            </div>

                        </div>


                    </div>

                    <form className='flex flex-col w-full gap-y-6 mb-4' onSubmit={handleSubmit}>

                        <h1 className=' text-right'>نظرات خود را با ما در میان بگذارید</h1>

                        <div className='w-full flex flex-col'>
                            <TextInput  placeholder='نام' value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required  />
                            {showErrors && errorMessages.fullName && 
                                <p className=' text-textError text-right'>{errorMessages.fullName}</p>
                            }
                        </div>

                        <div className='w-full flex flex-col'>
                            <TextInput  placeholder='ایمیل' icon={<MailIcon />}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                            {showErrors && errorMessages.email &&
                                <p className=' text-textError text-right'>{errorMessages.email}</p>
                            }
                        </div>

                        <div className='w-full flex flex-col'>    
                            <LongTextInput placeholder='نظر شما...' 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            minLength={4}
                            maxLength={500}/>
                            {showErrors && errorMessages.email &&
                                <p className=' text-textError text-right'>{errorMessages.comment}</p>
                            }
                        </div>

                        <button className={`${ButtonStyles.addButton} w-[100%]`} type="submit" disabled={mutation.isLoading} >
                            <p>ارسال</p>
                        </button>
                        
                        <div>
                            {mutation.isLoading && <p>در حال ارسال کامنت, لطفا صبر کنید.</p>}
                            {/* add an additional check before mapping over errorMessages, This way, the component will only attempt to map over errorMessages if it's an array. */}
                            {mutation.isError && mutation.isError && Array.isArray(errorMessages) && (
                                <div>
                                    {errorMessages && errorMessages.map((err, index) => (
                                        <p key={index} style={{ color: 'red' }}>
                                        {err.errorMessage}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>

                    </form>
                    
                </div>
                
            </div>
            
        </div>
    );
};

export default ContactUs;