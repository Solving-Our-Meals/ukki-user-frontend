import '../css/Signup.css';

function Signup() {
    return (
        <div className="signupBasic">
            <div className="signup">
                <p className="signupText">회원가입</p>
                <img className="signupLogo" src="/images/signupLogo.png" alt="회원가입 로고"></img>
                <input className="signupId" placeholder='아이디 입력'/>
                <button className="loginButton">로그인</button>
                <button className="nextButton">다음</button>
            </div>
        </div>
    );
}

export default Signup;