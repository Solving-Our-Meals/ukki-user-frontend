import banner1 from './image/main-banner1.png';
import banner2 from './image/main-banner2.png';
import banner3 from './image/main-banner3.png';
import banner4 from './image/main-banner4.png';
import banner5 from './image/main-banner5.png';
import storeBg from './image/name-bg.png';
import search from './image/Search.png';
import '../../../common/header/css/reset.css';
import './css/main.css';

function Main() {

    return (
        <>
            <div>
                <div class="slidewrap">
                    <div class="slides">
                        <div class="section1 slide">
                            <img src={banner1} />
                            <div>
                                <h3>해당 가게 이름</h3>
                                <img src={storeBg} />
                                <p>가게의 영업 시간 및 날짜</p>
                                <span>
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                </span>
                            </div>
                        </div>
                        <div class="section2 slide">
                            <img src={banner2} />
                            <div>
                                <h3>해당 가게 이름</h3>
                                <img src={storeBg} />
                                <p>가게의 영업 시간 및 날짜</p>
                                <span>
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                </span>
                            </div>
                        </div>
                        <div class="section3 slide">
                            <img src={banner3} />
                            <div>
                                <h3>해당 가게 이름</h3>
                                <img src={storeBg} />
                                <p>가게의 영업 시간 및 날짜</p>
                                <span>
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                </span>
                            </div>
                        </div>
                        <div class="section4 slide">
                            <img src={banner4} />
                            <div>
                                <h3>해당 가게 이름</h3>
                                <img src={storeBg} />
                                <p>가게의 영업 시간 및 날짜</p>
                                <span>
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                </span>
                            </div>
                        </div>
                        <div class="section5 slide">
                            <img src={banner5} />
                            <div>
                                <h3>해당 가게 이름</h3>
                                <img src={storeBg} />
                                <p>가게의 영업 시간 및 날짜</p>
                                <span>
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                    가게 설명 가게 설명 가게 설명 가게 설명 가게 설명 가게 설명
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='search'>
                    <input type='search' value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;검색창으로 이동" />
                    <img src={search} />
                </div>
                <div className='category'>

                </div>
            </div>
        </>
    )
}

export default Main;