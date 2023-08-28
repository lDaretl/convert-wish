export const productAvailabilityColor = (product) => {
    switch (product.available) {
        case "Available":
            return {color: "limegreen"}
        case "PreOrder":
            return {color: "dodgerblue"}
        case "ComingSoon":
            return {color: "mediumslateblue"}
        default:
            return {color: "red"}
    }
}