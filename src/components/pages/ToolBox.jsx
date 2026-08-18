import { Calculator } from "../ToolBox/Calculator"
import { StopWatch } from "../ToolBox/StopWatch"
import { Counter } from "../ToolBox/Counter" 
import './ToolBox.css'
export function ToolBox(){
    return(
        <>
           <Calculator/>
           <StopWatch/>
           <Counter/>
        </>
    )
}