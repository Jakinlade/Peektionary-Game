import React from "react";

function CountdownTimer() {
    // State to keep track of the timer value
    const [timer, setTimer] = React.useState(100);

    // useRef is used to hold a mutable value that persists across renders without causing a re-render
    const id = React.useRef(null);

    // Function to clear the interval
    const clear = () => {
        window.clearInterval(id.current);
    };

    // useEffect to set up the interval for the countdown timer
    React.useEffect(() => {
        // Set up an interval that decreases the timer by 1 every second
        id.current = window.setInterval(() => {
            setTimer((time) => time - 1);
        }, 1000);

        // Clean up function to clear the interval when the component unmounts
        return () => clear();
    }, []); // Empty dependency array means this effect runs once on mount

    // useEffect to handle when the timer reaches 0
    React.useEffect(() => {
        if (timer === 0) {
            // Clear the interval when the timer reaches 0
            clear();
        }
    }, [timer]); // This effect runs every time the timer value changes

    // Render the timer in the UI
    return (
        <div className="App">
            <div>Time left : {timer} </div>
        </div>
    );
}

export default CountdownTimer;

