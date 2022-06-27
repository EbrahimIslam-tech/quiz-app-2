import { useEffect, useState } from "react";

export default function Timer({ setTimeOut, timevalue, questionNumber }) {
  const [timer, setTimer] = useState(300);
  // console.log(timer);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimeOut]);

  useEffect(() => {
    // console.log(timevalue, "timevalue");
    setTimer(timevalue * 60);
  }, []);

  function secondsToHms(timer) {
    timer = Number(timer);
    var h = Math.floor(timer / 3600);
    var m = Math.floor((timer % 3600) / 60);
    var s = Math.floor((timer % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " m " : " m ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
    return hDisplay + mDisplay + sDisplay;
  }
  return secondsToHms(timer);

  /*   return( ;) */
}
