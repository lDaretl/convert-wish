export const sortByAvailability = (products) => {
    return products.sort((curP, nextP) => {
        const check = curP.available < nextP.available
        return check ? -1 : 1
    })
}