import React from 'react';
import Cookies from 'js-cookie';

// mui
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


const InputWithButton = ({icon, buttonText, placeH, Type, onSubmit, value, onChange, id, isForPhone, isLoading}) => {

    // language and direction
    const dir = Cookies.get('dir') || 'ltr';

    const isPhoneNumber = /^09\d*$/.test(value);

    return (
            <div className={` flex relative w-full h-12 justify-between gap-x-3`}>
                <div className='w-full h-full flex'>

                    <span style={{color:'var(--text-input-default)'}} >
                    {
                        (isPhoneNumber || isForPhone) ? (
                            <LocalPhoneRoundedIcon
                                sx={{ position: 'absolute', margin: dir === 'ltr' ? '12px 0 0 6px' : '12px 6px 0 0', color:'var(--text-default)' }}
                            />
                        ) : (
                            <EmailOutlinedIcon
                                sx={{ position: 'absolute', margin: dir === 'ltr' ? '12px 0 0 6px' : '12px 6px 0 0', color:'var(--text-default)' }}
                            />
                        )
                    }
                    </span>
                    <input
                        value={value}
                        onChange={onChange}
                        id={id}
                        placeholder={placeH}
                        className={`w-full text-xs font-medium  rounded-2xl border border-borderInputDefault
                        ${dir === 'ltr' ? 'pl-8' : 'pr-8'}`}
                        style={{
                            background: 'none',
                            boxShadow: 'var(--shadow-all)',
                        }}
                    />
                </div>
                <button disabled={isLoading} onClick={onSubmit} className={`
                ${isLoading && 'opacity-50'} 
                bg-bgButtonSecondaryDefault w-[26%] h-12 flex items-center justify-center rounded-2xl px-2 text-sm whitespace-nowrap backdrop-blur-lg `}
                style={{boxShadow: 'var(--shadow-button-dark), var(--shadow-button-white)'}}>
                    <p>{buttonText}</p> 
                </button>
            </div>           
    );
};

export default InputWithButton;