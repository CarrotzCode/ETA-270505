import { useEffect, useState } from "react";
import "./Calculator.css";

export function Calculator() {

    const [display, setDisplay] = useState("");
    const [advanced, setAdvanced] = useState(false);

    let currentInput = "";
    let previousInput = "";
    let currentOperation = "";


    function updateDisplay() {
        setDisplay(
            `${previousInput} ${currentOperation} ${currentInput}`.trim()
        );
    }


    function appendNumber(n) {
        currentInput += n;
        updateDisplay();
    }


    function appendOperation(op) {
        if (!currentInput) return;

        if (previousInput) calculate();

        currentOperation = op;
        previousInput = currentInput;
        currentInput = "";

        updateDisplay();
    }


    function calculate() {
        if (!previousInput || !currentInput || !currentOperation) return;

        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);

        let result = 0;

        switch (currentOperation) {

            case "+":
                result = a + b;
                break;

            case "-":
                result = a - b;
                break;

            case "*":
                result = a * b;
                break;

            case "/":
                if (b === 0) {
                    clearAll();
                    setDisplay("Error");
                    return;
                }

                result = a / b;
                break;

            default:
                return;
        }

        currentInput = String(result);
        previousInput = "";
        currentOperation = "";

        updateDisplay();
    }


    function clearAll() {
        currentInput = "";
        previousInput = "";
        currentOperation = "";

        updateDisplay();
    }


    function backspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }


    function handleInput(k) {

        if (!isNaN(k) || k === ".") {
            appendNumber(k);
            return;
        }

        if (k === "+") return appendOperation("+");
        if (k === "-") return appendOperation("-");
        if (k === "*") return appendOperation("*");
        if (k === "/") return appendOperation("/");
        if (k === "%") return appendOperation("%");

        if (k === "C") return clearAll();
        if (k === "⌫") return backspace();

        if (k === "=") return calculate();
    }


    useEffect(() => {

        function handleKeyDown(e) {

            if (advanced) return;

            const k = e.key;

            if (/[0-9]/.test(k))
                return appendNumber(k);

            if (["+", "-", "*", "/", "%"].includes(k))
                return appendOperation(k);

            if (k === "Enter")
                return calculate();

            if (k === "Backspace")
                return backspace();

            if (k === "Escape")
                return clearAll();

            if (k === ".")
                return appendNumber(".");
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [advanced]);


    if (advanced) {
        return (
            <div className="calculator">
                <iframe
                    src="https://www.desmos.com/scientific"
                    frameBorder="0"
                    className="Advancedoptions"
                />

            </div>
        );
    }


    return (
        <div className="calculator">




            <div className="display">

                <input
                    id="calcDisplay"
                    value={display}
                    readOnly
                />

            </div>


            <div className="buttons">

                <button onClick={() => handleInput("C")}>
                    C
                </button>

                <button onClick={() => handleInput("%")}>
                    %
                </button>

                <button onClick={() => handleInput("/")}>
                    /
                </button>

                <button onClick={() => handleInput("*")}>
                    *
                </button>


                <button onClick={() => handleInput("7")}>
                    7
                </button>

                <button onClick={() => handleInput("8")}>
                    8
                </button>

                <button onClick={() => handleInput("9")}>
                    9
                </button>

                <button onClick={() => handleInput("-")}>
                    -
                </button>


                <button onClick={() => handleInput("4")}>
                    4
                </button>

                <button onClick={() => handleInput("5")}>
                    5
                </button>

                <button onClick={() => handleInput("6")}>
                    6
                </button>

                <button onClick={() => handleInput("+")}>
                    +
                </button>


                <button onClick={() => handleInput("1")}>
                    1
                </button>

                <button onClick={() => handleInput("2")}>
                    2
                </button>

                <button onClick={() => handleInput("3")}>
                    3
                </button>

                <button onClick={() => handleInput("=")}>
                    =
                </button>


                <button onClick={() => handleInput("0")}>
                    0
                </button>

                <button onClick={() => handleInput(".")}>
                    .
                </button>

                <button onClick={() => handleInput("⌫")}>
                    ⌫
                </button>

                <button onClick={() => setAdvanced(true)}>
                    Adv
                </button>

            </div>

        </div>
    );
}