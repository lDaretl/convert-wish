import {AppThemeProvider} from "./provider/ThemeProvider";
import {AppQueryProvider} from "./provider/QueryProvider";
import {RoutesProvider} from "./provider/RoutesProvider";
import Layout from "../pages/Layout";

function App() {
    return (
        <AppThemeProvider>
            <AppQueryProvider>
                <RoutesProvider>
                    <Layout/>
                </RoutesProvider>
            </AppQueryProvider>
        </AppThemeProvider>
    )
}

export default App