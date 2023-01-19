import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from 'react';

const User = () => {

    const account = useSelector(state => state.user.account);
    const genres = useSelector(state => state.genre.genres)
    const navigate = useNavigate();
    useEffect(() => () => {
        if (!account) {
            navigate("/login");
        }
    })

    const [movie, setMovie] = useState();
    const [genre, setGenre] = useState();

    return (
        <div className="container-fluid d-flex justify-content-evenly">
            <div className="">
                <div className="card" style={{ "width": "18rem" }}>
                    <img src={require("../../logo512.png")} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="card-text fw-bolder">Name:</div>
                            <div className="card-tex text-capitalize">{account.name}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="card-text fw-bolder">Wohnort:</div>
                            <div className="card-tex text-capitalize">{account.city}</div>
                        </div>


                    </div>
                </div>
            </div>
            <div className="">
                <div className="card" style={{ "width": "18rem" }}>
                    <div className="fw-bolder m-3">Lieblingsgenres</div>
                    <div className="card-body">
                        {account.favoriteGenres?.map(genre =>
                            <div>
                                <div className="card-text d-flex row">
                                    <div className="col-9">{genre.name}</div>
                                    <i className="bi bi-trash3 col-2" onClick={() => { }}></i>
                                </div>
                            </div>)}

                        <div className="d-flex mt-3">
                            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Genre suchen" />
                            <datalist id="datalistOptions" >
                                {genres?.map(genre => <option value={genre.name} />)}
                            </datalist>
                            <button className="btn btn-primary">hinzufügen</button>
                        </div>


                    </div>
                </div>
            </div>
            <div className="">
                <div className="card" style={{ "width": "18rem" }}>
                    <div className="fw-bolder m-3">Lieblingsfilme</div>
                    <div className="card-body">
                        {account.favoriteMovies?.map(genre => <div className="card-tex ">{genre.name}</div>)}
                        <div className="d-flex">
                            <input className="form-control" type="text" placeholder="Film suchen" aria-label="default input example" onChange={(e) => setMovie(e.target.value)} />
                            <button className="btn btn-primary">suchen</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>


    );
}

export default User;
