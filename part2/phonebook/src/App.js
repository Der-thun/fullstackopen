import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    let inPhonebook = []
    persons.forEach(person => inPhonebook.push(person.name))
    const addNewName = newName.trim()
    if(inPhonebook.includes(addNewName) === false) {
      const nameObj = {
        name: addNewName,
        number: newPhoneNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(nameObj))
      setNewName('')
      setNewPhoneNumber('')
    } else {
      alert(`${addNewName} is already added to phonebook`)
    }    
  }

  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneAdd = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={newFilter} onChange={handleFilter}/>
      </div>
      
      <h2>add a new</h2>
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
        {persons.map(person => {
          if (person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase())) 
            return <p key={person.id}>{person.name} {person.number}</p>
          return ''
          })
          }
      </div>
    </div>
  )
}

export default App
