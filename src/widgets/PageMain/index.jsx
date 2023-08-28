import {Box, Fade} from '@mui/material';

export const PageMain = ({children}) => {
    return (
        <Fade
            in
            easing={{enter: 'ease-out'}}
            timeout={700}
        >
            <Box
                sx={{
                    backgroundColor: "background.main",
                    borderRadius: "10px",
                    boxShadow: 1,
                    marginBottom: "7px",
                }}
            >
                {children}
            </Box>
        </Fade>
    )
}