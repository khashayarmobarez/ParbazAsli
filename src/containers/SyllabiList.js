import React, { useState } from 'react';

// queries
import { useLevelsByOrganizationId, useOrganLevelsForCourse, useOrgansData } from '../Utilities/Services/queries';
import CircularProgressLoader from '../components/Loader/CircularProgressLoader';

// mui
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

// assets
import ClipboardIcon from '../components/icons/ClipboardIcon'

// comps
import PageTitle from '../components/reuseable/PageTitle';
import OrgansSlider from '../components/pages/SyllabiList/OrgansSlider';
import { useSyllabiForLevels } from '../Utilities/Services/coursesQueries';
import { useNavigate } from 'react-router-dom';

const SyllabiList = () => {

    const navigate = useNavigate()

    // states
    const [organ, setOrgan] = useState('')
    const [level, setLevel] = useState('')

    const [pageNumber, setPageNumber] = useState(1)

    // dropdown
    const [DropDown, setDropDown] = useState('')

    // queries
    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevelsForCourse(organ && organ.id);
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
                                        className='w-24 h-24 flex flex-col items-center justify-center bg-bgButtonSecondaryDefault shadow-lg rounded-3xl gap-y-2'
                                        onClick={() => syllabiClickHandler(level) }
                                    >
                                        {
                                            !level.isPassed &&
                                            <ClipboardIcon/>
                                        }

                                        {
                                            level.isPassed &&
                                            < CheckOutlinedIcon className='text-textAccent' />
                                        }

                                        <p className={`${level.isPassed && 'text-textAccent'}`}>{level.name}</p>

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