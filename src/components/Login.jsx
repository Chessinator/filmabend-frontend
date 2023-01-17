import { login,logout } from "../user/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {sha256} from 'crypto-hash';


const Login = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();  

    const handleTextInput = async (pw) => {
        let result = "";
        result = await sha256(pw)
        dispatch(login({username:username,password: result}))
    } 


    return (

        <div className="container">
            <div className="col-6">
                <div className="mb-3">
                    <label htmlFor="userInput" className="form-label">Username</label>
                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} id="userInput"aria-describedby="userHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control"  onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button  onClick={() =>  handleTextInput(password)} className="btn btn-primary">Login</button>
                <button onClick ={() => dispatch(logout())}className="btn btn-primary">Logout</button>
            </div>

        </div>


    )

}
export default Login;