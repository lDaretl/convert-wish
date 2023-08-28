import {Box, Slide} from "@mui/material"
import bgImg from '../../assets/converter-form-background.jpg'

export const Background = ({children}) => {
    return (
        <Slide
            in
            direction='right'
            easing={{enter: 'ease-out'}}
            timeout={650}
            unmountOnExit
        >
            <Box
                sx={{
                    margin: '0 20px',
                    padding: "0 0 20px",
                    display: "flex",
                    flexDirection: "column",
                    flex: '1 1 auto'
                }}
            >
                <Box
                    sx={{
                        height: "10px",
                        backgroundColor: "#9d9cd1",
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                    }}
                />
                <Box
                    component="div"
                    sx={{
                        height: '100%',
                        borderRadius: '10px',
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        padding: '30px 0 45px',
                        backgroundImage: `url(${bgImg})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        flex: "1 1 auto"
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Slide>
    );
}