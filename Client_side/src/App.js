import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavigationBar/Navbar";
import HomePage from "./components/Home/HomePage";
import AboutUs from "./components/AboutUs/AboutUs";
import Support from "./components/Support/Support";
import ErrorCrash from "./components/Error/Crashed";
import LoadingBox from "./components/Error/LoadingBox";
import Contact from "./components/Contact/Contact";
import SearchPage from "./components/Search/SearchPage";
import BugFixPage from "./components/BugFix_FeatureReq/BugFixPage";
import FeatureRequestPage from "./components/BugFix_FeatureReq/FeatureRequestPage";
import Sentiment from "./components/Sentiment/Sentiment";
function App() {
  return (
    <Router>
      {/*  */}
     
      <NavBar />
      <Route path="/aboutus" exact component={AboutUs} />
      <Route path="/support" exact component={Support} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/sentiment/:appId" exact component={Sentiment} />

      <Switch>
        {/* <Route path="/searchpage/" exact component={SearchPage} /> */}
        <Route path="/" exact component={HomePage} />
        <Route path="/search/:appId" exact component={SearchPage}/>
        <Route path="/loading" component={LoadingBox} />
        <Route path="/bfpage/:appId" exact component={BugFixPage} />
        <Route path="/frpage/:appId" exact component={FeatureRequestPage} />
        <Route path="/error" exact component={ErrorCrash} />
        <Route path="/loading" exact component={LoadingBox} />

       
      </Switch>
     
    </Router>
  );
}

export default App;
