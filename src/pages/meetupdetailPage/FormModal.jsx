import { useContext, useState } from "react";
import "./FormModal.css";
import { ACTIONS, DataContext } from "../../contexts/DataProvider";

export function FormModal({setModal, selectedEvent}) {

    const [emptymsg, setEmptymsg] = useState(false);

    const {SET_RSVP} = ACTIONS;

    const {dispatchData} = useContext(DataContext);

    const rsvpClickHandler = (event) => {
        event.preventDefault();
        if(document.querySelector(".name-input").value.trim() === "" ||  document.querySelector(".email-input")?.value.trim() === "") {
            setEmptymsg(true);
            return;
        }
        dispatchData({type: SET_RSVP, payload: selectedEvent.id});
        setEmptymsg(false);
        setModal(false);
    }

    return (
        <>
            <div className="overlay" onClick={() => setModal(false)}></div>
            <div className="form-modal">
                <div className="form-heading">
                    <h2>Complete your RSVP</h2>
                </div>
                <div className="personal-info msg">
                    Fill in your personal information.
                </div>
                {emptymsg && <div className="empty-msg">Please fill the fields.</div>}
                <div className="name-container">
                    <p>Name:</p>
                    <input type="text" className="name-input" required/>
                </div>
                <div className="email-container">
                    <p>Email:</p>
                    <input type="email" className="email-input" required/>
                </div>
            
                {selectedEvent.isPaid && <div className="payment-msg msg">
                    * You have to make the payment at the venue.
                </div>}
                <div className="rsvp-btn-modal">
                    <button className="rsvp-modal" onClick={rsvpClickHandler}>
                        RSVP
                    </button>
                </div>
            </div>
        </>
    )
}