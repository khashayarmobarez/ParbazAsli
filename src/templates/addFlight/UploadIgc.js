import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { processAndUpdateIgcFile, selectAddFlight } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateIgcFile } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

// assets
import IGC from '../../assets/icons/IGC-Download.svg'
import ArrowButton from '../../components/icons/ArrowButton'

// style
import ButtonStyles from '../../styles/ButtonsBox.module.css'

const UploadIgc = () => {

    // language and direction
    const dir = Cookies.get('dir') || 'ltr';
    const { t } = useTranslation();

    // redux
    const {igcFile, flightType} = useSelector(selectAddFlight)
    const dispatch = useDispatch()
    const appTheme = Cookies.get('themeApplied') || 'dark';

    // react router dom
    const navigate = useNavigate()

    const fileInputRef = useRef(null); // Ref for file input element

    useEffect(() => {
        if(!flightType) {
            navigate('/addFlight/AddFlightType')
            toast('لطفا اطلاعات صفحات قبل را اول کامل کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
              });
        }
    }, [ flightType, navigate, appTheme ]);


    // In your component
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
        dispatch(processAndUpdateIgcFile(file));
        console.log('file', file)
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Programmatically trigger file input
    };

    return (
        <>
            <div className='w-[90%] flex flex-col items-center gap-y-4 '>

                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-[100%]'>
                            
                        <div className='border-2 rounded-full w-5 h-5  border-textAccent flex items-center justify-center'>
                            <div className='rounded-full w-3 h-3 mr-[0.3px]' style={{background:'var(--text-accent)'}}></div>
                        </div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-full text-xs md:w-[90%]'>

                        <p className='' style={{color:'var(--text-accent)'}}>{t('addFlight.IGC')}</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>{t('addFlight.flightDevice')}</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>{t('addFlight.flightConditions')}</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>{t('addFlight.takeoff')}</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>{t('addFlight.landing')}</p>

                    </div>

                </div>

                <span>
                    <img alt='icon' className='w-20 mt-[18px]' src={IGC} />
                </span>

                <p className='text-center -mt-1 font-semibold text-textWarning'>{t('addFlight.addIgc.optional')}</p>

                <p className=' text-center w-full'>{t('addFlight.addIgc.instruction')}</p>

                </div>

                <div className=' w-[90%] flex items-center justify-between' >

                    <button className={ButtonStyles.normalButton} onClick={handleButtonClick}>{t('addFlight.addIgc.uploadButton')}</button>

                    <input
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        type="file"
                        accept=".igc"
                        className="hidden"
                    />

                    <div onClick={() => navigate('/addFlight/AddUsedEquipment')} className='flex items-center justify-between'>
                        <p className=''>{t('addFlight.addIgc.nextButton')}</p>
                        <span className={`w-8 h-8 flex justify-center items-center 
                        ${dir === 'ltr' ? 'ml-3' : 'mr-3'}`}>
                            <ArrowButton isRight={dir === 'ltr' && true} />
                        </span>
                    </div>

                </div>
                <p>{igcFile && igcFile.name}</p>
        </>
    );
};

export default UploadIgc;