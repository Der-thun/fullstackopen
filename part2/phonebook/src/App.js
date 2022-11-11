import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(responce => {
        setPersons(responce.data)
      })
  }, [])

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
      <Filter value={newFilter} handler={handleFilter} />      
      <h2>Add a new</h2>
      <PersonForm handleSubmit={addName} nameValue={newName} handleName={handleNameAdd} 
          numberValue={newPhoneNumber} handleNumber={handlePhoneAdd} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
