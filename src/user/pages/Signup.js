import React, {useState} from 'react';
import '../css/reset.css';
import '../css/Signup.css';

function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ userid: '', password: '', email: '', auth: '', username: '', terms: false });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/auth/signupid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid: formData.userid })
        });
        const result = await response.json();
        if (result.isValid) {
            setStep(2);
            setError('');
        } else {
            setError('유효하지 않거나 중복된 아이디입니다.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/auth/signuppwd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: formData.password})
        })
        const result = await response.json();
        if (result.isValid) {
            setStep(3);
            setError('');
        } else {
            setError('비밀번호는 영문, 숫자, 특수문자 조합')
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/signupemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formData.email})
        })
        const result = await response.json();
        if (result.isValid) {
            setStep(4);
            setError('');
        } else {
            setError('올바른 이메일 형식이 아닙니다.')
        }
    };


    return (
        <div className="signupBasic">
            <div className="signup">
                <p className="signupText">회원가입</p>
                <img className="signupLogo" src="/images/signupLogo.png" alt="회원가입 로고"></img>
                {step === 1 && (
                     <form onSubmit={handleUsernameSubmit}>

                <fieldset className="fieldId">
                <input
                className="signupId"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="아이디 입력"
                required
                />
                </fieldset>
                {error && <p className="error">{error}</p>}
                <button className="loginButton">로그인</button>
                <button className="nextButton">다음</button>
                </form>
                )}

                {step === 2 && (
                     <form onSubmit={handlePasswordSubmit}>

                <fieldset className="fieldId">
                <input
                className="signuPwd"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호 입력"
                required
                />
                </fieldset>
                {error && <p className="error">{error}</p>}
                <button className="loginButton">로그인</button>
                <button className="nextButton">다음</button>
                </form>
                )}

                {step === 3 && (
                     <form onSubmit={handleEmailSubmit}>

                <fieldset className="fieldId">
                <input
                className="signuEmail"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일 입력"
                required
                />
                </fieldset>
                {error && <p className="error">{error}</p>}
                <button className="loginButton">로그인</button>
                <button className="nextButton">다음</button>
                </form>
                )}
            </div>
        </div>
    )
}

export default Signup;