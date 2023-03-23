import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getPadTime } from './helpers/fillzeo';

function App() {
  const [timerDays, setTimerDays] = useState('00')
  const [timerHours, setTimerHours] = useState('00')
  const [timerMinutes, setTimerMinutes] = useState('00')
  const [timerSeconds, setTimerSeconds] = useState('00')

  let interval = useRef()
  
  const startTimer = () => {
    const expirationDate = new Date('March 31, 2023 23:23:00').getTime()
    
    interval = setInterval(() => {
      const currentDate = new Date().getTime()
      const timeLeft = expirationDate - currentDate

      const days = getPadTime(Math.floor(timeLeft / (1000 * 60 * 60 * 24)))
      const hours = getPadTime(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)) 
      const minutes = getPadTime(Math.floor((timeLeft / (1000 * 60)) % 60))
      const seconds = getPadTime(Math.floor((timeLeft / (1000)) % 60))

      if (timeLeft < 0) {
        clearInterval(interval.current)
      } else {
        setTimerDays(days)
        setTimerHours(hours)
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
      }
    }, 1000) 
  }

  useEffect(() => {
    startTimer()
    return () => {
      clearInterval(interval.current)
    }
  })
  return (
    <div className='timer-background'>
      <div className="timer-container">
        <div>
          <h1>big sale on lifetime plan</h1>
          <p>there is very little left</p>
        </div>
        <div className='timer-part'>

          <div className='timer-clock'>
            <div>
              <p>{timerDays}</p>
              <p>days</p>
            </div>
            <div>
              <p>{timerHours}</p>
              <p>hours</p>
            </div>
            <div>
              <p>{timerMinutes}</p>
              <p>minutes</p>
            </div>
            <div>
              <p>{timerSeconds}</p>
              <p>seconds</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
