import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// styles
import './SignUp.css';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// components
import UserNameInputSignup from './Inputs/UserNameInputSignup';
import UserLastNameInputSignup from './Inputs/UserLastNameInputSignup';
import PasswordInputSignup from './Inputs/PasswordInputSignup';
import ConfirmPassInputSignup from './Inputs/ConfirmPassInputSignup';
import NationalCodeInput from './Inputs/NationalCodeInput';
import PhoneInputSignup from './Inputs/PhoneInputSignup';
import EmailInputSignup from './Inputs/EmailInputSignUp';
import Checkbox from './Inputs/CheckBox';


const USER_REGEX = /^[^0-9~'`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;
const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|/\\:;"`<>,.\?]+$/;
const PHONE_REGEX = /^09\d{9}$/;
const REGISTER_URL = '/register';
// const NATIONAL_CODE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;

const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [userFocus, setUserFocus] = useState(false);

    const [userLastName, setUserLastName] = useState(''); // New state for last name
    const [userLastNameFocus, setUserLastNameFocus] = useState(false); 

    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);

    // const [nationalCode, setNationalCode] = useState('');
    // const [nationalCodeFocus, setNationalCodeFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [matchFocus, setMatchFocus] = useState(false);

    const [termsChecked, setTermsChecked] = useState(false);

    const [validName, setValidName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false)
    const [validPhone, setValidPhone] = useState(false);
    const [validNationalCode, setValidNationalCode] = useState(false);
    const [validEmail, setValidEmail] = useState(false);


    const [phone, setPhone] = useState(''); // State for phone number
    const [phoneFocus, setPhoneFocus] = useState(false); 

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd,phone, email]);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
      }, [user]);
      
      useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
      }, [pwd, matchPwd]);

      useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone)); // Validate phone number
    }, [phone]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    // useEffect(() => {
    //     setValidNationalCode(NATIONAL_CODE_REGEX.test(nationalCode));
    //   }, [nationalCode]);

    const handleTermsToggle = (isChecked) => {
    setTermsChecked(isChecked); // Update the checked state in the parent component
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validName || !validPwd || !validMatch || !validPhone || !validEmail || !termsChecked) { 
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd, phone, email }), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setUser('');
            setUserLastName('');
            setPwd('');
            setMatchPwd('');
            setPhone(''); 
            setEmail('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    return (
        <section className='w-full flex flex-col'>
            
            <form className='w-full flex flex-col gap-y-4'>

                <UserNameInputSignup
                    userRef={userRef}
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    focus={userFocus}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />

                <UserLastNameInputSignup
                    onChange={(e) => setUserLastName(e.target.value)}
                    value={userLastName}
                    focus={userLastNameFocus}
                    onFocus={() => setUserLastNameFocus(true)}
                    onBlur={() => setUserLastNameFocus(false)}
                />

                {/* <NationalCodeInput
                    nationalCodeRef={userRef}
                    onChange={(e) => setNationalCode(e.target.value)}
                    value={nationalCode}
                    focus={nationalCodeFocus}
                    onFocus={() => setNationalCodeFocus(true)}
                    onBlur={() => setNationalCodeFocus(false)}
                /> */}

                <EmailInputSignup
                    emailRef={userRef}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    focus={emailFocus}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />

                <PhoneInputSignup
                    phoneRef={userRef}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    focus={phoneFocus}
                    onFocus={() => setPhoneFocus(true)}
                    onBlur={() => setPhoneFocus(false)}
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

                <Checkbox
                label="با قوانین و مقررات موافقم"
                isChecked={termsChecked}
                onToggle={handleTermsToggle}
                />

                <div className='w-28 self-center'>
                    <button type="submit" className={`${ButtonStyles.addButton} w-24 self-center `} 
                    onClick={handleSubmit} 
                    disabled={!validName || !validPwd || !validMatch ? true : false}
                    >
                    تایید
                    </button>
                    {(!validName || !validPwd || !validMatch) &&
                    <p className='mt-[-2.8rem] w-24 h-12 rounded-3xl backdrop-blur text-center text-sm pt-3 font-semibold' style={{color:'black'}} > فرم را کامل کنید</p>
                    }
                </div>

                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                
            </form>


            {/* <button 
            onClick={handleSubmit} 
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className={`mt-10 `} style={{
            backgroundColor: (!validName || !validPwd || !validMatch) ? '#ccc' : '#007bff',
            color: (!validName || !validPwd || !validMatch) ? '#666' : '#fff',
            cursor: (!validName || !validPwd || !validMatch) ? 'not-allowed' : 'pointer',
        }}
            >
            Sign Up
            </button> */}

        </section>
    );
};

export default SignUp;