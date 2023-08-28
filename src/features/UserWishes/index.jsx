import {Box} from '@mui/material';
import {UserWishesList} from "./UserWishesList";

export const UserWishes =
    ({
         modalIsOpen,
         userCurrency,
         userItems,
         setUserItems,
         isLoadingArr
    }) => {
    const handlerDelete = (productId) => {
        setUserItems(prev => [...prev.filter(i => i.id !== productId)])
    }

    return (
        <Box
            sx={{
                px: 3,
                py: 5,
                boxSizing: 'border-box',
                width: "100%"
            }}
        >
            <UserWishesList
                userItems={userItems}
                handlerDelete={handlerDelete}
                modalIsOpen={modalIsOpen}
                userCurrency={userCurrency}
                isLoadingArr={isLoadingArr}
            />
        </Box>
    )
}