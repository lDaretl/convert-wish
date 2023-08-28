import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {TextField, Button, Box, Typography} from "@mui/material";
import {CurrencySelector} from "./CurrencySelector";
import {useForm} from "react-hook-form";

export const ConvertForm = ({currencyList, onSubmit, result, rate, buttonLabel}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const {message} = errors['CountCurrency'] ?? {message: ''}

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{height: '100%'}}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    height: "100%"
                }}

            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    //flex: '1 0 auto',
                    //minHeight: "144px",
                    marginBottom: "15px",
                }}
                >
                    <Box sx={{marginBottom: "16px"}}>
                        <Typography
                            variant="h5"
                            color="#1976d2"
                            sx={{
                                textShadow: '0 0 2px #cdc1fd'
                            }}
                        >
                            Current Rate:
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.white"
                            sx={{
                                textShadow: '0 0 3px #444'
                            }}
                        >
                            {rate ? rate : "-"}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Typography
                            variant="h5"
                            color="#1976d2"
                            sx={{
                                textShadow: '0 0 2px #cdc1fd'
                            }}
                        >
                            Result:
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.white"
                            sx={{
                                textShadow: '0 0 3px #444'
                            }}
                        >
                            {result ? result : "-"}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <TextField
                        {...register(
                            'CountCurrency',
                            {
                                required: {
                                    value: true,
                                    message: 'This field can\'t be empty'
                                },
                                min: {
                                    value: 1,
                                    message: 'Amount should be greater then 0'
                                }
                            })}
                        label="Amount"
                        type="number"
                        error={!!errors['CountCurrency']}
                        helperText={message}
                        variant="outlined"
                        sx={{
                            boxShadow: 3,
                            borderRadius: 2.5,
                            width: '100%',
                            maxWidth: '350px'
                        }}
                    />
                    <CurrencySelector
                        register={{...register('from')}}
                        label="From"
                        currencyList={currencyList}
                        defaultCurrency='USD'
                    />
                    <CurrencySelector
                        register={{...register('to')}}
                        label="To"
                        currencyList={currencyList}
                        defaultCurrency='USD'
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<CurrencyExchangeIcon/>}
                        sx={{
                            width: '140px',
                            alignSelf: 'center',
                            padding: '10px',
                            marginTop: "24px"
                        }}
                    >
                        {buttonLabel}
                    </Button>
                </Box>
            </Box>
        </form>
    )
}