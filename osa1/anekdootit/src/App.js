import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Anecdote = (props) => {
  return (
    <>
      <p>{props.anecdotes[props.selected]}</p>
    </>
  )
}

const Votes = (props) => {
  return (
    <>
      <p>{props.points} votes</p>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0) //State: index of the anecdote with most votes

  const selectAnecdote = () => {
    console.log('selected anecdote before', selected)
    const newSelected = Math.floor(Math.random() * anecdotes.length)
    console.log('selected anecdote now', newSelected)
    setSelected(newSelected)
  }

  const voteAnecdote = () => {
    console.log('points before', points)
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
    console.log('new points', newPoints)

    if (newPoints[selected] > points[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote selected={selected} anecdotes={anecdotes} />
      <Votes points={points[selected]} />
      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={selectAnecdote} text="New anecdote" />
      <Header text="Most popular anecdote" />
      <Anecdote selected={mostVotes} anecdotes={anecdotes} />
      <Votes points={points[mostVotes]} />
    </div>
  )
}

export default App
