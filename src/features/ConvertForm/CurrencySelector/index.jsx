import {TextField, MenuItem, Typography, Box} from '@mui/material'

export const CurrencySelector =
    ({
         currencyList,
         label,
         register,
         setValue,
         defaultCurrency
    }) => {

    const defaultValue = (() => {
        try {
            return currencyList.map(i => i.value)
                .indexOf(defaultCurrency)
        } catch (e) {
            console.log(e)
        }
    })()



    const onChange = (() => {
        if (setValue)
            return e => setValue(e.target.value)
        return null
    })()

    return (
        <Box
            sx={{
                maxWidth: '200px',
                alignSelf: 'center',
                display: "flex",
                flexDirection: "column",
                justifyContent: 'space-between'
            }}
        >
            <Typography
                component='p'
                sx={{
                    textAlign: 'start',
                    marginLeft: '15px',
                    color: 'text.grey'
                }}
            >
                {label}
            </Typography>
            <TextField
                {...register}
                select
                sx={{
                    minWidth: 200,
                    textAlign: "center",
                    boxShadow: 3,
                    borderRadius: 2.5,
                }}
                required
                defaultValue={ defaultValue ? currencyList[defaultValue].value : 'Error'}
                variant="outlined"
                onChange={onChange}
            >
                {currencyList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
}