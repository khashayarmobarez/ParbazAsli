import React from 'react';
import DropDownLineStyle from '../../reuseable/DropDownLineStyle';

const PracticalClass = () => {

    const testText = 'در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و مت'

    return (
        <div>
            <DropDownLineStyle dataText={testText} level={'بگینر'} id={1}/>
        </div>
    );
};

export default PracticalClass;