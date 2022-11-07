import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>



const App = () => {
  // save clicks of each button to its own state
  const header = 'give feedback'
  const statistics = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = 100 * good / all

  return (
    <div>
      <Header text={header} />
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Header text={statistics} />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  )
}

export default App
