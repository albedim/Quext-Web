import axios from "axios";
import './styles/styles.css';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IonIcon } from "react-ion-icon";

export const About = () => {

  const navigate = useNavigate();

  return(
    <div onClick={(e) => navigate('/home')} className="opacity z-index-5 display-flex space-around align-center width-full height-full position-absolute">
      <div className="display-flex align-center space-around white-background popup white-background border-radius-10 height-380 width-400">
        <div className="height-300">
          <div className="display-flex align-center height-64">
            <span className="font-family purple-color font-weight-600 font-size-24">Attenzione</span>
          </div>
          <div className="height-180 width-280">
            <span className="font-family font-size-15">Se stai usando un dispositivo IOS, ti invitiamo a scattare le foto con il telefono in posizione orizzontale per evitare problemi. Questo servizio è in </span><span className="purple-color">BETA</span><span> Ciò significa che abbiamo bisogno dei vostri feedback per poter migliorare l'applicazione.</span>
            <a href="mailto:dimaio.albe@gmail.com"><span> Mandacene uno qui</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}