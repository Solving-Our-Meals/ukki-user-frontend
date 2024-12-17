
export async function inquiryCategory(){
    const res = await fetch('/inquiries/users')
    const category = await res.json();

    console.log(category)
    return category
}