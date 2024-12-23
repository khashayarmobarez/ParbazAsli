import React from 'react';

// mui
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


const InputWithButton = ({icon, buttonText, placeH, Type, onSubmit, value, onChange, id, isForPhone, isLoading}) => {

    const isPhoneNumber = /^09\d*$/.test(value);

    return (
            <div className={` flex relative w-full h-12 justify-between`}>
                <span style={{color:'var(--text-input-default)'}} >
                {
                    (isPhoneNumber || isForPhone) ? (
                        <LocalPhoneRoundedIcon
                            sx={{ position: 'absolute', margin: '12px 8px 0 0', color:'var(--text-default)' }}
                        />
                    ) : (
                        <EmailOutlinedIcon
                            sx={{ position: 'absolute', margin: '12px 8px 0 0', color:'var(--text-default)' }}
                        />
                    )
                }
                </span>
                <input
                    value={value}
                    onChange={onChange}
                    id={id}
                    placeholder={placeH}
                    className={`w-[70%] text-xs font-medium pr-8 rounded-2xl border border-borderInputDefault`}
                    style={{
                        background: 'none',
                        boxShadow: 'var(--shadow-all)',
                    }}
                />
                <button disabled={isLoading} onClick={onSubmit} className={`bg-bgButtonSecondaryDefault mr-2 ${isLoading && 'opacity-50'} 
                w-[26%] h-12 flex items-center justify-center rounded-2xl px-2 text-sm whitespace-nowrap backdrop-blur-lg `}
                style={{boxShadow: 'var(--shadow-button-dark), var(--shadow-button-white)'}}>
                    <p>{buttonText}</p> 
                </button>
            </div>           
    );
};

export default InputWithButton;