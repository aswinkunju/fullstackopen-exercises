import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'


const getAll = async () => {
  const response = await axios.get(`${baseUrl}all`)
  // .then(response => {return response.data})
  return (response.data);

}
const getWeather = async (capital) => {
  const api_key = import.meta.env.VITE_REACT_APP_API_KEY
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
  console.log('data', response.data)
  return (response.data)

}

export default {
  getAll: getAll,
  getWeather: getWeather
}