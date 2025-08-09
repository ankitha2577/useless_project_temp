
import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EmojiPicker from 'emoji-picker-react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [clockValue, setClockValue] = useState(new Date());
  const [moods, setMoods] = useState({}); // { '2025-08-09': '😊' }
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setClockValue(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const onDayClick = (value) => {
    setSelectedDay(value);
    setShowEmojiPicker(true);
  };

  const onEmojiClick = (emojiData) => {
    const dayKey = selectedDay.toISOString().split('T')[0];
    setMoods({ ...moods, [dayKey]: emojiData.emoji });
    setShowEmojiPicker(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayKey = date.toISOString().split('T')[0];
      return <span style={{ fontSize: '1.2em' }}>{moods[dayKey]}</span>;
    }
    return null;
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', background: '#f7f7fa' }}>
      <h1>Mood Tracker Calendar</h1>
      <div style={{ marginBottom: 20 }}>
        <Clock value={clockValue} size={120} renderNumbers={true} />
      </div>
      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={onDayClick}
        tileContent={tileContent}
      />
      {showEmojiPicker && (
        <div style={{ marginTop: 20 }}>
          <h3>Select your mood for {selectedDay && selectedDay.toDateString()}:</h3>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <div style={{ marginTop: 40, fontSize: '1.1em', color: '#888' }}>
        Click a day to set your mood with an emoji!
      </div>
    </div>
  );
}

export default App
