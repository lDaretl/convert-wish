import {PageTitle} from "../../widgets/PageTitle";
import {Background} from "../../widgets/Background";
import {CurrencyConverter} from "../../widgets/CurrencyConverter";

const ConverterPage = () => {
    return (
        <>
            <PageTitle
                title="Currency Converter"
                subtitle="Here you can check live foreign currency exchange rates"
            />
            <Background>
                <CurrencyConverter/>
            </Background>
        </>
    )
}

export default ConverterPage;