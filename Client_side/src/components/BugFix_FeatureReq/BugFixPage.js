/* 
  Page      - BugFix.js page
  Function  - Shows the bug fix keywords relevant to the chosen app
  Author    - Sajani Sihara, Ridmi Amasha
*/

import React from "react";
import LoadingBox from "../Error/LoadingBox";
import ErrorPage from "../Error/Crashed";
import Footer from "../NavigationBar/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewBox from "./ReviewBox";
import "../../App.css";
import { Helmet } from "react-helmet";
import queryString from 'query-string'
class BugFixPage extends React.Component {

  TITLE = "Bug Fixes | ARC";
  currentURL = "http://localhost:3000/bfpage/";
  //Store the API call
  urlString = "";
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      isLoaded: false,
      keywords: { sent: false },
      keyword: "",
      items: { sent: false },
      appId: ""
    };
    const values = this.props.location.search;
    this.state.appId = this.props.match.params.appId;
    this.currentURL = this.currentURL + this.state.appId;
    this.urlString = "http://localhost:5000/bugfixes/" + this.state.appId;
    if (values === "") {
      const { keywords } = this.state;
      if (keywords && !keywords.sent) {
        this.getKeywords(this.urlString + "/keywords");
        const { items } = this.state;
        if (items && !items.sent) {
          this.getItems(this.urlString);
        }
      }
    } else {
      const keyword = queryString.parse(values).keyword;
      if (typeof (keyword) !== 'undefined' || keyword != null) {
        const keyword = queryString.parse(values).keyword;
        this.state.keyword = keyword;
        const newUrlString = this.urlString + "/" + keyword
        const { keywords } = this.state;
        if (keywords && !keywords.sent) {
          this.getKeywords(this.urlString + "/keywords");
          const { items } = this.state;
          if (items && !items.sent) {
            this.getItems(newUrlString);
          }
        }
      } else {
        this.state.error = { message: "Invalid URL" }
      }
    }

  }
  getKeywords(urlString) {
    fetch(urlString, {
      method: "POST"
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.handleKeywordsSuccess(result);
        },
        (error) => {
          this.setState({ error });
        }
      );
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
  handleKeywordsSuccess(result) {
    console.log("keywords", result);
    this.setState({ keywords: result });

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
    const { isLoaded, error, items, keyword, keywords, appId } = this.state;
    let pageTitle;

    if (!keyword) {
      pageTitle = "Bug fixes for " + keywords.appName;
    } else {
      let cKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1)
      pageTitle = '"' + cKeyword + '" bug fixes for ' + keywords.appName;
    }

    if ((error && error.message)) {
      return <ErrorPage errorDet={error.message} />;
    } else if (!isLoaded) {
      return <LoadingBox />;
    } else if (items.sent) {
      return (
        <div>
          <Helmet>
            <title>{this.TITLE}</title>
            <link rel="icon" href="images/logo1.png" sizes="16x16"></link>
          </Helmet>

          {/*Adding the background image*/}
          <div className="bgimg-14" id="pic1">
            {/*Adding the main heading */}
            <div className="caption">
              <span className="border">{pageTitle}</span>
            </div>
          </div>
          {/*The keywords will be in divs descrip-10 and descrip-11 alternatively*/}
          <div>
            {/*div contains the button to view the reviews without a particular keyword */}
            <div className="descrip-review">
              <div className="container-fluid">
                <div className="row" style={{ width: "fit-content" }}>
                  <div className="col-2" >
                  <p className="sidenav-title">View reviews by category</p>
                    <div className="sidenav">
                      <a href={this.currentURL}>All Reviews</a>
                      {keywords && keywords.keywords && keywords.keywords.map((keyword) => (
                        <a href={this.currentURL + "?keyword=" + keyword[0]} key={keyword[0]}>{keyword[0]}</a>
                      ))}
                    </div>
                  </div>
                  <div className="col-10">
                    {items && items.reviewsArray && items.reviewsArray.map((review) => (
                      <ReviewBox item={review} key={review._id}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

  }
}
export default BugFixPage;
