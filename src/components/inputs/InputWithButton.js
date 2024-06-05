import React from 'react';

// css styles 
import gradients from '../../styles/gradients/Gradient.module.css'

const InputWithButton = ({icon, buttonText, placeH, Type, onSubmit, value, onChange, id}) => {
    return (
            <div className={` flex relative w-[100%] h-12 px-2`}>
                <span style={{color:'var(--disabled-button-text)'}}> 
                    <img src={icon} alt='icon' style={{ position: 'absolute', margin: '14px 5px 0 0' }} />
                    {/* <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} /> */}
                </span>
                <input value={value} onChange={onChange} type={Type} id={id} placeholder={placeH} className={` w-[100%] text-sm font-medium pr-8 rounded-r-2xl rounded-l-none`} style={{background:'var(--dark-input-bg)', boxShadow:'var(--dark-input-boxShadow)'}} />
                <button onClick={onSubmit} className={`${gradients.clipboardButtonBackgroundGradient} w-24 h-full flex items-center justify-center rounded-l-xl px-2 text-sm whitespace-nowrap`}>
                    <p>{buttonText}</p> 
                </button>
            </div>           
    );
};

export default InputWithButton;