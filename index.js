import {ApolloServer, gql} from 'apollo-server'

const persons = [
    {
        name: "Midu",
        phone: "034-1234567",
        street: "Calle Frontend",
        city: "Barcelona",
        id: '3d594650-3436-11e9--bc57-8bba54c431'
    },
    {
        name: "Yodu",
        phone: "044-133567",
        street: "Avenida fullstarck",
        city: "Madrid",
        id: '3d594651-3434-12f9--bc57-8bba54c431'
    },
    {
        name: "Windu",
        phone: "345-1234567",
        street: "Avenida Back",
        city: "Alicante",
        id: '5d594652-3436-11e9--bc57-8bba54c431'
    },
]

const typeDefinitions = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        Address: Address!
        city: String!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson (name: String!): Person
    }
` 
// ejecuacion del query en typeQuery
// en findperson el : person es para indicar que devuelve una person y el findperson es una metodo que recibe un nombre
// Se debe indicar de donde se sacan los datos al query anterior

const resolvers = {
    Query: {
        personCount: ()=> persons.length,
        allPersons: ()=> persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },
    Person: {
        address: (root) => {
            return  {
                street: root.street,
                city: root.city
            }
        }
    }
}

// Creacion del servidor
const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

// Crear servidor que devuelve una promesa
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
