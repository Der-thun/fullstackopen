import { useState } from 'react'

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>

const Title = ({ text }) => <h2>{text}</h2>

const HasVotes = ({ votes }) => <p>has {votes} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const dayTitile = "Anecdote of the day"
  const mostTitle = "Anecdote with most votes"
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextHandler = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const voteHandler = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Title text={dayTitile} />
      <p>{anecdotes[selected]}</p>
      <HasVotes votes={votes[selected]}/>
      <Button handler={voteHandler} text={"vote"} />
      <Button handler={nextHandler} text={"next anecdote"} />
      <Title text={mostTitle} />
      <p>{anecdotes[votes.indexOf(Math.max.apply(null, votes))]}</p>
      <HasVotes votes={votes[votes.indexOf(Math.max.apply(null, votes))]}/>
    </div>
  )
}

export default App
