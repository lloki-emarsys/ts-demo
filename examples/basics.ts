type Person = { firstName: string, lastName: string }

const map = new Map<number, Person>()

map.set(1, { firstName: 'Kylie', lastName: 'Minogue' })
map.set(2, { firstName: 'Nancy', lastName: 'Sinatra' })

////

interface NameFormatter {
    formatName(person: Person): string
}

class EnglishFormatter implements NameFormatter {
    formatName(person: Person): string {
        return `${person.firstName} ${person.lastName}`
    }
}

class HungarianFormatter implements NameFormatter {
    formatName(person: Person): string {
        return `${person.lastName} ${person.firstName}`
    }
}

////

const formatter = new EnglishFormatter()

map.forEach(person => {
    console.log(`${formatter.formatName(person)}`)
})

////

type FormatterFunction = (person: Person) => string

const onlyFirstName: FormatterFunction = person => person.firstName

////

const firstName = onlyFirstName({ firstName: 'Madonna', lastName: 'Ciccione' })

console.log(firstName)

