import React from 'react'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { HotelContext } from '../context/hotelsContext'

const Signup = () => {
    const { setToken, setUserid, userid, login, setLogin } = useContext(HotelContext);
    const [name, setName] = useState("")
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
        await axios.post('http://localhost:4000/api/v1/auth/register', { name, email, password }).then((res) => { return res.data }).then((data) => {
            setToken(data.token)
            setUserid(data.userid)
            console.log(data)
            if (userid !== undefined) {
                setLogin(true)
                setPassword("")
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
                marginTop: "3%",
                marginBottom: "10%",
                padding: "5% 2% 3% 2%",
                borderRadius: "2%",
                boxShadow: "10px 8px 10px -3px black",
            }}
        >
            <form>
                <h3>Signup Form</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="name"
                        name="name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    ></input>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="email"
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
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Signup
