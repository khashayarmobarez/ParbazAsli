import React, { useState } from 'react';

// queries
import { useBlogs } from '../Utilities/Services/queries';

// assets
import arrow from '../assets/icons/Right Arrow Button.svg'

// components
import BlogBlock from '../components/pages/Blogs/BlogBlock';
import PageTitle from '../components/reuseable/PageTitle';

import DigilogbookLoading from '../components/Loader/DigilogbookLoading';

const Blogs = () => {

    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 6;

    const { data, error, isLoading, isError, isFetching } = useBlogs(pageSize, pageNumber);

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    return (
        <div className='w-full flex flex-col mt-14 items-center gap-y-8 pb-10 '>
            <PageTitle title={'بلاگ و مقالات'} />
            {
                isLoading && isFetching && 
                    <DigilogbookLoading />
            }

            {
                isError && <h3 className='flex w-full h-[95vh] items-center justify-center'>{error.message}</h3>
            }

            {
                data && 
                <>
                    <div className='w-[90%] flex flex-col items-center gap-y-6 pt-6 md:grid md:grid-cols-3 md:gap-x-10'>
                        {data.data.map(blogData => (
                            <BlogBlock key={blogData.id} blogData={blogData} className='col-span-1' />
                        ))}
                    </div>

                    <div className='w-[90%] md:w-[50%] my-6 flex justify-between items-center'>

                        <button
                            onClick={() => handlePageChange(pageNumber + 1)}
                            disabled={pageNumber === Math.ceil(data.totalCount / pageSize)}
                            className='flex items-center justify-center'
                        >
                            <img src={arrow} alt ='arrow'  />
                            <p>صفحه بعد</p>
                        </button>

                        <button
                            onClick={() => handlePageChange(pageNumber - 1)}
                            disabled={pageNumber === 1}
                            className='flex items-center justify-center'
                        >
                            <p>صفحه قبل</p>
                            <img src={arrow} alt ='arrow' className=' rotate-180 mb-2' />
                        </button>

                    </div>
                </>
            }

        </div>
    );
};

export default Blogs;