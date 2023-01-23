import { useState } from "react";
import { findUserAsync } from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";



const Eventplanning = () => {


    let guestList = useSelector(state => state.user.guestlist);

    const dispatch = useDispatch();
    const [friend, setFriend] = useState();

    const addToGuestList = async () => {
        const invite = await dispatch(findUserAsync(friend));
        if (invite != undefined) {
            guestList = [...guestList, invite]
        }
    }

    return (
        <div className="container">
            <div className="card" style={{ "width": "18rem" }}>
                <div className="fw-bolder m-3">Freunde einladen</div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <div className="d-flex mb-3 ">
                            <input className="form-control" type="text" placeholder="Person suchen" aria-label="default input example" onChange={(e) => setFriend(e.target.value)} />
                            <button className="btn btn-primary" onClick={() => addToGuestList()}>suchen</button>
                        </div>
                    </div>
                    {guestList?.map((guest, i) =>
                        <div key={i}>
                            <div className="card-text d-flex row">
                                <div className="col-9 ">{guest.name}</div>
                                <i className="bi bi-trash3  col-2 iconhover" ></i>
                            </div>
                        </div>)}
                </div>
            </div>



        </div>

    )

}

export default Eventplanning;