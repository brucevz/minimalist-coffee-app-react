export const Countdown = ({ seconds, timerStatus, reset, setTimerStatus, pour1Amount }) => (
  <div className="bg-gradient-to-br from-pink-600 p-1 to-blue-400 rounded-full ">
    {timerStatus === "STARTED" ? (
            <div>

      <button
        onClick={reset}
        className="bg-gray-900 hover:bg-gray-800 text-9xl focus:outline-none text-white rounded-full focus:border-0  h-72 w-72 font-bold "
      >
        <span className=' absolute block pb-5 text-base   relative top-5 text-center text-white'>Pour {pour1Amount * 2}g Water... </span>
        {seconds}
      </button>
            </div>
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
