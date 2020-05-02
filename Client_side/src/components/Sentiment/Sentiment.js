/* 
  Page      - MenuBox.js page
  Function  - Displays the menu (Bug Fixes, Feature Requests and Overall Sentiment)
  Author    - Sajani Sihara, Ridmi Amasha
*/

import React from "react";
import { Link } from "react-router-dom";
import LoadingBox from "../Error/LoadingBox";
import ErrorPage from "../Error/Crashed";
import Footer from "../NavigationBar/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faTags,
  faCalendarDay,
  faComments,
  faStar,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

import { Helmet } from "react-helmet";
class Sentiment extends React.Component {

  //Interval to be triggered
  fetchInterval = false;
  //Store the API call
  urlString = "";
  sentiURLString = "";
  TITLE = "Sentiment | ARC";
  constructor(props) {
    super(props);
    const location = this.props.location;

    const { appId } = location.state;
    localStorage.setItem("appName", appId)
    this.state = {
      error: {},
      isLoaded: false,
      details: { wait: true },
      items: { sent: true },
      app: appId
    };
    //const {appId} = this.props.match.params.appId;
    this.urlString = "http://localhost:5000/app/" + appId;
    this.sentiURLString = "http://localhost:5000/sentiment/" + appId;
    console.log("this.urlString", this.urlString);

    const { details } = this.state;

    if (details && details.wait) {
      console.log("wrong items");

      // checks if the data is fetched between 20 mins
      if (!this.fetchInterval) {

        console.log("no fetch interval");
        this.getAppDetails(this.urlString)
        console.log("get app details");

        this.fetchInterval = setInterval(() => {
          this.getAppDetails(this.urlString)
        }, 120000);

      }
    } else {
      clearInterval(this.fetchInterval);
    }
  }

  getAppDetails(urlString) {
    fetch(urlString, {
      method: "POST"
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.handleDetailsSuccess(result);
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  //Checks if the results have been fetched
  handleDetailsSuccess(result) {
    console.log("result", result);
    this.setState({ details: result });
    if (!result.wait) {
      clearInterval(this.fetchInterval);
      if (result.message==="Sorry! The number of reviews is less than 100.") {
        this.setState({ isLoaded: true });
      }else{
        this.getItems(this.sentiURLString);
      }   
    }
  }
  getItems(urlString) {
    fetch(urlString, {
      method: "POST"
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.handleItemsSuccess(result);
        },
        (error) => {
          this.setState({ error });
        }
      );
  }
  //Checks if the results have been fetched
  handleItemsSuccess(result) {
    console.log("item", result);
    this.setState({ items: result });
    if (result.sent) {
      this.setState({ isLoaded: true });
    }
  }


  render() {
    const { isLoaded, error, items, details, app } = this.state;
    if ((error && error.message)) {
      console.log("error", error);
      return <ErrorPage errorDet={error.message} />;
    } else if (details.message == "Sorry! The number of reviews is less than 100.") {
      return <ErrorPage errorDet={details.message} />;
    } else if (!isLoaded) {
      return <LoadingBox />;
    } else {
      return (
        <div className="container-fluid" style={{ padding: 0 }}>
          <Helmet>
            <title>{this.TITLE}</title>
            <link rel="icon" href="images/logo1.png" sizes="16x16"></link>
          </Helmet>
          {/*Adding the background image*/}
          <div className="bgimg-16">
            {/*Adding the main heading */}
            <div className="caption">
              <span className="border">OVERLOOK OF THE MOBILE APP</span>
            </div>
          </div>
          {items.details.map((item) => (
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
          {/*Back button */}
          <button
            type="button"
            className="btn btn-light"
            id="backBtn"
            onClick={() => this.props.history.goBack()}
          >
            <FontAwesomeIcon icon={faArrowLeft} style={{ width: "2vw" }} />
          </button>
          {/*adding the footer component */}
          <Footer />
        </div>
      );
    }
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
          <div className="col-lg-4">
            <img
              className="img-responsive m-2 ml-5  searchAppsImages"
              width="100px"
              height="100px"
              alt="search app logo"
              src={data.icon}
            />
          </div>
          <div className="col-lg-8">
            <p>{data.title}</p>
            <p>{data.developer}</p>
            <p style={{ fontStyle: "italic", width: "90%", textAlign: "justify" }}>"{data.summary}"</p>
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
          <div className="col p-2">
            <FontAwesomeIcon
              style={{ color: "#5494da" }}
              className="faicon"
              icon={faCalendarDay}
            />{" "}
              Release Date
            </div>
          <div className="col p-2">{data.releasedDate}</div>
        </div>
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
          <div className="col">App Sentiment</div>
          <div className="col" style={{ marginLeft: "14vw" }}>
            {[...Array(5).keys()].map((i) => (
              <FontAwesomeIcon
                key={i + 1}
                className={((i < data.sentiment) ? "checked" : "")}
                icon={faStar}
              />
            ))}
          </div>
        </div>

      </div>
      <hr style={{ border: "3px solid #f1f1f1" }} />

      <div className="container">
        <div className="row m-2">
          <div className="col-2">5 Star</div>
          <div className="col-7">
            <div className="progress h-100">
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
          <div className="col-3">{data.fiveStars}%</div>
        </div>
        <div className="row m-2">
          <div className="col-2">4 Star</div>
          <div className="col-7">
            <div className="progress h-100">
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
          <div className="col-3">{data.fourStars}%</div>
        </div>
        <div className="row m-2">
          <div className="col-2"> 3 Star</div>
          <div className="col-7">
            <div className="progress h-100">
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
          <div className="col-3">{data.threeStars}%</div>
        </div>
        <div className="row m-2">
          <div className="col-2">2 Star</div>
          <div className="col-7">
            <div className="progress h-100">
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
          <div className="col-3">{data.twoStars}%</div>
        </div>
        <div className="row m-2">
          <div className="col-2">1 Star</div>
          <div className="col-7">
            <div className="progress h-100">
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
          <div className="col-3">{data.oneStar}%</div>
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
