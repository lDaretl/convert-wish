import {productService} from "../../shared/api";
import {useQueries} from "@tanstack/react-query";
import {UserItemsContext} from "../../app/context";
import UpdateIcon from '@mui/icons-material/Update';
import {SearchForm} from "../../features/SearchForm";
import {UserWishes} from "../../features/UserWishes";
import {CurrencyRateContext} from "../../app/context";
import {useState, useEffect, useContext} from "react";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {mapProductsNecessaryInfo} from "../../entities/product";
import {mapCurrencyRatesToLabelValue} from "../../entities/currency";
import {CurrencySelector} from "../../features/ConvertForm/CurrencySelector";
import {Box, Button, Skeleton, Typography, CircularProgress, Fade} from '@mui/material';

const updatingDateTime = (timestamp) => {
    const date = new Date(timestamp)
    return {
        time: `${date.getHours()}:${date.getMinutes().toString().padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`,
        date: `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`
    }
}

export const Wishlist = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [userItems, setUserItems] = useState(
        JSON.parse(localStorage.getItem('userItems'))
        || []
    )
    const [userCurrency, setUserCurrency] = useState(
        localStorage.getItem('userCurrency')
        || 'USD')
    const {isLoading, currencyRate} = useContext(CurrencyRateContext)
    const [updatedAt, setUpdatedAt] = useState(
        JSON.parse(localStorage.getItem('lastUpdatedAt'))
        || 0
    )
    const {time, date} = updatingDateTime(updatedAt)

    useEffect(() => {
        if (userCurrency !== 'USD') {
            localStorage.setItem('userCurrency', userCurrency)
        } else {
            localStorage.removeItem('userCurrency')
        }
    }, [userCurrency])

    const products = useQueries({
            queries: userItems.map((product) => {
                return {
                    queryKey: ['product', product.id],
                    queryFn: () => productService.getProductUpdate(product.id),
                    select: data => data.data.products[0],
                    enabled: false
                }
            }),
        }
    )

    const update = () => {
        products.map(p => p.refetch())
        setIsUpdate(true)
    }


    useEffect(() => {
        localStorage.setItem('userItems', JSON.stringify(userItems))

    }, [userItems])

    useEffect(() => {
        update()
    }, [userItems.length])



    const isLoadingArr = products.map(p => {
        if (p.fetchStatus !== 'idle')
            return p.isLoading
        return false
    })

    useEffect(() => {
        if ((Date.now() - updatedAt) >= 500000) {
            update()
        }
    }, [])

    useEffect(() => {
        if (isUpdate) {
            products.forEach(p => {
                if (p.isError || !p.isSuccess)
                    p.refetch()
            })

            if (!(products.reduce((i, p) => i || p.isLoading || p.isError || !p.isSuccess, false))) {
                setIsUpdate(false)
                const timestamp = Date.now()
                localStorage.setItem('lastUpdatedAt', JSON.stringify(timestamp))
                setUpdatedAt(timestamp)
                const productsData = products.map(p => p.data)
                const processedProducts = mapProductsNecessaryInfo(productsData)
                setUserItems(processedProducts)
            }
        }
    }, [products])

    return (
        <UserItemsContext.Provider value={{
            userItems,
            setUserItems
        }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        justifyContent: {
                            xs: 'center',
                            sm: 'center',
                            md: 'center',
                            lg: 'space-between'
                        },
                        alignItems: 'end',
                        boxSizing: 'border-box',
                        gap: 6,
                        px: 8
                    }}
                >
                    <Box
                        display='flex'
                        flexWrap='wrap'
                        justifyContent='center'
                        alignItems='end'
                        gap={5}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{height: '50px', mb: '1px'}}
                            onClick={() =>
                                setIsOpen(true)
                            }
                            startIcon={<LibraryAddIcon/>}
                        >
                            Add new product
                        </Button>
                        {
                            isLoading
                                ?
                                <Skeleton variant="rounded" width={200} height={56}/>
                                :
                                <Box textAlign='center'>
                                    <Typography sx={{ml: '-15px', mb: '2px', color: 'text.grey'}}>
                                        Products Currency
                                    </Typography>
                                    <CurrencySelector
                                        currencyList={
                                            mapCurrencyRatesToLabelValue(currencyRate)
                                        }
                                        setValue={setUserCurrency}
                                        defaultCurrency={userCurrency}
                                        sx={{alignText: 'center'}}
                                    />
                                </Box>
                        }
                    </Box>

                    {
                        userItems
                        &&
                        userItems.length > 0
                        &&
                        <Fade
                            in={!!userItems.length}
                            timeout={{enter: 500, exit: 500}}
                        >
                            <Box
                                display='flex'
                                flexWrap='wrap'
                                justifyContent='center'
                                alignItems='center'
                                gap={3}
                            >
                                <Box textAlign='center' color='text.grey'>
                                    {
                                        isUpdate
                                            ?
                                            <CircularProgress/>
                                            :
                                            <>
                                                <Typography>
                                                    Updated at
                                                </Typography>
                                                <Typography>
                                                    {time}
                                                </Typography>
                                                <Typography>
                                                    {date}
                                                </Typography>
                                            </>
                                    }
                                </Box>
                                <Button
                                    color='success'
                                    variant='contained'
                                    startIcon={<UpdateIcon/>}
                                    onClick={() => {
                                        setIsUpdate(true)
                                        update()
                                    }}
                                >
                                    Update
                                </Button>
                            </Box>
                        </Fade>
                    }
                </Box>
                <UserWishes
                    userCurrency={userCurrency}
                    modalIsOpen={isOpen}
                    userItems={userItems}
                    setUserItems={setUserItems}
                    isLoadingArr={isLoadingArr}
                />
                <SearchForm
                    sx={{outline: 'solid 1px red'}}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </Box>
        </UserItemsContext.Provider>
    )
}