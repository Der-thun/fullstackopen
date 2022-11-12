export const CountriesList = ({ result, handler }) => {
  return (
    <div>
      {result.map(elem => <p key={elem.name.common}>{elem.name.common}
      <button id={elem.name.common} onClick={handler}>show</button>
      </p>)}
    </div>
  )
}
  
export const CountriePage = ({ result }) => {
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