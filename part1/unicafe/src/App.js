import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Statistics = ({ statistics }) => {
  if (statistics.all === 0) 
    return <p>No feedback given</p>
  return (
    <div>
      <p>good {statistics.good}</p>
      <p>neutral {statistics.neutral}</p>
      <p>bad {statistics.bad}</p>
      <p>all {statistics.all}</p>
      <p>average {statistics.average}</p>
      <p>positive {statistics.positive}%</p>
    </div>
  )
}

const App = () => {
  const header = 'give feedback'
  const statisticHeader = 'statistics'
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
      <Header text={header} />
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Header text={statisticHeader} />
      <Statistics statistics={statistics} />      
    </div>
  )
}

export default App
