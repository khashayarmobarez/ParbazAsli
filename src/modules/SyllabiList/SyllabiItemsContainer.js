import React, { useEffect, useState } from 'react';

const SyllabiItemsContainer = ({syllabiDataList}) => {

    const [syllabi, setSyllabi] = useState({
        flightSyllabi: [],
        groundHandlingSyllabi: [],
        theorySyllabi: [],
    })

    

    useEffect(() => {
        if(syllabiDataList?.data) {
            const flightSyllabi = syllabiDataList.data.filter((item) => item.type === 'Flight');
            const groundHandlingSyllabi = syllabiDataList.data.filter((item) => item.type === 'GroundHandling');
            const theorySyllabi = syllabiDataList.data.filter((item) => item.type === 'Theory');

            setSyllabi({
                flightSyllabi,
                groundHandlingSyllabi,
                theorySyllabi,
            });

            
        }

    },[syllabiDataList])

    return (
        <div className='w-full flex flex-col items-center justify-center gap-y-4 -mt-4'>

            <div className='w-full flex items-center justify-center text-base font-extrabold text-textAccent'>
                <p style={{fontSize:'16px', fontWeight:'700'}}>موارد آموزش عملی</p>
            </div>

            {
                syllabi.groundHandlingSyllabi.length > 0 &&
                <div class='w-full min-h-6 rounded-2xl bg-bgCard pb-2 flex flex-col gap-y-4'>
                    <div class='w-full flex bg-bgOutputSelectedOption h-11 text-textAccent items-center justify-center text-lg font-bold rounded-t-2xl'>
                        <p class='h-full flex items-center'>تمرین زمینی</p>
                    </div>
                    {
                        syllabi && syllabi.groundHandlingSyllabi?.map((syllabi) => (
                            <div className='w-full flex items-center justify-start gap-x-2 px-2 ' key={syllabi.id}>
                                <p className='bg-textAccent flex justify-center min-w-6 rounded-md'>{syllabi.order}</p>
                                <p className='text-start text-sm'>{syllabi.description}</p>
                            </div>
                        ))
                    }
                </div>
            }
            
            <div class='w-full min-h-6 rounded-2xl bg-bgCard pb-2 flex flex-col items-start gap-y-4'>
                <div class='w-full flex bg-bgOutputSelectedOption h-11 text-textAccent items-center justify-center text-lg font-bold rounded-t-2xl'>
                    <p class='h-full flex items-center'>پرواز</p>
                </div>
                {
                    syllabi && syllabi.flightSyllabi?.map((syllabi) => (
                        <div className='w-full flex items-center justify-start gap-x-2 px-2 ' key={syllabi.id}>
                            <p className='bg-textAccent flex justify-center min-w-6 rounded-md'>{syllabi.order}</p>
                            <p className='text-start text-sm'>{syllabi.description}</p>
                        </div>
                    ))
                }
            </div>

            
            <div className='w-full flex flex-col items-center gap-y-4'>
                <div className='w-full flex items-center justify-center text-textAccent'>
                    <p style={{fontSize:'16px', fontWeight:'700'}}>موارد تئوری </p>
                </div>
                <div class='w-full min-h-6 rounded-2xl bg-bgCard p-2 flex flex-col items-start gap-y-4'>
                    {
                        syllabi && syllabi.theorySyllabi?.map((syllabi) => (
                            <div className='w-full flex items-center justify-start gap-x-2 px-2 ' key={syllabi.id}>
                                <p className='bg-textAccent flex justify-center min-w-6 rounded-md'>{syllabi.order}</p>
                                <p className='text-start text-sm'>{syllabi.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    );
};

export default SyllabiItemsContainer;