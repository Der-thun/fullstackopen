import { useState } from 'react'

const Title = ({ text }) => <h2>{text}</h2>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>


const Statistics = ({ statistics }) => {
  if (statistics.all === 0) 
    return <p>No feedback given</p>
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={statistics.good}/>
        <StatisticLine text="neutral" value={statistics.neutral}/>
        <StatisticLine text="bad" value={statistics.bad}/>
        <StatisticLine text="all" value={statistics.all}/>
        <StatisticLine text="average" value={statistics.average}/>
        <StatisticLine text="positive" value={statistics.positive}/>
      </tbody>
    </table>
  )
}

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>


const App = () => {
  const header = 'give feedback'
  const statisticTitle = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = 100 * good / all
  const statistics = {
    good: good,
    bad: bad,
    neutral: neutral,
    all: all,
    average: average,
    positive: positive,
  }

  return (
    <div>
      <Title text={header} />
      <Button handler={handleGoodClick} text={"good"}/>
      <Button handler={handleNeutralClick} text={"neutral"}/>
      <Button handler={handleBadClick} text={"bad"}/>
      <Title text={statisticTitle} />
      <Statistics statistics={statistics} />      
    </div>
  )
}

export default App
