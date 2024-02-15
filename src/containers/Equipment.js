import React from 'react';
import { Link } from 'react-router-dom';

// styles and assets
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'
import AddIcon from '@mui/icons-material/Add';

// components
import FlightEquipment from '../components/reuseable/FlightEquipment';

// Queries
import { useUserDetails } from '../Utilities/hooks/queries';

const Equipment = () => {

    const { data, isLoading, error, isFetching } = useUserDetails();

    
    console.log(data, isLoading, error);

    return (
        <div className=' flex flex-col mt-14 items-center gap-y-4'>
            
            <div className=' bg-[#1B253B] w-[90%] h-20 flex justify-between items-end p-3 pr-[40%] rounded-b-2xl'>
                <p>تجهیزات</p>
                <ArrowBackIosNewIcon sx={{ width:'26px', height:'26px', padding:'5px', backgroundColor:'', borderRadius:'10rem', background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)', boxShadow: '-3px 4px 5.800000190734863px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)'}} />
            </div>
            
            {/* buttons */}
            <div className={`${ButtonStyles.ThreeStickedButtonCont}`}>
                <Link to='/equipment' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl`} >وسیله پروازی</Link> 
                <Link to='/equipment' className={ButtonStyles.ThreeStickedButtonButton} >چتر کمکی</Link> 
                <Link to='/equipment' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl`} >هارنس</Link> 
            </div>


            <div className='w-[90%] mt-6 flex flex-col gap-y-8'>

                {
                    isLoading && isFetching && <h2 className='text-white top-10'>is loading</h2>
                }

                {
                    error && <h3>{error.message}</h3>
                }
                {
                data && <FlightEquipment key={data} data={data} />
                // data && data.data.map(data => (<FlightEquipment key={data} data={data} />))
                }

            </div>


            <button className={`${ButtonStyles.addButton} fixed bottom-24`} >
                <AddIcon />
                <p>افزودن مورد جدید</p>
            </button>


            {/* <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/:id" element={<ProductDetails />} />
                <Route path="/:id/edit" element={<ProductEdit />} />
            </Routes> */}

        </div>
    );
};

export default Equipment;