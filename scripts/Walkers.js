import { getWalkerCities, getWalkers, getCities } from "./database.js"

//calling functions and assigning them to variables so they can be used within this module
const assignments = getWalkerCities()
const walkers = getWalkers()
const cities = getCities()

//function to filter walker cities array and return an array of cities serviced by the chosen(parameter) walker
const filterWalkerCitiesByWalker = (walker) => {
    // create empty array to store  assignment objects
    let cityAssignments = []
    // Iterate the array value of walkerCities
    for (const assignment of assignments) {
        // Checks if the id of the walker matches the walkerId on assignment(aka the walker cities). 
        if (assignment.walkerId === parseInt(walker)) { //walker's id must be converted to num using parseInt, otherwise, it'd come back as false
            // push current assignment to the array of assignments
            cityAssignments.push(assignment)
        }

    }
    // After the loop return the newly generated assignments array
    return cityAssignments
}

//function to convert assigned city id's found in previous function to the the names stored in the cities database and put the names in html format 
const assignedCityNames = (cityArray) => {
    // create empty string to hold the matching city names
    let cityNames = ""
    // Iterate thru the array given as parameter(aka cities found in filterCitiesByWalker)
    for (const assignment of cityArray) {
        // Then iterate through the cities array (so its going through both) 
        for (const city of cities) {
            //If statement to find which city.id matches the assignment's city id
            if (city.id === assignment.cityId) {
                // add city name to string of city names
                cityNames += `${city.name}, `
            }

        }
    }
    // After loop, return the string
    return cityNames

}

//function creates list of walker names in html
export const walkerNames = (walker) => {
    //initialize string with the beginning list tag
    let walkerHTML = "<ul>"
    //for loop here so it only repeats walkers, not make every individual item a list.
    //for loop iterates through walker array
    for (const walker of walkers) {
        //adds walker's id to the id of the html list item and adds the list item displaying walker name to the html string
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }
    //close html string outside for loop (so it isn't repeated)
    walkerHTML += "</ul>"
    //return the string
    return walkerHTML
}


//click event listener function triggered when a walker is clicked on that will display the cities a walker operates in
document.addEventListener(

    // This is the type of event
    "click",
    //this is the parameter, aka a click is given and the following is what happens after
    (clickEvent) => {
        //declare variable to represent the item to be clicked (will be walker). 
        //clickEvent.target tells that whatever the variable equals is the element that when clicked triggers the click event (most specific html element clicked by user)
        const itemClicked = clickEvent.target

        /*if statement filters elements so that only the ones that html tags have id's that start with "walker"
        (as generated in the walker names function) are considered when clicked on*/
        if (itemClicked.id.startsWith("walker")) {
            //comma represents there is a property before but we only want the second property (walkerID)
            //.split splits the string that walkerId is in the html id and splits it on "--"(whatever is in parentheses) so that it is now just "#"
            const [, walkerId] = itemClicked.id.split("--")
            //for loop iterates through assignments(walkerCities) 
            for (const assignment of assignments) {
                //if statement to check that the walkerId property on the assignment matches the walker id of the walker clicked
                //parseInt turns string version of walker id into an integer so === will find an exact match 
                if (assignment.walkerId === parseInt(walkerId)) {
                    //filterCitiesByWalker will take the walkerId clicked on as a parameter and return the assignment(s) of said walker
                    //function is set to variable so that it can be used later as an argument
                    const assignments = filterWalkerCitiesByWalker(walkerId)
                    //function is set to variable so that it can be used easily in return
                    const cities = assignedCityNames(assignments)
                    //return window alert w/in if statement so that it only alerts if id's match. returns list of cities generated on line above
                    return window.alert(cities)
                }
            }
        }
        /*Then, define a function that take in the array of matching objects, and use the cityId 
        property on each one to find the matching city name. It should return a string containing 
        all the city names. */
    }
)



