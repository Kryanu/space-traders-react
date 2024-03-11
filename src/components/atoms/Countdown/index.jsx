import React, { useState, useEffect } from 'react';
import { intervalToDuration, formatDuration } from 'date-fns';
import { Typography } from '@mui/material';
export default function Countdown(props) {
  const { arrival } = props;
  const arrivalMS = new Date(arrival).getTime();
  const nowMS = new Date().getTime();
  const diffMS = arrivalMS - nowMS;
  const [countdown, setCountdown] = useState(diffMS / 1000); // Initial countdown value in seconds

  useEffect(() => {
    // Function to decrement the countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  if (arrival === 0) {
    return <></>;
  }

  if (diffMS <= 0) {
    return <Typography>Arrived</Typography>;
  }
  return (
    <Typography>{`Time Left till arrival: ${formatDuration(
      intervalToDuration({ end: new Date(arrival), start: new Date() })
    )}`}</Typography>
  );
}
