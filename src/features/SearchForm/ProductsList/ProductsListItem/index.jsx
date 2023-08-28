import {
    Box,
    Button,
    Collapse,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Slide,
    Typography
} from '@mui/material';
import {useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {convertNumberToCurrency} from "../../../../shared/utils";
import {productAvailabilityColor} from "../../../../entities/product";

export const ProductsListItem = ({product, handlerSave, id, delay}) => {
    const [open, setOpen] = useState(false);

    const matches = useMediaQuery('(max-width:610px)');
    const wrap = matches ? 'wrap' : 'no-wrap'

    const regularPrice = convertNumberToCurrency(product.price, 'USD')
    const salePrice = convertNumberToCurrency(product.salePrice, 'USD')

    const handleClick = () => {
        setOpen(!open);
    };

    const color = productAvailabilityColor(product)

    return (
        <Slide
            direction="down"
            in={true}
            timeout={{enter: 630}}
            style={{transitionDelay: delay}}
            easing={{enter: 'ease'}}
            unmountOnExit
        >
            <ListItem
                disablePadding
                divider
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    minHeight: '120px'
                }}>
                <ListItemButton
                    onClick={handleClick}
                    sx={{
                        display: 'flex',
                        gap: '20px',
                        width: "100%",
                        py: 2,
                        flexWrap: wrap,
                        justifyContent: 'center'
                    }}>
                    <ListItemIcon sx={{maxWidth: '160px', maxHeight: '100px'}}>
                        <Box
                            component="img"
                            src={product.image}
                            alt={`product_${product.id}`}
                            sx={{
                                width: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    </ListItemIcon>
                    <Box display="flex" flexDirection="column" flex="1 1 auto">
                        <ListItemText
                            primary={product.name}
                        />
                        <Box display='flex' gap={2} flexWrap="wrap" alignItems="baseline">
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
                            {product.onSale
                                ?
                                <Box display="flex" gap={2} alignItems="baseline">
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
                                    <Typography
                                        sx={{
                                            textDecoration: "line-through"
                                        }}
                                    >
                                        {regularPrice}
                                    </Typography>
                                </Box>
                                :
                                <Typography
                                    sx={{
                                        fontSize: "1.2rem",
                                        fontWeight: "500",
                                    }}
                                >
                                    {regularPrice}
                                </Typography>
                            }
                        </Box>
                    </Box>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit sx={{width: "100%"}}>
                    <ListItem component="div" disablePadding
                              sx={{
                                  gap: 2,
                                  textAlign: "center",
                                  padding: 2,
                                  justifyContent: 'space-around',
                                  flexWrap: 'wrap'
                              }}>
                        <ListItemText secondary={`Condition: ${product.condition}`}/>
                        {
                            !product.onSale &&
                            <ListItemText secondary={`Sale price: ${
                                product.salePrice === product.price
                                    ?
                                    "-"
                                    :
                                    salePrice
                            }`}/>
                        }
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
                            color="success"
                            startIcon={<LibraryAddIcon/>}
                            sx={{color: '#fefefe'}}
                            onClick={() => handlerSave(id)}
                        >
                            Save
                        </Button>
                    </ListItem>
                </Collapse>
            </ListItem>
        </Slide>
    )
}