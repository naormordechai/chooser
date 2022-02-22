import React, { createContext, useReducer, } from 'react';
import teamsJson from '../resources/teams.json';
import StorageService from '../services/StorageService';

const initialState = {
    teams: teamsJson,
    settings: StorageService.load('settings') ?? {},
    firstIndex: 3,
    seconedIndex: 1
};

export const AppContext = createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeSettings':
            return {
                ...state,
                teams: action.payload.rate === 'mixed' ? teamsJson : teamsJson.filter(team => team.rate === action.payload.rate),
                settings: {
                    ...state.settings,
                    rate: action.payload.rate,
                    isIncludedLastTeams: action.payload.isIncludedLastTeams
                }
            }
        case 'changeIndexes':
            console.log(action.payload);
            return {
                ...state,
                firstIndex: action.payload.firstIndex,
                seconedIndex: action.payload.seconedIndex,
            }
        default:
            return state;
    }
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;