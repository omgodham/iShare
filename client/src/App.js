import {useEffect} from 'react';
import './App.css';
import sendFile, { showFile } from './helper/fileHelper';


function App() {

const handleChange = (e) => {

   sendFile(e.target.files[0])
   .then((data) =>{
     if(data.error) console.log(data.error)
     else 
     console.log(data);
   })
   .catch(err => console.log(err))
  }

  useEffect(() => {
      const dragingZone = document.querySelector(".drop-zone");
      const fileLogo = document.querySelector(".file-logo");
        dragingZone.addEventListener("dragover" , (e) => {
          e.preventDefault();
          dragingZone.classList.add("dragged");
    
      });

      dragingZone.addEventListener("dragleave" , () => {
        dragingZone.classList.remove("dragged");
      
    });
    dragingZone.addEventListener("drop" , (e) => {
      e.preventDefault();
  });
  } , []);

  



  return (
    <div className="main-container">
    <section className="container">
      <div className="drop-zone">
    
       <div className='file-logo'>
        <img className='left' draggable="false" src="\filelogo.svg" />
        <img className='right' draggable="false" src="\filelogo.svg" />
        <img className='center' draggable="false" src="\filelogo.svg" />
        </div>
       <div className='text'>Drop your files here or, <span>Browse</span></div>
      </div>


      {/* <input type="file" id="#inputFile" name="myfile" onChange={handleChange}/> */}
    </section>
    </div>
  );
}

export default App;





