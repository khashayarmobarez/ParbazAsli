import React, { useState } from 'react';

// queries
import { useOrganLevelsForCourse, useOrgansData } from '../Utilities/Services/queries';
import CircularProgressLoader from '../components/Loader/CircularProgressLoader';

// comps
import PageTitle from '../components/reuseable/PageTitle';
import OrgansSlider from '../components/pages/SyllabiList/OrgansSlider';

const SyllabiList = () => {

    // states
    const [organ, setOrgan] = useState('')
    const [level, setLevel] = useState('')

    // queries
    const { data: organsData, isLoading: organsLoading, error: organsError } = useOrgansData();
    const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useOrganLevelsForCourse(organ && organ.id);

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle title={'سرفصل ها'} navigateTo={'/profile'} /> 

                {organsLoading &&
                        <CircularProgressLoader /> 
                }

                {
                    organsData &&
                    <OrgansSlider organs={organsData.data} />
                }

            </div>
            
        </div>
    );
};

export default SyllabiList;