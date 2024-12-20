import { useEffect, useState } from 'react';
import '../css/StoreInquiryInfo.css'
import { getInquiryDTO } from '../api/inquiryInfoAPI';
import waitAnswer from '../img/waitAnswer.png'

function StoreInquiryInfo({inquiryNo, setIsInquiry}){

    const [inquiryDTO, setInquiryDTO] = useState({});
    const [isAnswer, setIsAnswer] = useState(false);


    async function fetchInfo(inquiryNo){
        const inquiryInfo = await getInquiryDTO(inquiryNo);
        if(inquiryInfo.answerDate){
            setIsAnswer(true);
        }
        setInquiryDTO(inquiryInfo);
    }

    function handlerBack(){
        setIsInquiry(false);
    }

    useEffect(()=>{
        fetchInfo(inquiryNo)
    },[inquiryNo])

return(
    <>
    <div id='inquiryInfoModal'>
    <div id="inquiryInfoText">문의 상세</div>
    <button id='backToInquiryListBtn' onClick={handlerBack}>이전</button>
    <button id='deleteInquiryBtn'>삭제</button>
    <div id="inquiryInfoTitleText">문의 제목 : </div>
    <div id='inquiryInfoTitle'>{inquiryDTO.inquiryTitle}</div>
    <div id='inquiryInfoDate'>문의 일자 : <p>{inquiryDTO.inquiryDate}</p></div>
    <div id='inquiryInfoContent'>{inquiryDTO.inquiryContent}</div>
    {inquiryDTO.file && <div id='inquiryInfoFile'>첨부파일</div>}
    {isAnswer && <div id='answerAreaIsAnswer'>답장있다.</div>}

    {!isAnswer && <div id='answerAreaNoAnswer'>
        <img id='noAnswerImg' src={waitAnswer} alt='로고'/>
        <div id="noAnswerContent">문의를 접수하는중 입니다 ! 관리자의 답변을 기다려 주세요</div>
        <button id='noAnswerUpdateBtn'>수정</button>
        </div>}
    </div>
    </>
)
}
export default StoreInquiryInfo;