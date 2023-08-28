import {createTheme, ThemeProvider} from '@mui/material/styles';
import {deepmerge} from '@mui/utils';
import {GlobalStyles} from "@mui/material";
import {breakpoints, palette, componentsStyles, globalStyles} from "../theme";

const theme = createTheme({
    breakpoints,
    palette,
})

const computedComponentsStyles = createTheme(componentsStyles(theme))

const customTheme = createTheme(deepmerge(theme, computedComponentsStyles))

export const AppThemeProvider = ({children}) => {
    return (
        <ThemeProvider theme={customTheme}>
            <GlobalStyles styles={globalStyles}/>
            {children}
        </ThemeProvider>
    )
}