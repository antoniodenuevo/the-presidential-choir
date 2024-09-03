import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import textData from './fullText.json';
import scrollTimestamps from './scrollTimestamps.json';
import audioFile from './presidentialchoirtest.mp3';
import InfoScreen from './InfoScreen'; // Import the InfoScreen component

const parseTime = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':');
  const [secs, millis] = seconds.split('.').map(Number);
  return Number(hours) * 3600 + Number(minutes) * 60 + secs + (millis / 1000);
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false); // Track if we're in the play screen or not
  const audioRef = useRef(null);
  const textContainerRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const lineHeight = 61.6;
  const initialPosition = window.innerHeight / 2;
  const markerOffset = initialPosition + lineHeight;

  useEffect(() => {
    if (!isPlaying) return;

    const audioElement = audioRef.current;

    const handleScroll = () => {
      const currentTime = audioElement.currentTime;

      const nextScrollIndex = scrollTimestamps.findIndex(
        (entry, index) => index > scrollIndex && currentTime >= parseTime(entry.time)
      );

      if (nextScrollIndex !== -1) {
        setScrollIndex(nextScrollIndex);

        const newOffset = initialPosition - lineHeight * nextScrollIndex;
        textContainerRef.current.style.transform = `translateY(${newOffset}px)`;
      }
    };

    // Set up the event listener for scrolling
    audioElement.addEventListener('timeupdate', handleScroll);

    // Clean up event listeners
    return () => {
      audioElement.removeEventListener('timeupdate', handleScroll);
    };
  }, [scrollIndex, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      // Play the audio when the play screen is launched
      audioRef.current.play();
    }
  }, [isPlaying]);

  // Handle the reset and clean-up when the user clicks the "info" button
  const handleInfoClick = () => {
    const audioElement = audioRef.current;
    
    // Reset the audio and scroll state
    audioElement.pause();
    audioElement.currentTime = 0; // Reset audio playback to the beginning
    setScrollIndex(0); // Reset the scroll index
    textContainerRef.current.style.transform = `translateY(${initialPosition}px)`; // Reset the scroll position

    // Switch back to the info screen
    setIsPlaying(false);
  };

  return (
    <div>
      {!isPlaying ? (
        <InfoScreen onPlay={() => setIsPlaying(true)} />
      ) : (
        <div className="teleprompter-container">
          <audio ref={audioRef} controls src={audioFile} />
          <button className="info-button" onClick={handleInfoClick}>
            INFO
          </button> {/* Button to return to the info screen */}
          <div className="scroll-wrapper">
            <div
              className="scroll-marker"
              style={{
                top: `${markerOffset - lineHeight - lineHeight + 8}px`,
                backgroundColor: 'white',
              }}
            ></div>

            <div className="teleprompter-text" ref={textContainerRef} style={{ transform: `translateY(${initialPosition}px)` }}>
              {textData.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
