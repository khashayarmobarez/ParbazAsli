import React from 'react';
import { useParams } from 'react-router-dom';

// queries
import { useACourseSyllabi } from '../../../../Utilities/Services/coursesQueries';

// components
import DropDownDataBox from '../../../reuseable/DropDownDataBox';


const CourseSyllabi = () => {
    
    const { id } = useParams();
    const testText = 'در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و مت'
    
    const {  data: syllabiDataTheory, isLoading: syllabiDataTheoryLoading, error: syllabiDataTheoryError } = useACourseSyllabi(1);
    const {  data: syllabiDataPractical, isLoading: syllabiDataPracticalLoading, error: syllabiDataPracticalError } = useACourseSyllabi(2);
    
    return (
        <div className=' w-full flex flex-col gap-y-7'>
            <DropDownDataBox title={"سیلابس تئوری"} dataText={syllabiDataTheory.data}  />
            <DropDownDataBox title={"سیلابس عملی"} dataText={syllabiDataPractical.data} />
        </div>
    );
};

export default CourseSyllabi;