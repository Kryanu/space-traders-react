// Arrival 2024-03-04T18:44:44.796Z
// Departure 2024-03-04T18:41:34.796Z

import React, { useState, useEffect } from 'react';
import { intervalToDuration, formatDuration } from 'date-fns';
export default function Countdown(props) {
  const { arrival } = props;
  debugger;
  const arrivalMS = new Date(arrival).getTime();
  const nowMS = new Date().getTime();
  const diffMS = arrivalMS - nowMS;
  const [countdown, setCountdown] = useState(diffMS / 1000); // Initial countdown value in seconds

  useEffect(() => {
    // Function to decrement the countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []); // Empty dependency array ensures effect runs only once on component mount

  if (diffMS <= 0) {
    return <p>Arrived</p>;
  }
  return (
    <div>
      {/* Display countdown */}
      <p>{`Time Left till arrival: ${formatDuration(
        intervalToDuration({ end: new Date(arrival), start: new Date() })
      )}`}</p>
    </div>
  );
}
