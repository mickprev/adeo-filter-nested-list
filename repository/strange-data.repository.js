const {data} = require('../data/data.js');

class StrangeDataRepository {
    #data = []

    constructor() {
        this.#data = data;
    }

    findByAnimals(pattern) {
        const regex = new RegExp(pattern, 'i');

        return this.#data.reduce((countriesAcc, country) => {
            const filteredPeople = country.people?.reduce((peopleAcc, person) => {
                const filteredAnimals = person.animals?.filter(animal => regex.test(animal.name));

                if (filteredAnimals?.length > 0) {
                    peopleAcc.push({...person, animals: filteredAnimals});
                }

                return peopleAcc;
            }, [])

            if (filteredPeople?.length > 0) {
                countriesAcc.push({...country, people: filteredPeople})
            }

            return countriesAcc;
        }, [])
    }

    findAll() {
        return this.#data
    }
}

module.exports = new StrangeDataRepository();
