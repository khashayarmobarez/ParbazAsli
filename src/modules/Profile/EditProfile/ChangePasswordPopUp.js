import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// redux
import { getAuthSettings } from '../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';
import { useDispatch } from 'react-redux';

// queries
import { useChangePassword } from '../../../Utilities/Services/userQueries';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import PasswordInputSignup from '../../authentication/Inputs/PasswordInputSignup';
import ConfirmPassInputSignup from '../../authentication/Inputs/ConfirmPassInputSignup';
import PasswordInputLogin from '../../authentication/Inputs/PasswordInputLogin';
import { toast } from 'react-toastify';

const ChangePasswordPopUp = ({showPopUp, setShowPopUp}) => {

    const dispatch = useDispatch();
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const [oldpwd, setOldPwd] = useState('');
    const [oldpwdFocus, setOldPwdFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [matchFocus, setMatchFocus] = useState(false);

    const { mutate: changePass, isLoading: changePassLoading } = useChangePassword();

    useEffect(() => {
        dispatch(getAuthSettings());
    }, [dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(pwd !== matchPwd) {
            toast('رمز عبور جدید با تکرارش باید یکسان باشد', {
                type: 'error', 
                position: 'top-right', 
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        }

        const data = {
            oldPassword: oldpwd,
            password: pwd,
            confirmPassword: pwd,
        }

        changePass(data , {
            onSuccess: (data) => {
                toast('رمز عبور با موفقیت تغییر یافت', {
                    type: 'success', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                setShowPopUp(false);
            },
            onError: (error) => {
                let errorMessage = 'خطایی رخ داده است';
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: appTheme,
                    style: { width: "350px" }
                });
            }
        }
        )


    }

    return (
        <div className={` w-full h-full backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 ${showPopUp ? 'visible' : 'invisible'}`}>

            <form className={`${boxStyles.containerChangeOwnership} w-[90%] h-auto gap-y-4 md:w-[454px] flex flex-col items-center relative bg-white px-5 pt-14 pb-6 rounded-lg shadow-lg`}>
                
                <CloseIcon
                    onClick={() => setShowPopUp(false)}
                    sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                />

                <PasswordInputLogin
                    onChange={(e) => setOldPwd(e.target.value)}
                    value={oldpwd}
                    focus={oldpwdFocus}
                    onFocus={() => setOldPwdFocus(true)}
                    onBlur={() => setOldPwdFocus(false)}
                    customPlaceHolder='رمز عبور قدیمی'
                    customLabelBgColor='bgCard'
                />

                <PasswordInputSignup    
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    focus={pwdFocus}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    customActivePlaceHolderBgColor='bg-bgCard'
                    />

                <ConfirmPassInputSignup
                    password={pwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    focus={matchFocus}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    customActivePlaceHolderBgColor='bg-bgCard'
                />


                <button type="submit" disabled={changePassLoading} className={`${ButtonStyles.addButton} w-28 self-center text-sm`}
                onClick={handleSubmit} >
                    {changePassLoading ? 'در حال بارگذاری...' : 'تغییر'}
                </button>

                {/* {errMsg && <p style={{ color: 'red' }}>Error: {errMsg}</p>}
                {submitError && <p style={{ color: 'red' }}>{submitError.message}</p>} */}

            </form>
            
        </div>
        );
};

export default ChangePasswordPopUp;