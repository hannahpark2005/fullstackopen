import { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <p>No feedback given</p>
    )
  } 
  return (
    <div>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={props.good + props.neutral + props.bad} />
      <StatisticsLine text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
      <StatisticsLine text="positive" value={props.good / (props.good + props.neutral + props.bad) * 100 + " %"} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      
     <h1>statistics</h1>
    
      <Statistics good={good} neutral={neutral} bad={bad} />
    
    </div>
  )
}

export default App