/* 
  Page        - Crashed.js page
  Function    - Shows the error page when the page crashes
  Parameters  - @param {errorDet} props
  Author      - Ridmi Amasha
*/

import React from "react";
import "../../App.css";
import { Helmet } from "react-helmet";
function CrashPage(props) {
  function refreshPage() {
    window.location.reload(false);
  }
  const TITLE = "Error | ARC";
  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="icon" href="images/logo1.png" sizes="16x16"></link>
      </Helmet>
      <div className="container-fluid error_div">
        <div className="row">
          <div className="col">
            <img
              src={process.env.PUBLIC_URL + "/images/error_icon.png"}
              alt="error_image"
              style={{
                width: "80%",
                paddingLeft: "20vh",
                paddingTop: "15vh",
              }}
            />
          </div>
          <div className="col my-auto">
            <h1 className="pb-5" style={{ color: "#fff", fontSize: "9vw" }}>
              Oops!
            </h1>
            <h3 className="pb-5" style={{ color: "#fff", fontSize: "1.5vw" }}>
              {props.errorDet}
            </h3>
            <button
              className="errorPageBtn"
              variant="outline-primary"
              onClick={refreshPage}
            >
              Try Again!
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CrashPage;
