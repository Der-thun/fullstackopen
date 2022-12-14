require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const People = require('./models/person')

app.use(express.json())
app.use(express.static('build'))

app.use(cors())

morgan.token('content', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [
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
  People.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/info', (request, response) => {
  People.find({}).then(notes => {
    const amount = notes
    const date = new Date()
    if (amount === 0) response.send(`<p>Phonebook hasn't info</p><p>${date}</p>`)
    else response.send(`<p>Phonebook has info for ${amount.length} people</p><p>${date}</p>`)
  })    
})

app.get('/api/persons/:id', (request, response) => {
  People.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  People.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => console.log(error))
})

const newId = () => {
    return Math.floor(Math.random() * 10000000)
}

app.post('/api/persons', (request, response) => {
    const person = request.body
    if(!person.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }
    if(!person.number) {
        return response.status(400).json({
            error: 'phonenubmer is missing'
        })
    }
    if (persons.filter(elem => elem.name === person.name.trim()).length !== 0) {
        return response.status(400).json({
            error: 'name should be unique'
        })
    }      
    const note = new People
    ({
      name: person.name,
      number: person.number,
    })
  
    note.save().then(savedNote => {
      response.json(savedNote)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
