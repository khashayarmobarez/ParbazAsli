import React, { useState } from 'react';

// assets
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';

// input options
import {brandsOptionsData, classesOpptionData, sizeOptionData} from '../../../Utilities/Providers/dropdownInputOptions'
import UploadFileInput from '../../inputs/UploadFileInput';

const AddFlightEquipment = () => {

    // State for selected option
  const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
  const [selectedOptionClass, setSelectedOptionClass] = useState('');
  const [selectedOptionSize, setSelectedOptionSize] = useState('');

  const [aircraft, setAircraft] = useState('');
  const [flightHour, setFlightHour] = useState('');
  const [wingCode, setWingCode] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  // Options for the dropdown


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

  const handleTextInputWingCode = (event) => {
    setWingCode(event.target.value);
  };

  // Event handlers for uplopading file
  const handleFileChange = (file) => {
    // Update the file state in the parent component
    setSelectedFile(file);
  };


//    Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle form submission, such as sending data to a backend server
  };

    return (
        <div className='flex flex-col mt-14 items-center gap-y-5'>

            <div className=' bg-[#1B253B] w-[90%] h-20 flex justify-between items-end p-3 pr-[28%] rounded-b-2xl'>
                <p>افزودن وسیله پروازی</p>
                <ArrowBackIosNewIcon sx={{ width:'26px', height:'26px', padding:'5px', backgroundColor:'', borderRadius:'10rem', background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)', boxShadow: '-3px 4px 5.800000190734863px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)'}} />
            </div>

            <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
            و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

            <form className='w-[90%] flex flex-col items-center space-y-6'>

                {/* brand input */}
                <DropdownInput name={'برند'} options={brandsOptionsData} selectedOption={selectedOptionBrand} handleSelectChange={handleSelectChangeBrand} />
                
                {/* aircraft model input */}
                <TextInput value={aircraft} onChange={handleTextInputAircraft} placeholder='مدل وسیله پروازی' />

                {/* class input */}
                <DropdownInput name={'کلاس'} options={classesOpptionData} selectedOption={selectedOptionClass} handleSelectChange={handleSelectChangeClass} />

                {/* size input */}
                <DropdownInput name={'سایز'} options={sizeOptionData} selectedOption={selectedOptionSize} handleSelectChange={handleSelectChangeSize} />

                {/* flight hour model input */}
                <TextInput value={flightHour} options={sizeOptionData} onChange={handleTextInputFlightHour} placeholder='حدود ساعت پرواز' />

                <div className='flex flex-col justify-between items-center w-full space-y-2'>
                    <p className=' self-start'>ثبت سریال بال (اختیاری)</p>
                    <TextInput value={wingCode} onChange={handleTextInputWingCode} placeholder='سریال بال' />
                </div>

                {/* for uploading pictures */}
                <UploadFileInput selectedFile={selectedFile} onFileChange={handleFileChange} />

                <button type="submit" onClick={handleSubmit}>Submit</button>

            </form>
            
        </div>
    );
};

export default AddFlightEquipment;