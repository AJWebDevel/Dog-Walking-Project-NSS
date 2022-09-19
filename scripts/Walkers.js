import { getWalkers } from "./database.js"

const walkers = getWalkers()


export const walkerNames = (walker) => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li>${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML
}

