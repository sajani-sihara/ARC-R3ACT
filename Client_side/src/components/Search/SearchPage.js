/* 
  Page      - Search.js page
  Function  - Displays application that contains or related to the app that passed from the url
  Parameter - @param {*} props
  Author    - Ridmi Amasha, Sajani Sihara
*/
import React, { useEffect, useState } from "react";
import LoadingBox from "../Error/LoadingBox";
import ErrorPage from "../Error/Crashed";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "./SearchBox";
import "../../App.css";
import Footer from "../NavigationBar/Footer";
import { Helmet } from "react-helmet";

const TITLE = "Search Apps | ARC";

function SearchPage(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const app = props.match.params.app;

  //URL for calling the api for searching in the server,application id needs to be appended
  const url = "http://localhost:5000/search/pickme";

  //fetches the api call from the server
  useEffect(() => {
    fetch(url, {
      method: "POST",
    })
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
  }, [url]);
  const Items = () => {
    console.log(items);
    const rows = [...Array(Math.ceil(items.length / 2))];
    const itemRows = rows.map((row, i) => items.slice(i * 2, i * 2 + 2));
    const content = itemRows.map((row, i) => (
      <div className="row px-5 pb-4" key={i}>
        {row.map((item) => (
          <div
            className="col-lg-6 mx-5 mx-sm-0 border-bottom border-secondary"
            key={item}
          >
            <SearchBox
              title={item.newTitle}
              developer={item.developer}
              summary={item.summary}
              icon={item.icon}
              installs={item.installs}
              rating={item.rating}
              price={item.price}
            />
          </div>
        ))}
      </div>
    ));
    return <div>{content}</div>;
  };
  if (error) {
    return <ErrorPage errorDet={error.message} />;
  } else if (!isLoaded) {
    return <LoadingBox />;
  } else {
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
          <link rel="icon" href="images/logo1.png" sizes="16x16"></link>
        </Helmet>
        <div className="bgimg-18">
          <div className="caption">
            <span className="border">Is this the app you are looking for?</span>
          </div>
        </div>
        <div>
          <Items />
        </div>

        <Footer />
      </div>
    );
  }
}
export default SearchPage;
