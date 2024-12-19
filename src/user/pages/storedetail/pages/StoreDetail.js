import { useState, useEffect } from 'react';
import styles from '../css/storedetail.module.css';
import mapIcon from '../images/mapMarker-logo.png';
import triangleBtn from '../images/inverted_triangle.png';
import Banner from '../components/Banner';
import Profile from '../components/Profile';
import KakaoMap from '../components/KakaoMap';


function StoreDetail(){

    const [storeInfo, setStoreInfo] = useState({
        storeNo : 0,
        storeName : "가게 이름",
        storeDes : "가게 소개글",
        storeAddress : "가게 주소",
        storeKeyword : [],
        operation : [],
        operationTime : ""
    });

    useEffect(
        () => {
            fetch('/store/test')  //검색 페이지 만들어지면 pathvariable로 변경하기
            .then(res => res.json())
            .then(data => {
                setStoreInfo(data)
                console.log(data)
            })
            .catch(error => console.log(error));
        }, []
    );

    useEffect(() => {
        const date = new Date();
        const day = date.getDay();

        const dayOfWeekMap = {
            0 : "sunday",
            1 : "monday",
            2 : "tuesday", 
            3 : "wednesday", 
            4 : "thursday",
            5 : "friday",
            6 : "saturday"
        };

        const dayOfWeek = dayOfWeekMap[day];

        if(storeInfo.operationTime){
            const currentOperationTime = storeInfo.operationTime[dayOfWeek];
            setStoreInfo(prevState => ({
                ...prevState,
                currentOperationTime : currentOperationTime
            }));
        }

        console.log("dayOfWeek : " , dayOfWeek);
    }, [storeInfo.operation]);
    
    console.log("요일 : " , storeInfo.operationTime)
    console.log("운영 시간 : ", storeInfo.currentOperationTime);

    return(
        <div className={styles.storeDetail}>
            <div><Banner/>
                <div><Profile/></div>
            </div>
            <p id={styles.storeName}>{storeInfo.storeName}</p>
            <p id={styles.storeDes}>{`식당 소개 : ${storeInfo.storeDes}`}</p>
            <img src={mapIcon} id={styles.mapIcon} alt = '지도 아이콘'/>
            <p id={styles.distance}>지도 api 따 온 후 미사역에서부터의 거리 측정</p>
            <p id={styles.storeAddress}>{storeInfo.storeAddress}</p>
            <p id={styles.operTime}>{`영업 시간(오늘) : ${storeInfo.currentOperationTime}`}</p> 
            <img src={triangleBtn} id={styles.triangle} alt ="영업시간 더보기 버튼"/>
            <div id={styles.mapArea}><KakaoMap/></div>
            <div className={styles.keywordArea}>
                <div>{storeInfo.storeKeyword.keyword1}</div>
                <div>{storeInfo.storeKeyword.keyword2}</div>
                <div>{storeInfo.storeKeyword.keyword3}</div>
                <div>{storeInfo.storeKeyword.keyword4}</div>
                <div>{storeInfo.storeKeyword.keyword5}</div>
                <div>{storeInfo.storeKeyword.keyword6}</div>
            </div>
        </div>
    );
}

export default StoreDetail;