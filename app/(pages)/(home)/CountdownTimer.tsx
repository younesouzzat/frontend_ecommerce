"use client";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const targetDateObj = new Date(targetDate);

    // Validate if the targetDate is a valid date
    if (isNaN(targetDateObj.getTime())) {
      console.error("Invalid target date:", targetDate);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const timeRemaining = targetDateObj - now;

      if (timeRemaining <= 0) {
        clearInterval(interval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      const remainingDays = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor(
        (timeRemaining / (1000 * 60 * 60)) % 24
      );
      const remainingMinutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
      const remainingSeconds = Math.floor((timeRemaining / 1000) % 60);

      setDays(remainingDays);
      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center justify-center space-y-1">
        <SlidingNumber value={days} padStart={true} />
        <span className="text-xs text-muted-foreground">Days</span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        <SlidingNumber value={hours} padStart={true} />
        <span className="text-xs text-muted-foreground">Hours</span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        <SlidingNumber value={minutes} padStart={true} />
        <span className="text-xs text-muted-foreground">Minutes</span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        <SlidingNumber value={seconds} padStart={true} />
        <span className="text-xs text-muted-foreground">Seconds</span>
      </div>
    </div>
  );
}
