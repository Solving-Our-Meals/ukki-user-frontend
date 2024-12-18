import React, {useState} from 'react';
import '../css/Signup.css';
import '../css/reset.css';

function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ userId: '', userPass: '', email: '', auth: '', userName: '', terms: false });
    const [error, setError] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value // formData의 해당 name 필드를 업데이트
        }));
        console.log("Updated formData:", { [name]: value });
    };

                // 아이디 유효성 검사
                const validateUsername = (userId) => {
                const usernamePattern = /^[a-zA-Z0-9_-]{6,15}$/;
                return usernamePattern.test(userId);  // 영문, 숫자, 하이픈, 언더바 가능, 길이 6~15자
                };
    
                // 닉네임 유효성 검사
                const validateNickname = (userName) => {
                const nicknamePattern = /^[a-zA-Z0-9가-힣]{1,12}$/;
                return nicknamePattern.test(userName);  // 영문, 숫자, 한글 가능, 길이 1~12자
                };

                //아이디 중복검사
                const handleUsernameSubmit = async (e) => {
                e.preventDefault();

                // 아이디 유효성 검사
                if (!validateUsername(formData.userId)) {
                    setError('ⓘ 아이디는 영문, 숫자, 하이픈, 언더바 조합으로 6~15자 이내로 입력해주세요.');
                    return;
                }

                console.log("Submitting userid:", formData.userId);

        const response = await fetch('/auth/signupid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: formData.userId })
        });
        const result = await response.json();
        if (result.isValid) {
            setStep(2); // 아이디가 유효하면 비밀번호 입력 단계로 넘어감
            setError('');
        } else {
            setError('ⓘ 유효하지 않거나 중복된 아이디입니다.');
        }
    };

    // 비밀번호
    const validatePassword = (userPass) => {
        return userPass.trim().length > 0;  // 공백만 있는지 확인
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        // 클라이언트에서 비밀번호가 공백인지 확인
        if (!validatePassword(formData.userPass)) {
            setError('비밀번호는 필수 입력 항목입니다.');
            return;
        }

        // 서버에서 비밀번호 유효성 검사를 처리
        const response = await fetch('/auth/signuppwd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userPass: formData.userPass })
        });
        const result = await response.json();

        if (result.isValid) {
            setStep(3); // 비밀번호가 유효하면 이메일 입력 단계로 넘어감
            setError('');
        } else {
            setError('비밀번호 유효성 확인에 실패했습니다.');
        }
    };

    // 이메일 인증번호 보내기
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/auth/sendemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formData.email })
        });
        const result = await response.json();
        if (result.success) {
            setVerificationCodeSent(true); // 인증번호 전송 완료
            setError('');
            setStep(4); // 인증번호 입력 단계로 이동
        } else {
            setError('올바른 이메일 형식이 아닙니다.');
        }
    };

    // 이메일 인증번호 확인
    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/auth/verifycode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formData.email, verificationCode })
        });
        const result = await response.json();
        if (result.success) {
            setStep(5); // 인증 성공 후 다음 단계로 이동
            setError('');
        } else {
            setError('인증번호가 일치하지 않습니다. 다시 시도해 주세요.');
        }
    };

        // 닉네임
        const handleNicknameSubmit = async (e) => {
            e.preventDefault();

            // 닉네임 유효성 검사
            if (!validateNickname(formData.userName)) {
            setError('닉네임은 영문, 숫자, 한글 조합으로 1~12자 이내로 입력해주세요.');
            return;
            }

            const response = await fetch('/auth/checknickname', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName: formData.userName })
            });
            const result = await response.json();
            if (result.isValid) {
                setStep(6);  // 닉네임이 유효하면 약관 동의 단계로 넘어감
                setError('');
            } else {
                setError('유효하지 않거나 중복된 닉네임입니다.');
            }
        };

        // 약관 동의
        const handleTermsSubmit = (e) => {
        e.preventDefault();
        if (!formData.terms) {
            setError('약관에 동의해야 합니다.');
            return;
        }

        // 회원가입 완료
        const response = fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)  // 모든 회원가입 정보 전송
        });
        response.then(res => res.json()).then(result => {
            if (result.success) {
                alert('회원가입이 완료되었습니다!');
                setStep(7); // 회원가입 완료 단계로 이동
            } else {
                setError('회원가입에 실패했습니다.');
            }
        });
    };

    return (
        <div className="signupBasic">
            <div className="signup">
                <p className="signupText">회원가입</p>
                <img className="signupLogo" src="/images/signupLogo.png" alt="회원가입 로고"></img>
                {step === 1 && (
                    <form onSubmit={handleUsernameSubmit}>
                        {/* <fieldset className="fieldId">
                            <input
                                className="signupId"
                                type="text"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                placeholder="아이디 입력"
                                required
                            />
                        </fieldset> */}
                        <fieldset className="fieldId">
                        <div className="inputWrapper">
                        <input
                        className="signupId"
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        id="userId"
                        placeholder="아이디 입력"
                        required
                        />
                        <label htmlFor="userId">아이디 입력</label>
                        </div>
                        </fieldset>
                        {error && <p className="error">{error}</p>}
                        <button className="nextButton">다음</button>
                        </form>
                        )}

                {step === 2 && (
                    <form onSubmit={handlePasswordSubmit}>
                        <fieldset className="fieldId">
                            <input
                                className="signupPwd"
                                type="password"
                                name="userPass"
                                value={formData.userPass}
                                onChange={handleChange}
                                placeholder="비밀번호 입력"
                                required
                            />
                        </fieldset>
                        {error && <p className="error">{error}</p>}
                        <button className="nextButton">다음</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleEmailSubmit}>
                        <fieldset className="fieldId">
                            <input
                                className="signuEmail"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="이메일 입력"
                                required
                            />
                        </fieldset>
                        {error && <p className="error">{error}</p>}
                        <button className="nextButton">다음</button>
                    </form>
                )}

                {step === 4 && verificationCodeSent && (
                    <form onSubmit={handleVerificationSubmit}>
                        <fieldset className="fieldId">
                            <input
                                className="signupAuth"
                                type="text"
                                name="auth"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="인증번호 입력"
                                required
                            />
                        </fieldset>
                        {error && <p className="error">{error}</p>}
                        <button className="nextButton">인증번호 확인</button>
                    </form>
                )}

                {step === 5 && (
                    <form onSubmit={handleNicknameSubmit}>
                        <fieldset className="fieldId">
                            <input
                                className="signupName"
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="닉네임 입력"
                                required
                            />
                        </fieldset>
                        {error && <p className="error">{error}</p>}
                        <button className="nextButton">다음</button>
                    </form>
                )}

                {step === 6 && (
                    <form onSubmit={handleTermsSubmit}>
                        <fieldset className="fieldId">
                            <input
                                type="checkbox"
                                name="terms"
                                checked={formData.terms}
                                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                            />
                            <label htmlFor="terms">약관에 동의합니다.</label>
                        </fieldset>
                        {error && <p className="error">{error}</p>}
                        <button className="nextButton">회원가입 완료</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Signup;