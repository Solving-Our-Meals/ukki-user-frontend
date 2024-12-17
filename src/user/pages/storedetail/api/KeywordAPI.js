 export default async function KeywordAPI(){

        const res = await fetch('http://localhost:8080/store/test');
        const fetchKeywords = await res.json();

        console.log(fetchKeywords);
        return fetchKeywords;
}