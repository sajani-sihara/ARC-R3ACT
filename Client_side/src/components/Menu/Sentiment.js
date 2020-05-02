/* 
  Page      - Contact.js page
  Function  - Provides contact information regarding ARC 
  Author    - Sajani Sihara
*/

import React, {useState,useEffect} from "react";
import LoadingBox from "../Error/LoadingBox";
import ErrorPage from "../Error/Crashed";
import Footer from "../NavigationBar/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faTags,
  faDownload,
  faComments,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { Helmet } from "react-helmet";

const TITLE = "Sentiment | ARC";

//Function Contact
function Sentiment() {
    //props and state for loading
    const [isLoaded, setIsLoaded] = useState(false);
    //props and state for error checking
    const [error, setError] = useState(null);
    //props and state for retrieve data from api
    const [items, setItems] = useState([]);
  
    //Get localstorage value of appName
    const app = localStorage.getItem("appName");
  
    //fetches the sentiment api for given app id
    useEffect(() => {
      fetch("https://arc-r3act.herokuapp.com/sentiment/com.ubercab",{method: "POST"})
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }, [app]);
    if (error) {
      return <ErrorPage errorDet={error.message} />;
    } else if (!isLoaded) {
      return <LoadingBox />;
    } else {
  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="icon" href="images/logo1.png" sizes="16x16"></link>
      </Helmet>
      {/*Adding the background image*/}
      <div className="bgimg-16">
        {/*Adding the main heading */}
        <div className="caption">
          <span className="border">OVERLOOK OF THE MOBILE APP</span>
        </div>
      </div>
      {items.map((item) => (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-sm-12 p-4'>
            <div className='card h-100 cardSenti'>
              <div className='container'>
                <h3 style={{ fontSize: "1.3rem" ,textAlign:'center',paddingBottom: "1vw" }}>
                  background
              </h3>
                <div className='row'>
                  <div className='col'>
                  <img
                    className="img-responsive m-2 ml-5  searchAppsImages"
                    width="100px"
                    height="100px"
                    alt="search app logo"
                    src={item.icon}
                  />
                  </div>
                  <div className='col'>
      <p>{item.title}</p>
      <p>{item.developer}</p>
                  <p style={{ fontStyle: "italic", width: "90%" }}>
                   {item.summary}
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-12 p-4'>
            <div className='card h-100 cardSenti'>
              <div className='container'>
               
                <h3 style={{ fontSize: "1.3rem" ,textAlign:'center',paddingBottom: "1vw"}}>
                statistics
              </h3>
                
                <div className='row'>
                  <div className= 'col  p-2'>
                  <FontAwesomeIcon
                      className="faicon"
                      style={{ color: "#003396" }}
                      icon={faArrowCircleDown}
                    />{" "}Downloads
                  </div>
      <div className= 'col  p-2'>{item.installs}</div>
                </div>
                <div className='row'>
                  <div className= 'col p-2'>
                  <FontAwesomeIcon
                      style={{ color: "#1750ac" }}
                      className="faicon"
                      icon={faComments}
                    />{" "} Reviews
                  </div>
                  <div className= 'col p-2'>
                  {item.reviews}
                  </div>
                </div>
                <div className='row'>
                  <div className= 'col p-2'><FontAwesomeIcon
                      style={{ color: "#3373c4" }}
                      className="faicon"
                      icon={faTags}
                    />{" "}
                    Price</div>
      <div className= 'col p-2'>{item.priceText}</div>
                </div>
                <div className='row'>
                  <div className= 'col p-2'>
                  <FontAwesomeIcon
                      style={{ color: "#5494da" }}
                      className="faicon"
                      icon={faDownload}
                    />{" "}
                    Size
                  </div>
                  <div className= 'col p-2'>{item.size} MB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 col-sm-12 p-4 '>
            <div className='card h-100 cardSenti'>
              <div className='container'>
              <h3 style={{ fontSize: "1.3rem", textAlign:'center',paddingBottom: "1vw"}}>
                ratings
              </h3>
              <p class="heading">
                User Rating
                <FontAwesomeIcon  style={{marginLeft:"14vw"}}className="checked" icon={faStar} />
                <FontAwesomeIcon className="checked" icon={faStar} />
                <FontAwesomeIcon className="checked" icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </p>
              <p style={{ textAlign: "left" }}>
                4.1 average based on 254 reviews.
              </p>
              </div>
              <hr style={{ border: "3px solid #f1f1f1" }} />

              <div className='container'>
                <div className='row'>
                  <div className='col'>5 Star</div>
                  <div className='col'>
                      <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "50%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                  </div> 
                  </div>
                  <div className='col'>150</div>
                </div>
                <div className='row'>
                  <div className='col'>4 Star</div>
                  <div className='col'>
                  <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "50%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
              </div> 
                  </div>
                  <div className='col'>65</div>
                </div>
                <div className='row'>
                  <div className='col'> 3 Star</div>
                  <div className='col'>
                  <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "50%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
              </div> 
                  </div>
                  <div className='col'>15</div>
                </div>
                <div className='row'>
                  <div className='col'>2 Star</div>
                  <div className='col'>
                  <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "50%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
              </div> 
                  </div>
                  <div className='col'>6</div>
                </div>
                <div className='row'>
                  <div className='col'>1 Star</div>
                  <div className='col'>
                  <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "50%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
              </div> 
                  </div>
                  <div className='col'>15</div>
                </div>
              </div>
              
            </div>
          </div>
          <div className='col-lg-6 col-sm-12 p-4'>
            <div className='card h-100 cardSenti'>
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                  <h3 style={{ fontSize: "1.3rem",textAlign:'center',paddingBottom: "1vw"}}>
                    reviews
                  </h3>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <p>
                      User reviews regarding this application are categorised into two
                      sections - bug fixes and feature requests. You can view the
                      related reviews using the options below.
                    </p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-6 col-sm-12 p-3'>
                    <button       
                    className="btn btn-secondary form-control"
                      style={{
                        
                        fontWeight: 600,
                        textTransform: "uppercase",
                        
                      }}
                    >
                      Bug Fixes
                    </button>
                  </div>
                  <div className='col-lg-6 col-sm-12 p-3'>
                    <button
                      className="btn btn-secondary form-control"
                      style={{
                     
                        fontWeight: 600,
                        textTransform: "uppercase",
                       
                      }}
                    >
                      Feature Requests
                    </button>
                  </div>
                  
                 
                  
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      ))}
      {/*adding the footer component */}
      <Footer />
    </div>
  
  );
}
}
export default Sentiment;
