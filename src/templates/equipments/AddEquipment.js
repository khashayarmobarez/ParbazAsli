import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// assets
import ClothesTag from '../../components/icons/ClothesTag';
import Cube from '../../components/icons/ThreeDCube'

// comps
import PageTitle from '../../components/reuseable/PageTitle';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import BrandsSearchInputWithDropdown from '../../modules/Equipment page comps/BrandsSearchInputWithDropdown';
import { useEquipmentBrands } from '../../Utilities/Services/dataQueries';
import TextInput from '../../components/inputs/textInput';
import NumberInput from '../../components/inputs/NumberInput';

const AddEquipment = () => {

    const location = useLocation(); 

    const equipmentType = 
    location.contains('addWing') ? 'Wing' :
        location.contains('addHarness') ? 'Harness' :
            location.contains('addParachute') && 'Parachute';         

    const { data: brandsData, isLoading: brandsIsLoading } = useEquipmentBrands(equipmentType);
            
    
    // states 
    const [selectedOptionBrand, setSelectedOptionBrand] = useState('');
    const [customBrand, setCustomBrand] = useState('')
    const [aircraft, setAircraft] = useState('');

    const [showCustomBrandInput, setShowCustomBrandInput] = useState('');
    
    const [submitted, setSubmitted] = useState(false);


    // handler functions
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

    const handleTextInputAircraft = (event) => {
        setAircraft(event.target.value);
    };


    return (
        <div className='flex flex-col mt-14 items-center'>

            <div className='flex flex-col items-center gap-y-4 w-full md:w-[75%]'>

                <PageTitle 
                    title={
                    equipmentType === 'Wing' ? 'افزودن بال' :
                        equipmentType === 'Harness' ? 'افزودن هارنس' :
                            equipmentType === 'Parachute' && 'افزودن چتر کمکی'
                    }
                />

                {
                    brandsIsLoading &&
                    <CircularProgressLoader/>
                }


                {
                    brandsData &&
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

                            </div>

                        </form>

                    </>
                }

            </div>
            
        </div>
    );
};

export default AddEquipment;