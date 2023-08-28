import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {PageMain} from "../widgets/PageMain";
import {useQuery} from "@tanstack/react-query";
import {PageHeader} from "../widgets/PageHeader";
import {currencyService} from "../shared/api/index.js";
import {CurrencyRateContext} from "../app/context/index.js";

const cachedCurrencyRate = (() => {
    const cached = JSON.parse(localStorage.getItem('currencyRate'))
    if (cached === null) return {timestamp: 0}
    const check = Object.keys(cached).includes('data')
    return check
        ?
        cached
        :
        {timestamp: 0}
})()

const Layout = () => {
    const {isLoading, data: currencyRate, isStale} = useQuery({
            queryKey: ['currency-rate'],
            queryFn: currencyService.getCurrency,
            initialData: cachedCurrencyRate,
            staleTime: 3600 * 1000,
            initialDataUpdatedAt: cachedCurrencyRate.timestamp,
            select: data => data.data,
        }
    )

    useEffect(() => {
        if (isStale && currencyRate || !cachedCurrencyRate.data) {
            localStorage.setItem('currencyRate', JSON.stringify(
                {
                    timestamp: Date.now(),
                    data: currencyRate,
                }))
        }
    }, [isStale, currencyRate])

    return (
        <CurrencyRateContext.Provider value={{
            isLoading,
            currencyRate,
        }}>
            <>
                <PageHeader/>
                <PageMain>
                    <Outlet/>
                </PageMain>
            </>
        </CurrencyRateContext.Provider>
    )
}

export default Layout;