import { useState, useEffect } from 'react'
import axios from 'axios'

const FinderForm = ({ value, handler }) => {
  return (
    <div>
      find countries <input value={value} onChange={handler}/>
    </div>
  )
}

const CountriesList = ({ result, handler }) => {
  return (
    <div>
      {result.map(elem => <p key={elem.name.common}>{elem.name.common}
      <button id={elem.name.common} onClick={handler}>show</button>
      </p>)}
    </div>
  )
}

const CountriePage = ({ result }) => {
  return (
    <div>
      <h1>{result[0].name.common}</h1>
      <p>Capital: {result[0].capital}</p>
      <p>Area: {result[0].area}</p>
      <p><b>Languages:</b></p>
      <ul><b>
       {Object.values(result[0].languages).map(elem => <li key={elem}>{elem}</li>)}
      </b></ul>
      <img src={result[0].flags.png} alt={result[0].name.common}/>
    </div>
  )
}

const Result = ({ data, finder, setForm }) => {
  const result = data.filter(elem => {
    if (elem.name.common.toLowerCase().includes(finder))
      return elem
  })

  const handlerResult = (event) => {
    setForm(event.target.id)
  }
  if (finder) {
    if (result.length === 1) return <CountriePage result={result} />
    if (result.length <= 10) return <CountriesList result={result} handler={handlerResult}/>
  }
}

const App = () => {
  const [newFinderForm, setNewFinderForm] = useState('')
  const [data, setData] = useState([])
  useEffect(() => {
    axios
    .get(`https://restcountries.com/v3.1/all`)
    .then(responce => {
      setData(responce.data)
    })
  }, [])

  const handlerFinderForm = (event) => {
    setNewFinderForm(event.target.value)
  }

  return (
    <div>
      <FinderForm value={newFinderForm} handler={handlerFinderForm} />
      <Result data={data} finder={newFinderForm.toLocaleLowerCase()} setForm={setNewFinderForm} />
    </div>
  )
}

export default App;
