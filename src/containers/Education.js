import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//  Queries

// mui
import AddIcon from '@mui/icons-material/Add';
import InsightsIcon from '@mui/icons-material/Insights';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// queries
import { useCourseDividers } from '../Utilities/Services/coursesQueries';

// components 
import PageTitle from '../components/reuseable/PageTitle';
import DropDownLine from '../components/reuseable/DropDownLine';


const Education = () => {

    const navigate = useNavigate()
    
    // queries
    const { data: courseDividerData, isLoading: courseDividerLoading, error: courseDividerError } = useCourseDividers();

    // controlling  items drop down
    const [DropDown, setDropDown] = useState('')

    return (
        <div className='flex flex-col mt-14 items-center'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle title={'آموزش'} navigateTo={'/profile'} />  

                <div className='w-[90%] flex flex-col gap-y-6'>

                {courseDividerData &&
                    courseDividerData.data.map((course, index) => (
                        <div key={index} className='w-full flex flex-col items-center gap-y-6'
                        onClick={() => setDropDown(DropDown === `dropDown${index}` ? '' : `dropDown${index}`)}>
                            <DropDownLine  
                                title={course.name} 
                                dropDown={DropDown} 
                                isActive={DropDown === `dropDown${index}`}  
                            />
                            {DropDown === `dropDown${index}` && <p>{index}</p>}
                        </div>
                    ))
                }
                

                {/* <div className='w-full flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='انجمن ورزشهای هوایی' dropDown={DropDown} isActive={DropDown === 'dropDown2'} onClick={() => setDropDown(DropDown === 'dropDown2' ? '' : 'dropDown2')} />
                    {
                        DropDown === 'dropDown2' &&
                        <p>2</p>
                    }
                </div>

                <div className='w-full flex flex-col items-center gap-y-4'>
                    <DropDownLine  title='دوره های بازآموزی'  dropDown={DropDown} isActive={DropDown === 'dropDown3'} onClick={() => setDropDown(DropDown === 'dropDown3' ? '' : 'dropDown3')} />
                    {
                        DropDown === 'dropDown3' &&
                        <p>3</p>
                    }
                </div>

                <div className='w-full flex flex-col items-center gap-y-4'>
                    <DropDownLine  title='ورکشاپ ها'  dropDown={DropDown} isActive={DropDown === 'dropDown4'} onClick={() => setDropDown(DropDown === 'dropDown4' ? '' : 'dropDown4')} />
                    {
                        DropDown === 'dropDown4' &&
                        <p>3</p>
                    }
                </div>

                <div className='w-full flex flex-col items-center gap-y-4'>
                    <DropDownLine  title='دوره های سفارشی شده'  dropDown={DropDown} isActive={DropDown === 'dropDown5'} onClick={() => setDropDown(DropDown === 'dropDown5' ? '' : 'dropDown5')} />
                    {
                        DropDown === 'dropDown5' &&
                        <p>3</p>
                    }
                </div> */}


                </div>

                <div className='fixed bottom-[3.4rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px]' >
                    <button className={`${ButtonStyles.addButton} w-full`} onClick={() => navigate('/education/addClass') } >
                        <AddIcon />
                        <p>افزودن مورد جدید</p>
                    </button>
                </div>

            </div>

        </div>
    );
};

export default Education;