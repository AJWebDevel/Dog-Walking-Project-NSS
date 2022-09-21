import { getPets, getWalkers } from "./database.js"

/*Update the code in RegisteredPets module so that the 
    <li> for each pet has an id attribute with the 
    following format id="pet--1". The primary key 
    should be correct for each element.
Add a click event listener to your HTML document.
Store the target HTML element of the click event in a variable.
Check if the id property of the element starts with the string of "pet".
If it does, use the split() method on the id property to get an array of two string (e.g. ["pet", "4"])
Use array deconstruction to assign the primary key to a variable named petPrimaryKey.
Find the whole pet object by iterating the array of pet objects and comparing each primary
     key to the integer value of the petPrimaryKey variable.
As soon as a match is found, display a message that the dog barks at you - "Rocket barks at you"*/
//event-listener function engaged by a click 
document.addEventListener(
    //specify type of event-listener
    "click",
    //parameter in this case is the thing that happens to trigger function
    (clickEvent) => {
        //below variable represents the item to be clicked and specifies it as the place to be clicked
        const clickedItem = clickEvent.target
        //if statement specifies that clicked elements that will trigger the function will begin with "pet"
        if (clickedItem.id.startsWith("pet")) {
            /*below variable specifies that we are talking about just the petId in the html. the .split
             then separates the petId (i.e:if <li id="pet--${pet.id>}") into two separate strings but the , within []
             only targets the secondary property (just the petId). Split is specified to be on "--" */
            const [, petId] = clickedItem.id.split("--")
            //why does null work here but had to fix on other modules?
            let matchingPet = null

            //for/of loop iterates through the previously imported pets array
            for (const pet of pets) {
                //since petId has been put into a string, parseInt() will turn string to integer for comparison to pet.id
                if (parseInt(petId) === pet.id) {
                    //pet with matching ids gets put into matching pet which will now have value outside the loop
                    matchingPet = pet
                }
            }

            let matchingWalker = null
            //for/of loop iterates through the previously imported walkers array
            for (const walker of walkers) {
                //if statement that checks the previously chosen matchingPet's walkerId and finds the corresponding walker's id
                if (matchingPet.walkerId === walker.id) {
                    //matchingWalker is more accessible bc it is outside the loop, this line makes the result of the forloop available for later interpolation
                    matchingWalker = walker
                }
            }
            //window alert creates pop-up that displays the pet and walker names found through the forloops w/in the function
            return window.alert(`${matchingPet.name} is being walked by ${matchingWalker.name}.`)
        }

    }
)

const pets = getPets()
const walkers = getWalkers()

//function generates a list of all the registered pets and displays them in html
export const RegisteredPets = (petName) => {
    let petHTML = `<ul>`

    for (const pet of pets) {
        petHTML += `<li id="pet--${pet.id}">${pet.name}</li>`
    }

    petHTML += `</ul>`

    return petHTML
}

