import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// queries and api
import { useEquipmentBrands } from '../../../Utilities/Services/dataQueries';
import { useAddEquipment } from '../../../Utilities/Services/equipmentQueries';
import { useUserById } from '../../../Utilities/Services/queries';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// utilities
import useDateFormat from '../../../Utilities/Hooks/useDateFormat';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// mui
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// assets
import Cube from '../../../assets/icons/3dCube.svg'

// components 
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import UploadFileInput from '../../inputs/UploadFileInput';
import PageTitle from '../../reuseable/PageTitle';
import DateLastRepackInput from './inputsForEquipment/DateLastRepackInput';
import NumberInput from '../../inputs/NumberInput';
import SearchInputWithDropdown from '../../inputs/SearchInputWithDropdown';
import CircularProgressLoader from '../../Loader/CircularProgressLoader';


const AddParachute = () => {
  
  const { data: brandsData, isLoading: brandsIsLoading, error:brandsError } = useEquipmentBrands('parachute');

  
  const { mutate: mutateParachute , isLoading: isSubmitting, error: submitError} = useAddEquipment();
  
  //going a page back function
  const navigate = useNavigate();

  const { formatDate } = useDateFormat();

  // pop up control
  const [showPopup, setShowPopup] = useState(false);  
  
  // State for selected option
  const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
  const [size, setSize] = useState('');
  const [flightHour, setFlightHour] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [year, setYear] = useState('');
  const [lastPackerId, setLastPackerId] = useState('');
  
  const { data: userByIdData, loading: userByIdLoad, error: userByIdError } = useUserById(lastPackerId)

  // text state 
  const [aircraft, setAircraft] = useState('');
  
  // file state
  const [selectedFile, setSelectedFile] = useState(null);

  // date state
  const [packageDate, setPackageDate] = useState('')

  // Error states
  const [serialNumberError, setSerialNumberError] = useState('');
  const [packerIdError, setPackerIdError] = useState('');
  

  // Regex patterns
  const equipmentSerialNumberPattern = /^[a-zA-Z0-9\-_ ]*$/;
  const userIdPattern = /^[0-9]{3}[a-z]{3}$/;

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

  const validatePackerId = (lastPackerId) => {
    if (!userIdPattern.test(lastPackerId)) {
      setPackerIdError('Invalid packer ID format.');
      return false;
    } else {
      setPackerIdError('');
      return true;
    }
  };
  
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

    clickOnRightSide()
  };  

  // function to close the datePicker
  const clickOnRightSide = () => {
    // Create a new mouse event
    const clickEvent = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: window.innerWidth - 1, // Right edge of the screen
        clientY: window.innerHeight / 2 // Middle of the screen vertically
  });

    // Dispatch the event to the document
    document.dispatchEvent(clickEvent);
  };


  // Event handler for form submission
  const handlePopUp = (event) => {
    event.preventDefault();
    const currentYear = new Date().getFullYear();

    const isSerialNumberValid = validateSerialNumber(serialNumber);
    const isPackerIdValid = validatePackerId(lastPackerId);
    
    // Validate inputs
    if (serialNumber && !isSerialNumberValid) {
      toast('فرمت شماره سریال چتر اشتباه است', {
          type: 'error',
          position: 'top-right',
          autoClose: 5000,
          theme: 'dark',
          style: { width: "90%" }
      });
      return;
    }

    if (lastPackerId && !isPackerIdValid) {
      toast('فرمت کد بسته بندی کننده اشتباه است', {
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

    if (!selectedOptionBrand || !aircraft || !packageDate || !size|| !flightHour || !year) {
      toast('تمامی فیلدهای الزامی را پر کنید', {
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

      if(selectedOptionBrand || serialNumber || aircraft || size || packageDate || flightHour || year ) {

        event.preventDefault();
        const formattedPackedDate = formatDate(packageDate) + " 00:00";

        const formData = new FormData();
        // type 1 for parachute
        formData.append('Type', 1);
        formData.append('brandId', selectedOptionBrand.id);
        formData.append('file', selectedFile);
        formData.append('serialNumber', serialNumber);
        formData.append('Model', aircraft);
        formData.append('Size', size);
        if (packageDate) {
          formData.append('LastPackingDateTime', formattedPackedDate);
        }
        formData.append('lastPackerId', lastPackerId);
        formData.append('flightHours', flightHour);
        formData.append('year', year);

        console.log(formData)
        console.log('submitting')

        mutateParachute(formData, {
          onSuccess: () => {
            toast('چتر با موفقیت ثبت شد', {
              type: 'success',
              position: 'top-right',
              autoClose: 5000,
              theme: 'dark',
              style: { width: "90%" }
            });
            setShowPopup(false);
            navigate('/equipment/parachute')
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

          <div className='w-full flex flex-col items-center gap-y-5 md:w-[75%]'>

            <PageTitle title={'افزودن چتر کمکی'}  /> 

            {brandsIsLoading &&
              <CircularProgressLoader/>
            } 

            {
              brandsData &&
              <>
                <p className=' text-xs'>از صحت مشخصات وسیله خود اطمینان کامل داشته باشید<br/> 
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
                      <TextInput placeholder='مدل' value={aircraft} onChange={handleTextInputAircraft}  />

                      {/* size input */}
                      <TextInput icon={Cube} className='col-span-1' value={size} onChange={handleTextInputSize} placeholder='سایز' />

                      {/* FLight hour input */}
                      <NumberInput icon={Cube} className='col-span-1' value={flightHour} onChange={handleTextInputFlightHour} placeholder='حدود ساعت پرواز' />

                      {/* Year input */}
                      <NumberInput
                        icon={Cube}
                        className='col-span-1'
                        value={year}
                        onChange={handleTextInputYear}
                        placeholder='سال ساخت'
                      />

                      <DateLastRepackInput name={'تاریخ آخرین بسته‌بندی '} defaultValue={packageDate} onChange={handlePackageDate} placeH={'تاریخ اخرین بسته بندی'} />

                      {/* Last Packer ID input */}
                      <div className='w-full flex flex-col items-start gap-y-2'>
                        <TextInput
                          icon={Cube}
                          className='col-span-1'
                          value={lastPackerId}
                          onChange={handleTextInputLastPackerId}
                          placeholder='شناسه آخرین بسته‌بندی کننده (اختیاری)'
                        />
                        {userByIdData &&
                          <div className='flex gap-x-1 text-[#A5E65E]'>
                            <PersonOutlineOutlinedIcon />
                            <p>{userByIdData.data.fullName}</p>
                          </div>
                        }
                      </div>
                    
                    </div>

                    <div className='w-full flex flex-col text-start gap-y-1'>
                      <p className=' self-start md:self-center'>ثبت سریال چتر (اختیاری)</p>
                      <p className=' text-xs self-start text-start'>با پرکردن این فیلد و سینک کردن سریال چتر کمکی به خلبان مربوطه ، امکان ثبت سریال توسط شخص دیگری نمی باشد، مگر در صورت فروش و انتقال شماره سریال به مالک جدید.<br/>
                      در صورت مفقودی چتر کمکی ما را از طریق تیکت مطلع سازید.</p>
                    </div>
  
                        {/* Serial Number input */}
                        <TextInput
                          icon={Cube}
                          className='col-span-1'
                          value={serialNumber}
                          onChange={handleTextInputSerialNumber}
                          placeholder='شماره سریال (اختیاری)'
                        />

                    {/* <p className=' self-start md:self-center'>در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛</p> */}

                    {/* for uploading pictures */}
                    <UploadFileInput name={'چتر کمکی'} selectedFile={selectedFile} onFileChange={handleFileChange} />
                    <p className=' text-xs self-start text-start '>*فرمت‌های مجاز فایل BMP,GIF,JPEG,JPG,PNG تا 10 مگابایت</p>

                    <button type="submit" onClick={handlePopUp} className={`${ButtonStyles.addButton} w-36 mt-2`}>ثبت</button>

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

export default AddParachute;