import React from 'react';
import styles from './DisplayInfiniteTeams.module.scss';

export const DisplayInfiniteTeams = (props) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.container__title}>{props.title}</h2>
            <img src={props.teams[props.index].imageUrl} alt={props.teams[props.index].name} />
        </section>
    )
}
