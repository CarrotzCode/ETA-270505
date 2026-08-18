import { useState } from "react"
import './Counter.css'
export function Counter() {
    const  [count,setCount] = useState(0)

    function Add(){
        setCount(count + 1);
    };
    function Reset(){
        setCount(0);
    }

    return (
        <div className="container counter">
            <button className="button" onClick={Add}>Counter</button>
            <p className="button">{count}</p>
            <button className="button" onClick={Reset}>Reset</button>
        </div>
    )
}