import React, { useState } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Queries and api
import { useEquipmentBrands } from '../../../Utilities/Services/dataQueries';

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
import PageTitle from '../../reuseable/PageTitle';

const AddHarness = () => {

  const { data: brandsData, isLoading: brandsIsLoading, error:brandsError } = useEquipmentBrands('harness');


  const [brand, setBrand] = useState('');
  const [aircraft, setAircraft] = useState('');
  const [size, setSize] = useState('');
  const [flightHour, setFlightHour] = useState('');
  const [wingCode, setWingCode] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


    
  //going a page back function
  const navigate = useNavigate();
  
  const handleBrandChange = (selectedOption) => {
    setBrand(selectedOption);
  };

  const handleAircraftChange = (event) => {
    setAircraft(event.target.value);
  };

  const handleSizeChange = (selectedOption) => {
    setSize(selectedOption);
  };

  const handleFlightHourChange = (selectedOption) => {
    setFlightHour(selectedOption);
  };

  const handleWingCodeChange = (event) => {
    setWingCode(event.target.value);
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setShowPopup(true);
      // Here you can handle form submission, such as sending data to a backend server
    };

    return (
        <div className='flex flex-col mt-14 items-center gap-y-5'>

          <div className='flex flex-col items-center gap-y-5 w-full md:w-[75%]'>

            <PageTitle title={'افزودن هارنس'}  />

            {
            brandsData &&
              <>
                <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                <form className='w-[90%] flex flex-col items-center space-y-7'>
                  {/* aircraft model input */}
                  
                  <div className=' w-full flex flex-col items-center gap-y-8 md:grid md:grid-cols-2 md:gap-6'>
                    
                    <TextInput placeholder='مدل وسیله پروازی' value={aircraft} onChange={handleAircraftChange}  />

                    {/* brand input */}
                    <DropdownInput
                      name={'برند'}
                      options={brandsData.data}
                      selectedOption={brand}
                      handleSelectChange={handleBrandChange}
                    />

                    {/* size input */}
                    <DropdownInput
                      name={'سایز'}
                      options={sizeOptionData}
                      selectedOption={size}
                      handleSelectChange={handleSizeChange}
                    />

                    {/* Flight hour input */}
                    <DropdownInput
                      name={'حدود ساعت پرواز'}
                      options={flightHourOptionData}
                      selectedOption={flightHour}
                      handleSelectChange={handleFlightHourChange}
                    />

                  </div>

                  <p className=' self-start md:self-center'>ثبت سریال هارنس (اختیاری)</p>

                  <p className=' self-start md:self-center'>در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛</p>


                  {/* for uploading pictures */}
                  <UploadFileInput name={'هارنس'} selectedFile={selectedFile} onFileChange={handleFileChange} />

                  <button type="submit" onClick={handleSubmit} className={`${ButtonStyles.addButton} w-36 `} >ثبت</button>
                </form>
              </>
            }

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
            
        </div>
    );
};

export default AddHarness;