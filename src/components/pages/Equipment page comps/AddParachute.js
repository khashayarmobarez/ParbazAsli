import React, { useState } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// assets
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// components 
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import UploadFileInput from '../../inputs/UploadFileInput';
import DateInput from '../../inputs/DateInput';

// input options
import {brandsOptionsData, flightHourOptionData, sizeOptionData} from '../../../Utilities/Providers/dropdownInputOptions'

const AddParachute = () => {

    
    // State for selected option
    const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
    const [selectedOptionSize, setSelectedOptionSize] = useState('');
    const [selectedFlightHour, setSelectedFlightHour] = useState('');
    
    // text state 
    const [aircraft, setAircraft] = useState('');
    const [wingCode, setWingCode] = useState('');
    
    // file state
    const [selectedFile, setSelectedFile] = useState(null);

    // date state
    const [packageDate, setPackageDate] = useState('')
    
    //going a page back function
    const navigate = useNavigate();
    
    // Event handler for option selection
    const handleSelectChangeBrand = (event) => {
        setSelectedOptionBrand(event.target.value);
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

  const handleTextInputWingCode = (event) => {
    setWingCode(event.target.value);
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
    // Here you can handle form submission, such as sending data to a backend server
  };

    return (
        <div className='flex flex-col mt-14 items-center gap-y-5'>

            <div className=' bg-[#1B253B] w-[90%] h-20 flex justify-between items-end p-3 pr-[33%] rounded-b-2xl'>
                <p>افزودن هارنس</p>
                {/* used useHistory on the icon */}
                <ArrowBackIosNewIcon onClick={() => navigate(-1)} sx={{ width:'26px', height:'26px', padding:'5px', backgroundColor:'', borderRadius:'10rem', background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)', boxShadow: '-3px 4px 5.800000190734863px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)'}} />
            </div>

            <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
            و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

            <form className='w-[90%] flex flex-col items-center space-y-7'>

                {/* brand input */}
                <DropdownInput name={'برند'} options={brandsOptionsData} selectedOption={selectedOptionBrand} handleSelectChange={handleSelectChangeBrand} />
                
                {/* aircraft model input */}
                <TextInput placeholder='مدل وسیله پروازی' value={aircraft} onChange={handleTextInputAircraft}  />

                {/* size input */}
                <DropdownInput name={'سایز'} options={sizeOptionData} selectedOption={selectedOptionSize} handleSelectChange={handleSelectChangeSize} />
                
                {/* FLight hour input */}
                <DropdownInput name={'حدود ساعت پرواز'} options={flightHourOptionData} selectedOption={selectedFlightHour} handleSelectChange={handleSelectChangeFLightHour} />

                {/* packaging parachute date input */}
                <DateInput name={'تاریخ آخرین بسته‌بندی'} onChange={handlePackageDate} />

                <div className='flex flex-col justify-between items-center w-full space-y-2'>
                    <p className=' self-start'>ثبت سریال چتر (اختیاری)</p>
                    <TextInput value={wingCode} onChange={handleTextInputWingCode} placeholder='سریال جتر' />
                </div>

                {/* for uploading pictures */}
                <UploadFileInput name={'چتر کمکی'} selectedFile={selectedFile} onFileChange={handleFileChange} />

                <button type="submit" onClick={handleSubmit}>Submit</button>

            </form>
            
        </div>
    );
};

export default AddParachute;