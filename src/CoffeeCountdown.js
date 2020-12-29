const BloomCountdown = (remainingTime) => {
    if (remainingTime === 0) {
        return <div className="timer">Begin Pour</div>;
    }
    return (
        <CountdownCircleTimer
            isPlaying
            duration={5}
            size={250}
            // initialRemainingTime={10}
            renderAriaTime
            strokeWidth={4}
            onComplete={() => {
                return [false, 1500] // repeat animation in 1.5 seconds
            }}
            colors={[
                ['#db2777', 0.33],
                ['#114e94', 0.33],
                ['#60a5fa', 0.33],

            ]}
        >
            {({remainingTime}) => remainingTime}
        </CountdownCircleTimer>
    )
}