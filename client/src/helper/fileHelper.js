import axios from "axios";

const API = "http://localhost:8000";


const sendFile = async (file) => {

const formData = new FormData();
formData.append("myfile" , file);
//console.log(formData);

return await fetch(`${API}/api/files` , {
    method:"POST",
    body: formData
}).then(res => res.json())
.catch(err => console.log(err));

}

const showFile = async () => {
     await fetch(`${API}/files/download/3e48c1f6-d283-4a37-897f-bd76368da08e` , {
        method:"GET"
    })

    
} 



export {showFile} ;
export default sendFile;