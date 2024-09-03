import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import textData from './fullText.json';
import scrollTimestamps from './scrollTimestamps.json';
import audioFile from './presidentialchoirtest.mp3';

const parseTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':');
  const [secs, millis] = seconds.split('.').map(Number);
  return Number(hours) * 3600 + Number(minutes) * 60 + secs + (millis / 1000);
};


function App() {
  const audioRef = useRef(null);
  const textContainerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const lineHeight = 56; // Line height based on 3rem font size
  const initialPosition = window.innerHeight / 2; // Set this to control the starting position
  const markerOffset = initialPosition + lineHeight; // Position the marker one line below the initial position

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleScroll = () => {
      const currentTime = audioElement.currentTime;

      const nextScrollIndex = scrollTimestamps.findIndex(
        (entry, index) => index > scrollIndex && currentTime >= parseTime(entry.time)
      );

      if (nextScrollIndex !== -1) {
        setScrollIndex(nextScrollIndex);

        // Calculate the new position based on the initial position and the line height
        const newOffset = initialPosition - lineHeight * nextScrollIndex;

        textContainerRef.current.style.transform = `translateY(${newOffset}px)`;
      }
    };

    audioElement.addEventListener('timeupdate', handleScroll);

    return () => {
      audioElement.removeEventListener('timeupdate', handleScroll);
    };
  }, [scrollIndex]);

  return (
    <div className="teleprompter-container">
      <audio ref={audioRef} controls src={audioFile} />

      {/* Wrap the marker and text container inside a flex container */}
      <div className="scroll-wrapper">
        {/* The visual marker */}
        <div
          className="scroll-marker"
          style={{
            top: `${markerOffset-lineHeight-lineHeight+2}px`,
       
            backgroundColor: 'white',
          }}
        ></div>

        <div className="teleprompter-text" ref={textContainerRef} style={{ transform: `translateY(${initialPosition}px)` }}>
          {textData.text}
        </div>
      </div>
    </div>
  );
}

export default App;
