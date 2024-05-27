import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'


const BlogBlock = ({blogData}) => {


    const navigate = useNavigate()


    const extractWordsFromHtml = (html, wordLimit) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const textContent = tempDiv.textContent || tempDiv.innerText || "";
        const words = textContent.split(/\s+/).slice(0, wordLimit).join(" ");
        return words;
    };


    // Destructure the necessary fields from blogData
    const { image, title, authorName, blogSections, id } = blogData;
    const previewText = blogSections && blogSections.length > 0 
    ? extractWordsFromHtml(blogSections[0].htmlContent, 33) 
    : '';


    const handleReadMoreClick = () => {
        navigate(`/blog/${id}`);
    };


    return (
        <div className='w-full h-[500px] flex flex-col items-center justify-between p-4 rounded-3xl md:p-8' 
        style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)'}}>

            <div className="w-full h-52 md:h-56">
                {image && <img src={image.path} alt={image.name} className="rounded object-cover object-center h-full w-full" />}
            </div>
            
            <div className='w-full flex flex-col h-10 justify-center items-center md:my-4'>
                <h1 className='text-lg' style={{ color: 'var(--yellow-text)' }}>{title}</h1>
                <p style={{color:'var(--low-opacity-white)'}}>{authorName}</p>
            </div>


            <p className=' text-right text-base'>{previewText}...</p>

            <button onClick={handleReadMoreClick} className={`${ButtonStyles.addButton} w-36 `}>خواندن مقاله</button>
            
        </div>
    );
};

export default BlogBlock;