export const Countdown = ({ seconds, timerStatus, reset, setTimerStatus }) => (
  <div className="bg-gradient-to-br from-pink-600 p-1 to-blue-400 rounded-full ">
    {timerStatus === "STARTED" ? (
      <button
        onClick={reset}
        className="bg-gray-900 hover:bg-gray-800 text-9xl focus:outline-none text-white rounded-full focus:border-0  h-72 w-72 font-bold "
      >
        {seconds}
      </button>
    ) : (
      <button
        disabled={timerStatus === "STARTED"}
        onClick={() => {
          setTimerStatus("STARTED");
        }}
        className="bg-gray-900 select-none hover:bg-gray-800 text-3xl focus:outline-none text-white rounded-full focus:border-0  h-72 w-72 font-bold "
      >
        Start Bloom
      </button>
    )}
  </div>
);
