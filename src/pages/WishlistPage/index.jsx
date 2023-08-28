import {Wishlist} from "../../widgets/Wishlist/index.jsx";
import {PageTitle} from "../../widgets/PageTitle/index.jsx";

const WishlistPage = () => {
    return (
        <>
            <PageTitle
                title="Wishlist"
                subtitle="Here you can add products and monitor their cost"
            />
            <Wishlist/>
        </>
    )
}

export default WishlistPage;