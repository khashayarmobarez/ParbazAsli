import React, { useState, useEffect } from 'react';


// queries
import { useOrganLevelsForCourse, useOrgansData } from '../../Utilities/Services/queries';
import CircularProgressLoader from '../../elements/Loader/CircularProgressLoader';

// mui
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

// assets
import ClipboardIcon from '../../elements/icons/ClipboardIcon'

// comps
import PageTitle from '../../elements/reuseable/PageTitle';
import OrgansSlider from '../../modules/SyllabiList/OrgansSlider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../Utilities/context/TranslationContext';

const SyllabiList = () => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate()

    // queries
    const { data: organsData, isLoading: organsLoading } = useOrgansData();
    
    // State with localStorage persistence
    const [organ, setOrgan] = useState(() => {
        // Try to get organ from localStorage first
        const savedOrgan = localStorage.getItem('selectedOrgan');
        return savedOrgan ? JSON.parse(savedOrgan) : null;
    });

    // Effect to save organ to localStorage whenever it changes
    useEffect(() => {
        if (organ) {
            localStorage.setItem('selectedOrgan', JSON.stringify(organ));
        }
    }, [organ]);

    // Effect to set first organ if no organ is saved
    useEffect(() => {
        if (organsData && organsData.data.length > 0 && !organ) {
            setOrgan(organsData.data[0]);
        }
    }, [organsData, organ]);

    // Levels query now depends on organ id
    const { data: levelsData, isLoading: levelsLoading } = useOrganLevelsForCourse(organ?.id);

    // syllabi click handler
    const syllabiClickHandler = (level) => {
        navigate(`/syllabi/details/${level.id}`)    
    }

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>
            <div className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:gap-y-12 lg:w-[55%]'>
                <PageTitle title={t("syllabiList.syllabi")} navigateTo={'/profile'} /> 

                {organsLoading && <CircularProgressLoader />}

                {organsData && (
                    <div className='w-[90%] flex flex-col items-center gap-y-4'>
                        <OrgansSlider 
                            organs={organsData.data} 
                            setOrgan={setOrgan} 
                            theOrgan={organ} 
                        />
                        
                        {levelsLoading && <CircularProgressLoader />}

                        <div className='w-full grid grid-cols-3 gap-4 md:flex md:justify-between'>
                            {levelsData && levelsData.data.length > 0 && 
                                levelsData.data.map((level, index) => (
                                    <div 
                                        key={index} 
                                        className='w-24 h-24 flex flex-col items-center justify-center bg-bgButtonSecondaryDefault rounded-3xl gap-y-2'
                                        style={{boxShadow:'var(--shadow-button-dark),var(--shadow-button-white)'}}
                                        onClick={() => syllabiClickHandler(level)}
                                    >
                                        {!level.isPassed && (
                                            <span className='w-6 h-6'>
                                                <ClipboardIcon/>
                                            </span>
                                        )}

                                        {level.isPassed && (
                                            <CheckOutlinedIcon className='text-textAccent' />
                                        )}

                                        <p className={`${level.isPassed && 'text-textAccent'} font-semibold`}>
                                            {level.name}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SyllabiList;