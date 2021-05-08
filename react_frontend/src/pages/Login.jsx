import { React, useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { HotelContext } from '../context/hotelsContext'
import axios from 'axios'

const Login = () => {
    const { setUserid, setToken, setLogin, login } = useContext(HotelContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    useEffect(() => {
        if (login) {
            history.push('/')
        }
    }, [login, history])
    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/api/v1/auth/login', { email, password }).then((res) => { return res.data }).then((data) => {
            setToken(data.token)
            setUserid(data.userid)
            console.log(data)
            if (data.token) {
                setLogin(true)
                setPassword("")
            }
            else {
                history.push("/login")
            }
        }).catch(err => { console.log(err.message) })
    }
    return (
        <div
            className="container"
            style={{
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: "50%",
                marginTop: "10%",
                marginBottom: "10%",
                padding: "5% 2% 5% 2%",
                borderRadius: "2%",
                boxShadow: "0 8px 10px -3px black",
            }}
        >
            <h3>Login</h3>
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="something@mail.com"
                        name="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    ></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                {"  |  "}
                <Link to="/signup" className="btn btn-primary">
                    Signup
          </Link>
            </form>
        </div>
    )
}

export default Login
