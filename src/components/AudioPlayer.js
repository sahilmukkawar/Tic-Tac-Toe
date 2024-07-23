import React, { useRef, useState, useEffect } from 'react';
import './AudioPlayer.css';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

import music1 from './assets/music1.mp3';
import music2 from './assets/music2.mp3';
import music3 from './assets/music3.mp3';
import music4 from './assets/music4.mp3';
import music5 from './assets/music5.mp3';

function AudioPlayer() {
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const songs = [
    { id: 1, title: 'Song 1: O mahi o mahi', file: music1 },
    { id: 2, title: 'Song 2: Bijli Bijli', file: music2 },
    { id: 3, title: 'Song 3: Satranga ka ishq', file: music3 },
    { id: 4, title: 'Song 4: Paani Paani', file: music4 },
    { id: 5, title: 'Song 5: Chand Baliya', file: music5 },
  ];

  const handleNext = () => {
    const newIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = songs[newIndex].file;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Error playing next song:', error);
        });
    }
  };

  const handlePrevious = () => {
    const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = songs[newIndex].file;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Error playing previous song:', error);
        });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleLoadedMetadata = () => setDuration(audio.duration);
      const handleEnded = () => handleNext();

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSongIndex, handleNext]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={songs[currentSongIndex].file} />
      <div className="song-info">
        <h2>{songs[currentSongIndex].title}</h2>
        <div className="controls">
          <button className="audio-button" onClick={handlePrevious}><FaStepBackward /></button>
          <button className="audio-button" onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="audio-button" onClick={handleNext}><FaStepForward /></button>
        </div>
        <div className="timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            className="progress-bar"
            value={currentTime}
            max={duration || 0}
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
