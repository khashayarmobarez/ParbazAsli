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

// assets
import Cube from '../../../assets/icons/3dCube.svg'

// components 
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import UploadFileInput from '../../inputs/UploadFileInput';
import PageTitle from '../../reuseable/PageTitle';
import DateLastRepackInput from './inputsForEquipment/DateLastRepackInput';

// input options
import { sizeOptionData} from '../../../Utilities/Providers/dropdownInputOptions'

const AddParachute = () => {

  const { data: brandsData, isLoading: brandsIsLoading, error:brandsError } = useEquipmentBrands('parachute');

  // pop up control
  const [showPopup, setShowPopup] = useState(false);  

  // State for selected option
  const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
  const [size, setSize] = useState('');
  const [flightHour, setFlightHour] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [year, setYear] = useState('');
  const [lastPackerId, setLastPackerId] = useState('');
  
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

  const handleTextInputSize = (event) => {
    setSize(event.target.value);
  };

  const handleTextInputFlightHour = (event) => {
    setFlightHour(event.target.value);
  };


  // Event handlers for text input changes
  const handleTextInputAircraft = (event) => {
    setAircraft(event.target.value);
  };


  // Event handlers for uplopading file
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  const handleTextInputSerialNumber = (event) => {
    setSerialNumber(event.target.value);
  };
  
  const handleTextInputYear = (event) => {
    setYear(event.target.value);
  };
  
  const handleTextInputLastPackerId = (event) => {
    setLastPackerId(event.target.value);
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
                      <TextInput icon={Cube} className='col-span-1' value={size} onChange={handleTextInputSize} placeholder='سایز' />

                      {/* FLight hour input */}
                      <TextInput icon={Cube} className='col-span-1' value={flightHour} onChange={handleTextInputFlightHour} placeholder='حدود ساعت پرواز' />

                      {/* packaging parachute date input */}
                      {/* <DateInput inputAttributes={{ placeholder: "تاریخ انقضا" }} onChange={handlePackageDate} /> */}

                      <DateLastRepackInput name={'تاریخ آخرین بسته‌بندی'} defaultValue={packageDate} onChange={handlePackageDate} placeH={'تاریخ اخرین بسته بندی'} />

                      {/* Serial Number input */}
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

                      {/* Last Packer ID input */}
                      <TextInput
                        icon={Cube}
                        className='col-span-1'
                        value={lastPackerId}
                        onChange={handleTextInputLastPackerId}
                        placeholder='شناسه آخرین بسته‌بندی کننده'
                      />
                    
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