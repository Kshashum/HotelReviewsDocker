import axios from 'axios';
import { React, useState, createContext, useEffect } from 'react'

export const HotelContext = createContext();
export const HotelContextProvider = props => {
    const [hotels, setHotels] = useState([]);
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState("");
    const [userid, setUserid] = useState("");
    useEffect(() => {
        const loadHotels = async () => {
            axios.get("http://localhost:4000/api/v1/hotels").then((res) => {
                setHotels(res.data)
            }).catch((err) => { console.log(err.message) })
        }
        loadHotels()
    }, [])
    return (
        <HotelContext.Provider value={{ hotels, login, token, userid, setHotels, setLogin, setToken, setUserid }}>
            {props.children}
        </HotelContext.Provider>)
}