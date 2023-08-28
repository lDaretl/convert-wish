export function mapCurrencyRatesToLabelValue(rates) {
    try {
        return Object.keys(rates)
            .map((currency) => ({
                value: currency,
                label: currency
            }))
    } catch (e) {
        console.log(e)
    }
}