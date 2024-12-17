import {useState, useEffect} from 'react';
import styles from '../css/storedetail.module.css';


function StoreDetail(){

    const [storeInfo, setStoreInfo] = useState({
        storeNo : 0,
        storeName : "가게 이름",
        storeDes : "가게 소개글",
        storeAddress : "가게 주소"
    });

    useEffect(
        () => {
            console.log('가게정보페치')
            fetch('http://localhost:8080/store/5')
            .then(res => res.json())
            .then(data => {
                setStoreInfo(data)
                console.log(data)
            })
            .catch(error => console.log(error));
        }, []
    );


    return(
        <div className={styles.storeDetail}>
            <div className={styles.bannerStyle}>배너 영역
                <div id={styles.profileStyle}>프로필영역</div>
            </div>
            <p id={styles.storeName}>{`가게 이름 : ${storeInfo.storeName}`}</p>
            <p id={styles.storeDes}>{`가게 소개 : ${storeInfo.storeDes}`}</p>
            <p id={styles.storeAddress}>{`가게 주소 : ${storeInfo.storeAddress}`}</p>
        </div>
    );
}

export default StoreDetail;