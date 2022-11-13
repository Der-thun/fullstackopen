import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/Form'
import Notification from './components/Notification'
import numberSevice from './services/numbers'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState('info')

  useEffect(() => {
    numberSevice
      .getNumbers()
      .then(numbers => setPersons(numbers))
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const inPhonebook = []
    persons.forEach(person => inPhonebook.push(person.name))
    const addNewName = newName.trim()
    if(!inPhonebook.includes(addNewName)) {
      const nameObj = {
        name: addNewName,
        number: newPhoneNumber,
      }
      numberSevice
        .createNumbers(nameObj)
        .then(resp => {
          numberSevice.getNumbers()
            .then(numbers => setPersons(numbers))
          showMessage(nameObj.name, 'add')
          })
        .catch(err => {
          alert('Something wrong')
          numberSevice.getNumbers()
            .then(numbers => setPersons(numbers))
        })
      setNewName('')
      setNewPhoneNumber('')
    } else {
      if (window.confirm(`${addNewName} is already added to phonebook. Do you  want to change number?`)) {
        const id = inPhonebook.indexOf(addNewName)
        const idAmount = persons[id].id
        const newNumber = [...persons]
        newNumber[id].number = newPhoneNumber
        numberSevice
          .updateNumbers(idAmount, newNumber[id])
          .then(resp => {
            setPersons(persons.map(number => number.name === addNewName ? resp : number))
            showMessage(addNewName, 'change')
            
            setNewName('')
            setNewPhoneNumber('')
          })
          .catch(err => {
            showMessage(addNewName, 'error')
            numberSevice.getNumbers()
              .then(numbers => setPersons(numbers))
          })
      }
    }    
  }

  const showMessage = (name, type) => {
    switch (type) {
      case 'change': setTypeMessage('info'); setNewMessage(`${name} contact number was changed`); break
      case 'add': setTypeMessage('info'); setNewMessage(`Add ${name}`); break
      case 'del': setTypeMessage('info'); setNewMessage(`${name} number has been deleted from phonebook`); setTypeMessage('info'); break
      case 'error': setTypeMessage('error'); setNewMessage(`Information of ${name} has already been removed from server`); setTypeMessage('error'); break
      default:
    }
    
    setTimeout(() => {
      setNewMessage(null)
    }, 2000)  
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

  const handlerDel = (event) => {
    if (window.confirm(`Do you want to delete ${event.target.name} ?`))
    {  
      numberSevice
        .delNumbers(event.target.id)
          .then(resp => {
            numberSevice.getNumbers()
              .then(numbers => setPersons(numbers))
              showMessage(event.target.name, 'del')
          })
          .catch((err) => {
            showMessage(event.target.name, 'error')
            alert('The number has been deleted from server')
            numberSevice.getNumbers()
              .then(numbers => setPersons(numbers))
            })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} type={typeMessage} />
      <Filter value={newFilter} handler={handleFilter} />      
      <h2>Add a new</h2>
      <PersonForm handleSubmit={addName} nameValue={newName} handleName={handleNameAdd} 
          numberValue={newPhoneNumber} handleNumber={handlePhoneAdd} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} handlerDel={handlerDel} />
      
    </div>
  )
}

export default App
