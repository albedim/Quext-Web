import React, { useCallback, useEffect, useRef, useState} from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { SpinnerCircular } from "spinners-react";
import axios from 'axios'
import { animated } from 'react-spring';
import Webcam from "react-webcam";
import './styles/styles.css';
import './styles/pattern.css';
import { IonIcon } from "react-ion-icon";
import Tesseract from "tesseract.js";
import { TextareaAutosize } from "@mui/material";
import { API } from "../utils.ts";

export default function Home(){

    const webcamRef = useRef(null);

    const [data, setData] = useState({});

    const [isSpeaking, setIsSpeaking] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const synth = window.speechSynthesis

    const [file, setFile] = useState(null)

    const [summary, setSummary] = useState(null) // Contains the recognized user

    const [text, setText] = useState("");

    const summaryToSpeak = new SpeechSynthesisUtterance(summary);
    

    const sendData = async (image) => {
      setSummary(null)
      setIsLoading(true);
      await axios.post(API + '/summary/image/get', {
          'encodedImage': image.toString().substring(23),
          'language': data.language.substring(0,window.localStorage.getItem('language').length - 1),
          'API_KEY': 'PCYBL4TYfnVXeDhFZYvT'
      })
      .then(response => {
        setIsLoading(false);
        if(response.data.success){
          setSummary(response.data.param);
        }
        setFile(null)
      })
      .catch(error => {
        console.log(error) 
      })
    }

    const getData = async () => {
      await axios.get(API + '/user/get/' + window.localStorage.getItem('id'))
      .then(response => {
        setData(response.data);
        // console.log(response.data)
      })
      .catch(error => console.log(error));
    }

    const sendTextData = async (text) => {
      setSummary(null);
      setIsLoading(true);
      await axios.post(API + '/summary/text/get', {
          'text': text,
          'language': data.language.substring(0,window.localStorage.getItem('language').length - 1),
          'API_KEY': 'PCYBL4TYfnVXeDhFZYvT'
      })
      .then(response => {
        console.log(response.data)
        setIsLoading(false);
        if(response.data.success){
          setSummary(response.data.param);
        }
        setFile(null);
        setText("");
      })
      .catch(error => {
        console.log(error) 
      })
    }

    const takeFile = (e) => {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setFile({
        'name': e.target.files[0].name,
        'size': e.target.files[0].size
      })
      reader.onload = function () {
        setIsLoading(true);
        // sendData(reader.result);
        toText(e.target.files[0])
        startAnimation();
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
    }

    const startAnimation = () => {
      document.querySelector('.sl').style.width = "224px";
      document.querySelector('.sl').style.transition = "60s";
    }

    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const speak = () => {
      setIsSpeaking(true);
      synth.speak(summaryToSpeak);
    }

    const stop = () => {
      setIsSpeaking(false);
      synth.cancel();
    }


    const toText = async (image) => {
      await Tesseract.recognize(image, data.language, { 
          logger: m => console.log() 
        }
      )
      .then(({data: {text} }) => {
        sendTextData(text)
      })
    }

    const handleText = (e) => {
      setText(e.target.value);
    }

    useEffect(() => {
      getData();
    },[])

    const changeUploadMode = () => {
      if(document.querySelector("#uploadImage").style.display == "block"){
        document.querySelector("#uploadImage").style.display = "none";
        document.querySelector("#uploadText").style.display = "block";
      }else{
        document.querySelector("#uploadImage").style.display = "block";
        document.querySelector("#uploadText").style.display = "none";
      }
    }
  
    return (
      <div className="overflow-y-scroll display-flex space-around width-full height-full">
        <div className="overflow-y-scroll mobile-container align-center display-flex space-around height-748 width-1200">
          <div className="width-500 display-flex space-around align-center upload">

            <div className="z-index-3 white-background upload-field">
          
            </div>

            <div id="uploadImage" className="display-block z-index-4 border-radius-10 upload-status">
              <div className="display-flex space-between align-center height-80 margin-left-34 width-240 margin-top-24">
                <span className="width-70 font-weight-600 display-flex space-around align-center font-family font-size-24">SCAN</span>
                <div onClick={(e) => changeUploadMode(e)} className="hover purple-color width-30 font-size-18"><IonIcon name="text"/></div>
              </div>
              <div className="margin-top-24 display-flex space-around margin-left-34 width-240 height-124">
              {
                file != null ? (
                  <div className="margin-top-14 file">
                    <div className="file-description">
                      <div className="file-name">{file.name.substring(0,14) + '...'}</div>
                      <div className="file-size">{(file.size / 1000000).toString().substring(0,3)}MB</div>
                    </div>
                    <div className="file-status">
                      <div className="status-field">
                        <div className="sl status-line"></div>
                      </div>
                    </div>
                  </div>
                ):(
                  <span>Nessuna foto trovata</span>
                )
              }
              </div>
              <div className="margin-left-34 width-240 height-60 display-flex space-around align-center">
                { isLoading ? (
                  <div onClick={(e) => e.preventDefault()} className="gray-background border-radius-10 height-40 width-140">
                    <input className="visibility-hidden height-40 width-140 purple-color" id="upload-field" accept={".jpeg, .png, .jpg"} type="file"/>
                    <span className="white-color font-family font-weight-500 position-absolute margin-top-10 margin-left-50">SCAN</span>
                  </div>
                ):(
                  <div className="hover purple-background border-radius-10 height-40 width-140">
                    <input className="visibility-hidden height-40 width-140 purple-color" id="upload-field"  onChange={(e) => takeFile(e)} accept={".jpeg, .png, .jpg"} type="file"/>
                    <span className="white-color font-family font-weight-500 position-absolute margin-top-10 margin-left-50">SCAN</span>
                  </div>
                )}
              </div>
            </div>
            <div id="uploadText" className="display-none z-index-4 border-radius-10 upload-status">
              <div className="display-flex space-between align-center height-80 margin-left-34 width-240 margin-top-24">
                <span className="width-70 font-weight-600 display-flex space-around align-center font-family font-size-24">SCRIVI</span>
                <div onClick={(e) => changeUploadMode(e)} className="hover purple-color width-30 font-size-18"><IonIcon name="camera"/></div>
              </div>
              <div className="display-flex space-around margin-top-24 height-90 margin-left-34 width-240 space-around">
                <TextareaAutosize
                  aria-label="minimum height"
                  maxRows={3}
                  placeholder="Scrivi il tuo testo qui"
                  style={{ width: 200 }}
                  value={text}
                  className="border-radius-5 outline-none padding-10"
                  onChange={(e) => handleText(e)}
                />
              </div>
              <div className="margin-left-34 width-240 height-60 display-flex space-around align-center">
                { isLoading ? (
                  <div onClick={(e) => e.preventDefault()} className="gray-background border-radius-10 height-40 width-140">
                    <span className="white-color font-family font-weight-500 position-absolute margin-top-10 margin-left-50">VAI</span>
                  </div>
                ):(
                  <div onClick={(e) => sendTextData(text)} className="hover purple-background border-radius-10 height-40 width-140">
                    <span className="white-color font-family font-weight-500 position-absolute margin-top-10 margin-left-60">VAI</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mobile-summary display-flex space-around align-center height-560 width-540">
            <div className="white-background summary-box border-radius-10 height-484 width-430">
              <div className="display-flex space-around align-center height-60">
                <span className="font-family font-weight-600 font-size-18">RIASSUNTO</span>
              </div>
              <div className="display-flex space-around align-center height-348">
                <div className="summary overflow-y-scroll height-314 width-314">
                  {summary != null ? (          
                    <span>{summary}</span>
                  ):(
                    <div className='height-140 display-flex align-center space-around'>
                      <div className='width-180 display-flex align-center'>
                        <div><img className='width-80' src="./coffe.png" alt="" /></div>
                        <div className='margin-left-14'><h2 className='font-family font-weight-400 font-size-16'>Non c'è nulla qui</h2></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {summary != null && !isSpeaking ? (
                <div className="display-flex space-around align-center height-74">
                  <div onClick={(e) => speak(e)} className="hover purple-color font-size-24"><IonIcon name="play"/></div>
                </div>
              ):(
                isSpeaking && 
                  <div className="display-flex space-around align-center height-74">
                    <div onClick={(e) => stop(e)} className="hover red-color font-size-24"><IonIcon name="stop"/></div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };