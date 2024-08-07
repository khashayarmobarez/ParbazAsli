import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Queries and api
import { useEquipmentBrands } from '../../../../Utilities/Services/dataQueries';
import { useAddEquipment } from '../../../../Utilities/Services/equipmentQueries';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// assets
import Cube from '../../../../assets/icons/3dCube.svg'


// components
import DropdownInput from '../../../inputs/DropDownInput';
import TextInput from '../../../inputs/textInput';
import UploadFileInput from '../../../inputs/UploadFileInput';

// input options
import PageTitle from '../../../reuseable/PageTitle';
import NumberInput from '../../../inputs/NumberInput';

const AddClubHarness = () => {

  //going a page back function
  const navigate = useNavigate();

  const { data: brandsData, isLoading: brandsIsLoading, error:brandsError } = useEquipmentBrands('harness');

  
  const { mutate: mutateHarness , isLoading: isSubmitting, error: submitError} = useAddEquipment();


  const [brand, setBrand] = useState('');
  const [aircraft, setAircraft] = useState('');
  const [size, setSize] = useState('');
  const [flightHour, setFlightHour] = useState('');
  const [wingCode, setWingCode] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [year, setYear] = useState('');

  // Error states
  const [serialNumberError, setSerialNumberError] = useState('');

  // Regex patterns
  const equipmentSerialNumberPattern = /^[a-zA-Z0-9\-_ ]*$/;

  // Validation functions
  const validateSerialNumber = (serialNumber) => {
    if (!equipmentSerialNumberPattern.test(serialNumber)) {
      setSerialNumberError('Invalid serial number format.');
      return false;
    } else {
      setSerialNumberError('');
      return true;
    }
  };
  
  const handleBrandChange = (selectedOption) => {
    setBrand(selectedOption);
  };

  const handleAircraftChange = (event) => {
    setAircraft(event.target.value);
  };

  const handleTextInputSize = (event) => {
    setSize(event.target.value);
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

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  
    const handlePopUp= (event) => {
      event.preventDefault();
      const currentYear = new Date().getFullYear();
      
      // Here you can handle form submission, such as sending data to a backend server
      const isSerialNumberValid = validateSerialNumber(serialNumber);

      // Validate inputs
      if (!isSerialNumberValid) {
        toast('فرمت شماره سریال چتر اشتباه است', {
            type: 'error',
            position: 'top-right',
            autoClose: 5000,
            theme: 'dark',
            style: { width: "90%" }
        });
        return;
      }

      if (year <= 1979 || year > currentYear) {
          toast('سال تولید چتر را درست وارد کنید', {
              type: 'error',
              position: 'top-right',
              autoClose: 5000,
              theme: 'dark',
              style: { width: "90%" }
          });
          return;
      }

      if (!brand || !aircraft || !size || !flightHour || !year) {
          toast('تمامی فیلدها را پر کنید', {
              type: 'error',
              position: 'top-right',
              autoClose: 5000,
              theme: 'dark',
              style: { width: "90%" }
          });
          return;
      }

    if ((serialNumber && !selectedFile) || (selectedFile && !serialNumber)) {
        toast('در صورت تمایل به وارد کردن شماره سریال چتر, خود شماره سریال و عکس شماره سریال را با هم وارد کنید', {
            type: 'error',
            position: 'top-right',
            autoClose: 10000,
            theme: 'dark',
            style: { width: "90%" }
        });
        return;
    }

    setShowPopup(true);
    };

     // Event submision
    const handleSubmit = (event) => {

      if( serialNumber || aircraft || size || flightHour || year ) {

        event.preventDefault();

        const formData = new FormData();
        // type 1 for Hamutate Harness
        formData.append('Type', 3);
        formData.append('brandId', brand.id);
        formData.append('file', selectedFile);
        formData.append('serialNumber', serialNumber);
        formData.append('Model', aircraft);
        formData.append('Size', size);
        formData.append('flightHours', flightHour);
        formData.append('year', year);
        formData.append('isForClub', true);

        console.log(formData)
        console.log('submitting')

        mutateHarness(formData, {
          onSuccess: () => {
            toast('هارنس با موفقیت ثبت شد', {
              type: 'success',
              position: 'top-right',
              autoClose: 5000,
              theme: 'dark',
              style: { width: "90%" }
            });
            setShowPopup(false);
            navigate('/club/clubEquipment/harnesses')
          }
        })
      
      }
    }

    useEffect(() => {
      if (submitError) {
        console.log('submitError', submitError.message);
        toast(submitError.response.data.ErrorMessages[0].ErrorMessage , {
          type: 'error',
          position: 'top-right',
          autoClose: 10000,
          theme: 'dark',
          style: { width: "90%" }
      });
        // Add any additional error handling logic here
      }
    },[submitError])

    return (
        <div className='flex flex-col mt-14 items-center gap-y-5'>

          <div className='flex flex-col items-center gap-y-5 w-full md:w-[75%]'>

            <PageTitle title={'افزودن هارنس'}  />

            {
            brandsData &&
              <>
                <p className=' text-sm'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                <form className='w-[90%] flex flex-col items-center space-y-6'>
                  {/* aircraft model input */}
                  
                  <div className=' w-full flex flex-col items-center gap-y-4 md:grid md:grid-cols-2 md:gap-6'>
                    
                    {/* brand input */}
                    <DropdownInput
                      name={'برند'}
                      options={brandsData.data}
                      selectedOption={brand}
                      handleSelectChange={handleBrandChange}
                    />
                    
                    <TextInput placeholder='مدل وسیله پروازی' value={aircraft} onChange={handleAircraftChange}  />

                    {/* size input */}
                    <TextInput icon={Cube} className='col-span-1' value={size} onChange={handleTextInputSize} placeholder='سایز' />

                    {/* Flight hour input */}
                    <NumberInput icon={Cube} className='col-span-1' value={flightHour} onChange={handleTextInputFlightHour} placeholder='حدود ساعت پرواز' />

                    {/* Year input */}
                    <NumberInput
                      icon={Cube}
                      className='col-span-1'
                      value={year}
                      onChange={handleTextInputYear}
                      placeholder='سال'
                    />

                  </div>

                  <p className=' self-start md:self-center'>ثبت سریال هارنس (اختیاری)</p>

                  {/* Serial number input */}
                  <TextInput
                    icon={Cube}
                    className='col-span-1'
                    value={serialNumber}
                    onChange={handleTextInputSerialNumber}
                    placeholder='شماره سریال (اختیاری)'
                  />

                  {/* for uploading pictures */}
                  <UploadFileInput name={'هارنس'} selectedFile={selectedFile} onFileChange={handleFileChange} />

                  <button onClick={handlePopUp} className={`${ButtonStyles.addButton} w-36 `} >ثبت</button>
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
                    <button 
                    type="submit" 
                    onClick={handleSubmit} 
                    className={`${ButtonStyles.addButton} w-24`}
                    disabled={isSubmitting}>
                      {isSubmitting ? 'در حال ارسال...' : 'تایید'}
                    </button>
                </div>

            </form>
          
          </div>
            
        </div>
    );
};

export default AddClubHarness;