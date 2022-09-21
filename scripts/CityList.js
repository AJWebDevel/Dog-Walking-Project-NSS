import { getCities, getWalkers } from "./database.js"

//variables store value returned from functions imported above
const cities = getCities()
const walkers = getWalkers()

//this function generates a list of cities that the company services
export const CityList = () => {
    //this variable initializes the html string
    let citiesHTML = "<ul>"

    //this for/of loop iterates through the array of cities imported previously
    for (const city of cities) {
        citiesHTML += `<li>${city.name}</li>`
    }

    citiesHTML += "</ul>"
    /*return statement here so loop displays all cities, 
    not just stopping after one iteration of the for loop */
    return citiesHTML
}

