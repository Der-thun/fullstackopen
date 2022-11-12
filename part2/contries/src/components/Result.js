import Weather from "./Weather"
import { CountriePage, CountriesList } from "./CountriesRender"  

const Result = ({ data, finder, setForm }) => {
    const result = data.filter(elem => elem.name.common.toLowerCase().includes(finder))
  
    const handlerResult = (event) => {
      setForm(event.target.id)
    }
    if (finder) {
      if(result.length === 0) return <h3>Nothing to show</h3>
      if (result.length === 1) return (
        <div>
          <CountriePage result={result} />
          <Weather capital={result[0].capital}/>
        </div>)
      if (result.length <= 10) return <CountriesList result={result} handler={handlerResult}/>
      return <h3>Lots of results. Please specify your request</h3>
    }
}

export default Result
