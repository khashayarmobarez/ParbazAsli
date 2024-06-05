import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// components
import PasswordInputLogin from './Inputs/PasswordInputLogin';
import PhoneInputLogin from './Inputs/PhoneInputLogin';

// regex
const PHONE_REGEX = /^09\d{9}$/;



const Login = () => {

    const navigate = useNavigate()

    const userRef = useRef();
    const errRef = useRef();
    
    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [phone, setPhone] = useState(''); // State for phone number
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [validPhone, setValidPhone] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone)); // Validate phone number
    }, [phone]);

    // Define the login handler function
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        // Add your validation logic here
        if (!phone || !pwd || !validPhone) { 
            setErrMsg("اطلاعات درست نیست");
            return;
        }
        try {
            const requestBody = {
                userName: phone,
                password: pwd,
                rememberMe: true
            };

            const response = await axios.post(
                'https://api.par-baz.ir/api/Auth/Login',
                requestBody
            );

            // Successful login
            if (response.data.isSuccess) {
                console.log('Login successful');
                console.log(response.data.data.loginExpireInDays);

                // Save the token in a cookie
                Cookies.set('token', response.data.data.token, { expires: response.data.data.loginExpireInDays });

                // Navigate the user to the dashboard
                navigate('/profile');
            } else {
                console.error('Login failed');
                setErrMsg('Login failed');
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
            } else {
                console.log(err);
                setErrMsg(err.response.data.ErrorMessages[0].ErrorMessage);
            }
            errRef.current.focus();
        }
    };

    

    

    return (
        <section className='w-full flex flex-col'>
            
            <form className='w-full flex flex-col gap-y-4 pt-6 pb-10 min-h-[71vh]'>

            <PhoneInputLogin
                phoneRef={userRef}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                focus={phoneFocus}
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
            />

            <PasswordInputLogin    
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                focus={pwdFocus}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
            />

            <button type="submit" className={`${ButtonStyles.addButton} w-24 self-center `}
                onClick={handleLoginSubmit} 
                disabled={!phone || !pwd ? true : false}
                >
                تایید
            </button>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            </form>
            
        </section>
    );
};

export default Login;