import {useContext, useState} from 'react';
import {Box, Skeleton} from '@mui/material';
import {convertCurrency} from "../../shared/utils";
import {CurrencyRateContext} from "../../app/context";
import {ConvertForm} from "../../features/ConvertForm";
import {mapCurrencyRatesToLabelValue} from "../../entities/currency";

export const CurrencyConverter = () => {
    const [converterResult, setConverterResult] = useState(null)
    const [currentRate, setCurrentRate] = useState(null)
    const {isLoading, currencyRate} = useContext(CurrencyRateContext)

    const onSubmit = (data) => {
        const rate = convertCurrency(1, currencyRate[data.from], currencyRate[data.to])
        const result = convertCurrency(data.CountCurrency, currencyRate[data.from], currencyRate[data.to])
        setCurrentRate(`1 ${data.from} = ${rate.toFixed(2)} ${data.to}`)
        return setConverterResult(`${data.CountCurrency} ${data.from} = ${result.toFixed(2)} ${data.to}`)
    }

    if (isLoading) {
        return (
            <Box>
                <Box
                    maxWidth="500px"
                    height="500px"
                    padding="0 15px"
                    margin="auto"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '40px'
                    }}
                >
                    <Skeleton variant="rounded" width={210} height={70}/>
                    <Skeleton variant="rounded" width={210} height={70}/>
                    <Skeleton variant="rounded" sx={{width: '100%'}} height={70}/>
                    <Skeleton variant="rounded" width={210} height={70}/>
                    <Skeleton variant="rounded" width={210} height={70}/>
                    <Skeleton variant="rounded" width={210} height={70}/>
                </Box>
            </Box>
        )
    }

    return (
        <Box>
            <Box
                maxWidth="500px"
                padding="0 15px"
                margin="auto"
            >
                <ConvertForm
                    currencyList={mapCurrencyRatesToLabelValue(currencyRate)}
                    onSubmit={onSubmit}
                    result={converterResult}
                    rate={currentRate}
                    buttonLabel="Convert"
                />
            </Box>
        </Box>
    )
}