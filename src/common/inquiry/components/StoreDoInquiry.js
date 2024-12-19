import {useEffect, useState} from 'react'
import '../css/reset.css';
import '../css/doinquiry.css';
import { inquiryCategory } from '../api/inquiryCategoryAPI';


function StoreDoInquiry(){

    

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
        { setCategory(categories.slice(4, categories.lastIndex))}; // 4번째 ~ 마지막(7번째)
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
      fetch(`/inquiries/stores`, {
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
                
                <label id='inquiryFileBtn' htmlFor='inquiryFile' onChange={handleFileChange}>
                  첨부파일
                <input type='file' id='inquiryFile'/>
                </label>
                <button type='button' id='inquiryCancleBtn'>취소</button>
                <button id='doInquiryBtn' onClick={submit}>확인</button>
            </form>
        </div>
        </>
    )
}

export default StoreDoInquiry;