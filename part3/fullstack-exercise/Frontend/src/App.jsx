import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import Personform from './components/Personform';

import personsServices from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [showError, setError] = useState('')
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    personsServices.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  const addName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm("Person already present in phonebook. Do you want to replace the number?")) {
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: person.number = newNumber }
        // console.log('Clicked yes');
        personsServices.updateNumber(changedPerson, person.id)
          .then(response => {
            setPersons(persons.map(person => person.id != response.id ? person : response))
          }).catch()
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
          setNewName('')
          setNewNumber('')
          setError(false)
        })
        .catch(error => {
          // console.log(error.response.data.message)
          setError(error.response.data.message)
        })

    }
  }
  const errorMessage = (message) => {
    if (showError)
      return message
  }

  const deleteContact = (id) => {
    personsServices.deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id != id))
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
      <Filter value={searchWord} onChange={filterChange} />
      <h1>Add a New</h1>
      <Personform
        onSubmit={addName}
        name={newName}
        nameChange={nameChange}
        number={newNumber}
        numberChange={numberChange}
        showError={showError}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} deletePerson={deleteContact} />

    </div>
  )
}

export default App

