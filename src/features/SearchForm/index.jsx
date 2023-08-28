import {
    useState,
    useEffect,
    useMemo,
    useRef,
    useContext
} from 'react'
import {Modal} from "../../shared/ui/Modal";
import {useQuery} from '@tanstack/react-query';
import {productService} from "../../shared/api";
import {DropItem} from "./ProductsList/DropItem";
import {UserItemsContext} from "../../app/context";
import {Box, TextField, Slide} from '@mui/material';
import {
    mapProductsNecessaryInfo,
    sortByAvailability
} from "../../entities/product";

export const SearchForm = ({isOpen, setIsOpen}) => {
    const [value, setValue] = useState('')
    const [delayValue, setDelayValue] = useState(null)
    const {userItems, setUserItems} = useContext(UserItemsContext)
    const inputRef = useRef(null)

    const {refetch, isError, isFetching, isInitialLoading, data: products} = useQuery({
            queryKey: ['products'],
            queryFn: () => productService.getProduct(value.trim()),
            enabled: false,
            select: data => data.data.products,
        }
    )

    useEffect(() => {
        if (value) {
            setTimeout(() => {
                setDelayValue(value)
                if (value === delayValue) {
                    refetch()
                }
            }, 200)
        }
    }, [value, delayValue])

    const handlerSave = (id) => {
        const newItem = processedProducts[id]
        const isDuplicate = userItems.map(i => i.id).includes(newItem.id)
        if (!isDuplicate) {
            setUserItems(prev => [...prev, newItem])
        } else {
            console.log('Duplicate!')
        }
    }

    const processedProducts = useMemo(() => {
        if (products)
            return sortByAvailability(mapProductsNecessaryInfo(products))
        return null
    }, [products])

    const props = {
        isError,
        products,
        isFetching,
        handlerSave,
        isInitialLoading,
        processedProducts
    }

    return (
        <Modal
            title="Start typing name of the products, to find offers on BestBuy"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <Box
                padding={2}
                sx={{
                    maxWidth: '580px',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        boxShadow: '0 -20px 0 15px #fefefe',
                        position: 'relative',
                        zIndex: 100
                    }}
                >
                    <TextField
                        label="Product name"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        variant="outlined"
                        sx={{
                            boxShadow: 3,
                            borderRadius: 2.5,
                            width: "100%",
                            position: 'relative',
                            zIndex: 100,
                        }}
                        ref={inputRef}
                    />
                </Box>
                <Slide
                    in={!!value}
                    timeout={500}
                    direction='down'
                    easing={{enter: 'ease-out'}}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: 'center',
                            boxShadow: 3,
                            borderRadius: 2.5,
                            p: 1,
                            pt: 3,
                            mt: -2,
                            minHeight: '100px',
                            position: 'relative',
                            zIndex: 50
                        }}
                    >
                        <DropItem {...props}/>
                    </Box>
                </Slide>
            </Box>
        </Modal>
    )
}