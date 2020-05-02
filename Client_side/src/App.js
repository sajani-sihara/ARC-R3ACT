import React from "react";
import MenuBox from "./components/Menu/MenuBox";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Bugfix from "./components/BugFix_FeatureReq/BugFix";
import FeatureRequest from "./components/BugFix_FeatureReq/FeatureRequest";
import OverallSentiment from "./components/OverallSentiment/OverallSentiment";
import ViewAllReviews from "./components/Review/ViewReviews";
import NavBar from "./components/NavigationBar/Navbar";
import HomePage from "./components/Home/HomePage";
import AboutUs from "./components/AboutUs/AboutUs";
import Support from "./components/Support/Support";
import ErrorCrash from "./components/Error/Crashed";
import LoadingBox from "./components/Error/LoadingBox";
import Contact from "./components/Contact/Contact";
import IndividualReview from "./components/Individual_Review/IndividualReview";
import Search from "./components/Search/Search";
import RemainingBF from "./components/RemainingReviews/RemainingBF";
import RemainingFR from "./components/RemainingReviews/RemainingFR";
import SearchPage from "./components/Search/SearchPage";
import BugFixPage from "./components/BugFix_FeatureReq/BugFixPage";
import FeatureRequestPage from "./components/BugFix_FeatureReq/FeatureRequestPage";
import MenuPage from "./components/Menu/MenuPage";
import Sentiment from "./components/Menu/Sentiment";
function App() {
  return (
    <Router>
      {/*  */}
      <Route path="/sentiment" exact component={Sentiment} />
      <Route path="/menupage" exact component={MenuPage} />
      <NavBar />
      <Route path="/aboutus" exact component={AboutUs} />
      <Route path="/support" exact component={Support} />
      <Route path="/contact" exact component={Contact} />

      <Switch>
        <Route path="/searchpage" exact component={SearchPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/loading" component={LoadingBox} />
        <Route path="/bfpage/:appId" exact component={BugFixPage} />
        <Route path="/frpage/:appId" exact component={FeatureRequestPage} />
        <Route path="/error" exact component={ErrorCrash} />
        <Route path="/loading" exact component={LoadingBox} />

        <Route path={"/search/:app"} component={Search} exact />
        {/* <Route path={'/menu'} component={MenuBox}/>  */}
        <Route
          path="/search/:app"
          render={({ match: { url } }) => (
            <>
              <Route
                path={url + "/:appId"}
                render={({ match: { url } }) => (
                  <>
                    <Route path={url + "/"} exact component={MenuBox} />
                    <Route
                      path={url + "/bugfix"}
                      render={({ match: { url } }) => (
                        <>
                          <Route path={url + "/"} exact component={Bugfix} />
                          <Route
                            path={url + "/reviews"}
                            render={({ match: { url } }) => (
                              <>
                                <Route
                                  path={url + "/"}
                                  exact
                                  component={ViewAllReviews}
                                />
                                <Route
                                  path={url + "/:reviewId"}
                                  component={IndividualReview}
                                />
                              </>
                            )}
                          />
                          <Route
                            path={url + "/remainingBF"}
                            render={({ match: { url } }) => (
                              <>
                                <Route
                                  path={url + "/"}
                                  exact
                                  component={RemainingBF}
                                />
                                <Route
                                  path={url + "/:reviewId"}
                                  component={IndividualReview}
                                />
                              </>
                            )}
                          />
                          <Route
                            path={url + "/remainingFeatureRequests"}
                            render={({ match: { url } }) => (
                              <>
                                <Route
                                  path={url + "/"}
                                  exact
                                  component={RemainingFR}
                                />
                                <Route
                                  path={url + "/:reviewId"}
                                  component={IndividualReview}
                                />
                              </>
                            )}
                          />
                        </>
                      )}
                    />
                    <Route
                      path={url + "/featureRequest"}
                      render={({ match: { url } }) => (
                        <>
                          <Route
                            path={url + "/"}
                            exact
                            component={FeatureRequest}
                          />
                          <Route
                            path={url + "/reviews"}
                            render={({ match: { url } }) => (
                              <>
                                <Route
                                  path={url + "/"}
                                  exact
                                  component={ViewAllReviews}
                                />
                                <Route
                                  path={url + "/:reviewId"}
                                  component={IndividualReview}
                                />
                              </>
                            )}
                          />
                          <Route
                            path={url + "/remainingBF"}
                            render={({ match: { url } }) => (
                              <>
                                <Route
                                  path={url + "/"}
                                  exact
                                  component={RemainingBF}
                                />
                                <Route
                                  path={url + "/:reviewId"}
                                  component={IndividualReview}
                                />
                              </>
                            )}
                          />
                          <Route
                            path={url + "/remainingFeatureRequests"}
                            render={({ match: { url } }) => (
                              <>
                                <Route
                                  path={url + "/"}
                                  exact
                                  component={RemainingFR}
                                />
                                <Route
                                  path={url + "/:reviewId"}
                                  component={IndividualReview}
                                />
                              </>
                            )}
                          />
                        </>
                      )}
                    />
                    <Route
                      path={url + "/overallSentiment"}
                      component={OverallSentiment}
                    />
                  </>
                )}
              />
            </>
          )}
        />
      </Switch>
      {/* </div> */}
    </Router>
  );
}

export default App;
