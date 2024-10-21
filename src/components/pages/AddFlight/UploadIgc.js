import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
                theme: 'dark',
                style: { width: "350px" }
              });
        }
    }, [ flightType, navigate])


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

            <span>
                <img alt='icon' className='w-20' src={IGC} />
            </span>

            <p className='text-center -mt-1 font-semibold text-textAccent'>(اختیاری)</p>

            <p className=' text-center w-full'>در صورت داشتن فایل IGC بارگزاری کنید تا مشخصات پرواز شما ثبت شود در غیر این صورت دکمه بعدی را بزنید و مشخصات پرواز خود را وارد کنید</p>

            </div>

            <div className=' w-[90%] flex items-center justify-between' >

                <div onClick={() => navigate('/addFlight/AddUsedEquipment')} className='flex items-center justify-between'>
                    <span className='w-10 flex justify-center items-center'>
                        <ArrowButton />
                    </span>
                    <p className='mr-2 pb-2'>بعدی</p>
                </div>

                <input
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    type="file"
                    accept=".igc"
                    className="hidden"
                />

                <button className={ButtonStyles.normalButton} onClick={handleButtonClick}>آپلود IGC</button>

            </div>
            <p>{igcFile && igcFile.name}</p>
        </>
    );
};

export default UploadIgc;