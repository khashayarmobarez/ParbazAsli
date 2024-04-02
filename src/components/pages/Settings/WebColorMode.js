import React from 'react';


// styles
import ButtonsBox from '../../../styles/Buttons/ButtonsBox.module.css'



const WebColorMode = () => {

    


    return (
        <div className=' w-full flex justify-between items-center px-4 py-3 rounded-3xl' style={{background:'var(--button-toggle-bg)', boxShadow:'var(--button-toggle-boxshadow) '}} >
            
            <p>app mode</p>

            <label className={ButtonsBox.switch} >
                <input type="checkbox" />
                <span className={`${ButtonsBox.slider}`}></span>
            </label>

        </div>
    );
};

export default WebColorMode;