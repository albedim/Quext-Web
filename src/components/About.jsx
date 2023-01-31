import axios from "axios";
import './styles/styles.css';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IonIcon } from "react-ion-icon";

export const About = () => {

  const navigate = useNavigate();

  return(
    <div onClick={(e) => navigate('/home')} className="opacity z-index-3 display-flex space-around align-center width-full height-full position-absolute">
      <div className="display-flex align-center space-around white-background popup white-background border-radius-10 height-380 width-400">
        <div className="height-300">
          <div className="display-flex align-center height-84">
            <span className="font-family purple-color font-weight-600 font-size-24">Guide to use</span>
          </div>
          <div className="height-180 width-280">
            <span className="font-family font-size-15">Hey there, thank you for visiting our app, we hope you like it! Here you can load/take pictures of a long books's page, and it will show you a summary of it, which will be much easier to study!</span>
            <span>You just need to choose a picture or take one if you are using our web-app with a mobile phone. </span><span className="purple-color">Unfortunately</span><span> It doesn't work pretty much on IOS, so try to rotate your phone while taking a photo</span>
          </div>
        </div>
      </div>
    </div>
  );
}