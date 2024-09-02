import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import Personform from './components/Personform';
import Notification from './components/Notifications';

import personsServices from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchWord, setSearchWord] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsServices.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm("Do you really want to leave?")) {
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: person.number = newNumber }
        personsServices.updateNumber(changedPerson, person.id)
          .then(response => {
            setPersons(persons.map(person => person.id != response.id ? person : response))
          })
      }
    }
    else {
      const noteObject = {
        name: newName,
        number: newNumber
      }
      personsServices.create(noteObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(
            `'${returnedPerson.name}' Added `
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        }
        )

    }
  }
  const deletePerson = (id) => {
    const response = personsServices.deletePerson(id)
    response.then(() => setPersons(persons.filter(person => person.id !== id)))
      .catch(() => {
        const person = persons.find(person => person.id == id)
        setErrorMessage(
          `'${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const nameChange = (event) => {
    setNewName(event.target.value)
  }
  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const filterChange = (event) => {
    setSearchWord(event.target.value)
    if (event.target.value.length !== 0 && event.target.value.trim().length !== 0) {
      setShowAll(!showAll)
    }
  }
  const filter = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchWord.trim().toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={searchWord} onChange={filterChange} />
      <h1>Add a New</h1>
      <Personform onSubmit={addName} name={newName} nameChange={nameChange} number={newNumber} numberChange={numberChange} />
      <h2>Numbers</h2>
      <Persons filter={filter} deletePerson={deletePerson} />

    </div>
  )
}

export default App

