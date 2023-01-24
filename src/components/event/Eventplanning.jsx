import { useState, useEffect } from "react";
import { findUserAsync } from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAsync } from "../user/userSlice";
import { createEvent } from "./eventSlice";
import { AccordionButton } from "react-bootstrap";

const Eventplanning = () => {


    const guestList = useSelector(state => state.user.guestlist);

    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [name, setName] = useState()
    const userList = useSelector(state => state.user.userList)
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const account = useSelector(state => state.account);
    const genres = useSelector(state => state.genre.genres)


    useEffect(() => {
        dispatch(getAllUsersAsync())
    }, [])

    const userNotFound = (friend) => {
        return (
            <div>
                {friend} wurde nicht gefunden.
            </div>
        )
    }

    const addToGuestList = async (person) => {
        const invite = await dispatch(findUserAsync(person));
        if (invite != undefined) {
            guestList = [...guestList, invite]
        }
        preferedGenresByUserFavs();
    }

    const filteredUsers = () => {
        let filtered = [...userList];
        filtered = filtered.filter(user => user.toLowerCase().includes(query.toLowerCase()));
        return filtered;
    }

    const showSearchResults = () => {
        if (query.length > 0) {
            let entries = filteredUsers();
            return (
                <div>
                    {entries.map((user, i) =>
                        <div key={i}>
                            <div className="card-text d-flex row">
                                <div className="col-9 text-capitalize">{user}</div>
                                <i className="bi bi-person-add iconhover col-2" onClick={() => addToGuestList(user)}></i>
                            </div>
                        </div>)}
                </div>)
        }
        return null;
    }

    const pickDate = () => {
        return (
            <div className="datetimepicker">
                <input type="date" id="date" onChange={(e) => setDate(e.target.value)} />
                <span></span>
                <input type="time" id="time" onChange={(e) => setTime(e.target.value)} />
            </div>
        )
    }

    const parseDate = () => {
        return new Date(`${date}T${time}`).toJSON();
    }

    const preferedGenresByUserFavs = () => {
        let top3CounterMap = new Map();
        console.log("+++++++++++++++++++++++")
        console.log(guestList);
            guestList.forEach(guest => {
                console.log(guest);
                guest.favoriteGenres.forEach( genre =>
                    top3CounterMap.set(genre, 1 + top3CounterMap.get(genre))
                )   
            });
        console.log(top3CounterMap);
    }


    return (
        <div className="container">
            <div className="row ">

                <div className="card" style={{ "width": "18rem" }}>
                    <div className="fw-bolder m-3">Name</div>
                    <div className="card-body">
                        <div className="input-group mb-3">
                            <div className="d-flex mb-3 ">
                                <input className="form-control" type="text" placeholder="Event benennen" aria-label="default input example" onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>


                <div className="card" style={{ "width": "18rem" }}>
                    <div className="fw-bolder m-3">Freunde suchen</div>
                    <div className="card-body">
                        <div className="input-group mb-3">
                            <div className="d-flex mb-3 ">
                                <input className="form-control" type="text" placeholder="Person suchen" aria-label="default input example" onChange={(e) => setQuery(e.target.value)} value={query} />
                            </div>
                        </div>
                        {showSearchResults()}
                    </div>
                </div>
                <div className="card" style={{ "width": "18rem" }}>
                    <div className="fw-bolder m-3">Gästeliste</div>
                    <div className="card-body">

                        <div className="d-flex mb-3 row">
                            {guestList?.map((guest, i) =>
                                <div key={i}>
                                    <div className="card-text d-flex row">
                                        <div className="col-9 ">{guest.name}</div>
                                        <i className="bi bi-trash3  col-2 iconhover"></i>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
                <div className="card" style={{ "width": "18rem" }}>
                    <div className="fw-bolder m-3">Datum und Zeit auswählen</div>
                    <div className="card-body">

                        <div className="d-flex mb-3 row">
                            {pickDate()}
                            {`${date}T${time}`}
                            <button onClick={() => parseDate()}>Datum loggen</button>
                        </div>
                    </div>
                </div>

            </div>

            <button onClick={() => dispatch(createEvent({
                name: name,
                date: new Date(`${date}T${time}`).toJSON(),
                host: account,
                selectedMovies: [],
                selectedGenres: [],
                invitedUsers: guestList,
                confirmedUsers: [],
                remote: true
            }))}>Testpost </button>
        </div>
    )

}

export default Eventplanning;