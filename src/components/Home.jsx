import React, { useCallback, useEffect, useRef, useState} from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { SpinnerCircular } from "spinners-react";
import axios from 'axios'
import Webcam from "react-webcam";
import './styles/styles.css';
import './styles/pattern.css';

export default function Home(){

    const webcamRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const [file, setFile] = useState(null)

    const [summary, setSummary] = useState("") // Contains the recognized user

    const sendData = async (image) => {
      setIsLoading(true);
      await axios.post('http://192.168.1.10:5000/api/v_1_1_5/summary/get', {
          'encodedImage': image.toString().substring(23),
          'language': 'en',
          'API_KEY': 'PCYBL4TYfnVXeDhFZYvT'
      })
      .then(response => {
        setIsLoading(false);
        setSummary(response.data.param);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error) 
      })
    }

    const takeScreenshot = () => {
      // Gets the base64 code of the screenshot
      const imageSrc = webcamRef.current.getScreenshot();
      sendData(imageSrc);
    }

    const takeFile = (e) => {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0])
      setFile({
        'name': e.target.files[0].name,
        'size': e.target.files[0].size
      })
      reader.onload = function () {
        sendData(reader.result);
        startAnimation();
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
    }

    const startAnimation = () => {
      document.querySelector('.status-line').style.width += "224px";
      document.querySelector('.status-line').style.transition = "60s";
    }

    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    return (
      <div className="width-full height-948 display-flex space-around border-smaller">
        <div className="border-smaller display-flex align-center width-1200">
          <div class="upload">

            <div class="upload-field">
              <div class="icon-field"><span class="fa fa-file-o"></span>
                <p>Drag your files here</p>
              </div>
            </div>

            <div className="upload-status">
              <div className="margin-top-24"><h1>SCAN</h1></div>
              <div className="height-80 height-124 margin-top-40">
              {
                file != null ? (
                  <div className="file">
                    <div className="file-description">
                      <div className="file-name">{file.name.substring(0,14) + '...'}</div>
                      <div className="file-size">{file.size / 1000000}MB</div>
                    </div>
                    <div className="file-status">
                      <div className="status-field">
                        <div className="status-line"></div>
                      </div>
                    </div>
                  </div>
                ):(
                  <span>No files found</span>
                )
              }
              </div>
              <div className="border-smaller height-60 display-flex space-around align-center">
                { isLoading ? (
                  <input className="background-color" id="upload-field-loading" onChange={(e) => takeFile(e)} accept={".jpeg, .png, .jpg"} type="file"/>
                ):(
                  <input id="upload-field" onChange={(e) => takeFile(e)} accept={".jpeg, .png, .jpg"} type="file"/>
                )}
              </div>
            </div>
          </div>
          <div className="border-smaller height-560 width-540">
            <div>

            </div>
          </div>
        </div>
      </div>
    );
  };