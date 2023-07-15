import { useContext } from "react";
import "./Topnav.css";
import { ACTIONS, DataContext } from "../../contexts/DataProvider";
import { NavLink } from "react-router-dom";


export function Topnav() {

    const { SET_SEARCHEDTERM } = ACTIONS;

    const { dispatchData } = useContext(DataContext);

    const searchHandler = (e) => dispatchData({ type: SET_SEARCHEDTERM, payload: e.target.value })

    return (
        <>
            <div className="topnav-container">
                <div className="app-logo">
                    <NavLink to="/">
                        <img src="https://res.cloudinary.com/ddqytua2y/image/upload/v1689259614/rzymudlmrmq0yuwrl5wm.svg" alt="" />
                    </NavLink>
                </div>
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search by title and tags." onChange={searchHandler} />
                </div>
            </div>
        </>
    )
}