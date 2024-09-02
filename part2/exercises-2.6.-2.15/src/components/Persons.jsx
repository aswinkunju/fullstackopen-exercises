// import personsServices from './services/notes'
const Persons = ({ filter,deletePerson }) => {

    if (filter.length === 0) {
        return <div>No Such contact</div>
    }
    else {
        return <div>
            {filter.map(person =>
                <div key={person.id}>
                    <p >{person.name} {person.number}</p> <button onClick={() => {
                        if (window.confirm("Do you really want to leave?")) {
                            // console.log("clicked");
                            deletePerson(person.id)

                        }
                    }}> delete {person.id}</button>
                </div>)
            }
        </div>
    }
}
export default Persons;