import React from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

// styles
import styles from '../../styles/others/SyllabiDetails.module.css';

// queries
import { useSyllabiForLevels, useSyllabusLandingContent } from '../../Utilities/Services/coursesQueries';

// comps
import PageTitle from '../../components/reuseable/PageTitle';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';



const SyllabiDetails = () => {

    const { id } = useParams()

    const { data: syllabiData, isLoading: syllabiLoading, error: syllabiError } = useSyllabusLandingContent(id && id);
    const { data: syllabiDataList, isLoading: syllabiListLoading, error: syllabiListError } = useSyllabiForLevels(id && id);


    const EnglishToPersianNumber = (input) => {

        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        
        return input.toString().replace(/[0-9]/g, (char) => {
            return persianNumbers[englishNumbers.indexOf(char)];
        });

    };


    if (syllabiLoading || syllabiListLoading) {
        return (
            <div className='w-full flex justify-center item-center pt-20'>
                <CircularProgressLoader /> 
            </div>
        )
    }
    

    // Handle error state
    if (syllabiError || syllabiListError) {
        return <div>Error loading syllabi content. Please try again later.</div>;
    }

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>
            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%] lg:w-[55%]'>
                <PageTitle title={syllabiData?.data?.levelName || 'سیلابس ها'} navigateTo={'/syllabi'} />
                
                <div className={`w-[90%] flex flex-col items-center gap-y-4 py-6 ${styles.container}`}>
    
                    {syllabiData && syllabiData.data.htmlContent ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    syllabiData.data.htmlContent
                                        .replace(
                                            '{0}',
                                            `<div class='w-full min-h-6 rounded-2xl bg-bgOutputDefault p-3 mt-4'>
                                                ${syllabiData.data?.practicalSyllabi.map(syllabi =>
                                                    `<div class='w-full flex justify-start items-start gap-x-2 my-4' key=${syllabi.id}>
                                                        <p class='px-4 text-xs py-1 bg-textAccent text-textDefaultOpposite font-bold rounded-lg'>
                                                            ${EnglishToPersianNumber(syllabi.order)}
                                                        </p>
                                                        <p class='text-start text-sm'>${syllabi.description}</p>
                                                    </div>`
                                                ).join('')}
                                            </div>`
                                        )
                                        .replace(
                                            '{1}',
                                            `<div class='w-full min-h-6 rounded-2xl bg-bgOutputDefault p-3 mt-4'>
                                                ${syllabiData.data?.theorySyllabi.map(syllabi =>
                                                    `<div class='w-full flex justify-start items-start gap-x-2 my-4' key=${syllabi.id}>
                                                        <p class='px-4 text-xs py-1 bg-textButtonMainDisabled text-textDefaultOpposite font-medium rounded-lg'>
                                                            ${EnglishToPersianNumber(syllabi.order)}
                                                        </p>
                                                        <p class='text-start text-sm'>${syllabi.description}</p>
                                                    </div>`
                                                ).join('')}
                                            </div>`
                                        )
                                )
                            }}
                        />
                    ) : (
                        syllabiDataList && syllabiDataList.data?.map((syllabi) => (
                            <div className='w-full flex items-center justify-start gap-x-2 ' key={syllabi.id}>
                                {syllabi.type === 'Theory' && <p className='px-4 text-xs py-1 bg-textAccent text-textDefaultOpposite rounded-lg'>تئوری</p>}
                                {syllabi.type === 'Practical' && <p className='px-4 text-xs py-1 bg-textButtonMainDisabled text-textDefault rounded-lg'>عملی</p>}
                                <p className='text-start text-sm'>{syllabi.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default SyllabiDetails;