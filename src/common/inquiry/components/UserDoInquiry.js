import {useEffect, useState} from 'react'
import '../css/reset.css';
import '../css/doinquiry.css';
import { inquiryCategory } from '../api/inquiryCategoryAPI';


function UserDoInquiry(){

    

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    const [inquiryTitle, setInquiryTitle] = useState("");
    const [inquiryContent, setInquiryContent] = useState("");
    const [inquiryFile, setInquiryFile] = useState("");
    const [isWrite, setIsWrite] = useState([false, false, false]);


    function handleTitleChange(e){
      setInquiryTitle(e.target.value);
       if(e.target.value==='' || e.target.value===null || e.target.value.length<5){
        isWrite[0] = false
        setIsWrite([...isWrite]);
       }else{
        isWrite[0] = true
        setIsWrite([...isWrite]);
       }}
    function handleContentChange(e){
      setInquiryContent(e.target.value);
      console.log(isWrite)
      if(e.target.value==='' || e.target.value===null || e.target.value.length<5){
        isWrite[1] = false
        setIsWrite([...isWrite]);
       }else{
        isWrite[1] = true
        setIsWrite([...isWrite]);
       }
      
      }
  
    function handleCategoryChange(e){
      setSelectCategory(e.target.value);
      if(e.target.value==='none'){
        isWrite[2] = false
        setIsWrite([...isWrite]);
       }else{
        isWrite[2] = true
        setIsWrite([...isWrite]);
       }}
    
    function handleFileChange(e){setInquiryFile(e.target.value); console.log("file 사옹")}

    async function fetchCategory(){
        const categories = await inquiryCategory();
        setCategory(categories)
    }

    function submit(e) {
        e.preventDefault();
        console.log(inquiryFile)
        let isPass = false
        for(var i = 0; i<3; i++){
          if(isWrite[i]===true){
            isPass = true
          }else{
            isPass = false
            break;
          }
        }
        if(isPass){
        fetch(`/inquiries/users`, {
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
      }else{
        alert("내용을 확인해주세요")
      }

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
                <input id='inputTitle' type='text' value={inquiryTitle} onChange={handleTitleChange} required/>
                <select id='categorySelection' name='categoryNo' onChange={handleCategoryChange} required>
                    <option className='selectionOption' value="none" selected>문의 카테고리</option>
                    {category.map((item)=>(
                        <option className='selectionOption' value={item.categoryNo}>{item.categoryName}</option>
                    ))}
                </select>
                <textarea id='inputContent'  value={inquiryContent} onChange={handleContentChange} required/>
                
                <label id='inquiryFileBtn' htmlFor='inquiryFile'>
                  첨부파일
                <input type='file' id='inquiryFile' value={inquiryFile} onChange={handleFileChange}/>
                </label>
                <button type='button' id='inquiryCancleBtn'>취소</button>
                <button id='doInquiryBtn' onClick={submit}>확인</button>
            </form>
        </div>
        </>
    )
}

export default UserDoInquiry;