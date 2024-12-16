export async function inquiryCategory(){
    const res = await fetch('http://localhost:8000/inquiries/users')
    const category = await res.json();

    console.log(category)
    return category
}