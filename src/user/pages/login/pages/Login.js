import React, {useState} from 'react';
import '../css/Login.css';
import '../css/reset.css';

function Login() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userId: '',
        userPass: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // 아이디
    const handleUsernameSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/auth/login/step-one', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: formData.userId }),
        });

        const result = await response.json();
        console.log(result.isValid)
        if (result.isValid) {
            setStep(2);
            setError('');
        } else {
            setError('아이디가 유효하지 않거나 존재하지 않습니다.');
        }
    };

    // 비번
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/auth/login/step-two', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: formData.userId,
                userPass: formData.userPass,
            }),
        });

        const result = await response.json();

        if (result.success) {
            setError('');
            // 로그인 성공 후 리디렉션 처리
            window.location.href = '/main';
        } else {
            setError(result.message || '비밀번호가 잘못되었습니다.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="signupBasic">
            <div className="signup">
                <p className="loginText">로그인</p>
                <img className="signupLogo" src="/images/signupLogo.png" alt="회원가입 로고"></img>
                {step === 1 && (
                    <form onSubmit={handleUsernameSubmit}>

                        <fieldset className="fieldId">
                            <div className="inputWrapper">
                                <input
                                    className={`signupId ${error ? 'errorInput' : ''}`}
                                    type="text"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    id="userId"
                                    placeholder="아이디 입력"
                                />
                                <label htmlFor="userId">아이디 입력</label>
                            </div>
                        </fieldset>
                        {error && <p className="error">{error}</p>}
                        <button className="loginButton">로그인</button>
                        <button className="nextButton">다음</button>
                    </form>
                )}

                {/* 비밀번호 입력받는 스탭 */}
                {step === 2 && (
                    <form onSubmit={handlePasswordSubmit}>
                        <fieldset className="fieldPwd">
                            <div className="inputWrapper">
                                <input
                                    className={`signupPwd ${error ? 'errorInput' : ''}`}
                                    type={showPassword ? "text" : "password"}
                                    name="userPass"
                                    value={formData.userPass}
                                    onChange={handleChange}
                                    id="userPass"
                                    placeholder="비밀번호 입력"
                                />
                                <label htmlFor="userPass">비밀번호 입력</label>
                                <div className="passwordToggleBtn">
                                    <img
                                        src={showPassword ? "/images/signup/default.png" : "/images/signup/on.png"}
                                        alt="비밀번호 보이기/숨기기"
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        {error && <p className="error">{error}</p>}
                        <button className="nextButton">로그인</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login;