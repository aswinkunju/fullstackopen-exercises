import AllWeather from "./Weather";

const SingleCountry =({result})=>{
  const keys = Object.keys(result.languages)
    return(
        <div>
          <div>
              <h1>{result.name.common}</h1>
              <p>{result.capital[0]}</p>
              <p>{result.area}</p>
              <h3>languages:</h3>
              <ul>
                  {keys.map(keys => <li key={keys}>{result.languages[keys]}</li>)}
              </ul>
              <img src={result.flags.png} alt='flag' height='200' width='250' /> 
              <AllWeather capital={result.capital[0]}/>
          </div>
        </div>
      )
}

export default SingleCountry;