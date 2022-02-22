import React, { useState } from 'react';
import styles from './Header.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { Settings } from '../../Settings/Settings';


const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Header = (props) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    return (
        <div className={styles.header}>
            <span>Chooser</span>
            <IconButton onClick={() => setIsOpenDialog(true)}>
                <SettingsIcon />
            </IconButton>

            <Dialog onClose={() => setIsOpenDialog(false)} open={isOpenDialog} fullScreen TransitionComponent={Transition}>
                <Settings closeModal={() => setIsOpenDialog(false)} />
            </Dialog>
        </div>
    )
}
