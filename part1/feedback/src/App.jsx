import { useState } from 'react'
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticLine = ({ text, stat, symbol }) => (
  <tbody>
    <tr>
      <td>{text}</td><td>{stat} {symbol}</td>
    </tr>
  </tbody>
)
// const StatisticLine = ({ text, stat,symbol }) => (
//   <p>{text} {stat} {symbol}</p>
// )
const Statistics = ({ good, bad, neutral, total }) => {
  if (good != 0 || bad != 0 || neutral != 0) {
    return (
      <table>
        <StatisticLine text='good' stat={good} />
        <StatisticLine text='neutral' stat={neutral} />
        <StatisticLine text='bad' stat={bad} />
        <StatisticLine text='all' stat={total} />
        <StatisticLine text='average' stat={((good * 1) + (bad * -1) + (neutral * 0)) / total} />
        <StatisticLine text='Positive' stat={good * 100 / total} symbol='%' />
      </table>
    )
  }
  else {
    console.log(good, bad, neutral)
    return (
      <div>No Feedback Given</div>
    )
  }
}
function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={good + bad + neutral} />

    </div>
  )
}

export default App
