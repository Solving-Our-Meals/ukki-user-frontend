import {useEffect, useState} from 'react'
import '../css/reset.css';
import '../css/doinquiry.css';
import { inquiryCategory } from '../api/inquiryCategoryAPI';


function DoInquiry(){

    

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    const [inquiryTitle, setInquiryTitle] = useState("");
    const [inquiryContent, setInquiryContent] = useState("");

    const handleTitleChange = (e) => setInquiryTitle(e.target.value);
    const handleContentChange = (e) => setInquiryContent(e.target.value);
    const handleCategoryChange = (e) => setSelectCategory(e.target.value);

    async function fetchCategory(){
        const categories = await inquiryCategory();
        console.log(categories)
        console.log(categories[1])
        setCategory(categories)
    }

    function submit(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/inquiries/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userNo : 1,
            inquiryTitle : inquiryTitle,
            inquiryContent : inquiryContent,
            categoryNo : selectCategory,
            file : 'file'
          }),
        }).then(res => {
          if(res.ok) {
            alert(res.message)
          }
        })
      }

    useEffect(()=>{
        fetchCategory()
    },[])

    return(
        <>
        <div id='inquiryModal'>
            <div id='doInquiryText'>문의하기</div>
            <div id='doInquiryTitleText'>문의 제목: </div>
            <form>
                <input type='text' value={inquiryTitle} onChange={handleTitleChange}/>
                <select id='categorySelection' name='categoryNo' onChange={handleCategoryChange}>
                    <option value="none" selected>문의 카테고리</option>
                    {category.map((item)=>(
                        <option value={item.categoryNo}>{item.categoryName}</option>
                    ))}
                </select>
                <input type='text' value={inquiryContent} onChange={handleContentChange}/>
                <button type='button' id='inquirycancleBtn'>취소</button>
                <button id='doInquiryBtn' onClick={submit}>확인</button>
            </form>
        </div>
        </>
    )
}

export default DoInquiry;