export const componentsStyles = (theme) => {
    return {
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#FEFDFD',
                        borderRadius: '10px',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#54bfe5',
                        },
                    },
                },
            },

            MuiTabs: {
                styleOverrides: {
                    flexContainer: {
                        display: 'flex',
                        justifyContent: 'end',
                        [theme.breakpoints.down('sm')]: {
                            justifyContent: 'center',
                        },
                    },
                },
            },

            MuiDialog: {
                styleOverrides: {
                    paper: {
                        height: '90%',
                        textAlign: 'center'
                    },
                },
            }
        },
    }
}