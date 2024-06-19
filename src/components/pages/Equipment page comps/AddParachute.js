import React, { useState } from 'react';

// queries and api
import { useEquipmentBrands } from '../../../Utilities/Services/dataQueries';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// react-router-dom
import { useNavigate } from 'react-router-dom';

// mui
import CloseIcon from '@mui/icons-material/Close';

// components 
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import UploadFileInput from '../../inputs/UploadFileInput';
import DateInput from '../../inputs/DateInput';
import PageTitle from '../../reuseable/PageTitle';
import DateLastRepackInput from './inputsForEquipment/DateLastRepackInput';

// input options
import {brandsOptionsData, flightHourOptionData, sizeOptionData} from '../../../Utilities/Providers/dropdownInputOptions'

const AddParachute = () => {

  const { data: brandsData, isLoading: brandsIsLoading, error:brandsError } = useEquipmentBrands('parachute');

  // pop up control
  const [showPopup, setShowPopup] = useState(false);  

  // State for selected option
  const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
  const [selectedOptionSize, setSelectedOptionSize] = useState('');
  const [selectedFlightHour, setSelectedFlightHour] = useState('');
  
  // text state 
  const [aircraft, setAircraft] = useState('');
  
  // file state
  const [selectedFile, setSelectedFile] = useState(null);

  // date state
  const [packageDate, setPackageDate] = useState('')
  
  //going a page back function
  const navigate = useNavigate();
  
  // Event handler for option selection
  const handleSelectChangeBrand = (selectedOption) => {
    setSelectedOptionBrand(selectedOption);
  };

  const handleSelectChangeSize = (event) => {
    setSelectedOptionSize(event.target.value);
  };

  const handleSelectChangeFLightHour = (event) => {
    setSelectedFlightHour(event.target.value);
  };


  // Event handlers for text input changes
  const handleTextInputAircraft = (event) => {
    setAircraft(event.target.value);
  };


  // Event handlers for uplopading file
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  // Event handler for package date selection
  const handlePackageDate = (date) => {
    setPackageDate(date);
};  


//    Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowPopup(true);
    // Here you can handle form submission, such as sending data to a backend server
  };

    return (
        <div className='flex flex-col mt-14 items-center gap-y-5'>

          <div className='flex flex-col items-center gap-y-5 md:w-[75%]'>

            <PageTitle title={'افزودن چتر کمکی'}  />  

            {
              brandsData &&
              <>
                <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                <form className='w-[90%] flex flex-col items-center space-y-7'>

                    {/* aircraft model input */}
                    <TextInput placeholder='مدل وسیله پروازی' value={aircraft} onChange={handleTextInputAircraft}  />
                    
                    <div className=' w-full flex flex-col items-center gap-y-8 md:grid md:grid-cols-2 md:gap-6'>

                      {/* brand input */}
                      <DropdownInput name={'برند'} options={brandsData.data} selectedOption={selectedOptionBrand} handleSelectChange={handleSelectChangeBrand} />

                      {/* size input */}
                      <DropdownInput name={'سایز'} options={sizeOptionData} selectedOption={selectedOptionSize} handleSelectChange={handleSelectChangeSize} />
                      
                      {/* FLight hour input */}
                      <DropdownInput name={'حدود ساعت پرواز'} options={flightHourOptionData} selectedOption={selectedFlightHour} handleSelectChange={handleSelectChangeFLightHour} />

                      {/* packaging parachute date input */}
                      {/* <DateInput inputAttributes={{ placeholder: "تاریخ انقضا" }} onChange={handlePackageDate} /> */}

                      <DateLastRepackInput name={'تاریخ آخرین بسته‌بندی'} defaultValue={packageDate} onChange={handlePackageDate} placeH={'تاریخ اخرین بسته بندی'} />
                    
                    </div>

                    <p className=' self-start md:self-center'>ثبت سریال چتر (اختیاری)</p>

                    <p className=' self-start md:self-center'>در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛</p>

                    {/* for uploading pictures */}
                    <UploadFileInput name={'چتر کمکی'} selectedFile={selectedFile} onFileChange={handleFileChange} />

                    <button type="submit" onClick={handleSubmit} className={`${ButtonStyles.addButton} w-36 `}>ثبت</button>

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

export default AddParachute;