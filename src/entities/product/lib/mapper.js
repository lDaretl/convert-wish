export const mapProductsNecessaryInfo = (products) => {
    try {
        return products.map(p => {
            return {
                available: p.orderable,
                condition: p.condition,
                id: p.sku,
                image: p.image,
                name: p.name,
                price: p.regularPrice,
                salePrice: p.salePrice,
                onSale: p.onSale,
                url: p.url,
            }
        })
    } catch (e) {
        console.log(e)
    }
}