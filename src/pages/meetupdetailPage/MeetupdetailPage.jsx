import { useParams } from "react-router-dom";
import "./MeetupdetailPage.css";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FormModal } from "./FormModal";

export function MeetupdetailPage() {

    const [modal, setModal] = useState(false);

    const { meetId } = useParams();

    const { dataState } = useContext(DataContext);

    const selectedEvent = dataState.allEventsList.find(({ id }) => id === meetId)

    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const getDate = (dt) => {
        const date = new Date(dt)
        console.log({ date });
        return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} at ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    }

    return (
        <>
            {modal && <FormModal setModal={setModal} selectedEvent={selectedEvent}/>}
            <div className="meetupdetailpage-container">

                <div className="left-section-container">
                    <div className="meet-heading-container">
                        <h1 className="meet-heading">{selectedEvent.title}</h1>
                    </div>
                    <div className="hostedby-container">
                        Hosted by:
                        <div className="hostedby">
                            <strong>{selectedEvent.hostedBy}</strong>
                        </div>
                    </div>
                    <div className="thumbnail-mdp-container">
                        <img src={selectedEvent.eventThumbnail} alt="" className="thumbnail-mdp" />
                    </div>
                    <div className="detailer-container">
                        <h2>Details: </h2>
                        <div className="details">
                            {selectedEvent.eventDescription}
                        </div>
                    </div>
                    <div className="additional-info-container">
                        <h2>Additional Information: </h2>
                        <div className="dress-code">
                            <strong>Dress Code: </strong>{selectedEvent.additionalInformation.dressCode}
                        </div>
                        <div className="age-restr">
                            <strong>Age Restricitons: </strong>{selectedEvent.additionalInformation.ageRestrictions}
                        </div>
                    </div>
                    <h2>Event Tags: </h2>
                    <div className="event-tags-container">
                        {selectedEvent.eventTags.map((tag) => (
                            <div className="tag">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="right-section-container">
                    <div className="time-location-price">

                        <div className="icons-descs">

                            <div className="time icon-n-desc">
                                <div><i class="fa-regular fa-clock"></i></div>
                                <div className="times">
                                <div className="time-mdp  desc-af">
                                    {`${getDate(selectedEvent.eventStartTime)} to`}
                                </div>
                                <div className="time-mdp desc-af">
                                    {getDate(selectedEvent.eventEndTime)}
                                </div>
                                </div>
                            </div>

                            <div className="address-container icon-n-desc">
                                <div><FontAwesomeIcon icon={faLocationDot} /></div>
                                <div className="locaiton-address  desc-af">
                                    <div className="location-mdp">
                                        {selectedEvent.location}
                                    </div>
                                    <div className="address">
                                        {selectedEvent.address}
                                    </div>
                                </div>
                            </div>

                            <div className="price-mdp icon-n-desc">
                                <div><FontAwesomeIcon icon={faIndianRupeeSign} /></div>
                                <div className="price desc-af">
                                    {selectedEvent.price}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="speakers-container">
                        <div className="speaker-head">
                            <h2>Speakers: ({selectedEvent.speakers.reduce((tot, speaker) => tot + 1, 0)})</h2>
                        </div>
                        <div className="speaker-cards-container">
                            {selectedEvent.speakers.map(({ name, image, designation }) => (
                                <div className="speaker-card">
                                    <div className="speaker-img-container">
                                        <img src={image} alt="" className="speaker-img" />
                                    </div>
                                    <div className="speaker-name">
                                        <strong>{name}</strong>
                                    </div>
                                    <div className="designation">
                                        {designation}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {(new Date() < new Date(selectedEvent.eventStartTime)) && <div className="rsvp-btn-container">
                        {selectedEvent?.rsvped ? <button className="rsvp">Already RSVPed</button> : <button className="rsvp" onClick={() => setModal(true)}>RSVP</button> }
                    </div>}
                </div>

            </div>
        </>
    )
}