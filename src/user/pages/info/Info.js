import MainLogo from './image/character-main.png';
import ImgLogo from './image/img-logo.png';
import TextLogo from './image/text-logo.png';
import TalkBg from './image/talk-bg.png';
import Talk2 from './image/talk-2.png';
import Talk1 from './image/talk-1.png';
import '../../../common/header/css/reset.css';
import '../info/css/Info.css';


function Info() {

    return (
        <>
        <div className='info'>
            <h1>우리들의 끼니 해결 소개</h1>
            <p>&larr;우리들의 끼니 마스코트 캐릭터</p>
            <h4>캐릭터 이름 : </h4>
            <h4>우끼링</h4>
            <h4>캐릭터 나이 : </h4>
            <h4>11살</h4>
            <span>
                우끼링은 우리들의 끼니에서 키우고 있는 먹보 원숭이입니다.<br />
                우끼를 만들기 위한 아마존에서 혼밥 맛집 탐사를 하고 돌아오던 때<br />
                가방에서 바나나껍질과 함께 발견되었어요! 그 후로 저희 곁을 떠나려고 하지 않아서<br />
                우끼의 혼밥 맛집을 찾아서 추천해주는 혼밥 스카우터 겸 마스코트로 활동중입니다.<br />
                참고로 머리 위의 바나나는 머리 위에 놓은걸 까먹고 안먹고 있답니다 (ʃƪ ₀ ³₀)❥
            </span>
            <img src={MainLogo}/>
<div></div>
            <h3>우끼 로고</h3>
            <span>우리들의 끼니 해결 마스코트 캐릭터 우끼링과
                혼밥이라는 느낌을 주기 위한 칸막이를 넣었고
                최대한 귀엽게 하려고 했습니다 어쩌구
            </span>

            <p>&rarr; 스타일 가이드 및 로고 다운로드 하기</p>
            <button>SVG</button>
            <button>JPG</button>
            <img src={ImgLogo} />
            <p>이미지 로고</p>
            <img src={TextLogo} />
            <p>텍스트 로고</p>

            <h3>우리들의 끼니 해결의 목적</h3>
            <img src={TalkBg} />
            <img src={Talk2} />
            <img src={Talk1} />

            <span>
                우리 프로젝트에 대한 설명과 목적 4줄이상 적기 우리 프로젝트에 대한 설명과 목적 4줄이상 적기 우리 프로젝트에 대한 설명과 목적
                우리 프로젝트에 대한 설명과 목적 4줄이상 적기 우리 프로젝트에 대한 설명과 목적 4줄이상 적기 우리 프로젝트에 대한 설명과 목적
                우리 프로젝트에 대한 설명과 목적 4줄이상 적기 우리 프로젝트에 대한 설명과 목적 4줄이상 적기 우리 프로젝트에 대한 설명과 목적
                <br/>
                <br/>
                우리 프로젝트에 대한 설명과 목적 4줄이상 적기 우리 프로젝트에 대한 설명과 목적 4줄이상 적기 우리 프로젝트에 대한 설명과 목적
            </span>
            <button src="https://github.com/Solving-Our-Meals/ukki-front">깃허브 가기</button>
            <button>기획안 보기</button>
            </div>
        </>
    )
}

export default Info;