import { useContext } from "react";
import "./HomePage.css";
import { MeetupCard } from "./MeetupCard";
import { ACTIONS, DataContext } from "../../contexts/DataProvider";

export function HomePage() {

    const {SET_SORTYPE} = ACTIONS;

    const {dataState, dispatchData} = useContext(DataContext);
    // console.log({dataState})

    const sortHandler = (e) => dispatchData({type: SET_SORTYPE, payload: e.target.value})

    let eventsToDisplay = [...dataState.allEventsList];

    if(dataState.sortType === "Online") {
        eventsToDisplay = eventsToDisplay.filter(({eventType}) => eventType === "Online")
    }
    else if(dataState.sortType === "Offline") {
        eventsToDisplay = eventsToDisplay.filter(({eventType}) => eventType === "Offline")
    }
    else {
        eventsToDisplay = eventsToDisplay.filter(({eventType}) => true);
    }

    eventsToDisplay = eventsToDisplay.filter(({title, eventTags}) => title.toLowerCase().includes(dataState.searchedTerm.toLowerCase().trim()) || eventTags.some((item) => item.toLowerCase().includes(dataState.searchedTerm.toLowerCase().trim())))


    return (
        <>
            <div className="homepage-container">

                <div className="heading-n-dropdown">
                    <div className="heading-container">
                        <h1 className="heading">Meetup Events</h1>
                    </div>
                    <div className="dropdown-container">
                        <select name="eventType" id="eventSelecttype" className="dropdown" onChange={sortHandler}>
                            <option value="Both">Both</option>
                            <option value="Online">Online Event</option>
                            <option value="Offline">Offline Event</option>
                        </select>
                    </div>
                </div>

                <div className="meetuplist-container">
                    {eventsToDisplay.map((meetup) => (
                        <div className="cardo" key={meetup.id}>
                             <MeetupCard meetup={meetup} />
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}