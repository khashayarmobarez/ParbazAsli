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
import boxStyles from '../../../styles/DataBox.module.css';
import ButtonStyles from '../../../styles/ButtonsBox.module.css'
import PasswordInputSignup from '../../authentication/Inputs/PasswordInputSignup';
import ConfirmPassInputSignup from '../../authentication/Inputs/ConfirmPassInputSignup';
import PasswordInputLogin from '../../authentication/Inputs/PasswordInputLogin';
import { toast } from 'react-toastify';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const ChangePasswordPopUp = ({showPopUp, setShowPopUp}) => {

    // language
    const { t } = useTranslation();

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
            toast(t("settings.passwordChange.passwordMismatch"), {
                type: 'error', 
                position: 'top-center', 
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
                toast(t("settings.passwordChange.successMessage"), {
                    type: 'success', 
                    position: 'top-center', 
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                setShowPopUp(false);
            },
            onError: (error) => {
                let errorMessage = t("settings.passwordChange.errorMessage");
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
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

            <form className={`${boxStyles.containerChangeOwnership} w-[90%] h-auto gap-y-4 md:w-[454px] flex flex-col items-center relative bg-white px-4 pt-12 pb-4 rounded-[34px] shadow-lg`}>
                
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
                    customPlaceHolder={t("settings.passwordChange.oldPassword")}
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


                <button type="submit" disabled={changePassLoading} className={`${ButtonStyles.addButton} w-[108px] self-center text-sm`}
                onClick={handleSubmit} >
                    {changePassLoading ? t("settings.passwordChange.loading") : t("settings.passwordChange.change")}
                </button>

                {/* {errMsg && <p style={{ color: 'red' }}>Error: {errMsg}</p>}
                {submitError && <p style={{ color: 'red' }}>{submitError.message}</p>} */}

            </form>
            
        </div>
        );
};

export default ChangePasswordPopUp;