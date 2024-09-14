import React from 'react';

// mui
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

// css styles 
import gradients from '../../styles/gradients/Gradient.module.css'

const InputWithButton = ({icon, buttonText, placeH, Type, onSubmit, value, onChange, id, isForPhone, isLoading}) => {

    const isPhoneNumber = /^09\d*$/.test(value);

    return (
            <div className={` flex relative w-[100%] h-12 px-2`}>
                <span style={{color:'var(--disabled-button-text)'}}> 
                {(isPhoneNumber || isForPhone) ? (
                    <LocalPhoneRoundedIcon
                        sx={{ position: 'absolute', margin: '10px 5px 0 0' }}
                    />
                ) : (
                    <EmailRoundedIcon
                        sx={{ position: 'absolute', margin: '10px 5px 0 0' }}
                    />
                )}
                </span>
                <input
                    value={value}
                    onChange={onChange}
                    id={id}
                    placeholder={placeH}
                    className={`w-[100%] text-xs font-medium pr-8 rounded-r-2xl rounded-l-none`}
                    style={{
                        background: 'var(--dark-input-bg)',
                        boxShadow: 'var(--dark-input-boxShadow)',
                    }}
                />
                <button disabled={isLoading} onClick={onSubmit} className={`${gradients.clipboardButtonBackgroundGradient} ${isLoading && 'opacity-50'} 
                 w-24 h-full flex items-center justify-center rounded-l-xl px-2 text-sm whitespace-nowrap backdrop-blur-lg `}>
                    <p>{buttonText}</p> 
                </button>
            </div>           
    );
};

export default InputWithButton;