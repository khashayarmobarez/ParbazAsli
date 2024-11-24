import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { processAndUpdateIgcFile, selectAddFlight } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateIgcFile } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

// assets
import IGC from '../../../assets/icons/IGC-Download.svg'
import ArrowButton from '../../../components/icons/ArrowButton'

// style
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

const UploadIgc = () => {

    // redux
    const {igcFile,
    flightType} = useSelector(selectAddFlight)
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
            <div className='w-[90%] flex flex-col items-center gap-y-4'>

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

                    <div className='flex items-center justify-between w-full text-xs'>

                        <p className='' style={{color:'var(--text-accent)'}}>IGC</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>وسیله پروازی</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>Landing</p>

                    </div>

                </div>

                <span>
                    <img alt='icon' className='w-20' src={IGC} />
                </span>

                <p className='text-center -mt-1 font-semibold text-textWarning'>(اختیاری)</p>

                <p className=' text-center w-full'>در صورت داشتن فایل IGC بارگزاری کنید تا مشخصات پرواز شما ثبت شود در غیر این صورت دکمه بعدی را بزنید و مشخصات پرواز خود را وارد کنید</p>

                </div>

                <div className=' w-[90%] flex items-center justify-between' >

                    <button className={ButtonStyles.normalButton} onClick={handleButtonClick}>آپلود IGC</button>

                    <input
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        type="file"
                        accept=".igc"
                        className="hidden"
                    />

                    <div onClick={() => navigate('/addFlight/AddUsedEquipment')} className='flex items-center justify-between'>
                        <p className=''>بعدی</p>
                        <span className='w-8 h-8 flex justify-center items-center mr-3'>
                            <ArrowButton />
                        </span>
                    </div>

                </div>
                <p>{igcFile && igcFile.name}</p>
        </>
    );
};

export default UploadIgc;