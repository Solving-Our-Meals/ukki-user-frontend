import { useEffect, useState } from 'react';
import '../css/reset.css';
import '../css/StoreInquiryInfo.css'
import '../css/StoreInquiryInfoMiddle.css'
import '../css/StoreInquiryInfoSmall.css'

import { getInquiryDTO } from '../api/inquiryInfoAPI';
import waitAnswer from '../img/waitAnswer.png'

function StoreInquiryInfo({inquiryNo, setIsInquiry}){

    const [inquiryDTO, setInquiryDTO] = useState({});
    const [isAnswer, setIsAnswer] = useState(false);
    const [isContentOverflow, setIsContentOverflow] = useState(false);
    const [isAnswerContentOverflow, setIsAnswerContentOverflow] = useState(false);
    const [isContentExpanded, setIsContentExpanded] = useState(false);
    const [isAnswerContentExpanded, setIsAnswerContentExpanded] = useState(false);


    async function fetchInfo(inquiryNo){
        const inquiryInfo = await getInquiryDTO(inquiryNo);
        if(inquiryInfo.inquiryContent.length>300){
            setIsContentOverflow(true)
        }
        if(inquiryInfo.answerDate){
            setIsAnswer(true);
            if(inquiryInfo.answerContent.length>300){
                setIsAnswerContentOverflow(true)
            }
        }
        console.log(inquiryInfo.inquiryContent.length)
        console.log(inquiryInfo.inquiryContent)
        setInquiryDTO(inquiryInfo);
    }

    function handlerBack(){
        setIsInquiry(false);
    }

    function handleToggleContent() { setIsContentExpanded(!isContentExpanded); }
    function handleToggleAnswerContent() { setIsAnswerContentExpanded(!isAnswerContentExpanded); }

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
    <div id='inquiryInfoContent' className={isContentExpanded ? 'expanded' : ''}>
        {inquiryDTO.inquiryContent}
    </div>
    {isContentOverflow && <button id='inquiryOverFlowBtn' className={isContentExpanded ? 'activeBtn' :''} onClick={handleToggleContent}> {!isContentExpanded ? '더보기' : '줄이기'} </button>}
    
    {inquiryDTO.file && <div id='inquiryInfoFile'>첨부파일</div>}
    {isAnswer && <div id='answerAreaIsAnswer'>
        <div id='isAnswerTitleText'>답변 제목 : </div>
        <div id='isAnswerTitle'>{inquiryDTO.answerTitle}</div>
        <div id='isAnswerDate'>문의 일자 : <p>{inquiryDTO.answerDate}</p></div>
        <div id='isAnswerContent' className={isAnswerContentExpanded ? 'expanded' :''}>
        {inquiryDTO.answerContent}</div>
        {isAnswerContentOverflow && <button id='answerOverFlowBtn' className={isAnswerContentExpanded ? 'activeBtn' :''} onClick={handleToggleAnswerContent}> {!isAnswerContentExpanded ? '더보기' : '줄이기'} </button>}
        </div>}

    {!isAnswer && <div id='answerAreaNoAnswer'>
        <img id='noAnswerImg' src={waitAnswer} alt='로고'/>
        <div id="noAnswerContent">문의를 접수하는중 입니다 ! &nbsp; 관리자의 답변을 기다려 주세요</div>
        <button id='noAnswerUpdateBtn'>수정</button>
        </div>}
    </div>
    </>
)
}
export default StoreInquiryInfo;