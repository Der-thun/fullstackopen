import { useState, useEffect } from 'react'
import axios from 'axios'
import Result from './components/Result'
import FinderForm from './components/FinderForm'

const App = () => {
  const [newFinderForm, setNewFinderForm] = useState('')
  const [dataCountries, setDataCountries] = useState([])

  useEffect(() => {
    axios
    .get(`https://restcountries.com/v3.1/all`)
    .then(responce => {
      setDataCountries(responce.data)
    })
  }, [])  

  const handlerFinderForm = (event) => {
    setNewFinderForm(event.target.value)
  }

  return (
    <div>
      <FinderForm value={newFinderForm} handler={handlerFinderForm} />
      <Result data={dataCountries} finder={newFinderForm.toLocaleLowerCase()} 
              setForm={setNewFinderForm} />
    </div>
  )
}

export default App;
