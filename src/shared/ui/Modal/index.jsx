import {Dialog, DialogTitle, Box} from "@mui/material";

export const Modal = ({ onClose, isOpen, children, title }) => {

    return (
        <Dialog onClose={onClose} open={isOpen}>
            <DialogTitle
                sx={{
                    backgroundColor: '#fefefe',
                    position: 'relative',
                    zIndex: '100'
                }}
            >
                {title}
            </DialogTitle>
            <Box>{children}</Box>
        </Dialog>
    );
}