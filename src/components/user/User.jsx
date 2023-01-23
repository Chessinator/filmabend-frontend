import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addFavGenreAsync, deleteFavGenreAsync } from "./userSlice";

const User = () => {

    const account = useSelector(state => state.user.account);
    const genres = useSelector(state => state.genre.genres);
    const status = useSelector(state => state.genre.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => () => {
        if (!account) {
            navigate("/login");
        }
    })
    const [movie, setMovie] = useState();
    const [genre, setGenre] = useState();

    const addFavGenre = () => {

        if (!genre) {
            dispatch(addFavGenreAsync({ id: account.id, genre: filteredGenres()[0] }))
        }
        else {
            let g = genres.filter(g => g.id == genre)
            dispatch(addFavGenreAsync({ id: account.id, genre: g[0] }))
        }
        setGenre(undefined)
    }

    const filteredGenres = () => {
        return genres.filter(g => !account.favoriteGenres.map(fg => fg.id).includes(g.id));
    }


    const renderDefault = () => {
        return (<div className="container-fluid d-flex justify-content-evenly">
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
                        <div className="input-group mb-3">
                            <select className="form-select" id="inputGroupSelect01" onChange={e => setGenre(e.target.value)}>
                                {filteredGenres().map((g, key) => <option key={key} value={g.id} >{g.name}</option>)}
                            </select>
                            <button className="btn btn-outline-secondary" type="button" onClick={() => addFavGenre()}  >hinzufügen</button>
                        </div>
                        {account.favoriteGenres.map((genre, i) =>
                            <div key={i}>
                                <div className="card-text d-flex row">
                                    <div className="col-9 ">{genre.name}</div>
                                    <i className="bi bi-trash3  col-2 iconhover" onClick={() => dispatch(deleteFavGenreAsync({ id: account.id, propertyId: genre.id }))}></i>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>

            <div className="">
                <div className="card" style={{ "width": "18rem" }}>
                    <div className="fw-bolder m-3">Lieblingsfilme</div>
                    <div className="card-body">
                        {account.favoriteMovies?.map((g, i) => <div className="card-tex" key={i}>{g.name}</div>)}
                        <div className="d-flex mb-3">
                            <input className="form-control" type="text" placeholder="Film suchen" aria-label="default input example" onChange={(e) => setMovie(e.target.value)} />
                            <button className="btn btn-primary">suchen</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>)
    }

    const renderLoading = () => <div className="spinner-border position-absolute top-50 start-50" role="status"></div>;

    return (status === "loading" ? renderLoading() : renderDefault());

};

export default User;
