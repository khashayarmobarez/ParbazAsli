import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// assets
import IGC from '../../../assets/icons/IGC-Download.svg'
import RightArrowButton from '../../../assets/icons/Right Arrow Button.svg'

// style
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

const UploadIgc = () => {

    const navigate = useNavigate()

    const fileInputRef = useRef(null); // Ref for file input element

    const [igcFile, setIgcFile] = useState(null)

    const handleFileSelect = (event) => {
        const file = event.target.files[0]; // Access the selected file
        setIgcFile(file); // Update the state with the selected file
      };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Programmatically trigger file input
    };

    return (
        <>
            <div className='w-[90%] flex flex-col items-center gap-y-4'>

            <span>
                <img alt='icon' src={IGC} />
            </span>

            <p className=' text-center w-full'>در صورت داشتن فایل IGC بارگزاری کنید تا مشخصات پرواز شما ثبت شود در غیر این صورت دکمه بعدی را بزنید و مشخصات پرواز خود را وارد کنید</p>

            </div>

            <div className=' w-[90%] flex items-center justify-between' >

                <div onClick={() => navigate('/addFlight/AddUsedEquipment')} className='flex items-center justify-between'>
                    <span className='w-10'><img alt='icon' className='w-full h-full' src={RightArrowButton}/></span>
                    <p className='mr-2 pb-2'>بعدی</p>
                </div>

                <input
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    type="file"
                    accept=".igc"
                    className="hidden" // Hide the file input
                />

                <button className={ButtonStyles.normalButton} onClick={handleButtonClick}>آپلود IGC</button>

            </div>
        </>
    );
};

export default UploadIgc;