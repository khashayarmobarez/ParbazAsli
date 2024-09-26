import React from 'react';
import { useParams } from 'react-router-dom';

// queries
import { useSyllabiForLevels, useSyllabusLandingContent } from '../../../Utilities/Services/coursesQueries';

// comps
import PageTitle from '../../reuseable/PageTitle';



const SyllabiDetails = () => {

    const { id } = useParams()

    const { data: syllabiData, isLoading: syllabiLoading, error: syllabiError } = useSyllabusLandingContent(id && id);
    const { data: syllabiDataList, isLoading: syllabiListLoading, error: syllabiListError } = useSyllabiForLevels(id && id);


    // Check if data exists and if the content is not null or undefined
    let apiHtmlParts = ['', '', ''];
    if (syllabiData && syllabiData.data) {
        apiHtmlParts = syllabiData.data.split('{0}').flatMap((part) => part.split('{1}'));
    }


    if (syllabiLoading || syllabiListLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (syllabiError || syllabiListError) {
        return <div>Error loading syllabi content. Please try again later.</div>;
    }

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            <PageTitle title={syllabiData?.data?.name || 'سیلابس ها'} navigateTo={'/profile'} />

            <div className='w-[90%] flex flex-col items-center gap-y-6 md:w-[70%] py-6'>

                {syllabiData && syllabiData.data ? (
                <>
                    <div dangerouslySetInnerHTML={{ __html: apiHtmlParts[0] }} />
                    <p>the mapped data</p>
                    <div dangerouslySetInnerHTML={{ __html: apiHtmlParts[1] }} />
                    <p>the mapped data 2</p>
                    <div dangerouslySetInnerHTML={{ __html: apiHtmlParts[2] }} />
                </>
                ) : (
                    syllabiDataList && syllabiDataList.data?.map((syllabi) => (
                        <div className='w-full flex items-center justify-start gap-x-2 ' key={syllabi.id}>
                        {syllabi.type === 'Theory' && <p className='px-4 text-xs py-1 bg-[var(--purple)] rounded-lg'>تئوری</p>}
                        {syllabi.type === 'Practical' && <p className='px-4 text-xs py-1 bg-[var(--yellow-text)] text-[var(--dark-blue-bg)] rounded-lg'>عملی</p>}
                        <p className='text-start text-sm'>{syllabi.description}</p>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
};

export default SyllabiDetails;