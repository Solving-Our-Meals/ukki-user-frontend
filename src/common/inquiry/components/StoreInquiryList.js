import {useEffect, useState} from 'react'
import '../css/reset.css';
import '../css/StoreInquiryList.css'
import { inquiryList } from '../api/inquiryListAPI';
import { reportList } from '../api/reportListAPI';

function StoreInquiryList({setInquiryList, setIsLittleInquiryModal}){

    const [listInfo, setListInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    
        async function fetchList(){
            try{
             const inquiries = await inquiryList();
             const reports = await reportList();
             if (
                (inquiries && inquiries.length > 0) || (reports && reports.length > 0)
                ){
                const list = sortDate(inquiries.concat(reports))
                console.log(list)
                setListInfo(list)
                
             }
            }catch(error){
                console.log("오류발생", error)
            }
        }

        function sortDate(list) {
            const sorted_list = list.sort(function(a, b) {
                return new Date(a.inquiryDate).getTime() - new Date(b.inquiryDate).getTime();
            });
            return sorted_list;
        }

        function handleCancle(){
            setInquiryList(false);
            setIsLittleInquiryModal(true)
          }

    useEffect(()=>{
        fetchList()
    },[])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = listInfo.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (no) => {if(0<no && no<=listInfo.length/itemsPerPage){setCurrentPage(no)}};

    return(
        <>
            <div id='storeInquiryListModal'>
                <div id='storeInquiryListText'>문의 내역</div>
                <button id='cancleInquiryListBtn' onClick={handleCancle}>확인</button>
                <div id='inquiryListHeader'>
                    <span className='inquiryState header'>문의 상태</span>
                    <span className='inquiryDate header'>문의 일자</span>
                    <span className='inquiryTitle header'>문의 제목</span>
                </div>
                <div id='listArea'>
                {currentItem.map((item, index)=>{ 
                    return  <div key={index} className={item.division} value={item.no}>
                                <div id='inquiryListBody'>
                                <span className='inquiryState'>{item.state}</span>
                                <span className='inquiryDate'>{item.inquiryDate}</span>
                                <div className='inquiryTitle'><p className='inquiryTitleText'>{item.inquiryTitle}</p></div>
                                </div>
                            </div>

                    })}
                    </div>
                    <div className='pageNation'>
                    <button onClick={()=>paginate(currentPage-1)}>◀</button>
                {Array.from({length : Math.ceil(listInfo.length/itemsPerPage)}, (_, index)=>(
                    <button key={index + 1} onClick={() => paginate(index + 1)}
                    className={index + 1 === currentPage ? 'active' :''}>
                        {index+1}
                    </button>
                ))}
                    <button onClick={()=>paginate(currentPage+1)}>▶</button>
            </div>
            </div>
            
        </>
    )
}

export default StoreInquiryList