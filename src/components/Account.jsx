import axios from "axios";
import './styles/styles.css';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IonIcon } from "react-ion-icon";

export const Account = () => {

  const navigate = useNavigate();

  return(
    <div onClick={(e) => navigate('/home')} className="z-index-3 display-flex space-around align-center width-full height-almost-full position-absolute">
      <div className="white-background display-flex space-around align-center popup white-background border-radius-10 height-280 width-440">
        <div className="height-180 width-280">
          <div className="margin-top-24 margin-left-108 purple-color font-size-60"><IonIcon name="lock-closed"/></div>
          <h2 className="margin-left-108">Soon...</h2>
        </div>
      </div>
    </div>
  );
}