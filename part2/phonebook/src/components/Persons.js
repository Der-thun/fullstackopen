const Persons = ({ persons, filter }) => {
    return (
      <div>
        {persons.map(person => {
          if (person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) 
            return <p key={person.id}>{person.name} {person.number}</p>
          return ''
          })
          }
      </div>
    )
}

export default Persons
