import { useState } from "react"
import SingleCountry from "./SingleCountry"

const Results = ({result}) => {
    const [show, setShow] = useState(false)

    const handleSHowClick = () => {
        setShow(!show)
    }
    return (
        <li>
            {result.name.common}<button onClick={handleSHowClick}>show  </button>
            {show && <SingleCountry key={result.name.common} result={result}/>}
        </li>
    )
}
export default Results