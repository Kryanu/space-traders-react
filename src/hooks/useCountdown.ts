import { useEffect, useState } from 'react';

// Remaining milliseconds until the ISO timestamp, ticking once per second.
export function useCountdown(target?: string) {
  const expiry = target ? new Date(target).getTime() : 0;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!expiry) return;
    setNow(Date.now());
    const id = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= expiry) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [expiry]);

  return Math.max(0, expiry - now);
}

export function formatCountdown(ms: number) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes}:${String(totalSeconds % 60).padStart(2, '0')}`;
}
