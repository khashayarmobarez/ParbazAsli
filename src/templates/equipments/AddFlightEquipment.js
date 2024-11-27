import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Queries and api
import { useEquipmentBrands, useWingClasses } from '../../Utilities/Services/dataQueries';
import { useAddEquipment } from '../../Utilities/Services/equipmentQueries';


// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// assets
import Cube from '../../components/icons/ThreeDCube'
import WingIcon from '../../components/icons/WingIcon'
import ColorTagsIcon from '../../components/icons/ColorTagsIcon'
import ClothesTag from '../../components/icons/ClothesTag'
import CalenderIcon from '../../components/icons/CalenderIcon'
import ClockIcon from '../../components/icons/ClockIcon'
import SerialNumberIcon from '../../components/icons/SerialNumberIcon'

// input options
import {flightTypeOptionsEquipment} from '../../Utilities/Providers/dropdownInputOptions'

// components 
import DropdownInput from '../../components/inputs/DropDownInput';
import TextInput from '../../components/inputs/textInput';
import UploadFileInput from '../../components/inputs/UploadFileInput';
import PageTitle from '../../components/reuseable/PageTitle';
import NumberInput from '../../components/inputs/NumberInput';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import BrandsSearchInputWithDropdown from '../../modules/Equipment page comps/BrandsSearchInputWithDropdown';


