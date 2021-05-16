import { useEffect } from 'react';
import './App.css';
import sendFile, { showFile } from './helper/fileHelper';


function App() {

  const handleChange = (e) => {
 
    sendFile(e.target.files[0])
      .then((data) => {
        if (data.error) console.log(data.error)
        else
          console.log(data);
      })
      .catch(err => console.log(err))

  }

  useEffect(() => {

    const fileInput = document.querySelector("#inputfile");
    fileInput.style.display = "none";
    const browseFile = document.querySelector("#browse");



    //dragover
    const dragingZone = document.querySelector(".drop-zone");
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

      await sendFile(dt.files[0]).then((data) => {
        if (data.error) console.log(data.error)
        else
          console.log(data);
      }).catch(err => console.log(err))

    });

    //browse
    browseFile.addEventListener("click", () => {
      fileInput.click();
    });

  }, []);





  return (
    <div className="main-container">
      <section className="container">
        <div className="drop-zone" >

          <div className='file-logo'>
            <img className='left' draggable="false" src="\filelogo.svg" />
            <img className='right' draggable="false" src="\filelogo.svg" />
            <img className='center' draggable="false" src="\filelogo.svg" />
          </div>
          <input type="file" id="inputfile" onChange={handleChange} />
          <div className='text'>Drop your files here or, <span id="browse">Browse</span></div>
        </div>
      </section>
    </div>
  );
}

export default App;





