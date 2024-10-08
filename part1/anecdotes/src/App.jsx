import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInt
  }
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const [voted, setVoted] = useState(0)
  const handleClick = () => {

    setSelected(getRandomInt(0, anecdotes.length - 1))
  }
  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    let max = copy.indexOf(Math.max(...copy));
    setVote(copy)
    setVoted(max)
  }
  return (
    <div>
      <h1>Anecdote Of the day</h1>
      {anecdotes[selected]}
      <button onClick={handleClick}>next anecdote</button>
      <button onClick={handleVote}>Vote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[voted]}
    </div>
  )
}

export default App