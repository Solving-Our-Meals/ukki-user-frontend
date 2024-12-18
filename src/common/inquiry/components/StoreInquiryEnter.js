import {useEffect, useState} from 'react'
import '../css/reset.css';
import '../css/storeInquiryEnter.css'
import StoreDoInquiry from './StoreDoInquiry';

function InquiryEnter(){
    const [inquiryList, setInquiryList] = useState(false);
    const [storeDoInquiry, setStoreDoInquiry] = useState(false);

    useEffect(()=>{},[])

    function handlerEnterDoInquiry(){
        setStoreDoInquiry(true);
        document.getElementById('littleInquiryModal').style.display = 'none'
        
    }

    function handlerCancleInquiryEnter(){
        document.getElementById('littleInquiryModal').style.display = 'none'
    }

    function handlerEnterInquiryList(){setInquiryList(true)}

    return(
        <>
            <div id='littleInquiryModal'>
                <div id='inquiryEnterText'>문의</div>
                <button id='cancleEnterInquiryBtn' onClick={handlerCancleInquiryEnter}>확인</button>
                <button id='enterInquiryListBtn' onClick={handlerEnterInquiryList}>문의내역</button>
                <button id='enterDoInquiryBtn' onClick={handlerEnterDoInquiry}>문의하기</button>
            </div>
            {storeDoInquiry && <StoreDoInquiry/>}
        </>
    )
}

export default InquiryEnter;