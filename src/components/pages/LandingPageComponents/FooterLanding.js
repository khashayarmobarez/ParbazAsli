import React from 'react';

// assets
import logo from '../../../assets/ApiData Temporary/Digilogbook -1401 12.png'
import mail from '../../../assets/icons/mail-Icon (Stroke).svg'

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
        background: `var(--landing-page-titles-bg)`,
        boxShadow:'var(--landing-page-titles-boxShadow)',
        borderRadius: isSmallScreen ? '0rem' : '0rem 0 0 0rem',
        height: isSmallScreen ? '375px' : '320px',
        width: '100%',
        marginTop: '0',
        marginBottom: '0',
      }}
    >
        <ul className=' hidden md:flex flex-col gap-y-4'>
            <li>خانه</li>
            <li>بلاگ</li>
            <li>ارتباط با ما</li>
            <li>تماس با ما</li>
        </ul>

        <div className='flex flex-col items-center gap-y-4 md:w-[30vw] w-full h-full justify-around py-4 px-4'>
            <img alt='logo' src={logo} className='w-1/2 md:w-[212px]'/>
            {isSmallScreen && 
              <>
                <ul className='w-full flex justify-around'>
                  <li>خانه</li>
                  <li>بلاگ</li>
                  <li>ارتباط با ما</li>
                  <li>تماس با ما</li>
                </ul>
                <div className='w-full flex justify-around '>
                  <div className='flex gap-x-2'><EmailOutlinedIcon /><p>info@digilogbook.ir</p></div>
                  <div className='flex gap-x-2'><LocalPhoneOutlinedIcon /><p>021-77788899</p></div>
              </div>
              </>
            }
            <p className='text-lg'>عضویت در خبرنامه</p>
            <p>ما هرزنامه ارسال نمی کنیم، پس نگران نباشید</p>
            <InputWithButton Type={'text'} icon={mail} buttonText={'ارسال'} placeH={'ایمیل خود را وارد کنید'} />
        </div>

        <div className='hidden md:flex flex-col gap-y-8'>
            <div className='flex gap-x-4'><EmailOutlinedIcon /><p>info@digilogbook.ir</p></div>
            <div className='flex gap-x-4'><LocalPhoneOutlinedIcon /><p>021-77788899</p></div>
            <div className='flex gap-x-4 mt-2'>
                <div className='w-[53px] h-[53px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                    <XIcon sx={{width:'50px', color:'var(--yellow-text)'}} />
                </div>
                <div className='w-[53px] h-[53px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                    <InstagramIcon sx={{width:'50px', color:'var(--yellow-text)'}} />
                 </div>
                <div className='w-[53px] h-[53px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                    <WhatsAppIcon sx={{width:'50px', color:'var(--yellow-text)'}} />
                </div>
            </div>
        </div>
    </Box>
  );
};

export default FooterLanding;