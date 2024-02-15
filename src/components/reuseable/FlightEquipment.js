import React from 'react';

import styles from './FlightEquipment.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

const FlightEquipment = (props) => {

    const { data } = props;

    return (
        <div className={styles.container}>

            <div className=' text-xs flex flex-col items-start gap-y-1'>
                <p>کلاسB / مدلArtic / برندNiviuk</p>
                <p>77 پرواز / 24 ساعت</p>
            </div>

            <button className={ButtonStyles.normalButton}> انتقال مالکیت</button>
        </div>
    );
};

export default FlightEquipment;