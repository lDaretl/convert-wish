import {CircularProgress, Typography} from "@mui/material";
import {ProductsList} from "../index.jsx";

export const DropItem =
    ({
         isError,
         products,
         isFetching,
         handlerSave,
         isInitialLoading,
         processedProducts,
    }) => {


    if (isInitialLoading || isFetching)
        return (
            <CircularProgress/>
        )

    if (isError)
        return (
            <Typography>
                Oops, an error has occurred... Please try again later
            </Typography>
        )

    if (products) {
        if (products.length === 0)
            return (
                <Typography>
                    Sorry... No products found for your request
                </Typography>
            )

        return (
            <ProductsList
                products={processedProducts}
                handlerSave={handlerSave}
                isFetching={isFetching}
            />
        )
    }
}