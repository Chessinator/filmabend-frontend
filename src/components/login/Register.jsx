import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import GenreItem from '../genre/GenreItem'
import { registerAsync } from "../user/userSlice";
import { handleTextInput } from "../../util/util";

const Register = () => {

    const genres = useSelector(state => state.genre.genres);
    const dispatch = useDispatch();

    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [confirmPw, setConfirmPw] = useState();
    const [city, setCity] = useState();

    let favGenres = [];

    const setFavGenres = (genre) => {
        if (favGenres.includes(genre)) {
            favGenres = favGenres.filter(g => g.name !== genre.name)
        } else {
            favGenres = [...favGenres, genre]
        }
    }

    const register = async (e) => {
        e.preventDefault();
        if (password !== confirmPw) {
            document.getElementById("modalBtn").setAttribute("data-bs-toggle", "modal")
            document.getElementById("modalBtn").click();
            document.getElementById("modalBtn").removeAttribute("data-bs-toggle", "modal")
        } else {
            let favs = favGenres.map(f => f._links.self.href);
            let registerData = {
                name: user,
                passwordHash: await handleTextInput(password),
                city: city,
                favoriteGenres: favs,
            }
            console.log(registerData);
            dispatch(registerAsync(registerData));
        }
    }

    return (
        <div className="container d-flex">

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Fehler beim registrieren</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Passwörter stimmen nicht überein.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Understood</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-6">
                <form className="g-3 needs-validation" noValidate>
                    <h2 className="col-md12">Benutzerdaten</h2>
                    <div className="col-md-8 mb-4">
                        <label htmlFor="validationCustom01" className="form-label">Username</label>
                        <input type="text" className="form-control" id="validationCustom01" onChange={(e) => setUser(e.target.value)} required />
                    </div>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please choose a username.
                    </div>
                    <div className="col-md-8 mb-4">
                        <label htmlFor="validationCustom02" className="form-label">Passwort</label>
                        <input type="password" className="form-control" id="validationCustom02" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="col-md-8 mb-4">
                        <label htmlFor="validationCustom03" className="form-label">Passwort bestätigen</label>
                        <input type="password" className="form-control" id="validationCustom03" onChange={(e) => setConfirmPw(e.target.value)} required />
                    </div>
                    <div className="invalid-feedback">
                        Please choose a username.
                    </div>

                    <div className="col-md-8 mb-4">
                        <label htmlFor="validationCustom04" className="form-label">Wohnort</label>
                        <input type="text" className="form-control" id="validationCustom04" onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="col-12">
                        <button type="submit" id="modalBtn" data-bs-target="#staticBackdrop" className="btn btn-primary" onClick={(e) => register(e)} >Registrieren</button>
                    </div>
                </form>
            </div>
            <div className="col-6">
                <h2 className="col-md12">Lieblingsgenres</h2>
                {genres.map((genre, key) => (
                    <GenreItem genre={genre} key={key} setFavGenres={setFavGenres} />
                ))}

            </div>




        </div >

    )

}

export default Register;