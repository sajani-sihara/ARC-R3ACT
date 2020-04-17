import React, { useEffect, useState } from "react";
import LoadingBox from '../Error/LoadingBox';
import ErrorPage from '../Error/Crashed';
import Footer from "../NavigationBar/Footer";

function OverallSentiment() {
  const[isLoaded,setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const[items,setItems] = useState([]);


  useEffect(() =>{
      
      fetch("http://localhost:5000/app/com.facebook.orca")
      .then(res => res.json())
      .then(
          (result) => {
              setIsLoaded(true);
              setItems(result);
          },
          (error) => {
              setIsLoaded(true);
              setError(error);
          }
      )
  },[]);

  if(error){
      return <ErrorPage errorDet={error.message}/>;
  }else if(!isLoaded){
      return <LoadingBox/>;
  }else{
  return (
    <div className="container-fluid">
      <div class="bgimg-16">
      {items.map((item) =>(
          <div key={item._id} class="sentimentBox">
            <div className='row'>
              <div className='col-sm-3'>
                <div className='row m-2'>
                    <img src={item.icon} style={{borderRadius:25,width:'150px'}}/>
                 </div>
                <div className='row m-2'>
                    <h3 style={{ fontSize: "2.5vw" }}>{item.title}</h3>{" "}
                </div>
                <div className='row m-2'>
                     <p className='sentimentInfo'>{item.developer}</p>
                </div>
               
              </div>
              <div className='col-sm-4 sentimentInfo'>
              <div className='row m-3' >
                <div className='col'>Sentiment Score :</div>
                <div className='col'>
                  <div className='row' >
                      <h1 style={{borderRadius:25, backgroundColor:"#282e34", padding:15, color:"#fff",justifyContent:'center'}}>{item.scoreText}</h1>
                  </div>
                </div>
                </div>
                <div className='row m-3'>
                    <div style={{fontStyle:"italic"}}>"{item.summary}"</div>
                </div>
              <div className='row m-3'>
              Genre : {item.genre}
                 </div>
                <div className='row m-3'>
                Reviews : {item.reviews}
                </div>
                <div className='row m-3'>
                Installs : {item.installs}
                </div>
                
              </div>
            </div>
           
          </div>
      ))}
        </div>
     
      <Footer />
      </div>
  
  );
  }
}
export default OverallSentiment;