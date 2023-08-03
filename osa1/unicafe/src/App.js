import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log(good, neutral, bad)

  const giveGoodFeedback = () => {
    console.log('good feedback, value before', good)
    setGood(good + 1)
  }

  const giveNeutralFeedback = () => {
    console.log('neutral feedback, value before', neutral)
    setNeutral(neutral + 1)
  }

  const giveBadFeedback = () => {
    console.log('bad feedback, value before', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header name="Give us feedback" />
      <Button handleClick={giveGoodFeedback} text="good" />
      <Button handleClick={giveNeutralFeedback} text="neutral" />
      <Button handleClick={giveBadFeedback} text="bad" />
      <Header name="Statistics" />
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Display = ({good, neutral, bad}) => {
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

export default App