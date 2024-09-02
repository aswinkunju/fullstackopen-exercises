const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGODB_URL
mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => console.log('Connected to mongodb'))
    .catch(error => console.log('error connecting to MongoDB:', error.message))

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be atleast 3 chatacter long'],
        required: [true, 'Name is required']
    },
    number: {
        type: String,
        minLength:[8,'Number must have atleast 8 characters '],
        validate: {
            validator: function (v) {
                const val= /\d{2}-\d/.test(v) || /\d{3}-\d/.test(v)
                return val
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Number is required']
    }
})

peopleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('People', peopleSchema)

/* if (name && number) {
    const person = new People({
        name: name,
        number: number
    })
    // console.log(person);
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log("Phonebook:")
    People.
        find({}).
        then(result => {
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })

} */


