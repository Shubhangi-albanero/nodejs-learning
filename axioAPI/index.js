const axios = require('axios')
const api_url = "http://localhost:3000/users"
const GetUser = async () => {
    try {
        const { data: response } = await axios.get(api_url);
        console.log(response);
    }
    catch (error) {
        console.log("error and error");
    }
}
const AddUser=async()=>{
    try {
        let user={
            firstName:"Shubhangi",
            lastName:" Shah Gupta",
            age:23
        }
        const { data: response } = await axios.post(api_url, user);
        console.log(response);
    }
    catch (error) {
        console.log("error and error");
    }
}
const DeleteUser=async()=>{

    try {
        
        let userid="614d6d560d61b647759ff808";
        const { data: response } = await axios.delete(api_url+userid);
        console.log(response);
    }
    catch (error) {
        console.log("error and error");
    }
}
const EditUser=async()=>{
    try {
        let user={
            firstName:"Shubhangi",
            lastName:" Shah Gupta",
            age:23
        }
        let userid="614d6d560d61b647759ff808";
        const { data: response } = await axios.patch(api_url+userid, user);
        console.log(response);
    }
    catch (error) {
        console.log("error and error");
    }
}

EditUser();
DeleteUser();
GetUser();
AddUser();
