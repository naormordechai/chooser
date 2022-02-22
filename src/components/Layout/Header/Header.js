import React, { useState } from 'react';
import styles from './Header.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { Settings } from '../../Settings/Settings';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Header = (props) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    return (
        <AppBar classes={{ root: styles.appBar }} sx={{ position: 'relative' }}>
            <Toolbar classes={{ root: styles.appBar__toolbar }}>
                <Typography classes={{ root: styles.appBar__toolbar__title }} variant="h6" component="div">
                    CHOOSER
                </Typography>
                <IconButton classes={{ root: styles.appBar__toolbar__btn }} onClick={() => setIsOpenDialog(true)}>
                    <SettingsIcon />
                </IconButton>
                <Dialog onClose={() => setIsOpenDialog(false)} open={isOpenDialog} fullScreen TransitionComponent={Transition}>
                    <Settings closeModal={() => setIsOpenDialog(false)} />
                </Dialog>
            </Toolbar>
        </AppBar>
    )
}
