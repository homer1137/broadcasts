import ReactPlayer from "react-player/youtube";
import "./App.css";
import React, { useState, useEffect } from "react";
import { setDefaultNamespace } from "i18next";

const broadcats = [
  {
    id: 1,
    title: "Russia",
    language: "ru",
    link: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0?autoplay=1",
  },
  {
    id: 2,
    title: "England",
    language: "en",
    link: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0?autoplay=1",
  },
  {
    id: 3,
    title: "Deutch",
    language: "de",
    link: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0?autoplay=1",
  },
  {
    id: 5,
    title: "Spain",
    language: "sp",
    link: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0?autoplay=1",
  },
];

function App() {
  const [activeVideo, setActiveVideo] = useState({});

  const defaultVideo = {
    id: 5,
    title: "Spain",
    language: "sp",
    link: "https://www.youtube.com/embed/FOxf1iBFgdM?autoplay=1&enablejsapi=1",
  };

  const getVideo = (arr) => {
    const currenLanguage = window.navigator.language;
    console.log('currLanguage', currenLanguage)
    const video = arr.filter((item) => item.language === currenLanguage);
    if (video.length) {
      return video[0];
    } else {
      return arr[0];
    }
  };

  const getData = async () => {
    const options = {
      method: "GET",
    };
    const data= await fetch("https://api1211.herokuapp.com/players", options)
      .then((response) => response.json())

    setActiveVideo(getVideo(data.broadcasts));
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      setActiveVideo(defaultVideo);
    }, 15000);
  }, []);


  return (
    <div className="App">
      <h1>Трансляции</h1>
      <div className="player-wrapper">
        <ReactPlayer
          autoplay
          muted
          className="react-player"
          playing={true}
          controls
          url={activeVideo.link}
        />
      </div>
    </div>
  );
}

export default App;
