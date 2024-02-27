import React, { useState } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';


// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'


// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectHarness } from '../../../Utilities/ReduxToolKit/features/Add/harnessSlice';
import { updateBrand, updateAircraft, updateSelectedFile, updateHour, updateSize, updateWingcode } from '../../../Utilities/ReduxToolKit/features/Add/harnessSlice';

// mui
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';


// components
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import UploadFileInput from '../../inputs/UploadFileInput';

// input options
import {brandsOptionsData, flightHourOptionData, sizeOptionData} from '../../../Utilities/Providers/dropdownInputOptions'

const AddHarness = () => {

  const [showPopup, setShowPopup] = useState(false);

  // redux
  const {brand, aircraft, size, flightHour, wingCode,  selectedFile } = useSelector(selectHarness)
  const dispatch = useDispatch()

    
    //going a page back function
    const navigate = useNavigate();
    
    const handleBrandChange = (event) => {
      dispatch(updateBrand(event.target.value));
    };
  
    const handleAircraftChange = (event) => {
      dispatch(updateAircraft(event.target.value));
    };
  
    const handleSizeChange = (event) => {
      dispatch(updateSize(event.target.value));
    };
  
    const handleFlightHourChange = (event) => {
      dispatch(updateHour(event.target.value));
    };
  
    const handleWingCodeChange = (event) => {
      dispatch(updateWingcode(event.target.value));
    };
  
    const handleFileChange = (file) => {
      dispatch(updateSelectedFile(file));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setShowPopup(true);
      // Here you can handle form submission, such as sending data to a backend server
    };

    return (
        <div className='flex flex-col mt-14 items-center gap-y-5'>

            <div className='sticky top-9 z-10 bg-[#1B253B] w-[90%] h-20 flex justify-between items-end p-3 pr-[33%] rounded-b-2xl'>
                <p>افزودن هارنس</p>
                {/* used useHistory on the icon */}
                <ArrowBackIosNewIcon onClick={() => navigate(-1)} sx={{ width:'26px', height:'26px', padding:'5px', backgroundColor:'', borderRadius:'10rem', background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)', boxShadow: '-3px 4px 5.800000190734863px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)'}} />
            </div>

            <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
            و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

            <form className='w-[90%] flex flex-col items-center space-y-7'>
              {/* brand input */}
              <DropdownInput name={'برند'} options={brandsOptionsData} selectedOption={brand} handleSelectChange={handleBrandChange} />
              
              {/* aircraft model input */}
              <TextInput placeholder='مدل وسیله پروازی' value={aircraft} onChange={handleAircraftChange}  />

              {/* size input */}
              <DropdownInput name={'سایز'} options={sizeOptionData} selectedOption={size} handleSelectChange={handleSizeChange} />
              
              {/* FLight hour input */}
              <DropdownInput name={'حدود ساعت پرواز'} options={flightHourOptionData} selectedOption={flightHour} handleSelectChange={handleFlightHourChange} />

              <div className='flex flex-col justify-between items-center w-full space-y-2'>
                <p className=' self-start'>ثبت سریال هارنس (اختیاری)</p>
                <TextInput value={wingCode} onChange={handleWingCodeChange} placeholder='سریال بال' />
              </div>

              {/* for uploading pictures */}
              <UploadFileInput name={'هارنس'} selectedFile={selectedFile} onFileChange={handleFileChange} />

              <button type="submit" onClick={handleSubmit} className={`${ButtonStyles.addButton} w-36 `} >ثبت</button>
            </form>

            {/* submit pop up */}
            <form  className={` ${boxStyles.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}  w-[304px] h-[280px] flex flex-col justify-around items-center top-52`}>

                <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                <h3 className=' text-[#ED553B] text-xl mt-[-3rem] '>تاییدیه</h3>


                <p className='text-base w-[90%]' >در صورت تایید کردن بال مورد نظر قابل ویرایش نمی‌باشد دقت کنید </p>


                <div className='w-full flex justify-around items-center'>
                    <button type="reset" className={`${ButtonStyles.normalButton} w-24`} onClick={() => setShowPopup(false)}>لغو</button>
                    <button type="submit" className={`${ButtonStyles.addButton} w-24`} onClick={() => setShowPopup(false)}>تایید</button>
                </div>

            </form>
            
        </div>
    );
};

export default AddHarness;