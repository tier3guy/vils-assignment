/* eslint-disable react-hooks/exhaustive-deps */
// Styles
import "./styles.css";

// Internal Imports
import { useEffect, useRef, useState } from "react";

function parseTime(time) {
  function getHour() {
    const hour = Math.floor(time / 3600);
    if (hour >= 10) return hour;
    else if (hour > 0 && hour <= 9) return `0${hour}`;
    return "00";
  }
  function getMin() {
    const min = Math.floor(time / 60);
    if (min >= 10) return min;
    else if (min > 0 && min <= 9) return `0${min}`;
    return "00";
  }
  function getSeconds() {
    const second = Math.floor(time % 60);
    if (second >= 10) return second;
    else if (second > 0 && second <= 9) return `0${second}`;
    return "00";
  }

  return getHour(time) + ":" + getMin(time) + ":" + getSeconds(time);
}

const VideoController = ({ src }) => {
  const videoSource = src
    ? src
    : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false); // Boolean value
  const [sound, setSound] = useState(false); // Boolean value
  const [progress, setProgress] = useState(0); // In percentage
  const [speed, setSpeed] = useState(1); // Float value
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const delay = 2; // In seconds

  useEffect(() => {
    if (!videoRef || !videoRef.current) return;

    const timeInterval = setInterval(() => {
      const updatedProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(updatedProgress);
    }, delay * 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const playPauseFunction = () => {
    if (!videoRef || !videoRef.current) return;
    if (play) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlay(!play);
  };

  const handleSpeedChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(newSpeed);
    videoRef.current.playbackRate = newSpeed;
  };

  return (
    <div className="video-player-container">
      {/* Video */}
      <video width="100%" height="90%" ref={videoRef}>
        <source src={videoSource} />
      </video>

      {/* Controllers */}
      <div className="video-controllers-container">
        {/* Progress Bar */}
        <div className="video-player-progress-bar">
          <div
            className="progress-covered"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* Buttons Container */}
        <div className="video-player-buttons-container">
          <div className="options-container">
            <button>
              <i className="fa-solid fa-gear rewind"></i>
            </button>
            {sound ? (
              <button
                onClick={() => {
                  if (!videoRef || !videoRef.current) return;
                  videoRef.current.volume = 0;
                  setSound(!sound);
                }}
              >
                <i className="fa-solid fa-volume-xmark rewind"></i>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!videoRef || !videoRef.current) return;
                  videoRef.current.volume = 1;
                  setSound(!sound);
                }}
              >
                <i className="fa-solid fa-volume-off rewind"></i>
              </button>
            )}

            <select value={speed} onChange={handleSpeedChange}>
              {speeds.map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>
          </div>

          <div className="center-button-container">
            <button
              onClick={() => {
                if (!videoRef || !videoRef.current) return;
                videoRef.current.currentTime -= 5;
              }}
            >
              <i className="fa-solid fa-chevron-left rewind"></i>
            </button>

            <button onClick={playPauseFunction} className="play-pause-button">
              {play ? (
                <i className="fa-solid fa-pause"></i>
              ) : (
                <i className="fa-solid fa-play"></i>
              )}
            </button>

            <button
              onClick={() => {
                if (!videoRef || !videoRef.current) return;
                videoRef.current.currentTime += 5;
              }}
            >
              <i className="fa-solid fa-chevron-right rewind"></i>
            </button>
          </div>

          <p style={{ width: "50px", color: "var(--secondary)" }}>
            {!videoRef || !videoRef.current
              ? "00:00:00"
              : parseTime(videoRef.current.currentTime)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoController;
