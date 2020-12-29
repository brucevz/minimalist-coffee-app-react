import * as Fathom from "fathom-client";
import React, { useEffect, useState } from "react";
import { Countdown } from "./Countdown";
import { PourList } from "./PourList";

function App() {
  const DEFAULT_TIMER = 45;
  const [seconds, setSeconds] = useState(DEFAULT_TIMER);
  const [timerStatus, setTimerStatus] = useState("PENDING");

  const [coffeeAmount, setCoffeeAmount] = useState(20);
  const [ratioAmount, setRatioAmount] = useState(14);

  function reset() {
    setTimerStatus("PENDING");
    setSeconds(DEFAULT_TIMER);
    setRatioAmount(14);
  }

  useEffect(() => {
    Fathom.load("JBXNSZDW");
    console.log("fathom loaded");
  }, []);

  useEffect(() => {
    if (timerStatus === "STARTED") {
      const id = window.setInterval(() => {
        // check the "next" value of seconds to see if its going to be 0 or negative
        const nextSeconds = seconds - 1;
        if (nextSeconds <= 0) setTimerStatus("DONE");
        else setSeconds(nextSeconds);
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, [timerStatus, seconds]); // we add `seconds` to this array to ensure that the useEffect is updated when the value of seconds changes. Otherwise we get a stale value when we reference it inside the block!

  return (
    <div className="bg-gray-900 absolute inset-0 flex justify-center items-center flex-col">
      <button
        className="absolute bottom-7 px-5 focus:outline-none bg-opacity-50 text-pink-600 p-2 bg-gray-800 "
        onClick={reset}
      >
        Reset
      </button>
      <div
        className="text-white text-center hover:text-pink-500 cursor-pointer select-none	 absolute top-5 left-5"
        onClick={() => {
          setCoffeeAmount(coffeeAmount + 5);
        }}
      >
        <div className="font-bold text-4xl">{coffeeAmount}g</div>
        <div className="text-opacity-40 font-light">COFFEE</div>
      </div>

      <div
        className="text-white  text-center hover:text-blue-400 cursor-pointer select-none absolute top-5 right-5"
        onClick={() => {
          setRatioAmount(ratioAmount + 1);
        }}
      >
        <div className="font-bold text-4xl">1:{ratioAmount}</div>
        <div className="text-opacity-40 font-light">RATIO</div>
      </div>

      <div className="text-white text-center absolute bottom-5 left-5">
        <div className="font-bold text-4xl">{coffeeAmount * ratioAmount}g</div>
        <div className="text-opacity-40 font-light">WATER</div>
      </div>

      <div className="text-white  text-center absolute bottom-5 right-5">
        <div className="font-bold text-4xl">{(coffeeAmount * ratioAmount)/ 5}g</div>
        <div className="text-opacity-40 font-light">PER POUR</div>
      </div>
      {timerStatus === "DONE" ? (
        <PourList coffeeAmount={coffeeAmount} ratioAmount={ratioAmount} />
      ) : (
        <Countdown
          reset={reset}
          timerStatus={timerStatus}
          setTimerStatus={setTimerStatus}
          pour1Amount={coffeeAmount}
          seconds={seconds}
        />
      )}
    </div>
  );
}

export default App;
