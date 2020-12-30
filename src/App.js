import * as Fathom from "fathom-client";
import React, { useEffect, useState } from "react";
import { Countdown } from "./Countdown";
import { PourList } from "./PourList";


function App() {
  const DEFAULT_TIMER = 45;
  const [seconds, setSeconds] = useState(DEFAULT_TIMER);
  const [timerStatus, setTimerStatus] = useState("PENDING");

  const [coffeeAmount, setCoffeeAmount] = useState(15);
  const [ratioAmount, setRatioAmount] = useState(14);

  function reset() {
    setTimerStatus("PENDING");
    setSeconds(DEFAULT_TIMER);
    setRatioAmount(14);
    setCoffeeAmount(15);

  }

  function stopBloom() {
      setTimerStatus("PENDING");
      setSeconds(DEFAULT_TIMER);
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
        className="absolute bottom-7 px-5 focus:outline-none bg-opacity-50 text-pink-600 p-2  "
        onClick={reset}
      >
        Reset
      </button>
      <div
        className="text-white text-center  cursor-pointer select-none	 absolute top-5 left-5"
      >
        <div className="font-bold text-4xl">{coffeeAmount}g</div>
        <div className="opacity-50 font-light">-  COFFEE  +</div>
          <div  style={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '70px',
              left: '-50%',
          }} onClick={() => {
              setCoffeeAmount(coffeeAmount - 1);
          }}></div>
          <div   style={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '70px',
              left: '50%',
          }}
                 onClick={() => {
                     setCoffeeAmount(coffeeAmount + 5);
                 }}></div>

      </div>

      <div
        className="text-white m-w-10 text-center  cursor-pointer select-none absolute top-5 right-5"

      >
        <div className="font-bold text-4xl">1:{ratioAmount}</div>
        <div className="opacity-50 font-light">-  RATIO  +</div>
          <div  style={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '70px',
              left: '-50%',
          }} onClick={() => {
              setRatioAmount(ratioAmount - 1);
          }}></div>
          <div   style={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '70px',
              left: '50%',
          }}
               onClick={() => {
              setRatioAmount(ratioAmount + 1);
          }}></div>


      </div>

      <div className="text-white text-center absolute bottom-5 left-5">
        <div className="font-bold text-4xl">{coffeeAmount * ratioAmount}g</div>
        <div className="text-opacity-50 opacity-50 font-light">TOTAL WATER</div>
      </div>

      <div className="text-white  text-center absolute bottom-5 right-5">
        <div className="font-bold text-4xl">{(coffeeAmount * ratioAmount)/ 5}g</div>
        <div className="text-opacity-40 opacity-50 font-light">PER POUR</div>
      </div>
      {timerStatus === "DONE" ? (
        <PourList coffeeAmount={coffeeAmount} ratioAmount={ratioAmount} />
      ) : (
        <Countdown
          reset={reset}
          stopBloom={stopBloom}
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
