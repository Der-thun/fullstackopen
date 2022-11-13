const Persons = ({ persons, filter, handlerDel }) => {
    return (
      <div>
        {persons.map(person => {
          if (person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) 
            return <p key={person.id}>
                    {person.name} {person.number} 
                    <button id={person.id} name={person.name} onClick={handlerDel}>delete</button>
                  </p>
          return ''
          })
          }
      </div>
    )
}

export default Persons
