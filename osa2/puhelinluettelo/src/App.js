import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <>
      <p>{name} {number}</p>
    </>
  )
}

const Persons = ({ personsList }) => {
  return (
    <>
      {personsList.map(person => <Person key={person.name} name={person.name} number={person.number}/> )}
    </>
  )
}

const Search = ({ filter, handleNameFiltering }) => {
  return (
    <>
      <form>
        <div> search: <input value={filter} onChange={handleNameFiltering}/></div>
      </form>
    </>
  )
}

const PersonForm = ({ handleSubmit, name, handleNameChange, number, handleNumberChange}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div> name: <input value={name} onChange={handleNameChange}/></div>
        <div> number: <input value={number} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Header = (props) => {
  return (
    <h2>{props.header}</h2>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = { name: newName, number: newNumber }
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter.length === 0 ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))

  return (
    <div>
      <Header header="Phonebook"/>
      <Search filter={filter} handleNameFiltering={(event) => setFilter(event.target.value)}/>
      <Header header="Add New Phone Number"/>
      <PersonForm handleSubmit={addPerson} name={newName} 
                  handleNameChange={(event) => setNewName(event.target.value)}
                  number={newNumber}
                  handleNumberChange={(event) => setNewNumber(event.target.value)} />
      <Header header="Phone Numbers"/>
      <Persons personsList={personsToShow}/>
    </div>
  )

}

export default App