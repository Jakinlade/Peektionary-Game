import React from "react";

function CountdownTimer() {
    const [timer, setTimer] = React.useState(10);
    const id = React.useRef(null);
    const clear = () => {
        window.clearInterval(id.current);
    };
    React.useEffect(() => {
        id.current = window.setInterval(() => {
        setTimer((time) => time - 1);
        }, 1000);
        return () => clear();
    }, []);

    React.useEffect(() => {
        if (timer === 0) {
        clear();
        }
    }, [timer]);

    return (
        <div className="App">
        <div>Time left : {timer} </div>
        </div>
    );
}

export default CountdownTimer;
