import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

// queries
import { useBlog } from '../../../Utilities/Services/queries';

// mui
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useMediaQuery from '@mui/material/useMediaQuery';

// assets
import mailIcon from '../../../assets/icons/mail-Icon (Stroke).svg'

// components
import Loader from '../../Loader/Loader';



const BlogDetails = () => {

    const navigate = useNavigate()

    const isBelow768px = useMediaQuery('(max-width:768px)');

    const { id } = useParams();
    const { data, isLoading, isError, isFetching, error } = useBlog(id);

    // Destructure title safely
    const {
        title,
        authorName,
        timeToReadInMinutes,
        createDate,
        blogVisitCount,
        blogSections,
        blogComments,
        image
    } = data?.data || {};

    return (
        <div className='w-full flex flex-col mt-14 items-center gap-y-8 pb-10 '>
            {
                isLoading && isFetching && 
                <div className='flex w-full h-[95vh] items-center justify-center'>
                    <Loader />
                </div>
            }

            {
                isError && <h3 className='flex w-full h-[95vh] items-center justify-center'>{error.message}</h3>
            }

            {
                data && 
                <div className='w-[90%] min-h-[50vh] flex flex-col items-center gap-y-8 md:mt-14'>

                    {
                        isBelow768px &&
                        <div className={`sticky top-12 md:top-2 z-10 bg-[#1B253B] w-full h-20 md:h-32 flex flex-col items-between justify-end pt-3 pb-2 rounded-b-2xl `}>
                            <p className=' font-medium' style={{color:'var(--yellow-text)'}}>{title}</p>
                            <p className=' font-medium'>{authorName}</p>
                            <ArrowBackIosNewIcon onClick={() => navigate(-1)} sx={{position:'absolute',left:'1rem' , width:'26px', height:'26px', padding:'5px', backgroundColor:'', borderRadius:'10rem', background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)', boxShadow: '-3px 4px 5.8px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)'}} />
                        </div>
                    }

                    <div className='w-full min-h-[530px] flex flex-col items-center justify-between px-4 py-6 rounded-3xl gap-y-4 md:p-8 md:w-3/5' 
                    style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)'}}>

                        <img src={image.path} alt={image.name} className='w-full h-40 rounded-xl object-cover md:h-[30rem]' />

                        <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-y-4'>
                            <div className='flex gap-x-2'>
                                <img src={mailIcon} alt='mailIcon' />
                                <p>{timeToReadInMinutes} دقیقه مطالعه</p>
                            </div>
                            <div className='flex gap-x-2'>
                                <img src={mailIcon} alt='mailIcon' />
                                <p>{createDate}</p>
                            </div>
                            <div className='flex gap-x-2'>
                                <img src={mailIcon} alt='mailIcon' />
                                <p>{blogVisitCount} بازدید</p>
                            </div>
                            <div className='flex gap-x-2'>
                                <img src={mailIcon} alt='mailIcon' />
                                <p>{blogComments.length} نظر</p>
                            </div>
                        </div>
                        
                        {/* blog content */}
                        <div className='text-right'>
                            {
                                !isBelow768px &&
                                <>
                                    <h1 className='text-2xl' style={{color:'var(--yellow-text)'}}>{title}</h1>
                                    <p className='text-xl' style={{color:'var(--low-opacity-white)'}}>{authorName}</p>
                                </>
                            }
                            <div className='md:mt-4'>
                                {blogSections.map(content => (
                                    <p key={content.order} id={content.order}>{content.htmlContent}</p>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* comments */}
                    <div className='w-full flex flex-col gap-y-6 md:w-3/5'>
                        {blogComments.map(comment => (
                            <div key={comment.id} className='w-full min-h-[130px] flex flex-col items-start gap-y-2 px-4 py-4 rounded-3xl' 
                            style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)'}}>
                                <p>{comment.userName}</p>
                                <p>{comment.comment}</p>
                            </div>
                        )
                        )}
                    </div>

                </div>
            }
        </div>
    );
};

export default BlogDetails;