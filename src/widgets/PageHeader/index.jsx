import {useState} from 'react'
import logo from '../../assets/logo.png'
import {container} from './styles.module.scss';
import {Tabs, Tab, Slide, Box} from "@mui/material";
import {useNavigate, useLocation} from 'react-router-dom'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function LinkTab(props) {
    return (
        <Tab
            component="p"
            {...props}
        />
    )
}

export const PageHeader = () => {
    const location = useLocation()
    const currentLocation = (() => {
        const loc = location.pathname
        if (loc === '/wishlist' || loc === '/')
            return 0
        return 1
    })()

    const [value, setValue] = useState(currentLocation);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        if (
            event.type !== 'click' ||
            (event.type === 'click' && samePageLinkNavigation(event))
        ) {
            setValue(newValue);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    md: 'row'
                },
                alignItems: {
                  xs: 'center'
                },
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 1
            }}
        >
            <Slide
                in
                direction='left'
                timeout={100}
            >
                <Box
                    sx={{
                        display: 'flex',
                        maxWidth: '300px',
                        pt: {
                            xs: 3,
                            md: 1
                        },
                        pb: 2,
                        px: 2

                    }}
                >
                    <Box
                        component='img'
                        src={logo}
                        alt='logo'
                        sx={{
                            width: '100%',
                            objectFit: 'contain',
                            boxSizing: 'border-box',
                            userSelect: 'none'
                        }}
                    />
                </Box>
            </Slide>
            <Slide
                in
                direction='right'
                timeout={100}
            >
                <Tabs
                    className={container}
                    value={value}
                    onChange={handleChange}
                >
                    <LinkTab
                        label="Wishlist"
                        onClick={() => navigate("wishlist")}
                        icon={<CardGiftcardIcon/>}
                        iconPosition="start"
                    />

                    <LinkTab
                        label="Converter"
                        onClick={() => navigate("converter")}
                        icon={<CurrencyExchangeIcon fontSize="small"/>}
                        iconPosition="start"
                    />
                </Tabs>
            </Slide>
        </Box>
    )
}