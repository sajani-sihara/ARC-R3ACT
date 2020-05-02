/* 
  Page      - SearchDescripBox.js page
  Function  - Displays each value of the props
  Parameter - @param {*} props
  Author    - Ridmi Amasha, Sajani Sihara
*/

import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faStar } from "@fortawesome/free-solid-svg-icons";

function SearchBox(props) {
  return (
    <div className="container">
      <div className="row m-3">
        <div className="col-md-4 m-2">
          <Link to={{
            pathname: "/sentiment",
            state: {
              app: props.id
            }
          }}>
            <img
              // className="searchAppsImages"
              className="img-responsive m-2  searchAppsImages"
              width="100px"
              height="100px"
              alt="search app logo"
              src={props.icon}
            />
          </Link>


        </div>
        <div className="col m-2">
          <div className="row m-2">
            <h3>{props.title}</h3>{" "}
          </div>
          <div className="row m-2">
            <p style={{ fontSize: "1.2rem" }}>{props.developer}</p>
          </div>
          <div
            className="row m-2"
            style={{ fontSize: "1.2rem" }}
          >
            <p className="mr-3">
              {props.rating}
              <FontAwesomeIcon icon={faStar} style={{ width: "2vw" }} />
            </p>
            <p className="mr-3">{props.price}</p>
            <p className="mr-3">
              <FontAwesomeIcon
                icon={faArrowCircleDown}
                style={{ width: "2vw" }}
              />
              {props.installs}
            </p>
          </div>
        </div>
        <div className="col-6">{/**Stars */}</div>
      </div>
      {/* <div className="row m-3">
        <div className="col">
          <p style={{ fontSize: "1.2rem",fontStyle:'Italic' }}>"{props.summary}"</p>
        </div>
      </div> */}
    </div>
  );
}
export default SearchBox;
