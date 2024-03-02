import React from 'react';

// components
import DropDownDataBox from '../../reuseable/DropDownDataBox';
import DropDownDataStudent from '../../reuseable/DropDownDataStudent';

const Syllabus = ({ userRole }) => {

    const testText = 'در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و مت'

    return (<>
                { userRole === 'coach' &&
                <div className='flex flex-col gap-y-7'>
                    <DropDownDataBox title={"سیلابس مقدماتی"} dataText={testText}  />
                    <DropDownDataBox title={"سیلابس بگینر"} dataText={testText} />
                    <DropDownDataBox title={"سیلابس اینترمدییت"} dataText={testText} />
                    <DropDownDataBox title={"سیلابس نوایس "} dataText={testText} />
                </div>
                }

                { userRole === 'student' &&
                <div className='flex flex-col gap-y-7'>
                    <DropDownDataStudent title={"سیلابس مقدماتی"} id={'1'} dataText={testText}  />
                </div>
                }
            </>
    );
};

export default Syllabus;