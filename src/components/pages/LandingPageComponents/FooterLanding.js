import React from 'react';
import { useNavigate } from 'react-router-dom';

// assets
import logo from '../../../assets/ApiData Temporary/Digilogbook -1401 12.png'
import MailIcon from '../../../components/icons/MailIcon'

// mui
import { Box, useMediaQuery, useTheme } from '@mui/material';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// components
import InputWithButton from '../../inputs/InputWithButton';

const FooterLanding = () => {

  const navigate = useNavigate()

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="footer"
      sx={{
        zIndex:'100',
        bottom:'0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        background: `var(--bg-menu)`,
        boxShadow:'var(--shadow-all)',
        borderRadius: isSmallScreen ? '0rem' : '0rem 0 0 0rem',
        height: isSmallScreen ? '375px' : '320px',
        width: '100%',
        marginTop: '0',
        marginBottom: '0',
      }}
    >
        <ul className=' hidden md:flex flex-col gap-y-4'>
            <li className='cursor-pointer' onClick={() => navigate('/profile') }>خانه</li>
            <li className='cursor-pointer' onClick={() => navigate('/blogs') }>بلاگ</li>
            <li className='cursor-pointer' onClick={() => navigate('/aboutUs') }>ارتباط با ما</li>
            <li className='cursor-pointer' onClick={() => navigate('/contactUs') }>تماس با ما</li>
        </ul>

        <div className='flex flex-col items-center gap-y-4 md:w-[30vw] w-full h-full justify-around py-4 px-4'>
            <img alt='logo' src={logo} className='w-1/2 md:w-[212px]'/>
            {isSmallScreen && 
              <>
                <ul className='w-full flex justify-around '>
                  <li onClick={() => navigate('/profile') } >خانه</li>
                  <li onClick={() => navigate('/blogs') } >بلاگ</li>
                  <li onClick={() => navigate('/aboutUs') } >درباره ما</li>
                  <li onClick={() => navigate('/contactUs') } >تماس با ما</li>
                </ul>
                <div className='w-full flex justify-around '>
                  <div className='flex gap-x-2'  ><EmailOutlinedIcon /><p>info@digilogbook.ir</p></div>
                  <div className='flex gap-x-2'  ><LocalPhoneOutlinedIcon /><p>021-77788899</p></div>
              </div>
              </>
            }
            <p className='text-lg'>عضویت در خبرنامه</p>
            <InputWithButton Type={'text'} icon={<MailIcon />} buttonText={'ارسال'} id={'email'} placeH={'ایمیل خود را وارد کنید'} />
            <p></p>
        </div>

        <div className='hidden md:flex flex-col gap-y-8'>
            <div className='flex gap-x-4'><EmailOutlinedIcon /><p>info@digilogbook.ir</p></div>
            <div className='flex gap-x-4'><LocalPhoneOutlinedIcon /><p>021-77788899</p></div>
            <div className='flex gap-x-4 mt-2'>
                <div className='w-[53px] h-[53px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                    <XIcon sx={{width:'50px', color:'var(--text-accent)'}} />
                </div>
                <div className='w-[53px] h-[53px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                    <InstagramIcon sx={{width:'50px', color:'var(--text-accent)'}} />
                 </div>
                <div className='w-[53px] h-[53px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                    <WhatsAppIcon sx={{width:'50px', color:'var(--text-accent)'}} />
                </div>
            </div>
            <p className=''>پیشتازان پرباز</p>
        </div>
    </Box>
  );
};

export default FooterLanding;