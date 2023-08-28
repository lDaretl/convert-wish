import {useEffect, useState} from "react";
import {UserWish} from './UserWish/index.jsx'
import {List, Box, Grow} from '@mui/material';
import {TransitionGroup} from 'react-transition-group';

export const UserWishesList =
    ({
         userItems,
         handlerDelete,
         modalIsOpen,
         userCurrency,
         isLoadingArr
    }) => {
    const [delayIndex, setDelayIndex] = useState(70)

    useEffect(() => {
        if (modalIsOpen) {
            setDelayIndex(0)
        } else {
            setDelayIndex(70)
        }
    }, [modalIsOpen])

    return (
        <List component="div">
            <TransitionGroup
                style={{display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: 0}}>
                {
                    userItems.map((product, id) =>
                        <Grow
                            appear={false}
                            key={product.id}
                            timeout={550}
                            unmountOnExit
                        >
                            <Box sx={{
                                width: '280px',
                            }}>
                                <UserWish
                                    product={product}
                                    handlerDelete={handlerDelete}
                                    delay={`${id * delayIndex}ms`}
                                    userCurrency={userCurrency}
                                    isLoadingProduct={isLoadingArr[id]}
                                />
                            </Box>
                        </Grow>
                    )
                }
            </TransitionGroup>
        </List>
    )
}