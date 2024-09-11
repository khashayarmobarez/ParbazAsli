import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Queries and api
import { useEquipmentBrands } from '../../../Utilities/Services/dataQueries';
import { useAddEquipment } from '../../../Utilities/Services/equipmentQueries';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// assets
import Cube from '../../../assets/icons/3dCube.svg'
import clothesTag from '../../../assets/icons/clothingTag.svg'
import calenderIcon from '../../../assets/icons/calender-Icon.svg'
import watchIcon from '../../../assets/icons/flightHour.svg'
import serialNumberIcon from '../../../assets/icons/serialNumber.svg'


// components
import TextInput from '../../inputs/textInput';
import UploadFileInput from '../../inputs/UploadFileInput';

// input options
import PageTitle from '../../reuseable/PageTitle';
import NumberInput from '../../inputs/NumberInput';
import CircularProgressLoader from '../../Loader/CircularProgressLoader';
import BrandsSearchInputWithDropdown from './inputsForEquipment/BrandsSearchInputWithDropdown';

const AddHarness = () => {

  //going a page back function
  const navigate = useNavigate();

  const { data: brandsData, isLoading: brandsIsLoading, error:brandsError } = useEquipmentBrands('harness');

  
  const { mutate: mutateHarness , isLoading: isSubmitting, error: submitError} = useAddEquipment();


  const [brand, setBrand] = useState('');
  const [showCustomBrandInput, setShowCustomBrandInput] = useState('');
  const [customBrand, setCustomBrand] = useState('')
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

  const [submitted, setSubmitted] = useState(false);
  
  // Clear selected file if serial number is empty
  useEffect(() => {
    if(serialNumber.length < 1) {
      setSelectedFile(null);
    }
  }, [serialNumber])

  // Regex patterns
  const equipmentSerialNumberPattern = /^[a-zA-Z0-9\-_ ]*$/;

  useEffect(() => {
    if(serialNumber.length < 1) {
      setSelectedFile(null);
    }
  }, [serialNumber])

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
    setCustomBrand('');
  };

  // Event handler for custom brand input
  const handleCustomBrand = (event) => {
    setCustomBrand(event.target.value);
    setBrand('');
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
      setSubmitted(true);
      const currentYear = new Date().getFullYear();
      
      // Here you can handle form submission, such as sending data to a backend server
      const isSerialNumberValid = validateSerialNumber(serialNumber);

      if (!(brand || customBrand) || !aircraft || !size || !flightHour || !year) {
          toast('تمامی فیلدها را پر کنید', {
              type: 'error',
              position: 'top-right',
              autoClose: 5000,
              theme: 'dark',
              style: { width: "90%" }
          });
          return;
      }

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
        !showCustomBrandInput && formData.append('brandId', brand.id);
        showCustomBrandInput && formData.append('brandName', customBrand);
        formData.append('file', selectedFile);
        formData.append('serialNumber', serialNumber);
        formData.append('Model', aircraft);
        formData.append('Size', size);
        formData.append('flightHours', flightHour);
        formData.append('year', year);

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
            navigate('/equipment/harness')
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

            {brandsIsLoading &&
              <CircularProgressLoader/>
            }

            {
            brandsData &&
              <>
                <p className=' text-sm'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                <form className='w-[90%] flex flex-col items-center space-y-6'>
                  {/* aircraft model input */}
                  
                  <div className=' w-full flex flex-col items-center gap-y-4 md:grid md:grid-cols-2 md:gap-6'>
                    
                    {/* brand input / custom brand input */}
                    <BrandsSearchInputWithDropdown
                        showCustomBrandInput={showCustomBrandInput}
                        setShowCustomBrandInput={setShowCustomBrandInput}
                        className='col-span-1'
                        options={brandsData.data}
                        selectedOption={brand}
                        handleSelectChange={handleBrandChange}
                        name={'برند'}
                        icon={clothesTag}
                        IsEmptyAfterSubmit={submitted && !brand}
                    />

                    {/* show custom brand input */}
                    {
                      showCustomBrandInput &&
                        <TextInput 
                          value={customBrand} 
                          onChange={handleCustomBrand} 
                          placeholder='نام برند خود را وارد کنید' 
                        />
                    }
                    
                    <TextInput placeholder='مدل' value={aircraft} onChange={handleAircraftChange} IsEmptyAfterSubmit={submitted && !aircraft}  />

                    {/* size input */}
                    <TextInput icon={Cube} className='col-span-1' value={size} onChange={handleTextInputSize} placeholder='سایز' IsEmptyAfterSubmit={submitted && !size} />

                    {/* Flight hour input */}
                    <NumberInput icon={watchIcon} className='col-span-1' value={flightHour} onChange={handleTextInputFlightHour} placeholder='حدود ساعت کارکرد وسیله' IsEmptyAfterSubmit={submitted && !flightHour} />

                    {/* Year input */}
                    <NumberInput
                      icon={calenderIcon}
                      className='col-span-1'
                      value={year}
                      onChange={handleTextInputYear}
                      placeholder='سال ساخت (میلادی)'
                      IsEmptyAfterSubmit={submitted && !year}
                    />

                  </div>

                  <div className='w-full flex flex-col text-start gap-y-1'>
                    <p className=' self-start md:self-center text-[var(--primary-light)]'>ثبت سریال هارنس (اختیاری)</p>
                    <p className=' text-xs self-start text-start '>با پرکردن این فیلد و سینک کردن سریال هارنس به خلبان مربوطه ، امکان ثبت سریال توسط شخص دیگری نمی باشد، مگر در صورت فروش و انتقال شماره سریال به مالک جدید.
                      <br/>
                    در صورت مفقودی هارنس ما را از طریق تیکت مطلع سازید.</p>
                  </div>

                  {/* Serial number input */}
                  <TextInput
                    icon={serialNumberIcon}
                    className='col-span-1'
                    value={serialNumber}
                    onChange={handleTextInputSerialNumber}
                    placeholder='شماره سریال (اختیاری)'
                  />

                  {/* for uploading pictures */}
                  {
                        serialNumber.length > 0 &&
                        <>
                          <UploadFileInput name={'هارنس'} selectedFile={selectedFile} onFileChange={handleFileChange} />
                          <p className=' text-xs self-start text-start '>*فرمت‌های مجاز فایل BMP,GIF,JPEG,JPG,PNG تا 10 مگابایت</p>
                        </>
                  }
                  

                  <button onClick={handlePopUp} className={`${ButtonStyles.addButton} w-36 mt-2`} >ثبت</button>
                  
                </form>
              </>
            }

            {/* submit pop up */}
            <form  className={` ${boxStyles.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}  w-[304px] h-[280px] flex flex-col justify-around items-center top-52`}>

                <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                <h3 className=' text-[#ED553B] text-xl mt-[-3rem] '>تاییدیه</h3>


                <p className='text-base w-[90%]' >در صورت تایید کردن وسیله مورد نظر قابل ویرایش نمی‌باشد دقت کنید </p>


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

export default AddHarness;