import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';

export const DisplayInfiniteTeams = (props) => {
    const [index, setIndex] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            const random = Math.floor(Math.random() * props.teams.length);
            setIndex(random)
        }, 1000);
        return () => { }
    }, [])


    return (
        <div>
            <p>{props.teams[index].name}</p>
            <img src={props.teams[index].imageUrl} alt={props.teams[index].name} />
        </div>

    )
}
