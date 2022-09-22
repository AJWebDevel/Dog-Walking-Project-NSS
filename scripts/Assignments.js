import { getPets, getWalkers, getCities } from "./database.js"
import { filterWalkerCitiesByWalker } from "./Walkers.js"

// Get copy of arrays in database
const pets = getPets()
const walkers = getWalkers()
const cityList = getCities()



// Function to find the walker assigned to a pet
const findWalker = (pet, walkers) => {
    let petWalker = null

    for (const walker of walkers) {
        if (walker.id === pet.walkerId) {
            petWalker = walker
        }
    }

    return petWalker
}


// function to display current assignments (whom is walking whom, in what city)
export const Assignments = () => {
    //declare variable string to start the list
    let assignmentHTML = `<ul>`
    //iterate through pets(array of pets) to select a pet 
    for (const currentPet of pets) {
        //findWalker returns the pet walker obj that matches the current pet's walkerId. Stored in variable to be used as argument later
        const currentPetWalker = findWalker(currentPet, walkers)
        //variable represents the cities a walker services. it takes the walker as an argument
        const petWalkerCities = filterWalkerCitiesByWalker(currentPetWalker.id)
        //for loop that iterates through cities stored in petWalkerCities
        for (const chosenCity of petWalkerCities) {
            for (const city of cityList) {
                if (city.id === chosenCity.cityId) {
                    assignmentHTML += `
            <li>
                ${currentPet.name} is being walked by
                ${currentPetWalker.name} in ${city.name}
            </li>
       `
                }
            }
        }

        assignmentHTML += `</ul>`

    }
    return assignmentHTML
}
