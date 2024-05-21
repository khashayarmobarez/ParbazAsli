import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// queries
import { addGeneralComment } from '../Utilities/Services/queries';

// assets
import contactUs from '../assets/ApiData Temporary/picture/contacUs.jpg'
import mailIcon from '../assets/icons/mail-Icon (Stroke).svg'

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// mui
import useMediaQuery from '@mui/material/useMediaQuery';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PageTitle from '../components/reuseable/PageTitle';
import TextInput from '../components/inputs/textInput';
import LongTextInput from '../components/inputs/LongTextInput';

const ContactUs = () => {

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [comment, setComment] = useState('');
    const [errorMessages, setErrorMessages] = useState(null);

    const queryClient = useQueryClient();

    const mutation = useMutation(addGeneralComment, {
        onSuccess: (data) => {
            // Log the response data
            console.log('Success:', data);

            // Clear error messages
            setErrorMessages(null);

            // Invalidate and refetch any queries that could be affected by this mutation
            queryClient.invalidateQueries(['comments']);
            setEmail('');
            setFullName('');
            setComment('');
        },
        onError: (error) => {
            if (error.message.includes('No response received')) {
              setErrorMessages([{ errorMessage: 'Failed to receive a response from the server. Please try again later.' }]);
            } else if (error.message.includes('An error occurred')) {
              setErrorMessages([{ errorMessage: error.message }]);
            } else {
              setErrorMessages([{ errorMessage: 'An unexpected error occurred. Please try again later.' }]);
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
    
        mutation.mutate(commentData, {
          onSuccess: () => {
            setEmail('');
            setFullName('');
            setComment('');
          },
        });
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

                <div className='w-[90%] flex flex-col rounded-3xl py-6 px-8 gap-y-6 mb-8 mt-10 md:w-[50%] md:self-start md:flex-row' style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)'}}>

                    <div className='w-full flex justify-between gap-y-8 md:py-4 md:flex-col' >

                        <div className='flex flex-col gap-y-10 py-4'>
                            <h1 className=' text-2xl self-start' style={{color:'var(--yellow-text)'}}>راه‌های ارتباطی</h1>
                            <div className='flex gap-x-4'><EmailOutlinedIcon /><p>info@digilogbook.ir</p></div>
                            <div className='flex gap-x-4'><LocalPhoneOutlinedIcon /><p>021-77788899</p></div>
                        </div>

                        <div className='flex flex-col gap-y-4 md:gap-y-6'>

                            <div className='w-[53px] h-[53px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                                <XIcon sx={{width:'60%', height:'60%', color:'var(--yellow-text)'}} />
                            </div>
                            <div className='w-[53px] h-[53px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                                <InstagramIcon sx={{width:'60%', height:'60%', color:'var(--yellow-text)'}} />
                            </div>
                            <div className='w-[53px] h-[53px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                                <WhatsAppIcon sx={{width:'60%', height:'60%', color:'var(--yellow-text)'}} />
                            </div>

                        </div>


                    </div>

                    <form className='flex flex-col w-full gap-y-6 mb-4' onSubmit={handleSubmit}>

                        <h1 className=' text-right'>نظرات خود را با ما در میان بگذارید</h1>

                        <TextInput  placeholder='نام' value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required  />

                        <TextInput  placeholder='ایمیل' icon={mailIcon}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                        <LongTextInput placeholder='نظر شما...' value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        minLength={4}
                        maxLength={500}/>

                        <button className={`${ButtonStyles.addButton} w-[100%]`} type="submit" disabled={mutation.isLoading} >
                            <p>ارسال</p>
                        </button>
                        
                        <div>
                            {mutation.isLoading && <p>در حال ارسال کامنت, لطفا صبر کنید.</p>}
                            {mutation.isError && (
                                <div>
                                    {errorMessages && errorMessages.map((err, index) => (
                                         err.errorKey === 'Email' && <p key={index} style={{ color: 'red' }}>ایمیل خود را وارد کنید</p>
                                    ))}
                                </div>
                            )}
                            {mutation.isSuccess && <p >کامنت شما ارسال شد</p>}
                        </div>

                    </form>
                    
                </div>
                
            </div>
            
        </div>
    );
};

export default ContactUs;