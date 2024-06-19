import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Queries and api
import { useEquipmentBrands, useWingClasses } from '../../../Utilities/Services/dataQueries';


// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// assets
import Cube from '../../../assets/icons/3dCube.svg'

// components 
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import UploadFileInput from '../../inputs/UploadFileInput';
import PageTitle from '../../reuseable/PageTitle';

// input options
import { sizeOptionData} from '../../../Utilities/Providers/dropdownInputOptions'

const AddFlightEquipment = () => {

  const { data: brandsData, isLoading: brandsIsLoading, error:brandsError } = useEquipmentBrands('wing');
  const { data: wingsClasses, isLoading: WClassesIsLoading, error:WClassesError } = useWingClasses();


    // State for selected option
  const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
  const [selectedOptionClass, setSelectedOptionClass] = useState('');
  const [selectedOptionSize, setSelectedOptionSize] = useState('');

  const [aircraft, setAircraft] = useState('');
  const [size, setSize] = useState('');
  const [flightHour, setFlightHour] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [year, setYear] = useState('');
  

  const [selectedFile, setSelectedFile] = useState(null);

  // popUp use state
  const [showPopup, setShowPopup] = useState(false);

  // useNavigate to go back one page
  const navigate = useNavigate();


  // Event handler for option selection
  const handleSelectChangeBrand = (selectedOption) => {
    setSelectedOptionBrand(selectedOption);
  };

  const handleSelectChangeClass = (selectedOption) => {
    setSelectedOptionClass(selectedOption);
  };

  const handleTextInputSize = (event) => {
    setSize(event.target.value);
  };


  // Event handlers for text input changes
  const handleTextInputAircraft = (event) => {
    setAircraft(event.target.value);
  };

  const handleTextInputFlightHour = (event) => {
    setFlightHour(event.target.value);
  };

  const handleTextInputSerialNumber = (event) => {
    setSerialNumber(event.target.value);
  };
  
  const handleTextInputYear = (event) => {
    setYear(event.target.value);
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

            <div className='flex flex-col items-center gap-y-5 w-full md:w-[75%]'>

              <PageTitle title={'افزودن وسیله پروازی'}  />  

              {
                brandsData && wingsClasses &&
                <>
                  <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                  و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                  <form className='w-[90%] flex flex-col items-center space-y-7'>

                      {/* aircraft model input */}
                      <TextInput value={aircraft} onChange={handleTextInputAircraft} placeholder='مدل وسیله پروازی' />
                      
                      <div className=' w-full flex flex-col items-center gap-y-8 md:grid md:grid-cols-2 md:gap-6'>
                        
                        {/* brand input */}
                        <DropdownInput
                          className='col-span-1'
                          name={'برند'}
                          options={brandsData.data}
                          selectedOption={selectedOptionBrand}
                          handleSelectChange={handleSelectChangeBrand}
                        />

                        {/* class input */}
                        <DropdownInput
                          className='col-span-1'
                          name={'کلاس'}
                          options={wingsClasses.data}
                          selectedOption={selectedOptionClass}
                          handleSelectChange={handleSelectChangeClass}
                        />

                        {/* size input */}
                        <TextInput icon={Cube} className='col-span-1' value={size} onChange={handleTextInputSize} placeholder='سایز' />
                        
                        {/* flight hour model input */}
                        <TextInput icon={Cube} className='col-span-1' value={flightHour} onChange={handleTextInputFlightHour} placeholder='حدود ساعت پرواز' />
                      
                        <TextInput
                          icon={Cube}
                          className='col-span-1'
                          value={serialNumber}
                          onChange={handleTextInputSerialNumber}
                          placeholder='شماره سریال'
                        />

                        {/* Year input */}
                        <TextInput
                          icon={Cube}
                          className='col-span-1'
                          value={year}
                          onChange={handleTextInputYear}
                          placeholder='سال'
                        />
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
                </>
              }

            </div>
            
        </div>
    );
};

export default AddFlightEquipment;