/* 
  Page      - Contact.js page
  Function  - Provides contact information regarding ARC 
  Author    - Sajani Sihara
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
function Sentiment(props) {
  //props and state for loading
  const [isLoaded, setIsLoaded] = useState(false);
  //props and state for error checking
  const [error, setError] = useState(null);
  //props and state for retrieve data from api
  const [items, setItems] = useState([]);

  const linkState = props.location.state;
  const app = linkState.app;

  //fetches the sentiment api for given app id
  useEffect(() => {
    fetch("http://localhost:5000/sentiment/" + app, { method: "POST" })
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
          <div className="container" key={item.title}>
            <div className="row">
              <div className="col-lg-6 col-sm-12 p-4">
                <BackgroundDiv data={item} key={item.title} />
              </div>

              <div className="col-lg-6 col-sm-12 p-4">
                <StatisticsDiv data={item} key={item.title} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12 p-4 ">
                <RatingDiv data={item} key={item.title} />
              </div>

              <div className="col-lg-6 col-sm-12 p-4">
                <ReviewsDiv data={app} />
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
function BackgroundDiv(props) {
  const data = props.data;
  return (
    <div className="card h-100 cardSenti">
      <div className="container">
        <h3
          style={{
            fontSize: "1.3rem",
            textAlign: "center",
            paddingBottom: "1vw",
          }}
        >
          background
        </h3>
        <div className="row">
          <div className="col">
            <img
              className="img-responsive m-2 ml-5  searchAppsImages"
              width="100px"
              height="100px"
              alt="search app logo"
              src={data.icon}
            />
          </div>
          <div className="col">
            <p>{data.title}</p>
            <p>{data.developer}</p>
            <p style={{ fontStyle: "italic", width: "90%" }}>{data.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function StatisticsDiv(props) {
  const data = props.data;
  return (
    <div className="card h-100 cardSenti">
      <div className="container">
        <h3
          style={{
            fontSize: "1.3rem",
            textAlign: "center",
            paddingBottom: "1vw",
          }}
        >
          statistics
        </h3>

        <div className="row">
          <div className="col  p-2">
            <FontAwesomeIcon
              className="faicon"
              style={{ color: "#003396" }}
              icon={faArrowCircleDown}
            />{" "}
            Downloads
          </div>
          <div className="col  p-2">{data.installs}</div>
        </div>
        <div className="row">
          <div className="col p-2">
            <FontAwesomeIcon
              style={{ color: "#1750ac" }}
              className="faicon"
              icon={faComments}
            />{" "}
            Reviews
          </div>
          <div className="col p-2">{data.reviews}</div>
        </div>
        <div className="row">
          <div className="col p-2">
            <FontAwesomeIcon
              style={{ color: "#3373c4" }}
              className="faicon"
              icon={faTags}
            />{" "}
            Price
          </div>
          <div className="col p-2">{data.priceText}</div>
        </div>
        <div className="row">
          <div className="col p-2">
            <FontAwesomeIcon
              style={{ color: "#5494da" }}
              className="faicon"
              icon={faDownload}
            />{" "}
            Size
          </div>
          <div className="col p-2">{data.size} MB</div>
        </div>
      </div>
    </div>
  );
}
function RatingDiv(props) {
  const data = props.data;
  return (
    <div className="card h-100 cardSenti">
      <div className="container">
        <h3
          style={{
            fontSize: "1.3rem",
            textAlign: "center",
            paddingBottom: "1vw",
          }}
        >
          ratings
        </h3>
        <div className="row heading">
          <div className="col">App Rating</div>
          <div className="col" style={{ marginLeft: "14vw" }}>
            {[...Array(Number(5))].map((i) => (
              <FontAwesomeIcon
                key={i + 1}
                className={data.sentiment >= i ? "checked" : ""}
                icon={faStar}
              />
            ))}
          </div>
        </div>
        <p style={{ textAlign: "left" }}>
          {data.sentiment} average based on {data.reviews} reviews.
        </p>
      </div>
      <hr style={{ border: "3px solid #f1f1f1" }} />

      <div className="container">
        <div className="row">
          <div className="col">5 Star</div>
          <div className="col">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: data.fiveStars + "%" }}
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="col">{data.fiveStars}</div>
        </div>
        <div className="row">
          <div className="col">4 Star</div>
          <div className="col">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: data.fourStars + "%" }}
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="col">{data.fourStars}</div>
        </div>
        <div className="row">
          <div className="col"> 3 Star</div>
          <div className="col">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: data.threeStars + "%" }}
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="col">{data.threeStars}</div>
        </div>
        <div className="row">
          <div className="col">2 Star</div>
          <div className="col">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: data.twoStars + "%" }}
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="col">{data.twoStars}</div>
        </div>
        <div className="row">
          <div className="col">1 Star</div>
          <div className="col">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: data.oneStar + "%" }}
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="col">{data.oneStar}</div>
        </div>
      </div>
    </div>
  );
}
function ReviewsDiv(props) {
  return (
    <div className="card h-100 cardSenti">
      <div className="container">
        <div className="row">
          <div className="col">
            <h3
              style={{
                fontSize: "1.3rem",
                textAlign: "center",
                paddingBottom: "1vw",
              }}
            >
              reviews
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>
              User reviews regarding this application are categorised into two
              sections - bug fixes and feature requests. You can view the
              related reviews using the options below.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-12 p-3">
            <Link
              to={{
                pathname: "/bfpage/" + props.data,
              }}
            >
              <button
                className="btn btn-secondary form-control"
                style={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Bug Fixes
              </button>
            </Link>
          </div>
          <div className="col-lg-6 col-sm-12 p-3">
            <Link
              to={{
                pathname: "/frpage/" + props.data,
              }}
            >
              <button
                className="btn btn-secondary form-control"
                style={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Feature Requests
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sentiment;
