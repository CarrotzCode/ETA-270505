import { useState, useEffect} from "react";;
export function DigitalClock() {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const intervalid = setInterval(() => { setTime(new Date()) }, 1000)
        return () => {
            clearInterval(intervalid)
        }
    }, [])

    function FormatTime() {
        let h = time.getHours()
        const m = time.getMinutes()
        const s = time.getSeconds()
        return(`${padzero(h)}:${padzero(m)}`)
    }

    function padzero(i){
        return (i < 10 ? "0" : "") + i;
    }
    
    return (
        <>
            <div className="clockContainer">
                <div className="clock">
                    <span><FormatTime/></span>
                </div>
            </div>
        </>
    )
}