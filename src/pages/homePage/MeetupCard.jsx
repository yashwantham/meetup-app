import { NavLink } from "react-router-dom";
import "./MeetupCard.css";

export function MeetupCard({ meetup }) {

    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getDate = (dt) => {
        const date = new Date(dt)
        console.log({ date });
        return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} · ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    }

    return (
        <>
            <NavLink to={`/eventdetail/${meetup.id}`} className="navlink-card">
                <div className="meetup-card-container">
                    <div className="event-type">
                        {`${meetup.eventType} Event`}
                    </div>
                    <div className="meetup-thumbnail-container">
                        <img src={meetup.eventThumbnail} alt="" className="thumbnail" />
                    </div>
                    <div className="startdate-n-title">
                        <div className="startdate">
                            {getDate(meetup.eventStartTime)}
                        </div>
                        <div className="meetup-title-container">
                            {meetup.title}
                            {/* <h4 className="meetup-title">{meetup.title}</h4> */}
                        </div>
                    </div>
                </div>
            </NavLink>
        </>
    )
}