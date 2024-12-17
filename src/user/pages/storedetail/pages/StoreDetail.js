import { useState, useEffect } from 'react';
import styles from '../css/storedetail.module.css';
import mapIcon from '../images/mapPointer-logo.png';
import triangleBtn from '../images/inverted_triangle.png';
import KeywordAPI from '../api/KeywordAPI';


function StoreDetail(){

    const [storeInfo, setStoreInfo] = useState({
        storeNo : 0,
        storeName : "가게 이름",
        storeDes : "가게 소개글",
        storeAddress : "가게 주소"
    });

    const [keywords, setKeyword] = useState({
        keyword1 : "반려동물 출입 불가능",
        keyword2 : "keyword2",
        keyword3 : "keyword3",
        keyword4 : "keyword4",
        keyword5 : "keyword5",
        keyword6 : "keyword6"
    });

    useEffect(
        () => {
            console.log('가게정보페치')
            fetch('http://localhost:8080/store/test')  //검색 페이지 만들어지면 pathvariable로 변경하기
            .then(res => res.json())
            .then(data => {
                setStoreInfo(data)
                console.log(data)
            })
            .catch(error => console.log(error));
        }, []
    );

    useEffect(
        () => {
            async function keywordAPI(){
                try{
                    const data = await KeywordAPI();
                    setKeyword(data);
                } catch(error){
                    console.log(error)
                }
            }
        }, []
    );



    return(
        <div className={styles.storeDetail}>
            <div className={styles.bannerStyle}>배너 영역
                <div id={styles.profileStyle}>프로필영역</div>
            </div>
            <p id={styles.storeName}>{`가게 이름 : ${storeInfo.storeName}`}</p>
            <p id={styles.storeDes}>{`가게 소개 : ${storeInfo.storeDes}`}</p>
            <img src={mapIcon} id={styles.mapIcon} alt = '지도 아이콘'/>
            <p id={styles.distance}>지도 api 따 온 후 미사역에서부터의 거리 측정</p>
            <p id={styles.storeAddress}>{`가게 주소 : ${storeInfo.storeAddress}`}</p>
            <p id={styles.operTime}>{`영업 시간(오늘) : `}</p>
            <img src={triangleBtn} id={styles.triangle} alt ="영업시간 더보기 버튼"/>
            <div id={styles.mapArea}></div>
            <div className={styles.keywordArea}>
                <div id={styles.keyword1}>{keywords.keyword1}</div>
                <div id={styles.keyword2}>{keywords.keyword2}</div>
                <div id={styles.keyword3}>{keywords.keyword3}</div>
                <div id={styles.keyword4}>{keywords.keyword4}</div>
                <div id={styles.keyword5}>{keywords.keyword5}</div>
                <div id={styles.keyword6}>{keywords.keyword6}</div>
            </div>
        </div>
    );
}

export default StoreDetail;