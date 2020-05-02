/* 
  Page      - Contact.js page
  Function  - Provides contact information regarding ARC 
  Author    - Sajani Sihara
*/

import React from "react";
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
      {/*Adding a div that will hold the comment form */}
      <div className="descrip-1" style={{ fontSize: "1.3rem" }}>
        <div class="rowSenti">
          <div class="columnSenti">
            <div class="cardSenti">
              <h3 style={{ fontSize: "1.3rem", paddingBottom: "1vw" }}>
                background
              </h3>
              <div class="row">
                <div style={{ float: "left", width: "30%" }}>
                  <img
                    className="img-responsive m-2 ml-5  searchAppsImages"
                    width="100px"
                    height="100px"
                    alt="search app logo"
                    src={process.env.PUBLIC_URL + "/images/fb.png"}
                  />
                </div>
                <div
                  style={{
                    float: "right",
                    width: "70%",
                    textAlign: "left",
                    paddingLeft: "1vw",
                  }}
                >
                  <p>Facebook</p>
                  <p>Facebook Developer</p>
                  <p style={{ fontStyle: "italic", width: "90%" }}>
                    "Social media app to connect with friends all over the
                    world!"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="columnSenti">
            <div class="cardSenti">
              <h3 style={{ fontSize: "1.3rem", paddingBottom: "1vw" }}>
                statistics
              </h3>
              <div class="row">
                <div
                  style={{
                    float: "left",
                    width: "50%",
                    textAlign: "left",
                    paddingLeft: "4vw",
                  }}
                >
                  <p>
                    {" "}
                    <FontAwesomeIcon
                      className="faicon"
                      style={{ color: "#003396" }}
                      icon={faArrowCircleDown}
                    />{" "}
                    Downloads
                  </p>
                  <p>
                    <FontAwesomeIcon
                      style={{ color: "#1750ac" }}
                      className="faicon"
                      icon={faComments}
                    />{" "}
                    Reviews
                  </p>
                  <p>
                    <FontAwesomeIcon
                      style={{ color: "#3373c4" }}
                      className="faicon"
                      icon={faTags}
                    />{" "}
                    Price
                  </p>
                  <p>
                    <FontAwesomeIcon
                      style={{ color: "#5494da" }}
                      className="faicon"
                      icon={faDownload}
                    />{" "}
                    Size
                  </p>
                </div>
                <div
                  style={{
                    float: "left",
                    width: "50%",
                    textAlign: "left",
                    paddingLeft: "5vw",
                  }}
                >
                  <p>100,000,000+</p>
                  <p>3,000,000+</p>
                  <p>Free</p>
                  <p>60.0 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rowSenti">
          <div class="columnSenti">
            <div class="cardSenti">
              <h3 style={{ fontSize: "1.3rem", paddingBottom: "1vw" }}>
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
              <hr style={{ border: "3px solid #f1f1f1" }} />

              <div class="row">
                <div class="side">
                  <div>5 star</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-5"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>150</div>
                </div>
                <div class="side">
                  <div>4 star</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-4"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>63</div>
                </div>
                <div class="side">
                  <div>3 star</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-3"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>15</div>
                </div>
                <div class="side">
                  <div>2 star</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-2"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>6</div>
                </div>
                <div class="side">
                  <div>1 star</div>
                </div>
                <div class="middle">
                  <div class="bar-container">
                    <div class="bar-1"></div>
                  </div>
                </div>
                <div class="side right">
                  <div>20</div>
                </div>
              </div>
            </div>
          </div>

          <div class="columnSenti">
            <div class="cardSenti">
              <h3 style={{ fontSize: "1.3rem", paddingBottom: "2vw" }}>
                reviews
              </h3>
              <p style={{ paddingBottom: "1vw" }}>
                User reviews regarding this application are categorised into two
                sections - bug fixes and feature requests. You can view the
                related reviews using the options below.
              </p>
              <div class="row">
                <div style={{ float: "left", width: "50%", paddingLeft:"2.5vw", paddingBottom:"2vw" }}>
                  <button
                    className="card p-3"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      width:"15vw"
                    }}
                  >
                    Bug Fixes
                  </button>
                </div>
                <div style={{ float: "right", width: "50%" }}>
                  <button
                    className="card p-3"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      width:"15vw"
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
      {/*adding the footer component */}
      <Footer />
    </div>
  );
}
export default Sentiment;
