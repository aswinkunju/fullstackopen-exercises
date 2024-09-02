import { useEffect, useState } from 'react'
import countriesServices from './services/data'
import Filter from './components/Filter'
function App() {
  const [country, setCountry] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    const response= countriesServices.getAll()
    response.then(response =>setResult(response))
    // setResult(response);
    
    // response.then(response => setResult(response.data))
  }, [])

  const handleCountryChange = (event) => {
    const api_key = import.meta.env.VITE_REACT_APP_API_KEY
    console.log('key',api_key);
    
    setCountry(event.target.value)
  }
  return (
    <>
      <div>
        <form>
          Find Countries<input value={country} onChange={handleCountryChange}>
          </input>
        </form>
      </div>
      <Filter key={result.id} result={result} country={country}/>
    </>
  )
}

export default App
