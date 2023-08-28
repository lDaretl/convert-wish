import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import {CircularProgress} from '@mui/material';
import Layout from "../../pages/Layout.jsx";
import WishlistPage from "../../pages/WishlistPage";
import ConverterPage from "../../pages/ConverterPage";
import ErrorPage from "../../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "",
                element: <Navigate to="wishlist"/>,
            },
            {
                path: "wishlist",
                element:  <WishlistPage/>,
            },
            {
                path: "converter",
                element: <ConverterPage/>,
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage/>
    }
]);

export const RoutesProvider = () => {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<CircularProgress/>}
        />
    )
}