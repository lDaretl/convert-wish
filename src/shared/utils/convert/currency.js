export const convertCurrency = (amount, rateFrom, rateTo) => {
    const amountNumber = Number(amount)
    const rateFromNumber = Number(rateFrom)
    const rateToNumber = Number(rateTo)

    if (isNaN(amountNumber) || isNaN(rateFromNumber) || isNaN(rateToNumber)) {
        return -1;
    }

    return amount * (rateTo / rateFrom)
}

export const convertNumberToCurrency = (value, currency) => {
    return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'narrowSymbol'
        }
    ).format(value)
}

export const convertCurrencyToNumber = (value, userCurrency, currencyRate) => {
    return convertCurrency(
        value, currencyRate['USD'],
        currencyRate[userCurrency]
    )
        .toFixed(2)
}

export const convertToUserCurrency = (value, userCurrency, currencyRate) => {
    if (userCurrency !== 'USD')
        return convertNumberToCurrency(
            convertCurrencyToNumber(value, userCurrency, currencyRate),
            userCurrency
        )
    return convertNumberToCurrency(value, userCurrency)
}