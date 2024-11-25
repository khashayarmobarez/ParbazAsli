import React, { useState } from 'react';

// queries
import { useOrganLevelsForCourse, useOrgansData } from '../../Utilities/Services/queries';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';

// mui
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

// assets
import ClipboardIcon from '../../components/icons/ClipboardIcon'

// comps
import PageTitle from '../../components/reuseable/PageTitle';
import OrgansSlider from '../../modules/SyllabiList/OrgansSlider';
import { useNavigate } from 'react-router-dom';

const SyllabiList = () => {

    const navigate = useNavigate()

    // states
    const [organ, setOrgan] = useState('')

    // queries
    const { data: organsData, isLoading: organsLoading } = useOrgansData();
    const { data: levelsData, isLoading: levelsLoading } = useOrganLevelsForCourse(organ && organ.id);
    // const { data: syllabiData, isLoading: syllabiLoading, error: syllabiError, refetch:refetchSyllabi } = useSyllabiForLevels(level && level);


    // syllabi click handler
    const syllabiClickHandler = (level) => {
        navigate(`/syllabi/details/${level.id}`)    
    }


    // dropDown onClick
    // const handleDropDownClick = (index, level) => {
    //     setDropDown(DropDown === `dropDown${index}` ? '' : `dropDown${index}`)
    //     console.log(level.id)
    //     setLevel(level.id)
    //     refetchSyllabi()
    //     setPageNumber(1)
    // }

    

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            <div  className='w-full flex flex-col items-center gap-y-6 md:w-[70%]'>

                <PageTitle title={'سرفصل ها'} navigateTo={'/profile'} /> 

                {
                    organsLoading &&
                        <CircularProgressLoader /> 
                }

                {
                    organsData &&
                    <div className='w-[90%] flex flex-col items-center gap-y-4'>
                        
                        <OrgansSlider organs={organsData.data} setOrgan={setOrgan} theOrgan={organ} />
                        
                        {
                            levelsLoading &&
                                <CircularProgressLoader /> 
                        }

                        <div className=' w-full grid grid-cols-3 gap-4 md:flex md:justify-between'>
                            {
                                levelsData && levelsData.data.length > 0 &&
                                levelsData.data.map((level, index) => (
                                    <div 
                                        key={index} 
                                        className='w-24 h-24 flex flex-col items-center justify-center bg-bgButtonSecondaryDefault  rounded-3xl gap-y-2'
                                        style={{boxShadow:'var(--shadow-button-dark),var(--shadow-button-white)'}}
                                        onClick={() => syllabiClickHandler(level) }
                                    >
                                        {
                                            !level.isPassed &&
                                            <span className='w-6 h-6'>
                                                <ClipboardIcon/>
                                            </span>
                                        }

                                        {
                                            level.isPassed &&
                                            < CheckOutlinedIcon className='text-textAccent' />
                                        }

                                        <p className={`${level.isPassed && 'text-textAccent'} font-semibold`}>{level.name}</p>

                                    </div>
                                ))    
                            }
                        </div>
                        
                    </div>
                }

            </div>
            
        </div>
    );
};

export default SyllabiList;