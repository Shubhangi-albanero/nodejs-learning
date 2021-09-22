const axios=require('axios')
const api_url="https://jsonplaceholder.typicode.com/posts"
const getpost=async()=>{
try{
    const {data:response}= await axios.get(api_url);
    console.log(response);
}
catch(error)
{
    console.log("error and error");
}
}
getpost();