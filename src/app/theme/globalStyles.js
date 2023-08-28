export const globalStyles = {
    html: {
        height: "100%",
    },

    body: {
        height: "100%",
        margin: "0 8px",
        '& > #root': {
            height: "100%",
            '& > .MuiBox-root.css-0': {
                display: "flex",
                minHeight: "100%",
                flexDirection: "column",
                overflow: "hidden",
            }
        }
    },
}