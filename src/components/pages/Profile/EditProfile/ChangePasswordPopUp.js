import React, { useState } from 'react';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css';
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'
import PasswordInputSignup from '../../authentication/Inputs/PasswordInputSignup';
import ConfirmPassInputSignup from '../../authentication/Inputs/ConfirmPassInputSignup';

const ChangePasswordPopUp = ({showPopUp, setShowPopUp}) => {

    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [matchFocus, setMatchFocus] = useState(false);

    return (
        <div className={` w-full h-full backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 ${showPopUp ? 'visible' : 'invisible'}`}>

            <form className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[454px] gap-y-2 flex flex-col justify-around items-center relative bg-white p-5 rounded-lg shadow-lg`}>
                
                <CloseIcon
                    onClick={() => setShowPopUp(false)}
                    sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                />

                <PasswordInputSignup    
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    focus={pwdFocus}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />

                <ConfirmPassInputSignup
                    password={pwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    focus={matchFocus}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />


                <button type="submit" disabled={isLoading} className={`${ButtonStyles.addButton} w-28 self-center text-sm`}
                onClick={handleSubmit} >
                    {isLoading ? 'در حال بارگذاری...' : 'ثبت تغییرات'}
                </button>

                {/* {errMsg && <p style={{ color: 'red' }}>Error: {errMsg}</p>}
                {submitError && <p style={{ color: 'red' }}>{submitError.message}</p>} */}

            </form>
            
        </div>
    );
};

export default ChangePasswordPopUp;