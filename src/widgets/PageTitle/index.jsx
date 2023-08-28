import {Typography, Box, Grow} from '@mui/material'

export const PageTitle = ({title, subtitle}) => {
    return (
        <Grow
            in
            easing={{enter: 'ease-out', exit: 'linear'}}
            style={{ transformOrigin: '0.5 0 0' }}
            timeout={850}
            unmountOnExit
        >
            <Box
                sx={{
                    padding: "25px 0 30px",
                    textAlign: "center",
                }}
            >

                <Typography
                    variant="h3"
                    color="#517af7"
                    gutterBottom
                    sx={{
                        textShadow: '0 0 5px #e0e0e0'
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.grey-light"
                    sx={{
                        textShadow: '0 0 2px #e0e0e0'
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Grow>
    )
}