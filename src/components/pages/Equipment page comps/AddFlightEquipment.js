import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Queries and api
import { useEquipmentBrands, useWingClasses } from '../../../Utilities/Services/dataQueries';
import { useAddEquipment } from '../../../Utilities/Services/equipmentQueries';


// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// assets
import Cube from '../../../assets/icons/3dCube.svg'

// input options
import {flightTypeOptions} from '../../../Utilities/Providers/dropdownInputOptions'

// components 
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import UploadFileInput from '../../inputs/UploadFileInput';
import PageTitle from '../../reuseable/PageTitle';
import NumberInput from '../../inputs/NumberInput';
import SearchInputWithDropdown from '../../inputs/SearchInputWithDropdown';
import CircularProgressLoader from '../../Loader/CircularProgressLoader';


const AddFlightEquipment = () => {

  const { data: brandsData, isLoading: brandsIsLoading, error:brandsError } = useEquipmentBrands('wing');
  const { data: wingsClasses, isLoading: WClassesIsLoading, error:WClassesError } = useWingClasses();
  const { mutate: mutateWing , isLoading: isSubmitting, error: submitError} = useAddEquipment();


    // State for selected option
  const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
  const [selectedOptionClass, setSelectedOptionClass] = useState('');
  const [selectedOptionType, setSelectedOptionType] = useState('');

  const [aircraft, setAircraft] = useState('');
  const [size, setSize] = useState('');
  const [flightHour, setFlightHour] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [year, setYear] = useState('');
  

  const [selectedFile, setSelectedFile] = useState(null);

  // popUp use state
  const [showPopup, setShowPopup] = useState(false);

  // Error states
  const [serialNumberError, setSerialNumberError] = useState('');

  // useNavigate to go back one page
  const navigate = useNavigate();

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

  // Event handler for option selection
  const handleSelectChangeBrand = (selectedOption) => {
    setSelectedOptionBrand(selectedOption);
  };

  const handleSelectChangeClass = (selectedOption) => {
    setSelectedOptionClass(selectedOption);
  };

  const handleSelectChangeType = (selectedOption) => {
    setSelectedOptionType(selectedOption);
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


  //Event handler for pop up
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

      if (!selectedOptionBrand || !aircraft || !size || !flightHour || !year || !selectedOptionClass || !selectedOptionType) {
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
        formData.append('Type', 2);
        formData.append('brandId', selectedOptionBrand.id);
        formData.append('file', selectedFile);
        formData.append('serialNumber', serialNumber);
        formData.append('Model', aircraft);
        formData.append('Size', size);
        formData.append('flightHours', flightHour);
        formData.append('year', year);
        formData.append('wingClassId', selectedOptionClass.id);
        formData.append('WingType', selectedOptionType.id);

        console.log(formData)
        console.log('submitting')

        mutateWing(formData, {
          onSuccess: () => {
            toast('وسیله پروازی با موفقیت ثبت شد', {
              type: 'success',
              position: 'top-right',
              autoClose: 5000,
              theme: 'dark',
              style: { width: "90%" }
            });
            setShowPopup(false);
            navigate('/equipment/flightEquipment')
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
        <div className='flex flex-col mt-14 items-center'>

            <div className='flex flex-col items-center gap-y-4 w-full md:w-[75%]'>

              <PageTitle title={'افزودن بال'}  />  

              {
                brandsIsLoading && WClassesIsLoading &&
                <CircularProgressLoader/>
              }

              {
                brandsData && wingsClasses &&
                <>
                  <p className=' text-sm'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
                  و بعد اقدام به ثبت کنید (غیر قابل ویرایش می‌باشد)</p>

                  <form className='w-[90%] flex flex-col items-center space-y-6'>

                      <div className=' w-full flex flex-col items-center gap-y-4 md:grid md:grid-cols-2 md:gap-6'>
                      
                        {/* brand input */}
                        <SearchInputWithDropdown
                            className='col-span-1'
                            options={brandsData.data}
                            selectedOption={selectedOptionBrand}
                            handleSelectChange={handleSelectChangeBrand}
                            name={'برند'}
                        />
                        
                        {/* aircraft model input */}
                        <TextInput value={aircraft} onChange={handleTextInputAircraft} placeholder='مدل' />

                        {/* class input */}
                        <DropdownInput
                          className='col-span-1'
                          name={'کلاس'}
                          options={wingsClasses.data}
                          selectedOption={selectedOptionClass}
                          handleSelectChange={handleSelectChangeClass}
                        />

                        {/* wing type input */}
                        <DropdownInput
                          className='col-span-1'
                          name={'نوع'}
                          options={flightTypeOptions}
                          selectedOption={selectedOptionType} 
                          handleSelectChange={handleSelectChangeType}
                        />
                        
                        {/* Year input */}
                        <NumberInput
                          icon={Cube}
                          className='col-span-1'
                          value={year}
                          onChange={handleTextInputYear}
                          placeholder='سال'
                        />

                        {/* size input */}
                        <TextInput icon={Cube} className='col-span-1' value={size} onChange={handleTextInputSize} placeholder='سایز' />
                        
                        {/* flight hour model input */}
                        <NumberInput icon={Cube} className='col-span-1' value={flightHour} onChange={handleTextInputFlightHour} placeholder='حدود ساعت پرواز' />
                      

                      </div>

                      <div className='w-full flex flex-col text-start gap-y-1'>
                        <p className=' self-start md:self-center text-[var(--primary-light)]'>ثبت سریال بال (اختیاری)</p>
                        <p className=' text-xs text-right'>
                          با پرکردن این فیلد و سینک کردن سریال بال به خلبان مربوطه ، امکان ثبت سریال توسط شخص دیگری نمی باشد، مگر در صورت فروش و انتقال شماره سریال به مالک جدید.
                          <br/>
                          در صورت مفقودی بال ما را از طریق تیکت مطلع سازید.
                        </p>
                      </div>
                        <TextInput
                          icon={Cube}
                          className='col-span-1'
                          value={serialNumber}
                          onChange={handleTextInputSerialNumber}
                          placeholder='شماره سریال (اختیاری)'
                        />

                      {/* for uploading pictures */}
                      <div className='w-full flex flex-col items-start space-y-3'>
                        <UploadFileInput name={'بال'} selectedFile={selectedFile} onFileChange={handleFileChange} />
                        <p className=' text-xs'>*فرمت‌های مجاز فایل BMP,GIF,JPEG,JPG,PNG تا 10 مگابایت</p>
                      </div>


                      <button onClick={handlePopUp} className={`${ButtonStyles.addButton} w-36 `}>ثبت</button>

                  </form>

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
                </>
              }

            </div>
            
        </div>
    );
};

export default AddFlightEquipment;