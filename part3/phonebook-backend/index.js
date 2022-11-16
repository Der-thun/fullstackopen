const express = require('express')
const app = express()

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const amount = persons.length
    const date = new Date()
    if (amount === 0) response.send(`<p>Phonebook hasn't info</p><p>${date}</p>`)
    else response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

const PORT = 3001
app.listen(PORT)
