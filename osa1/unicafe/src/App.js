import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
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

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const giveGoodFeedback = () => {
    console.log('good feedback, value before', good)

    const newTotal = total + 1
    setTotal(newTotal)
    console.log('total, value now', newTotal)

    const newGood = good + 1
    setGood(newGood)
    console.log('good, value now', newGood)

    const newAverage = (newGood * 1 + neutral * 0 + bad * (-1))/newTotal
    setAverage(newAverage)
    console.log('new average, value now', newAverage)

    const newPositive = (newGood/newTotal) * 100
    setPositive(newPositive)
    console.log('new positive, value now', newPositive)
  }

  const giveNeutralFeedback = () => {
    console.log('neutral feedback, value before', neutral)

    const newTotal = total + 1
    setTotal(newTotal)

    const newNeutral = neutral + 1
    setNeutral(newNeutral)

    const newAverage = (good * 1 + newNeutral * 0 + bad * (-1))/newTotal
    setAverage(newAverage)

    const newPositive = (good/newTotal) * 100
    setPositive(newPositive)
    console.log('new positive, value now', newPositive)
  }

  const giveBadFeedback = () => {
    console.log('bad feedback, value before', bad)

    const newTotal = total + 1
    setTotal(newTotal)

    const newBad = bad + 1
    setBad(newBad)

    const newAverage = (good * 1 + neutral * 0 + newBad * (-1))/newTotal
    setAverage(newAverage)

    const newPositive = (good/newTotal) * 100
    setPositive(newPositive)
  }

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <Header name="Give us feedback" />
        <Button handleClick={giveGoodFeedback} text="good" />
        <Button handleClick={giveNeutralFeedback} text="neutral" />
        <Button handleClick={giveBadFeedback} text="bad" />
        <Header name="Statistics" />
        <p>No feedback given</p>
      </div>
    )

  }

  return (
    <div>
      <Header name="Give us feedback" />
      <Button handleClick={giveGoodFeedback} text="good" />
      <Button handleClick={giveNeutralFeedback} text="neutral" />
      <Button handleClick={giveBadFeedback} text="bad" />
      <Header name="Statistics" />
      <table>
        <tbody>
          <StatisticLine text="Good:" value={good} />
          <StatisticLine text="Neutral:" value={neutral} />
          <StatisticLine text="Bad:" value={bad} />
          <StatisticLine text="Total:" value={total} />
          <StatisticLine text="Average:" value={average} />
          <StatisticLine text="Positive:" value={positive + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

export default App