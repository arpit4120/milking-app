import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Main.css'; // Import custom styles for MainPage
import musicFile from '../../contents/music/scott-buckley-moonlight.mp3';
import moment from 'moment';

const Main = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(musicFile));

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!isPlaying) {
      try {
        await audio.play();
        intervalRef.current = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
        setIsPlaying(true);
      } catch (error) {
        console.error('Failed to start playback:', error);
        // Handle error (e.g., display error message to user)
      }
    } else {
      audio.pause();
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    }
  };

  const stopMilking = () => {
    audioRef.current.pause();
    clearInterval(intervalRef.current);
    setIsPlaying(false);

    // Prompt user to enter milk quantity (e.g., with window.prompt)
    const milkQuantity = prompt('Enter the quantity of milk produced (in liters):');
    if (milkQuantity !== null) {
      // Save milking session data (e.g., to localStorage)
      const milkingSession = {
        date: moment(new Date()).format('DD/MM/YY'),
        startTime: moment(new Date()).subtract(timer, 'seconds').format('HH:mm'),
        endTime: moment(new Date()).format('HH:mm'),
        totalTime: timer,
        totalMilk: parseFloat(milkQuantity),
      };

      // Example: Saving to localStorage (you can use any data storage method)
      const milkingHistory = JSON.parse(localStorage.getItem('milkingHistory')) || [];
      milkingHistory.push(milkingSession);
      localStorage.setItem('milkingHistory', JSON.stringify(milkingHistory));

      // Reset timer
      setTimer(0);
    }
  };

  return (
    <div className="main-page">
      <h1>Welcome to Milking App</h1>
      <button className="start-button" onClick={toggleMusic}>
        {isPlaying ? 'Pause' : 'Start Milking'}
      </button>
      <button className="stop-button" onClick={stopMilking} disabled={timer <= 0} style={{ opacity: timer <= 0 ? 0.5 : 1, cursor: timer <= 0 ? 'not-allowed' : 'pointer' }}>
        Stop
      </button>
      <p>Time Elapsed: {timer} seconds</p>
          <h2><Link to="/history" className="history-link">
            Enter Milk Quantity
          </Link></h2>

      {/* Audio element for music playback */}
      <audio ref={audioRef}  src={musicFile}/>
    </div>
  );
};

export default Main;
