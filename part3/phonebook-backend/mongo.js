const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://user_007:${password}@cluster0.0kgxh85.mongodb.net/People?retryWrites=true&w=majority`

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const People = mongoose.model('People', peopleSchema)

if (process.argv.length === 3) {
    mongoose
      .connect(url)
      .then((result) => {
        console.log('phonebook:')
        People.find({}).then(result => {
          result.forEach(note => console.log(`${note.name} ${note.number}`))
          mongoose.connection.close()
        })      
      })
      .catch((err) => console.log(err))
}
else if (process.argv.length === 5) {
    mongoose
      .connect(url)
      .then((result) => { 
        const note = new People({
            name: process.argv[3],
            number: process.argv[4],
        })
        return note.save()
      })
      .then(() => {
        console.log('note saved!')
        return mongoose.connection.close()
      })
      .catch((err) => console.log(err))
}
else {
    console.log('Please submit a request like this: node mongo.js <password> <name> <number>')
    process.exit(1)
}
