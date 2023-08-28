import {
    Box,
    Container,
    Typography,
    Grow,
    Button
} from "@mui/material"
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ErrorPage = () => {
    const navigate = useNavigate()

    return (
        <Grow
            in
            timeout={400}
            easing={{enter: 'ease-out'}}
        >
            <Box
                sx={{
                    height: "100%",
                    textAlign: 'center',
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "center",
                    justifyContent: 'center',
                    gap: 7
                }}
            >
                <Container>
                    <Typography variant="h2" fontWeight={500}>
                        Error 404: Page not found
                    </Typography>
                </Container>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => navigate('/')}
                    sx={{
                        p: 2
                    }}
                >
                    to main page
                </Button>
            </Box>
        </Grow>
    )
}

export default ErrorPage;