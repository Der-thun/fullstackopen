import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    let inPhonebook = []
    persons.forEach(person => inPhonebook.push(person.name))
    const addNewName = newName.trim()
    if(inPhonebook.includes(addNewName) === false) {
      const nameObj = {
        name: addNewName,
        phone: newPhoneNumber,
      }
      setPersons(persons.concat(nameObj))
      setNewName('')
      setPhoneNumber('')
    } else {
      alert(`${addNewName} is already added to phonebook`)
    }    
  }

  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneAdd = (event) => {
    setPhoneNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameAdd}/>
        </div>
        <div>
          number: <input value={newPhoneNumber} onChange={handlePhoneAdd}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
      </div>
    </div>
  )
}

export default App
