import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// components 
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import UploadFileInput from '../../inputs/UploadFileInput';
import PageTitle from '../../reuseable/PageTitle';

// input options
import {brandsOptionsData, classesOpptionData, sizeOptionData} from '../../../Utilities/Providers/dropdownInputOptions'

const AddFlightEquipment = () => {

    // State for selected option
  const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
  const [selectedOptionClass, setSelectedOptionClass] = useState('');
  const [selectedOptionSize, setSelectedOptionSize] = useState('');

  const [aircraft, setAircraft] = useState('');
  const [flightHour, setFlightHour] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  // popUp use state
  const [showPopup, setShowPopup] = useState(false);

  // useNavigate to go back one page
  const navigate = useNavigate();


  // Event handler for option selection
  const handleSelectChangeBrand = (event) => {
    setSelectedOptionBrand(event.target.value);
  };

  const handleSelectChangeClass = (event) => {
    setSelectedOptionClass(event.target.value);
  };

  const handleSelectChangeSize = (event) => {
    setSelectedOptionSize(event.target.value);
  };


  // Event handlers for text input changes
  const handleTextInputAircraft = (event) => {
    setAircraft(event.target.value);
  };

  const handleTextInputFlightHour = (event) => {
    setFlightHour(event.target.value);
  };

  // Event handlers for uplopading file
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };


//    Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowPopup(true);
    // Here you can handle form submission, such as sending data to a backend server
  };

    return (
        <div className='flex flex-col mt-14 items-center'>

            <div className='flex flex-col items-center gap-y-5 md:w-[75%]'>

              <PageTitle title={'افزودن وسیله پروازی'}  />  

              <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
              و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

              <form className='w-[90%] flex flex-col items-center space-y-7'>

                  {/* aircraft model input */}
                  <TextInput value={aircraft} onChange={handleTextInputAircraft} placeholder='مدل وسیله پروازی' />
                  
                  <div className=' w-full flex flex-col items-center gap-y-8 md:grid md:grid-cols-2 md:gap-6'>
                    
                    {/* brand input */}
                    <DropdownInput className='col-span-1' name={'برند'} options={brandsOptionsData} selectedOption={selectedOptionBrand} handleSelectChange={handleSelectChangeBrand} />

                    {/* class input */}
                    <DropdownInput className='col-span-1' name={'کلاس'} options={classesOpptionData} selectedOption={selectedOptionClass} handleSelectChange={handleSelectChangeClass} />

                    {/* size input */}
                    <DropdownInput className='col-span-1' name={'سایز'} options={sizeOptionData} selectedOption={selectedOptionSize} handleSelectChange={handleSelectChangeSize} />

                    {/* flight hour model input */}
                    <TextInput className='col-span-1' value={flightHour} options={sizeOptionData} onChange={handleTextInputFlightHour} placeholder='حدود ساعت پرواز' />
                  </div>

                  <p className=' self-start md:self-center'>ثبت سریال بال (اختیاری)</p>

                  <p className=' self-start md:self-center'>در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛</p>

                  {/* for uploading pictures */}
                  <div className='w-full flex flex-col items-start space-y-3'>
                    <UploadFileInput name={'بال'} selectedFile={selectedFile} onFileChange={handleFileChange} />
                    <p className=' text-xs'>*فرمت‌های مجاز فایل JPEG,JPG,Png</p>
                  </div>


                  <button type="submit"  onClick={handleSubmit} className={`${ButtonStyles.addButton} w-36 `}>ثبت</button>

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
            
        </div>
    );
};

export default AddFlightEquipment;