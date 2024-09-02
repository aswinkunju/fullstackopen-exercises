import Results from "./Results"
import SingleCountry from "./SingleCountry"
const Filter = ({ country, result }) => {
    console.log(country);
    
    let matches = []
    if (country.length > 0) {
        matches = result.filter(result => result.name.common.toLowerCase().includes(country.toLowerCase()))
        // console.log('filter',matches);
    } else {
        matches = result
    }
    
    if (matches.length > 10) {
        return ('Too many matches, specify another filter')
    }
    else if (matches.length === 1) {
        return (matches.map(result => <SingleCountry key={result.name.common} result={result} />))
    } else {
        return (matches.map(result => <Results key={result.name.common} result={result} />))
    }
}

export default Filter;