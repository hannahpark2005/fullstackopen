import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notifications from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showAll, setShowAll] = useState(true);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // const hook = () => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setPersons(response.data)
  //     })
  // }

  useEffect(() => {
    personsService
    .getAll()
    .then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  if (!persons) {
    return null
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const personsNames = persons.map(person => person.name)
    if (personsNames.includes(personObject.name)) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === personObject.name)
        const changedPerson = { ...person, number: personObject.number }

        personsService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          })
          .catch(() => {
            setErrorMessage(
              `Information of '${changedPerson.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })

        setSuccessMessage(
          `Updated ${personObject.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } else {
        alert(`${personObject.name} is already added to phonebook`)
      }
    } else {
      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
        })
      setSuccessMessage(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setShowAll(false)
    setFilterName(event.target.value)
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    console.log(personToDelete)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
        .deletePersons(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          alert(
            `the note '${personToDelete.content}' was already deleted from server`
          )
        })
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={errorMessage} type='error'/>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <Notifications message={successMessage} type='success'/>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        personsToShow={personsToShow}
        handleDelete={handleDelete}
      />

    </div>
  )
}

export default App