import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// styles
import './SignUp.css';

// components
import UserNameInputSignup from './UserNameInputSignup';
import UserLastNameInputSignup from './UserLastNameInputSignup';
import PasswordInputSignup from './PasswordInputSignup';
import ConfirmPassInputSignup from './ConfirmPassInputSignup';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [userFocus, setUserFocus] = useState(false);

    const [userLastName, setUserLastName] = useState(''); // New state for last name
    const [userLastNameFocus, setUserLastNameFocus] = useState(false); 

    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [matchFocus, setMatchFocus] = useState(false);

    const [validName, setValidName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false)

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
      }, [user]);
      
      useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
      }, [pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
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
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
            </form>

            <button onClick={handleSubmit} disabled={!validName || !validPwd || !validMatch ? true : false}>
            Sign Up
            </button>

        </section>
    );
};

export default SignUp;