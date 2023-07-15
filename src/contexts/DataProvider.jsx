import { createContext, useReducer } from "react";
import { meetupsData } from "../db/meetupsData";

export const DataContext = createContext();

export const ACTIONS = {
    SET_SORTYPE: "set_sorttype",
    SET_SEARCHEDTERM: "set_searchedterm",
    SET_RSVP: "set_rsvp"
}

export function DataProvider({children}) {

    // const allList = JSON.parse(meetupsData)
    // console.log({allList})

    const {SET_SORTYPE, SET_SEARCHEDTERM, SET_RSVP} = ACTIONS;

    const reducer = (state, action) => {

        switch(action.type) {
            case SET_SORTYPE: {
                return {...state, sortType: action.payload}
            }

            case SET_SEARCHEDTERM: {
                return {...state, searchedTerm: action.payload}
            }

            case SET_RSVP: {
                const newEventList = state.allEventsList.map((meet) => meet.id === action.payload ? {...meet, rsvped: true} : meet )
                return {...state, allEventsList: [...newEventList]}
            }

            default: {
                return state
            }
        }
    }

    const initialState = {allEventsList: [...meetupsData.meetups], sortType: "Both", searchedTerm: ""};
    // console.log({initialState});

    const [dataState, dispatchData] = useReducer(reducer, initialState)

    return (
        <>
            <DataContext.Provider value={{dataState, dispatchData}}>{children}</DataContext.Provider>
        </>
    )
}