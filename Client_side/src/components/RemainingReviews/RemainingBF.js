import React, { useEffect, useState } from "react";
import LoadingBox from "../Error/LoadingBox";
import ErrorPage from "../Error/Crashed";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../App.css";
import Review from "../Review/Review";
import Footer from "../NavigationBar/Footer";

function RemainingBF() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  //Get localstorage value of appName
  
  const app =  localStorage.getItem('appName');
  console.log(app);

  useEffect(() => {
    fetch("http://localhost:5000/bugfixes/common/"+app)
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
  }, []);

  if (error) {
    return <ErrorPage errorDet={error.message} />;
  } else if (!isLoaded) {
    return <LoadingBox />;
  } else {
  return (
    <div>
      <div class="bgimg-19">
        <div class="caption">
          <span className="border">
            Take a look at the rest of the reviews addressing bug fixes
          </span>
        </div>
      </div>
      <div>
      {items.map((item) => (
              <div key={item} style={{ listStyleType: "none" }}>
                <div className={"descrip-" + (items.indexOf(item) % 2 ? "15" : "11")}>
                  {/* author={item.userName} date={item.date} score={item.rating} text={item.text} */}

                  <Review
                    id={item._id}
                    author={item.username}
                    date={item.date}
                    score={item.rating}
                    text={item.text}
                  />
                </div>
              </div>
            ))}
      </div>
      <Footer />
    </div>
  );
  }
}
export default RemainingBF;
