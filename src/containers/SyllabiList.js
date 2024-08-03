import React, { useState } from 'react';

// queries
import { useOrganLevelsForCourse, useOrgansData } from '../Utilities/Services/queries';
import CircularProgressLoader from '../components/Loader/CircularProgressLoader';

// comps
import PageTitle from '../components/reuseable/PageTitle';
import OrgansSlider from '../components/pages/SyllabiList/OrgansSlider';
import { useSyllabiForLevels } from '../Utilities/Services/coursesQueries';
import DropDownLine from '../components/reuseable/DropDownLine';

const SyllabiList = () => {

    // states
    const [organ, setOrgan] = useState('')
    const [level, setLevel] = useState('')

    const [pageNumber, setPageNumber] = useState(1)

    // dropdown
    const [DropDown, setDropDown] = useState('')

    // queries
    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevelsForCourse(organ && organ.id);
    const { data: syllabiData, isLoading: syllabiLoading, error: syllabiError, refetch:refetchSyllabi } = useSyllabiForLevels(level && level);


    // dropDown onClick
    const handleDropDownClick = (index, level) => {
        setDropDown(DropDown === `dropDown${index}` ? '' : `dropDown${index}`)
        console.log(level.id)
        setLevel(level.id)
        refetchSyllabi()
        setPageNumber(1)
    }

    

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

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

                        {
                            levelsData && levelsData.data.length > 0 &&
                            levelsData.data.map((level, index) => (
                                <div key={index} className='w-full flex flex-col items-center gap-y-4'>
                                    <DropDownLine  
                                        onClickActivation={() => handleDropDownClick(index, level)}
                                        title={level.name} 
                                        dropDown={DropDown} 
                                        isActive={DropDown === `dropDown${index}`}  
                                    />
        
                                    {DropDown === `dropDown${index}` && 
                                        <div className='w-full flex flex-col gap-y-6'>
        
                                            {syllabiLoading && 
                                                <CircularProgressLoader />
                                            }
        
                                            {
                                                syllabiData && syllabiData.data?.map((syllabi) => (
                                                    <div className='w-full flex items-center justify-start gap-x-2'>
                                                        {
                                                            syllabi.type === 'Theory' &&
                                                            <p className='px-4 text-xs py-1 bg-[var(--purple)] rounded-lg'>تئوری</p>
                                                        }
                                                        {
                                                            syllabi.type === 'Practical' &&
                                                            <p className='px-4 text-xs py-1 bg-[var(--yellow-text)] text-[var(--dark-blue-bg)] rounded-lg'>عملی</p>
                                                        }
                                                        <p className='text-start text-sm'>{syllabi.description}</p>
                                                    </div>
                                                ))
                                            }
        
                                            {/* {courseData && courseData.totalPagesCount > 1 &&
                                                <div className='w-full flex justify-between mt-2'>
                                                    <p onClick={handleNextPageNumber} className='' style={{color:'var(--yellow-text)'}} >{courseData.totalPagesCount > 1 && pageNumber !== courseData.totalPagesCount && 'بقیه ی دوره ها ...'}</p>
                                                    <p onClick={handleLastPageNumber} className='' style={{color:'var(--yellow-text)'}} >{pageNumber > 1 && 'دوره های قبلی'}</p>
                                                </div>
                                            } */}
        
                                        </div>
                                    }
                                </div>
                            ))    
                        }
                    </div>
                }

            </div>
            
        </div>
    );
};

export default SyllabiList;