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
    if (syllabiData && syllabiData.data.htmlContent && (syllabiData.data?.htmlContent.includes('{0}') || syllabiData.data.htmlContent?.includes('{1}'))) {
        apiHtmlParts = syllabiData.data.htmlContent.split('{0}').flatMap((part) => part.split('{1}'));
    }

    // const persianToEnglishNumber = (input) => {
    //     const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    //     const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        
    //     return input.replace(/[\u06F0-\u06F9]/g, (char) => {
    //         return englishNumbers[persianNumbers.indexOf(char)];
    //     });
    // };


    if (syllabiLoading || syllabiListLoading) {
        return <div>Loading...</div>;
    }
    

    // Handle error state
    if (syllabiError || syllabiListError) {
        return <div>Error loading syllabi content. Please try again later.</div>;
    }

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            <PageTitle title={syllabiData?.data?.levelName || 'سیلابس ها'} navigateTo={'/profile'} />

            <div className='w-[90%] flex flex-col items-center gap-y-4 md:w-[70%] py-6'>

                {syllabiData && syllabiData.data.htmlContent ? (
                <>
                    <div dangerouslySetInnerHTML={{ __html: apiHtmlParts[0] }} />
                        {
                            syllabiData.data.htmlContent && syllabiData.data.htmlContent.includes('{0}') &&
                            <div className=' w-full min-h-6 rounded-2xl bg-[var(--syllabus-data-boxes-bg)] p-3'>
                                {   
                                    // theorySyllabi
                                    syllabiData.data?.theorySyllabi.map((syllabi) => (
                                        <div className='w-full flex justify-start items-start gap-x-2 my-4' key={syllabi.id}>
                                            <p className='px-4 text-xs py-1 bg-[var(--yellow-text)] text-[var(--dark-blue-bg)] font-medium rounded-lg'>{syllabi.order}</p>
                                            <p className='text-start text-sm'>{syllabi.description}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    <div dangerouslySetInnerHTML={{ __html: apiHtmlParts[1] }} />
                        {
                            syllabiData.data.htmlContent && syllabiData.data.htmlContent.includes('{1}') &&
                            <div className=' w-full min-h-6 rounded-2xl bg-[var(--syllabus-data-boxes-bg)] p-3'>
                                {   
                                    // practicalSyllabi
                                    syllabiData.data?.practicalSyllabi.map((syllabi) => (
                                        <div className='w-full flex justify-start items-start gap-x-2 my-4' key={syllabi.id}>
                                            <p className='px-4 text-xs py-1 bg-[var(--purple)] text-[var(--dark-blue-bg)] font-medium rounded-lg'>{syllabi.order}</p>
                                            <p className='text-start text-sm'>{syllabi.description}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        }
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