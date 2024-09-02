const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()



const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

const People = require('./models/mongo')

morgan.token('body', (request) => { console.log(request.body); return JSON.stringify(request.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})
const date = Date()

// const documentCount = await People.countDocuments({});

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name == 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name == 'ValidationError') {
        return response.status(400).send({ error: 'malformatted info' })
    }
    next(error)
}

app.get('/info', (request, response, next) => {
    People.estimatedDocumentCount()
        .then(docCount => {
            console.log(docCount, typeof (docCount))
            //and do one super neat trick
            response.send(`<p>phonebook has info of ${docCount} people</p><br/><p> ${date.toString()}</p>`)
        })
        .catch(error => next(error))
})
app.get('/api/persons', (request, response, next) => {
    // console.log("First get fetch");
    return People.find({})
        .then(people => {
            response.json(people)
        })
        .catch(error => next(error))
})
app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    People.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    People.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

/* const generateId = () => {
    return Math.floor(Math.random() * 10000);
}  */
app.use(express.json())
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    // if (!body.name || !body.number) {
    //     console.log("post method")
    //     return response.status(400).json({
    //         error: 'content missing'
    //     })
    // }
    // if(persons.some(person=> person.name === request.body.name)){
    //     console.log("post method");
    //     return response.status(400).json({ 
    //         error: 'name must be unique' 
    //     })
    // }
    const person = new People({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => {
            console.log(error, 'error in response')
            return response.status(400).send(error)
        })

})
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }
    People.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedNote => {
            // console.log(updatedNote);
            return response.json(updatedNote)
        })
        .catch(error => next(error))
    // console.log(person);
})
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})