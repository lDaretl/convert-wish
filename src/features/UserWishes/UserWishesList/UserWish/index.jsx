import {
    Box,
    Zoom,
    Fade,
    Button,
    Collapse,
    ListItem,
    Typography,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    CircularProgress
} from '@mui/material';
import {useContext, useState} from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';
import {CurrencyRateContext} from "../../../../app/context";
import {convertToUserCurrency} from "../../../../shared/utils";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {productAvailabilityColor} from "../../../../entities/product";
import {ExpandLess, ExpandMore} from '@mui/icons-material';

export const UserWish =
    ({
         product,
         handlerDelete,
         delay,
         userCurrency,
         isLoadingProduct
     }) => {
        const [isOpen, setIsOpen] = useState(false)
        const {currencyRate, isLoading} = useContext(CurrencyRateContext)

        const color = productAvailabilityColor(product)

        const matches = useMediaQuery('(max-width:610px)');
        const wrap = matches ? 'wrap' : 'no-wrap'

        const regularPrice = convertToUserCurrency(product.price, userCurrency, currencyRate)
        const salePrice = convertToUserCurrency(product.salePrice, userCurrency, currencyRate)

        if (isLoading || isLoadingProduct) {
            return (
                <Zoom
                    in={true}
                    easing={{enter: 'cubic-bezier(.2, 0.3, 0, 1)'}}
                    timeout={{enter: 1000}}
                    style={{transitionDelay: delay}}
                    unmountOnExit
                >
                    <ListItem disablePadding divider
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  borderBottom: 'none',
                                  boxShadow: 3,
                                  backgroundColor: "#fefefe",
                                  borderRadius: 3,
                                  width: '280px',
                                  pt: 4,
                                  overflow: 'hidden'
                              }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: "wrap",
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '328.8px',
                            }}
                        >
                            <Fade
                                in={isLoading || isLoadingProduct}
                            >
                                <CircularProgress/>
                            </Fade>
                        </Box>
                    </ListItem>
                </Zoom>
            )
        }

        return (
            <Zoom
                in={true}
                easing={{enter: 'cubic-bezier(.2, 0.3, 0, 1)'}}
                timeout={{enter: 1000}}
                style={{transitionDelay: delay}}
                unmountOnExit
            >
                <ListItem disablePadding divider
                          sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              borderBottom: 'none',
                              boxShadow: 3,
                              backgroundColor: "#fefefe",
                              borderRadius: 3,
                              width: '280px',
                              pt: 4,
                              overflow: 'hidden'
                          }}
                >
                    <Fade
                        in={!isLoading || !isLoadingProduct}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: wrap,
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <ListItemIcon sx={{maxWidth: '160px', height: '100px', mb: '20px'}}>
                                <Box
                                    component="img"
                                    src={product.image}
                                    alt={`product_${product.id}`}
                                     sx={{width: '100%', objectFit: 'contain'}}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={product.name}
                                primaryTypographyProps={{fontSize: "auto", textAlign: 'center'}}
                                sx={{flex: 'none', px: 3, height: '72px', overflow: 'hidden', mb: '20px'}}
                            />
                            <Box
                                display='flex'
                                flexWrap="wrap"
                                gap={2}
                                justifyContent="center"
                                alignItems="baseline"
                            >
                                <Typography color={color}>
                                    {product.available}
                                </Typography>
                                {product.onSale &&
                                    <Typography
                                        sx={{
                                            background: "-webkit-linear-gradient(60deg, #fb00ff, #f00)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            textShadow: "0 0 5px #dddddd",
                                            letterSpacing: "0.1em"
                                        }}
                                    >
                                        SALE!
                                    </Typography>
                                }
                            </Box>
                            <Box sx={{mb: '20px'}}>
                                {product.onSale
                                    ?
                                    <Box display="flex" gap={2} alignItems="baseline">

                                        <Typography
                                            sx={{
                                                textDecoration: "line-through"
                                            }}
                                        >
                                            {regularPrice}
                                        </Typography>
                                        <Zoom in timeout={500}>

                                            <Typography
                                                sx={{
                                                    fontSize: "1.2rem",
                                                    fontWeight: "600",
                                                    background: "-webkit-linear-gradient(180deg, #00e53c, #00df6e)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent"
                                                }}
                                            >
                                                {salePrice}
                                            </Typography>
                                        </Zoom>

                                    </Box>
                                    :
                                    <Zoom in timeout={500} unmountOnExit>

                                        <Typography
                                            sx={{
                                                fontSize: "1.2rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {regularPrice}
                                        </Typography>
                                    </Zoom>

                                }
                            </Box>
                            <ListItemButton
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    maxHeight: '40px',
                                    mt: 'auto'
                                }}
                                onClick={() => setIsOpen(prev => !prev)}
                            >
                                {isOpen ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>

                            <Collapse in={isOpen} timeout='auto' unmountOnExit>
                                <Box sx={{
                                    width: "100%",
                                    display: 'flex',
                                    gap: '20px',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    pt: '20px',
                                    pb: '25px',
                                    textAlign: 'center'
                                }}>
                                    <Box display='flex' gap='20px'>
                                        <ListItemText secondary={`Condition: ${product.condition}`}/>
                                        {
                                            !product.onSale &&
                                            <ListItemText secondary={
                                                `Sale price: ${
                                                    product.salePrice === product.price
                                                        ?
                                                        "-"
                                                        :
                                                        salePrice
                                                }`
                                            }
                                            />
                                        }
                                    </Box>
                                    <Box display='flex' gap='20px' justifyContent='center'>
                                        <Button
                                            component="a"
                                            href={product.url}
                                            variant="contained"
                                            startIcon={<ShoppingCartIcon/>}
                                        >
                                            shop
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => handlerDelete(product.id)}
                                            startIcon={<DeleteIcon/>}
                                            sx={{
                                                color: '#f3f3f3'
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Collapse>
                        </Box>
                    </Fade>
                </ListItem>
            </Zoom>
        )
    }