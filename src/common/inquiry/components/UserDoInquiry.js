import {useEffect, useState} from 'react'
import '../css/reset.css';
import '../css/doinquiry.css';
import { inquiryCategory } from '../api/inquiryCategoryAPI';


function UserDoInquiry(){

    

    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    const [inquiryTitle, setInquiryTitle] = useState("");
    const [inquiryContent, setInquiryContent] = useState("");
    const [inquiryFile, setInquiryFile] = useState(null);
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
    
    function handleFileChange(e){setInquiryFile(e.target.files[0]); console.log("file 사옹")}

    async function fetchCategory(){
        // const categories = await inquiryCategory();
        // setCategory([categories[0], categories[1], categories[2], categories[3]])
         const categories = await inquiryCategory(); if (categories && categories.length > 0)
        { setCategory(categories.slice(0, 4))}; // 첫 4개의 카테고리만 설정
    }

    function submit(e) {
      e.preventDefault();
      const inquiryDTO = {
        userNo : 1,
        inquiryTitle : inquiryTitle,
        inquiryContent : inquiryContent,
        categoryNo : selectCategory,
      }
      const formData = new FormData();
      const json = JSON.stringify(inquiryDTO)
      const blob = new Blob([json], {type: 'application/json'});
      formData.append("data", blob)
      formData.append("file", inquiryFile)
      for (const x of formData.entries()) {
        console.log(x);
       };
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
          // "Content-Type": "multipart/form-data",
        },
        body: formData
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

    function handleCancle(){document.getElementById('doInquiryModal').style.display = 'none';}

    return(
        <>
        <div id='doInquiryModal'>
            <div id='doInquiryText'>문의하기</div>
            <div id='doInquiryTitleText'>문의 제목: </div>
            <form>
                <input id='inputDoTitle' type='text' value={inquiryTitle} onChange={handleTitleChange} required/>
                <select id='categorySelection' name='categoryNo' onChange={handleCategoryChange} required>
                    <option className='selectionOption' value="none" selected>문의 카테고리</option>
                    {category.map((item)=>(
                        <option className='selectionOption' value={item.categoryNo}>{item.categoryName}</option>
                    ))}
                </select>
                <textarea id='inputDoContent'  value={inquiryContent} onChange={handleContentChange} required/>
                
                <label id='inquiryDoFileBtn' htmlFor='inquiryDoFile' onChange={handleFileChange}>
                  첨부파일
                <input type='file' id='inquiryDoFile'/>
                </label>
                <button type='button' id='inquiryDoCancleBtn' onClick={handleCancle}>취소</button>
                <button id='doInquiryBtn' onClick={submit}>확인</button>
            </form>
        </div>
        </>
    )
}

export default UserDoInquiry;