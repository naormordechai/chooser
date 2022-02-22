import React, { useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StarRateIcon from '@mui/icons-material/StarRate';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StorageService from '../../services/StorageService';
import { AppContext } from '../../context/AppContext';
import styles from './Settings.module.scss';

export const Settings = (props) => {
    const appState = useContext(AppContext);
    const [rate, setRate] = useState(StorageService.load('settings')?.rate || 'mixed');
    const [isIncludedLastTeams, setIsIncludedLastTeams] = useState(StorageService.load('settings')?.isIncludedLastTeams || true);

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('settings', JSON.stringify({ rate, isIncludedLastTeams }));
        appState.dispatch({ type: 'changeSettings', payload: { rate, isIncludedLastTeams } });
        props.closeModal();
    }
    return (
        <div className={styles.container}>
            <AppBar classes={{ root: styles.container__appBar }} sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.closeModal}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Settings
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleSubmit}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit} className={styles.container__form}>
                <FormControl fullWidth size="small">
                    <InputLabel id="rate">Rate</InputLabel>
                    <Select
                        labelId="rate"
                        value={rate}
                        label="Rate"
                        onChange={(event) => setRate(event.target.value)}
                    >
                        <MenuItem value={5}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                < StarRateIcon key={index} classes={{ root: 'c-gold' }} />
                            ))}
                        </MenuItem>
                        <MenuItem value="mixed">Mixed</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked value={isIncludedLastTeams} />}
                    label={<Typography classes={{ root: 'bold fs-12' }}>Included teams from last lottery</Typography>} />
            </form>
        </div>
    )
}