const AddFlightEquipment = () => {

  const appTheme = Cookies.get('themeApplied') || 'dark';

  const { data: brandsData, isLoading: brandsIsLoading, error:brandsError } = useEquipmentBrands('wing');
  const { data: wingsClasses, isLoading: WClassesIsLoading, error:WClassesError } = useWingClasses();
  const { mutate: mutateWing , isLoading: isSubmitting, error: submitError} = useAddEquipment();


    // State for selected option
  const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
  const [showCustomBrandInput, setShowCustomBrandInput] = useState('');
  const [customBrand, setCustomBrand] = useState('')
  const [selectedOptionClass, setSelectedOptionClass] = useState('');
  const [selectedOptionType, setSelectedOptionType] = useState('');

  const [aircraft, setAircraft] = useState('');
  const [minimumWeightCapacity, setMinimumWeightCapacity] = useState('');
  const [maximumWeightCapacity, setMaximumWeightCapacity] = useState('');
  const [flightHour, setFlightHour] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [year, setYear] = useState('');
  

  const [selectedFile, setSelectedFile] = useState(null);


  // popUp use state
  const [showPopup, setShowPopup] = useState(false);

  // Error states
  const [serialNumberError, setSerialNumberError] = useState('');

  
  const [submitted, setSubmitted] = useState(false);

  // useNavigate to go back one page
  const navigate = useNavigate();
  
  useEffect(() => {
    if(serialNumber.length < 1) {
      setSelectedFile(null);
    }
  }, [serialNumber])

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
    setCustomBrand('');
  };

  // Event handler for custom brand input
  const handleCustomBrand = (event) => {
    setCustomBrand(event.target.value);
    setSelectedOptionBrand('');
  };

  const handleSelectChangeClass = (selectedOption) => {
    setSelectedOptionClass(selectedOption);
  };

  const handleSelectChangeType = (selectedOption) => {
    setSelectedOptionType(selectedOption);
  };


  // Event handlers for weight capacity
  const handleMinimumWeightCapacity = (event) => {
    setMinimumWeightCapacity(event.target.value);
  };

  const handleMaximumWeightCapacity = (event) => {
    setMaximumWeightCapacity(event.target.value);
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
      setSubmitted(true);
      const currentYear = new Date().getFullYear();
      
      // Here you can handle form submission, such as sending data to a backend server
      const isSerialNumberValid = validateSerialNumber(serialNumber);

      if (!(selectedOptionBrand || customBrand) || !aircraft || !minimumWeightCapacity || !maximumWeightCapacity  || !flightHour || !year || !selectedOptionClass || !selectedOptionType) {
          toast('تمامی فیلدها را پر کنید', {
              type: 'error',
              position: 'top-right',
              autoClose: 5000,
              theme: appTheme,
              style: { width: "90%" }
          });
          return;
      }

      
      if (year <= 1979 || year > currentYear) {
        toast('سال تولید چتر را درست وارد کنید', {
          type: 'error',
          position: 'top-right',
          autoClose: 5000,
          theme: appTheme,
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
            theme: appTheme,
            style: { width: "90%" }
        });
        return;
      }
        
    if ((serialNumber && !selectedFile) || (selectedFile && !serialNumber)) {
        toast('در صورت تمایل به وارد کردن شماره سریال چتر, خود شماره سریال و عکس شماره سریال را با هم وارد کنید', {
            type: 'error',
            position: 'top-right',
            autoClose: 10000,
            theme: appTheme,
            style: { width: "90%" }
        });
        return;
    }

    setShowPopup(true);
    };


    // Event submision
    const handleSubmit = (event) => {

      if( serialNumber || aircraft || minimumWeightCapacity || maximumWeightCapacity || flightHour || year ) {

        event.preventDefault();

        const formData = new FormData();
        // type 1 for Hamutate Harness
        formData.append('Type', 2);
        !showCustomBrandInput && formData.append('brandId', selectedOptionBrand.id);
        showCustomBrandInput && formData.append('brandName', customBrand);
        formData.append('file', selectedFile);
        formData.append('serialNumber', serialNumber);
        formData.append('Model', aircraft);
        formData.append('minimumWeightCapacity', minimumWeightCapacity);
        formData.append('maximumWeightCapacity', maximumWeightCapacity);
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
              theme: appTheme,
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
          theme: appTheme,
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
                      
                        {/* brand input / custom brand input */}
                        <BrandsSearchInputWithDropdown
                            showCustomBrandInput={showCustomBrandInput}
                            setShowCustomBrandInput={setShowCustomBrandInput}
                            className='col-span-1'
                            options={brandsData.data}
                            selectedOption={selectedOptionBrand}
                            handleSelectChange={handleSelectChangeBrand}
                            name={'برند'}
                            icon={<ClothesTag/>}
                            IsEmptyAfterSubmit={submitted && !selectedOptionBrand}
                        />

                        {/* show custom brand input */}
                        {
                          showCustomBrandInput &&
                            <TextInput id={'TI1'} value={customBrand} onChange={handleCustomBrand} placeholder='نام برند خود را وارد کنید'  />
                        }

                        
                        {/* aircraft model input */}
                        <TextInput id={'TI2'} value={aircraft} icon={<ClothesTag/>} onChange={handleTextInputAircraft} placeholder='نام مدل' IsEmptyAfterSubmit={submitted && !aircraft} />

                        {/* size inputs */}
                        <div className='col-span-1 flex flex-col gap-y-2'>
                          <h1 className='text-[var(--text-default)]'>بازه وزن قابل تحمل وسیله</h1>
                          <div className='flex justify-between gap-x-2'>
                            <NumberInput icon={<Cube/>} id={'NI1'} className='w-full' value={minimumWeightCapacity} onChange={handleMinimumWeightCapacity} placeholder='حداقل وزن' IsEmptyAfterSubmit={submitted && !minimumWeightCapacity} />
                            <NumberInput icon={<Cube/>} id={'NI2'} className='w-full' value={maximumWeightCapacity} onChange={handleMaximumWeightCapacity} placeholder='حداکثر وزن' IsEmptyAfterSubmit={submitted && !maximumWeightCapacity} />
                          </div>
                        </div>

                        {/* class input */}
                        <DropdownInput
                          id={'ddi1'}
                          className='col-span-1'
                          name={'کلاس'}
                          icon={<WingIcon />}
                          options={wingsClasses.data}
                          selectedOption={selectedOptionClass}
                          handleSelectChange={handleSelectChangeClass}
                          IsEmptyAfterSubmit={submitted && !selectedOptionClass}
                        />

                        {/* wing type input */}
                        <DropdownInput
                          id={'ddi2'}
                          className='col-span-1'
                          icon={<ColorTagsIcon/>}
                          name={'نوع بال'}
                          options={flightTypeOptionsEquipment}
                          selectedOption={selectedOptionType} 
                          handleSelectChange={handleSelectChangeType}
                          IsEmptyAfterSubmit={submitted && !selectedOptionType}
                        />
                        
                        {/* Year input */}
                        <NumberInput
                          id={'NI3'}
                          icon={<CalenderIcon/>}
                          className='col-span-1'
                          value={year}
                          onChange={handleTextInputYear}
                          placeholder='سال ساخت (میلادی)'
                          IsEmptyAfterSubmit={submitted && !year}
                        />
                        
                        {/* flight hour model input */}
                        <NumberInput 
                          id={'NI4'}
                          icon={<ClockIcon/>} 
                          className='col-span-1' 
                          value={flightHour} 
                          onChange={handleTextInputFlightHour} 
                          placeholder='حدود ساعت کارکرد وسیله'  
                          IsEmptyAfterSubmit={submitted && !flightHour}
                        />
                      

                      </div>

                      <div className='w-full flex flex-col text-start gap-y-1'>
                        <p className=' self-start md:self-center text-[var(--text-default)]'>ثبت سریال بال (اختیاری)</p>
                        <p className=' text-xs text-right'>
                          با پرکردن این فیلد و سینک کردن سریال بال به خلبان مربوطه ، امکان ثبت سریال توسط شخص دیگری نمی باشد، مگر در صورت فروش و انتقال شماره سریال به مالک جدید.
                          <br/>
                          در صورت مفقودی بال ما را از طریق تیکت مطلع سازید.
                        </p>
                      </div>
                        <TextInput
                          id={'TI3'}
                          icon={<SerialNumberIcon/>}
                          className='col-span-1'
                          value={serialNumber}
                          onChange={handleTextInputSerialNumber}
                          placeholder='شماره سریال (اختیاری)'
                        />

                      {/* for uploading pictures */}
                      {
                        serialNumber.length > 0 &&
                          <div className={`w-full flex flex-col items-start space-y-3`}>
                            <UploadFileInput name={'بال'} selectedFile={selectedFile} onFileChange={handleFileChange} />
                            <p className=' text-xs'>*فرمت‌های مجاز فایل BMP,GIF,JPEG,JPG,PNG تا 10 مگابایت</p>
                          </div>
                      }

                      <button onClick={handlePopUp} className={`${ButtonStyles.addButton} w-36 `}>ثبت</button>

                  </form>

                  {/* submit pop up */}
                  <div className={`${showPopup ? 'fixed' : 'hidden'} w-full h-full flex justify-center items-center backdrop-blur-lg z-[110]`} >
                    <form  className={` ${boxStyles.containerChangeOwnership} ${showPopup ? 'fixed' : 'hidden'}  w-[304px] h-[280px] flex flex-col justify-around items-center top-52 `}>

                        <CloseIcon onClick={() => setShowPopup(false)} sx={{cursor: 'pointer', margin:'-0.8rem 0 0 16rem',  }} />

                        <h3 className=' text-textWarning text-xl mt-[-3rem] '>تاییدیه</h3>

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
                </>
              }

            </div>
            
        </div>
    );
};

export default AddFlightEquipment;