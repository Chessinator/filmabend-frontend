import { loginAsync } from "../user/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleTextInput } from "../../util/util";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const Login = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const currentAcc = useSelector(state => state.user.account)

    const loginUser = async () => {
        let passHash = await handleTextInput(password);

        dispatch(loginAsync(
            {
                name: username,
                passwordHash: passHash
            }
        )).then(response => {
            if (response.payload) {
                navigate("/profile");
            }
        })



    }
    return (
        <div className="container">
            <div className="col-6">
                <div className="mb-3">
                    <label htmlFor="userInput" className="form-label">Username</label>
                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} id="userInput" aria-describedby="userHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
                </div>
                <button onClick={() => loginUser()} className="btn btn-primary">Login</button>
            </div>

        </div>
    )
}
export default Login;