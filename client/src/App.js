import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

const API = "http://localhost:8000";

function App() {
  const [percent, setPercent] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [emailValues, setEmailValues] = useState({
    emailFrom: "",
    emailTo: ""
  });


  const { emailFrom, emailTo } = emailValues;

  //send file
  const sendFile = async (file) => {

    const formData = new FormData();
    formData.append("myfile", file);

    return axios.request({
      method: "post",
      url: `${API}/api/files`,
      data: formData,
      onUploadProgress: (p) => {
        setPercent(Math.round((p.loaded / p.total) * 100));
      }
    }).then(res => res.data)
  }

  //handle file change
  const handleChange = (e) => {
    const fileInput = document.querySelector("#inputfile");
    showAllContainer();
    sendFile(e.target.files[0])
      .then((data) => {
        if (data.error) showAlert(`${data.error}` + '(Max Allowed 100mb) Try To Upload Again');
        else {
          // console.log(data);
          showAlert('File Uploaded Successfully');
          setFileUrl(data.fileURL);
          const uploadContainer = document.querySelector(".upload-container");
          uploadContainer.style.display = "none";
          fileInput.value = "";
        }
      })
      .catch(err => console.log(err))

  }

  //handle email change
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEmailValues({ ...emailValues, [name]: value });
    console.log(emailValues);
  }

  useEffect(() => {

    const fileInput = document.querySelector("#inputfile");
    fileInput.style.display = "none";
    const browseFile = document.querySelector("#browse");
    const copyImg = document.querySelector('#copyImg');
    const inputLink = document.querySelector(".inputLink");
    const dragingZone = document.querySelector(".drop-zone");
    
    //dragover
    dragingZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dragingZone.classList.add("dragged");
    });

    //dragleave
    dragingZone.addEventListener("dragleave", () => {
      dragingZone.classList.remove("dragged");
    });

    //drop
    dragingZone.addEventListener("drop", async (e) => {
      e.preventDefault();
      const dt = e.dataTransfer;

      showAllContainer();

      await sendFile(dt.files[0]).then((data) => {
        if (data.error) showAlert(`${data.error}` + '(Max Allowed 100mb) Try To Upload Again');
        else {
          const uploadContainer = document.querySelector(".upload-container");
          uploadContainer.style.display = "none";
          setFileUrl(data.fileURL);
          // console.log(data);
          showAlert('File Uploaded Successfully');
          fileInput.value = "";

        }

      }).catch(err => console.log(err))

    });

    //browse
    browseFile.addEventListener("click", () => {
      fileInput.click();
    });

    //copy image
    copyImg.addEventListener("click", () => {
      inputLink.select();
      document.execCommand("copy");
      showAlert('Link Copied Successfully');
    });

  }, []);

  //onClick email send btn
  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(emailValues, fileUrl);
    const uuid = fileUrl.split("/").splice(-1, 1);
    console.log(emailValues, fileUrl);
    const response = await axios.post(`${API}/api/files/send`, { uuid: uuid, sendFrom: emailFrom, sendTo: emailTo });
    //  console.log(response);
    showAlert(`${response.data.message}`);

  }

  //function to show containers after uploading
  const showAllContainer = () => {
    const uploadContainer = document.querySelector(".upload-container");
    const linkContainer = document.querySelector(".link-container");
    const expires = document.querySelectorAll(".p-tag");
    const emailContainer = document.querySelector(".email-container");
 
    uploadContainer.style.display = "block";
    linkContainer.style.display = 'block';
    expires[1].style.display = 'block';
    expires[2].style.display = 'block';
    emailContainer.style.display = 'flex';
  
  }

 
const showAlert = (msg) => {
  const alert = document.querySelector(".alert");
 setTimeout(() => {
  alert.style.transform = "translateY(0px)";
  alert.innerText = `${msg}`;
  } , 1000);

  setTimeout(() => {
    alert.style.transform = "translateY(60px)";
    } , 4000);
}

  return (
    <div className="main-container">
    <img src="\logo.png" className="logo"/>
      <section className="container">
        <div className="drop-zone" >

          <div className='file-logo'>
            <img className='left' draggable="false" src="\filelogo.svg" />
            <img className='right' draggable="false" src="\filelogo.svg" />
            <img className='center' draggable="false" src="\filelogo.svg" />
          </div>
          <input type="file" id="inputfile" onChange={handleChange} />
          <div className='text' style={{fontSize:"18px" , fontWeight:"600"}}>Drop your files here or, <span id="browse">Browse</span></div>
        </div>

        <div className="upload-container">
          <div className="progress-container" style={{ width: `${percent}%` }}>
          </div>
          <div className="uploading-content">
            <p className="p-tag">Uploading...</p>
            <span>{percent}%</span>
            <div className="progress-bar" style={{ width: `${percent}%` }}></div>
          </div>
        </div>

        <p className="p-tag">Link experies in 24 hrs</p>

        <div className="link-container">
          <input type="text" readOnly value={fileUrl ? fileUrl : "Please wait while we upload file for you"} className="inputLink" />
          <img src="\copy-icon.svg" id="copyImg" />
        </div>

        <p className="p-tag">Or Send via Email</p>

        <form className="email-container">
          <div className="field">
            <label htmlFor="fromEmail" >Your Email</label>
            <input type="text" id="fromEmail" value={emailFrom} name="emailFrom" required={true} onChange={handleEmailChange} />
          </div>
          <div className="field">
            <label htmlFor="toEmail" >Receiver's Email</label>
            <input type="text" id="toEmail" value={emailTo} name="emailTo" required={true} onChange={handleEmailChange} />
          </div>
          <button type="submit" onClick={handleClick} className="submit-btn">Send</button>
        </form>
      </section>
      <div className="upload-img">
        <img src="\upload_img.svg" />
      </div>
     <span className="alert">{alert}</span> 
    </div>
  );
}

export default App;




