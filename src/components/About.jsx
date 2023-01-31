import axios from "axios";
import './styles/styles.css';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IonIcon } from "react-ion-icon";

export const About = () => {

  const navigate = useNavigate();

  return(
    <div onClick={(e) => navigate('/home')} className="z-index-3 display-flex space-around align-center width-full height-almost-full position-absolute">
      <div className="display-flex align-center space-around white-background popup white-background border-radius-10 height-310 width-400">
        <div className="height-300">
          <div className="display-flex align-center height-114">
            <span className="font-family purple-color font-weight-600 font-size-24">Quext</span>
          </div>
          <div className="height-180 width-280">
            <span className="font-family font-size-15">Hey there, thank you for visiting our app, we hope you like it! Here you can load/take pictures of a long books's page that you have to study, and it will show you a summary of it, which will be such easier to study!</span>
          </div>
        </div>
      </div>
    </div>
  );
}